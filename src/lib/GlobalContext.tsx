'use client'

import { typeUsuario } from '@/types/TypeUsuarios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface GlobalContextType {
  user: typeUsuario | null;
  token: string | null;
  login: (data: any, token : any) => void;
  logOut: () => void;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<typeUsuario | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const login = (data: typeUsuario, token : string) => {
     setUser(data);
     setToken(token);
     localStorage.setItem("user", JSON.stringify(data));
     localStorage.setItem("token", JSON.stringify(token));

  }

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
 }

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const tokenStorage = localStorage.getItem("token");

    if(userStorage){
        setUser(JSON.parse(userStorage));
    }

    if(tokenStorage){
        setToken(JSON.parse(tokenStorage));
    }

  }, []);

  return (
    <GlobalContext.Provider value={{ user, login, token, logOut }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within a GlobalProvider");
  return context;
};