'use client'

import Header from "@/componentes/general/Header";
import FormLogin from "@/componentes/pages/login/FormLogin";
import UseLoginRegister from "@/hooks/UseLoginRegister";

export default function LoginPage(){

    const {makeLogin} = UseLoginRegister();

    return(
        <div className="max-w-[400px]">
            <Header/>

            <div className="pt-20.5">
                <FormLogin
                    enviar={makeLogin}
                />
            </div>
            
        </div>
    )
}