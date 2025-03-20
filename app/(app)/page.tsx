"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Paintbrush as Paint } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1920&q=80",
    title: "Transform Your Space",
    subtitle: "Premium paints for lasting impressions"
  },
  {
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80",
    title: "Luxury in Every Shade",
    subtitle: "Discover our exclusive collection"
  },
  {
    image: "https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80",
    title: "Eco-Friendly Excellence",
    subtitle: "Sustainable solutions for modern living"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
       
  }, []);


  return (
    <main className="min-h-screen">
      {/* Hero Section with Reference */}
      <section  className="relative h-screen">
        {/* Hero Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Luxury overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Gold accent line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-2 tracking-wider">
                  {slide.title}
                </h1>
                <div className="w-16 h-1 bg-amber-400 mx-auto my-4"></div>
                <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
                  {slide.subtitle}
                </p>
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white border-none rounded-none px-8 py-6 text-lg font-light tracking-wider hover:translate-y-1 transition-all"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 z-10">
          <Button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="bg-black/30 hover:bg-amber-600/80 p-2 rounded-full backdrop-blur-sm border border-white/10 transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          
          <div className="flex items-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentSlide ? "w-8 bg-amber-400" : "bg-white/50 hover:bg-white"
                )}
              />
            ))}
          </div>
          
          <Button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="bg-black/30 hover:bg-amber-600/80 p-2 rounded-full backdrop-blur-sm border border-white/10 transition-all"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>
        
      </section>

      {/* Rest of your website sections... */}
      {/* Product Showcase */}
      {/* Blog Section */}
      {/* FAQ Section */}
      {/* Contact Section */}
    </main>
  );
}