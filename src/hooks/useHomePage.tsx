'use client'

import { ServiceAndData } from "@/types/TypeService";
import { useEffect, useState } from "react";
import { pullServices } from "@/services/services/ServicesService";

export function useHomePage(){
    
    const [dados, setDados] = useState<ServiceAndData[]>([]);

      const pullAllServices = async () => {
        try{
          const services = await pullServices();
    
          setDados(services);
        }
    
        catch(error){
          console.log(error);
        }
      }
    

    useEffect(() => {
        pullAllServices();
      }, []);


    return {dados}
}