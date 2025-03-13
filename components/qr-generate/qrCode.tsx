"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { generateQr } from "@/services/apicall";
import { Button } from "../ui/button";
import { AllProduct } from "@/lib/productlist";
import { Label } from "../ui/label";
import { jsPDF } from "jspdf";

export default function GenerateQR() {
  const [qrDataList, setQrDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleGenerateQR = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);
    setQrDataList([]); // Clear previous QR codes

    try {
      const qrCodes: any = [];

      for (let i = 0; i < 10; i++) {
        const response: any = await generateQr(selectedProduct);
        qrCodes.push(response?.url);
      }

      setQrDataList(qrCodes);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating QR codes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary div with large QR codes specifically for PDF export
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "900px";
      document.body.appendChild(tempDiv);

      // Create high-resolution QR codes
      for (let i = 0; i < qrDataList.length; i++) {
        const qrContainer = document.createElement("div");
        qrContainer.id = `temp-qr-${i}`;
        qrContainer.style.margin = "20px";
        qrContainer.style.width = "800px";
        qrContainer.style.height = "800px";
        tempDiv.appendChild(qrContainer);

        // Use QRCodeSVG library directly with DOM methods
        const qrSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        qrSvg.setAttribute("width", "800");
        qrSvg.setAttribute("height", "800");
        qrSvg.setAttribute("viewBox", "0 0 37 37");
        qrContainer.appendChild(qrSvg);

        // Manually create QR code SVG
        // Note: We're using a simple black square for demo
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("width", "37");
        rect.setAttribute("height", "37");
        rect.setAttribute("fill", "white");
        qrSvg.appendChild(rect);

        // Add some pattern to represent QR code
        for (let x = 0; x < 37; x += 4) {
          for (let y = 0; y < 37; y += 4) {
            if (Math.random() > 0.5) {
              const rect = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
              );
              rect.setAttribute("x", x.toString());
              rect.setAttribute("y", y.toString());
              rect.setAttribute("width", "3");
              rect.setAttribute("height", "3");
              rect.setAttribute("fill", "black");
              qrSvg.appendChild(rect);
            }
          }
        }
      }

      // Create a new PDF document - switch to portrait for standard A4 size
      const pdf = new jsPDF("portrait", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Set margins
      const margin = 10;

      // Set QR code size (reduced to fit 3×3 grid)
      const qrSize = 60;

      // Grid layout configuration - 3 rows of 3 QR codes (9 per page)
      const itemsPerRow = 3;
      const rows = 3;
      const qrCodesPerPage = itemsPerRow * rows;

      // Calculate spacing
      const horizontalSpacing =
        (pageWidth - 2 * margin - qrSize * itemsPerRow) / (itemsPerRow - 1);
      const verticalSpacing =
        (pageHeight - 2 * margin - qrSize * rows - rows * 8 - 10) / (rows - 1);

      // Add title
      pdf.setFontSize(14);
      pdf.text(`Paint Box QR Codes ${selectedProduct}`, pageWidth / 2, margin, {
        align: "center",
      });

      // Process QR codes
      for (let i = 0; i < qrDataList.length; i++) {
        // Calculate if we need a new page
        if (i > 0 && i % qrCodesPerPage === 0) {
          pdf.addPage();
          // Add title to new page
          pdf.setFontSize(14);
          pdf.text("Paint Box QR Codes", pageWidth / 2, margin, {
            align: "center",
          });
        }

        // Calculate position
        const pageIndex = i % qrCodesPerPage;
        const col = pageIndex % itemsPerRow;
        const row = Math.floor(pageIndex / itemsPerRow);

        const xPos = margin + col * (qrSize + horizontalSpacing);
        const yPos = margin + 10 + row * (qrSize + 8 + verticalSpacing); // +8 for text height

        // Create canvas for this QR code
        const canvas = document.createElement("canvas");
        canvas.width = 1000; // Very high resolution
        canvas.height = 1000;
        const ctx = canvas.getContext("2d");

        // Draw white background
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Get visible QR code SVG
        const visibleQrCode = document.querySelector(
          `.qr-code-container:nth-child(${i + 1}) svg`
        );

        if (visibleQrCode) {
          // Clone the SVG to manipulate it
          const svgClone: any = visibleQrCode.cloneNode(true);
          // Make it larger
          svgClone.setAttribute("width", "1000");
          svgClone.setAttribute("height", "1000");

          // Convert to string
          const svgData = new XMLSerializer().serializeToString(svgClone);
          const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
          const svgUrl = URL.createObjectURL(svgBlob);

          // Create image from SVG
          const img = new Image();
          img.src = svgUrl;

          // Wait for image to load
          await new Promise((resolve) => {
            img.onload = async () => {
              // Draw to canvas at high resolution
              if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              }

              // Get high-quality PNG data
              const imgData = canvas.toDataURL("image/png", 1.0); // Maximum quality

              // Add to PDF with reduced size
              pdf.addImage(imgData, "PNG", xPos, yPos, qrSize, qrSize);

              // Add URL beneath QR code (smaller font)
              // pdf.setFontSize(7);
              // const url = qrDataList[i] as string;
              // const truncatedUrl = url.length > 40 ? url.substring(0, 37) + '...' : url;
              // const textWidth = pdf.getStringUnitWidth(truncatedUrl) * 7 / pdf.internal.scaleFactor;
              // const textX = xPos + (qrSize - textWidth) / 2;
              // pdf.text(truncatedUrl, textX, yPos + qrSize + 5);

              // Clean up
              URL.revokeObjectURL(svgUrl);

              resolve(undefined);
            };
          });
        }
      }

      // Clean up temporary elements
      document.body.removeChild(tempDiv);

      // Save PDF
      pdf.save("qr_codes.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="w-full max-w-md p-6  rounded-xl shadow-lg border border-gray-100">
        <h2 className="mb-6 text-2xl font-bold text-center ">
          Paint Box QR Generator
        </h2>

        <div className="mb-6">
          <Label className="block mb-2 text-sm font-medium ">
            Select Product
          </Label>
          <div className="relative">
            <select
              onChange={(e) => setSelectedProduct(e.target.value)}
              value={selectedProduct || ""}
              className="w-full p-3 border  rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" className="bg-background">Choose a Paint Box product</option>
              {AllProduct.map((item) => (
                <option key={item?.id} value={item?.value}  className="bg-background">
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button
            onClick={handleGenerateQR}
            disabled={isLoading || !selectedProduct}
            className="w-full px-6 py-3 font-medium text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.01]"
          >
            {isLoading ? "Generating 10 QR Codes..." : "Generate 10 QR Codes"}
          </Button>
        </div>

        {isGenerated && !isLoading && (
          <>
            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg shadow bg-white">
              {qrDataList.map((qrData, index) => (
                <div
                  key={index}
                  className="p-2 border rounded-lg qr-code-container"
                >
                  <QRCodeSVG
                    value={qrData || "https://example.com"}
                    size={100}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleDownloadPDF}
                className="w-full px-6 py-3 font-medium text-white transition-all bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-[1.01]"
              >
                Download QR Codes as PDF
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
