"use client";

// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getAllusers } from "@/services/apicall";

const UserContext = createContext<any[]>([]);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any[]>([]);
    console.log("context",user)
  useEffect(() => {
    const fetchUser = async () => {
      const userData:any = await getAllusers(); 
      setUser(userData);
    };
    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
