export const dynamic = 'force-dynamic';

import { loginController } from "@/services/controllers/loginRegisterController";

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

    catch(error : any){
        const errorMessage = error.message || "Ocorreu um erro inesperado";

        return new Response(JSON.stringify
            ({message:errorMessage}), {
                status: 400,
                headers: {
                    'Content-type' : 'application/json'
                }
            }
        )
    }
}