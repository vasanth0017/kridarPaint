"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { generateQr } from "@/services/apicall";
import { Button } from "../ui/button";
import { AllProduct } from "@/lib/productlist";
import { Label } from "../ui/label";

export default function GenerateQR() {
  const [qrData, setQrData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleGenerateQR = async () => {
    setIsLoading(true);
    try {
      const response: any = await generateQr(selectedProduct);
      setQrData(response?.url);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Paint Box QR Generator
        </h2>

        <div className="mb-6">
          <Label className="block mb-2 text-sm font-medium text-gray-700">
            Select Product
          </Label>
          <div className="relative">
            <select
              onChange={(e) => setSelectedProduct(e.target.value)}
              value={selectedProduct || ""}
              className="w-full p-3 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a Paint Box product</option>
              {AllProduct.map((item: any) => (
                <option key={item?.id} value={item?.value}>
                  {item?.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={handleGenerateQR}
            disabled={isLoading || !selectedProduct}
            className="w-full px-6 py-3 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.01]"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating QR Code...
              </span>
            ) : (
              "Generate QR Code"
            )}
          </Button>
        </div>

        {isLoading && !isGenerated && (
          <div className="flex flex-col items-center justify-center p-6 my-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500">
              Generating your QR code...
            </p>
          </div>
        )}

        {isGenerated && !isLoading && (
          <div className="flex flex-col items-center">
            <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <QRCodeSVG value={qrData || "https://example.com"} size={224} />
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-center gap-2">
              <Button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                Download QR Code
              </Button>
              <Button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors">
                Share QR Code
              </Button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-center text-gray-500">
        Scan the QR code with your mobile device to access your Paint Box
        product
      </p>
    </div>
  );
}
