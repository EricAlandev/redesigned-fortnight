'use client'

import Header from "@/componentes/general/Header";
import FormDataChange from "@/componentes/pages/UserPage/FormDataChange";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import UseUser from "@/hooks/UseUser";
import { useGlobal } from "@/lib/GlobalContext";
import { returnForPopUp, TypePopUp } from "@/types/TypePopUp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function DataChange(){

    const [message, setMessage] = useState<string>();
    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const {change} = UseUser();

    return(
        <>
            <Header/>
            
            <div
                className="max-w-[80vw] mx-auto"
            >
                <FormDataChange
                    enviar={async (data) => {
                        const valueReturn : any = await change(data);
                        const message = valueReturn?.message;
                        const status = valueReturn?.status;
                        setMessage(message);
                        setPopUp(status);

                    }}
                />
            </div>

            {/*popUp */}
            {popUp !== 'none' && (
                    <EsqPopUp
                        setPopUp={setPopUp}
                        type={popUp}
                        message={message}
                    />
            )}
        </>
    )
}