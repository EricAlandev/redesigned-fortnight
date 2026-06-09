'use client'

import { useState } from "react";
import { dataService, ServiceAndData, ServicesList } from "@/types/TypeService";

// Importing our clean, localized Server Actions bundle directly
import { 
  pullServices, 
  createServiceAction, 
  AddNewDataController, 
  changeService, 
  deleteService, 
  pullQueueOfServices 
} from "@/services/services/ServicesService";

export function useServicesAdmin(){
        const [nextPage, setNextPage] = useState<string | null>("first page");
        const [dataService, setDataService] = useState<ServiceAndData[]>([]);
        const [idDelete, setIdDelete] = useState<number>(-1);
        const [services, setServices] = useState<ServicesList[]>([]);

        // 1. READ ALL SERVICES
        const pullAllServices = async() => {
            try {
                const fetchedServices = await pullServices();
                console.log("Services loaded dynamically:", fetchedServices);
                setDataService(fetchedServices as unknown as ServiceAndData[]);
            }
            catch(error) {
                console.error("Failed to read server records:", error);
            }
        }
    
        // 2. CREATE SERVICE
        const addNewService = async(dados: ServiceAndData) => {
            try {
                const response = await createServiceAction(dados);
                await pullAllServices(); // Hot reload local array view
                return { message: response?.message, status: 'sucess' };
            }
            catch(error: any) {
                return { message: error?.message || "Erro desconhecido", status: 'error' };
            }
        }
    
        // 3. ADD NEW TIME SLOT
        const addNewData = async(dados: dataService) => {
            try {
                // Matches the controller parameters signature: (dia_horario, idConvertido)
                const response = await AddNewDataController(dados.horario || "", idDelete);
                await pullAllServices();
                return { message: response?.message, status: 'sucess' };
            }
            catch(error: any) {
                return { message: error?.message || "Erro ao adicionar horário", status: 'error' };
            }
        }
    
        // 4. UPDATE SERVICE
        const changeValuesService = async(dados: ServiceAndData) => {
            try {
                if (idDelete !== -1) {
                    // Merges parameters with idParameter target identifier to match signature layout
                    const response = await changeService({
                        ...dados,
                        idParameter: String(idDelete)
                    });
                    await pullAllServices();
                    return { message: response?.mensagem, status: 'sucess' };
                }
                return { message: "Nenhum serviço selecionado", status: 'error' };
            }
            catch(error: any) {
                return { message: error?.message || "Erro na alteração", status: 'error' };
            }
        }
    
        // 5. DELETE SERVICE
        const deleteActualService = async(idToDeleteTarget: number) => {
            try {
                if (idToDeleteTarget !== -1) {
                    await deleteService(String(idToDeleteTarget));
                    await pullAllServices();
                }  
            }
            catch(error) {
                console.error("Failed to delete record item:", error);
            }
        }

        // 6. METRICS BOOKING QUEUE FETCH
        const callQueue = async(enviar?: string) => {
            try {
                // Falls back to standard timeframe query fallback tracking strings inside controller
                const queueData = await pullQueueOfServices(enviar || "semana");
                setServices(queueData as unknown as ServicesList[]);
            }
            catch(error) {
                console.error("Error updating metric queue tracking details:", error);
            }
        }
        
    return {
        pullAllServices,
        addNewService,
        addNewData,
        changeValuesService,
        deleteActualService,
        idDelete,
        setIdDelete,
        dataService,
        setDataService,
        setNextPage,
        nextPage,
        callQueue,
        services
    };
}