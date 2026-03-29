import { useGlobal } from "@/lib/GlobalContext";
import { changeActualService, createNewData, createService, deleteService, pullServices } from "@/services/services/ServicesService";
import { dataService, ServiceAndData, services } from "@/types/TypeService";

import { useEffect, useState } from "react";


export function useServicesAdmin(){
        const [nextPage, setNextPage] = useState<string | null>("first page");
        const [dataService, setDataService] = useState<ServiceAndData[]>([]);
        const [idDelete, setIdDelete] = useState<number>(-1);


        const {token} = useGlobal();

        const pullAllServices = async() => {
            try{
                    const services = await pullServices();
    
                    console.log(services);
                    setDataService(services);
            }
    
            catch(error){
                
            }
        }
    
        const addNewService = async(dados: ServiceAndData) => {
            try{
                if(token){
                    const service = await createService(dados, token);
                    pullAllServices();
                }  
            }
    
            catch(error){
                
            }
        }
    
        const addNewData = async(dados: dataService) => {
            try{
                if(token){
                    const service = await createNewData(dados, token, idDelete);
                    pullAllServices();
                }  
            }
    
            catch(error){
                
            }
        }
    
        const changeValuesService = async(dados: ServiceAndData) => {
            try{
                if(idDelete !== -1){
                    console.log("")
                    const service = await changeActualService(idDelete,dados, token!);
                    setNextPage("first page");
                    pullAllServices();
                }  
            }
    
            catch(error){
                
            }
        }
    
        const deleteActualService = async(idDelete: number) => {
            try{
                if(idDelete !== -1){
                    const service = await deleteService(idDelete, token!);
                    pullAllServices();
                }  
            }
    
            catch(error){
                
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
        nextPage

        }
}