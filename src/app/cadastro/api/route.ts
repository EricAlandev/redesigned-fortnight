import { loginController, registerController } from "@/services/controllers/loginRegisterController";
import { s } from "framer-motion/client";
import { headers } from "next/headers";

export async function POST(req: Request){
    try{
        console.log("enterede post register");
        const {registerData} = await req.json();

        if(!registerData || registerData === undefined){
            throw new Error("Error to register Data");
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

    catch(error){
        return new Response(JSON.stringify(error),({
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        }))
    }
}