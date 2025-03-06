"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, ShoppingCart, Menu, X } from "lucide-react";
import { getProducts } from "@/services/apicall";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("paints");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: any = await getProducts();
        setData(response || []);
        // Set default category if data exists
        if (response && response.length > 0) {
          setSelectedCategory(response[0].name);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get current category products
  const currentProducts = data.find((category) => category.name === selectedCategory)?.products || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">{selectedCategory}</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-gray-700"
        >
          <Menu size={24} />
        </Button>
      </div>

      {/* Sidebar - Hidden on mobile by default */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background md:static md:z-auto md:w-64 md:block transition-all duration-300 ease-in-out",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col h-full bg-secondary p-6 overflow-y-auto">
          {/* Close button for mobile */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-2xl font-bold">Categories</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-gray-700"
            >
              <X size={24} />
            </Button>
          </div>
          
          {/* Desktop header */}
          <h2 className="text-2xl font-bold mb-6 hidden md:block">Categories</h2>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              data.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={`w-full text-left p-3 rounded-lg flex items-center justify-between transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                >
                  <span className="truncate">{category.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm opacity-80">({category.products.length})</span>
                    <ChevronRight className="ml-2" size={18} />
                  </div>
                </Button>
              ))
            )}
          </nav>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 hidden md:block">{selectedCategory}</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product:any) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative w-full h-48 md:h-64 bg-gray-100">
                  {product.images && product.images[0] ? (
                    <Image
                      src="/Emulsion.png"
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  <Button 
                    className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                    size="icon"
                  >
                    <ShoppingCart size={18} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 truncate">
                      {product.color}
                    </span>
                    <span className="text-blue-600 font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;