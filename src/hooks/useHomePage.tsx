// src/hooks/useHomePage.ts
'use client'

import { ServiceAndData } from "@/types/TypeService";
import { useEffect, useState } from "react";
// Pulling the local serverless actions directly!
import { pullServices } from "@/services/services/ServicesService";

export function useHomePage() {
  const [dados, setDados] = useState<ServiceAndData[]>([]);

  const pullAllServices = async () => {
    try {
      // Runs directly on serverless side via Next.js background layer
      const services = await pullServices();
      setDados(services as ServiceAndData[]);
    } catch (error) {
      console.error("Error retrieving services from file database:", error);
    }
  };

  useEffect(() => {
    pullAllServices();
  }, []);

  return { dados };
}