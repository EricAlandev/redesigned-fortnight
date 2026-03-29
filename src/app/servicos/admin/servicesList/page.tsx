'use client'

import Header from "@/componentes/general/Header";
import RenderServices from "@/componentes/pages/servicesList/RenderServicesList";
import { pullQueueServices } from "@/services/services/ServicesService";
import {dataService, ServiceAndData, services, type ServicesList } from "@/types/TypeService";
import { typeUsuario } from "@/types/TypeUsuarios";
import { useEffect, useState } from "react";



export default function ServicesList(){

    const [services, setServices] = useState<ServicesList>();


    const callQueue = async(enviar?: string) => {

        try{
            const queue = await pullQueueServices(enviar);
            console.log(queue);
            setServices(queue);
        }

        catch(error){
            console.log(error);
        }

    }

    //first call
    useEffect(() => {

        callQueue();
    }, [])


    return(
        <>
            <div>
                <Header/>
            </div>

            <div
             className="w-[80vw] mx-auto pt-20.5"
            >
                <RenderServices
                    services={services}
                    enviar={callQueue}
                />
            </div>
        </>
    )
}