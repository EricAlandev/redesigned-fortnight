'use client'

import Header from "@/componentes/general/Header";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import { pullServices } from "@/services/services/ServicesService";
import { ServiceAndData } from "@/types/TypeService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

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
  return (
    <div className="">
      <Header
        
      />

      {/*Render of services */}
      <div
       className="w-[83vw] mx-auto pt-20.5"
      >
        <RenderServices
          dataService={dados}
        />
      </div>
      
    </div>
  );
}
