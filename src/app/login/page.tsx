'use client'

export const dynamic = 'force-dynamic';

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import FormLogin from "@/componentes/pages/login/FormLogin";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import UseLoginRegister from "@/hooks/useLoginRegister";
import { returnForPopUp, TypePopUp } from "@/types/TypePopUp";
import { useState } from "react";

export default function LoginPage(){

    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const [message, setMessage] = useState<string>();

    const {makeLogin} = UseLoginRegister();

    return(
        <div>
            <Header/>
            <HeaderDesktop/>

            <div className="pt-20.5">
                <FormLogin
                    enviar={async (d) => {
                        const request : any = await makeLogin(d);
                        
                        if(request?.status === 'error'){
                            setMessage(request?.message);
                            setPopUp(request?.status)
                        }

                    }}
                />
            </div>

            {popUp !== 'none' && (
                <EsqPopUp
                    type={popUp}
                    setPopUp={setPopUp}
                    message={message}
                />
            )}
            
        </div>
    )
}