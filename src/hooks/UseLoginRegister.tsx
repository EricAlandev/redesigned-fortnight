
import { dadoLogin } from "@/types/TypeLoginCadastro";
import { loginFunction } from "@/services/services/loginRegisterService";

import { useGlobal } from "@/lib/GlobalContext";
import { useRouter } from "next/navigation";
import { registerFunction } from "@/services/services/loginRegisterService";
import { dadoCadastro } from "@/types/TypeLoginCadastro";

export default function UseLoginRegister(){

        const {login} = useGlobal();
        const router = useRouter();
        
        const makeLogin = async(loginData: dadoLogin) => {
            try{
                const valueLogin = await loginFunction(loginData);
        
                if(valueLogin?.user && valueLogin?.token){
                    login(valueLogin?.user, valueLogin?.token);
                    router.push("/")
                }
            }
    
        catch(error : any){
            return {message: error?.message, status: 'error'}
        }
    }

    const register = async(dadoCadastro: dadoCadastro) => {
        try{
            console.log(dadoCadastro);
            const regi = await registerFunction(dadoCadastro);

            return {message: regi?.message, status: 'register'}
        }
    
        catch(error: any){
            return {message: error?.message, status: 'error'}
        }
    }
    

    return{
            makeLogin,
            register
        }
    
}