'use client'

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import RenderServices from "@/componentes/pages/servicesList/RenderServicesList";
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage";
import useLogicalNumber from "@/componentes/skeletons/numberPage/logicalNumber";
import { useServicesAdmin } from "@/hooks/UseServiceAdmin";

import { type ServicesList } from "@/types/TypeService";
import { useEffect, useState } from "react";

export default function ServicesList(){

    const {callQueue, services} = useServicesAdmin();

    const {
        actualPage, 
        quantityOfPages, 
        setActualPage, 
        arrayWithNumberPages, 
        actualServices
    } = useLogicalNumber(services)
    
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
             className="w-[80vw] mx-auto pt-15.5 lg:max-w-[1100px]"
            >
                <RenderServices
                    services={actualServices}
                    enviar={callQueue}
                />

                <NumberPage
                    actualPage={actualPage}
                    arrayWithNumberPagers={arrayWithNumberPages}
                    quantityOfPages={quantityOfPages}
                    setActualPage={setActualPage}
                />
            </div>
        </>
    )
}