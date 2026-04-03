import { loginController, registerController } from "@/services/controllers/loginRegisterController";
import { s } from "framer-motion/client";
import { headers } from "next/headers";

export async function POST(req: Request){
    try{
        console.log("enterede post register");
        const {registerData} = await req.json();

        const {nome, senha, dd, numero, endereco, numero_casa} = registerData;

        if(!nome || !senha || !dd || !numero || !endereco || !numero_casa){
            throw new Error("Necessário preencher todos os campos");
        }

        const register = await registerController(registerData);

        console.log("after register");


        return new Response(JSON.stringify(register),{
            status: 200,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }

    catch(error: any){
        return new Response(JSON.stringify({message: error?.message}),({
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        }))
    }
}