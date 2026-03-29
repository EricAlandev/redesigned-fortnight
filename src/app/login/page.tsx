'use client'

import Header from "@/componentes/general/Header";
import FormLogin from "@/componentes/pages/login/FormLogin";
import { useGlobal } from "@/lib/GlobalContext";
import { loginFunction } from "@/services/services/loginRegisterService";
import { dadoLogin, loginType } from "@/types/TypeLoginCadastro";
import { useRouter } from "next/navigation";

export default function LoginPage(){

    const {login, user, token} = useGlobal();

    const router = useRouter();

    const makeLogin = async(loginData: dadoLogin) => {
        try{
            const valueLogin = await loginFunction(loginData);

            if(valueLogin?.user && valueLogin?.token){
                login(valueLogin?.user, valueLogin?.token);
                router.push("/")

            }
        }

        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="max-w-[400px]">
            <Header

            />

            <div className="pt-20.5">
                <FormLogin
                    enviar={makeLogin}
                />
            </div>
            
        </div>
    )
}