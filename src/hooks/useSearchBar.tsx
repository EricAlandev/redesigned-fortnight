'use client'

import { services } from "@/types/TypeService";
import { useState } from "react";
// Importing the direct serverless controller action we just created
import { searchServiceController } from "@/services/services/ServicesService";

type resultFetchSearch = {
  quantityResult: number,
  services: services[]
}

export function useSearchBar(){

      const [resultServices, setResultServices] = useState<services[] | []>([]);
      const [quantityResult, setQuantityResult] = useState<number>();

      const FetchSearch = async (searchValue: string) => {
        try {
          // Calls the direct file-system search mapping without an HTTP overhead
          const response: resultFetchSearch | null = await searchServiceController(searchValue);

          if (response?.quantityResult !== undefined && response.services) {
            setResultServices(response.services);
            setQuantityResult(response.quantityResult);
          } else {
            setResultServices([]);
            setQuantityResult(0);
          }
        }
        catch(error) {
          console.error("Error executing search bar server action:", error);
          setResultServices([]);
          setQuantityResult(0);
        }
      }

      return {
        FetchSearch,
        quantityResult,
        resultServices
      }
}