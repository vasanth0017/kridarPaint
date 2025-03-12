"use client";

import { useState } from "react";
import { useUser } from "@/context/painter-context";
import { Loader, X } from "lucide-react";
import LuxuryCoin from "../amount/display";
import { Button } from "../ui/button";

export default function Details() {
  const [selectedPainter, setSelectedPainter] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("selectedPainter", selectedPainter);
  const userDetails = useUser();
  const painterDetails = userDetails.filter((user) => user.role === "Painter");
  const sortedPainters = [...painterDetails].sort((a, b) => {
    const totalA =
      a?.totalredeem?.reduce((sum: any, item: any) => sum + item.amount, 0) ||
      0;
    const totalB =
      b?.totalredeem?.reduce((sum: any, item: any) => sum + item?.amount, 0) ||
      0;
    return totalB - totalA;
  });
  const openModal = (painter: any) => {
    setSelectedPainter(painter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPainter(null);
  };
  if (!userDetails.length) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Loader className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Painters [ {sortedPainters?.length} ]
      </h1>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPainters?.map((painter) => {
          const totalAmount =
            painter?.totalredeem?.reduce(
              (sum: any, item: any) => sum + item?.amount,
              0
            ) || 0;

          return (
            <div
              key={painter?.email}
              className="bg-secondary rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">
                      {painter.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{painter?.email}</p>
                  </div>
                  <div className="flex w-fit h-fit">
                    <LuxuryCoin amount={totalAmount} />
                  </div>
                </div>

                <Button
                  onClick={() => openModal(painter)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
                >
                  Quick View
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal/Popup */}
      {isModalOpen && selectedPainter && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg w-full max-w-lg relative">
            <Button onClick={closeModal} className="absolute top-4 right-4">
              <X size={24} />
            </Button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
                Painter Details
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-lg">{selectedPainter?.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-lg">{selectedPainter?.email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Phone Number
                  </h3>
                  <p className="text-lg">{selectedPainter?.phoneNumber}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-lg">{selectedPainter?.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      District
                    </h3>
                    <p className="text-lg">{selectedPainter?.district}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">State</h3>
                    <p className="text-lg">{selectedPainter?.state}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Pincode
                    </h3>
                    <p className="text-lg">{selectedPainter?.pincode}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Role</h3>
                    <p className="text-lg">{selectedPainter?.role}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={closeModal}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
