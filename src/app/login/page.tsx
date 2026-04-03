'use client'

import Header from "@/componentes/general/Header";
import FormLogin from "@/componentes/pages/login/FormLogin";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import UseLoginRegister from "@/hooks/UseLoginRegister";
import { returnForPopUp, TypePopUp } from "@/types/TypePopUp";
import { useState } from "react";

export default function LoginPage(){

    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const [message, setMessage] = useState<string>();

    const {makeLogin} = UseLoginRegister();

    return(
        <div>
            <Header/>

            <div className="pt-20.5">
                <FormLogin
                    enviar={async (d) => {
                        const request : any = await makeLogin(d);
                        console.log('value request', request);
                        if(request?.status === 'error'){
                            console.log('inside of if', request);
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