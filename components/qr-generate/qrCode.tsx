"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { generateQr } from "@/services/apicall";
import { Button } from "../ui/button";

export default function GenerateQR() {
  const [qrData, setQrData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerateQR = async () => {
    setIsLoading(true);
    try {
      const response:any = await generateQr();
      setQrData(response?.url);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md p-6  rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">QR Code for Paint Box</h2>
        
        <div className="flex justify-center mb-6">
          <Button
            onClick={handleGenerateQR}
            disabled={isLoading}
            className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Generate QR Code"}
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center my-8">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {isGenerated && !isLoading && (
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <QRCodeSVG value={qrData || "https://example.com"} size={256} />
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700">Scan this code to claim ₹10</p>
          </div>
        )}
      </div>
    </div>
  );
}