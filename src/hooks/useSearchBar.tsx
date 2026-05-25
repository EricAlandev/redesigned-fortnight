
'use client'

import { useRouter } from "next/navigation";
import { searchService } from "@/services/services/ServicesService";
import { ServiceAndData, services } from "@/types/TypeService";
import { useState } from "react";

type resultFetchSearch = {
  quantityResult: number,
  services: services[]
}

export function useSearchBar(){

      const [resultServices, setResultServices] = useState<services[] | []>([]);
      const [quantityResult, setQuantityResult] = useState<number>();

      const FetchSearch = async (searchValue: string) => {
        try{
          const services: resultFetchSearch | null = await searchService(searchValue);

          if(services?.quantityResult && services.services){
            setResultServices(services.services);
            setQuantityResult(services.quantityResult);
          }

          else{
            setResultServices([]);
            setQuantityResult(0);
          }


        }
    
        catch(error){
          console.log(error);
        }
      }


      return {
        FetchSearch,
        quantityResult,
        resultServices
      }

    
    
}