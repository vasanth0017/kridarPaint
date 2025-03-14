"use client";

// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getPurchasedProd } from "@/services/apicall";

const ProductsContext = createContext<any[]>([]);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const prod_data:any = await getPurchasedProd(); 
      setProducts(prod_data);
    };
    fetchUser();
  }, []);

  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => useContext(ProductsContext);
