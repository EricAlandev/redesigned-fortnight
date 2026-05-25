import {registerController } from "@/services/controllers/loginRegisterController";
export const dynamic = 'force-dynamic';

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