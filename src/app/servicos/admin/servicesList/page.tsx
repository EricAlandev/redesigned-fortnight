'use client'

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import RenderServices from "@/componentes/pages/servicesList/RenderServicesList";
import { useServicesAdmin } from "@/hooks/UseServiceAdmin";

import {dataService, ServiceAndData, services, type ServicesList } from "@/types/TypeService";
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
                <HeaderDesktop/>
            </div>

            <div
             className="w-[80vw] mx-auto mt-5 lg:max-w-[1100px]"
            >
                <RenderServices
                    services={services}
                    enviar={callQueue}
                />
            </div>
        </>
    )
}