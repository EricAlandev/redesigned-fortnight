'use client'

import { typeUsuario } from '@/types/TypeUsuarios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface GlobalContextType {
  user: typeUsuario | null;
  token: string | null;
  login: (data: any, token? : any) => void;
  logOut: () => void;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<typeUsuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (data: typeUsuario, token?: string) => {
      if(data){
        setUser((d) => (
          data
        ));
        localStorage.setItem("user", JSON.stringify(data));
      }

      if(token){
        setToken((d) => (
          token
        ));
        localStorage.setItem("token", JSON.stringify(token));
      }
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

    if(userStorage && userStorage !== "undefined"){
        try{
          setUser(JSON.parse(userStorage));
        }

        catch(error){
          console.log(error);
        }
    }

    if(tokenStorage && tokenStorage !== "undefined"){
        try{
          setToken(JSON.parse(tokenStorage));
        }
        
        catch(error){
          console.log(error);
        }
    }

  }, []);

  return (
    <GlobalContext.Provider value={{ user, login, token, logOut}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobal must be used within a GlobalProvider");
  return context;
};