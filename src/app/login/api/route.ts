export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        const { loginData } = await req.json();

        const { loginController } = await import("@/services/controllers/loginRegisterController");

        const login = await loginController(loginData);

        return NextResponse.json((login), {
            status: 200,
            headers: {
                'Content-type' : 'application/json'
            }
        });
    }

    catch(error : any){
        const errorMessage = error.message || "Ocorreu um erro inesperado";

        return new Response(JSON.stringify({ message: errorMessage }), {
            status: 400,
            headers: {
                'Content-type' : 'application/json'
            }
        });
    }
}