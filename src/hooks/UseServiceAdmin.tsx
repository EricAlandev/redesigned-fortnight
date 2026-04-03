import { useGlobal } from "@/lib/GlobalContext";
import { changeActualService, createNewData, createService, deleteService, pullServices } from "@/services/services/ServicesService";
import { dataService, ServiceAndData, services } from "@/types/TypeService";
import { pullQueueServices } from "@/services/services/ServicesService";

import { useEffect, useState } from "react";

import { ServicesList } from "@/types/TypeService";


export function useServicesAdmin(){
        const [nextPage, setNextPage] = useState<string | null>("first page");
        const [dataService, setDataService] = useState<ServiceAndData[]>([]);
        const [idDelete, setIdDelete] = useState<number>(-1);
        const [services, setServices] = useState<ServicesList>();


        const {token} = useGlobal();

        //crud services 
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


                    return {message: service?.message, status: 'sucess'}
                }  
            }
    
            catch(error : any){
                return {message: error?.message, status: 'error'}
            }
        }
    
        const addNewData = async(dados: dataService) => {
            try{
                if(token){
                    const service = await createNewData(dados, token, idDelete);
                    pullAllServices();
                    return {message: service?.message, status: 'sucess'}

                }  
            }
    
            catch(error : any){
                return {message: error?.message, status: 'error'}
                
            }
        }
    
        const changeValuesService = async(dados: ServiceAndData) => {
            try{
                if(idDelete !== -1){
                    console.log("")
                    const service = await changeActualService(idDelete,dados, token!);
                    pullAllServices();

                    return {message: service?.message , status: 'sucess'}

                }  
            }
    
            catch(error : any){
                return {message: error?.message , status: 'error'}
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

        //services list
        const callQueue = async(enviar?: string) => {
        
                try{
                    const queue = await pullQueueServices(enviar);
                    setServices(queue);
                }
        
                catch(error){
                    console.log(error);
                }
        
            }
        
    return {
        //pull all services
        pullAllServices,

        //crud/values
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

        //services
        callQueue,
        services
        }
}