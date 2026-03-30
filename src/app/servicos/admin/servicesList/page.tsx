'use client'

import Header from "@/componentes/general/Header";
import RenderServices from "@/componentes/pages/servicesList/RenderServicesList";
import { useServicesAdmin } from "@/hooks/UseServiceAdmin";

import {dataService, ServiceAndData, services, type ServicesList } from "@/types/TypeService";
import { typeUsuario } from "@/types/TypeUsuarios";
import { useEffect, useState } from "react";



export default function ServicesList(){

    const {callQueue, services} = useServicesAdmin();
    
    useEffect(() => {
        callQueue();
    }, []);

    return(
        <>
            <div>
                <Header/>
            </div>

            <div
             className="w-[80vw] mx-auto mt-5"
            >
                <RenderServices
                    services={services}
                    enviar={callQueue}
                />
            </div>
        </>
    )
}