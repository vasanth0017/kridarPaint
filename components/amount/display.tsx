"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoins } from "react-icons/fa";

export default function LuxuryCoin({amount}:{amount: any}) {
  const [rotate, setRotate] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => prev + 360);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full shadow-sm border border-amber-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative w-5 h-5 flex items-center justify-center"
      >
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-md"
        />
        <FaCoins className="relative text-white text-xs z-10" />
      </motion.div>
      
      <motion.span 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="text-sm font-medium bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent"
      >
       {amount}
      </motion.span>
    </div>
  );
}