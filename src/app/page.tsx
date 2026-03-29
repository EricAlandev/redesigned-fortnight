'use client'

import Header from "@/componentes/general/Header";
import SearchBar from "@/componentes/pages/homePage/SearchBar";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import { pullServices, searchService } from "@/services/services/ServicesService";
import { ServiceAndData } from "@/types/TypeService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [dados, setDados] = useState<ServiceAndData[]>([]);

  const router = useRouter();

  const pullAllServices = async () => {
    try{
      const services = await pullServices();

      setDados(services);
    }

    catch(error){
      console.log(error);
    }
  }

  const FetchSearch = async (searchValue: string) => {
    try{
      const services = await searchService(searchValue);
      console.log(services)
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

        {/*SearchBar */}
        <SearchBar
           enviar={FetchSearch}
        />

        {/*Render of services */}
        <div
        className="w-[83vw] mx-auto "
        >
          <RenderServices
            dataService={dados}
          />
        </div>
      
    </div>
  );
}
