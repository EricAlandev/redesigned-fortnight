import { loginController } from "@/services/controllers/loginRegisterController";
import { s } from "framer-motion/client";

export async function POST(req: Request){
    try{
        const {loginData} = await req.json();

        const login = await loginController(loginData);

        return new Response(JSON.stringify
            (login), {
                status: 200,
                headers: {
                    'Content-type' : 'application/json'
                }
            }
        )
    }

    catch(error){
        return new Response(JSON.stringify
            (error), {
                status: 400,
                headers: {
                    'Content-type' : 'application/json'
                }
            }
        )
    }
}