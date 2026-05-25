'use client'

export const dynamic = 'force-dynamic';

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import FormCadastro from "@/componentes/pages/cadastro/FormCadastro";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import UseLoginRegister from "@/hooks/UseLoginRegister";
import { TypePopUp } from "@/types/TypePopUp";
import { useState } from "react";

export default function CadastroPage(){

    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const [message, setMessage] = useState<string>();
    const {register} = UseLoginRegister();

    console.log("values popUp", message, popUp)

    return(
        <div>
            <Header/>
            <HeaderDesktop/>
            
            <div className="pt-20.5">
                <FormCadastro
                    enviar={async (e) => {
                        const request: any = await register(e);
                            setMessage(request?.message);
                            setPopUp(request?.status)
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