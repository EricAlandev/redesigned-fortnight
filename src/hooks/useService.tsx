
'use client'

import { ServiceAndData, dataService } from "@/types/TypeService"
import { useState, useEffect } from "react"
import { pullOneService, UserSelectService } from "@/services/services/ServicesService";
import { DataAvaliation } from "@/types/TypeAvaliation";

export default function useService(){
    const [data, setData] = useState<ServiceAndData>();


    const pullPageService = async(id: string, token?: string) => {
            try{
                if(id){
                    const idConvertido = Array.isArray(id) ? id[0] : id;
                    const service = await pullOneService(idConvertido, token || undefined);
                    console.log("service", service);
                    setData(service);
                    
                }
            }
    
            catch(error){
                console.log(error);
            }
        }
    
        const userSelectServiceToBuy = async(data: dataService, idDate: string , id: string, token: string) => {
            try{
                if(id && token){
                    const idConvertido = Array.isArray(id) ? id[0] : id;
                    console.log("Data service to buy", data, token, idConvertido, "idDate", idDate)
                    const service = await UserSelectService(data, token, idConvertido, idDate);
                    console.log("service", service);
    
                    pullPageService(id);
                    
                }
            }
    
            catch(error){
                console.log(error);
            }
        }

    return{
        data,
        userSelectServiceToBuy,
        pullPageService
    }
}