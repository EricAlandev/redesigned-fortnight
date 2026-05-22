export const dynamic = 'force-dynamic';

import { VerifyToken } from "@/lib/functions/VerifyToken";

// ❌ REMOVED: import { PutComentController } from "@/services/controllers/UserController";

export async function PUT(req: Request){
    try{
        const user =  await VerifyToken(req);
        const idUser = (user as any)?.id;
        const body = await req.json();

        const data = body.data;
        const {avaliation, text} = data;
        const idService = body.idService;

        console.log("inside route", avaliation, text, idService, body);

        if(!avaliation || !text){
            throw new Error("Its faulting values");
        }

        const textParse = text.trim();
        
        // 🔄 Lazy-load the user controller handler right here
        const { PutComentController } = await import("@/services/controllers/UserController");
        const dataChange = await PutComentController(avaliation, textParse, Number(idUser), Number(idService))

        return new Response(JSON.stringify(dataChange), {
            status: 201,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }

    catch(error: any){
        const errorMessage = error.message || "Ocorreu um erro inesperado";

        return new Response(JSON.stringify({ message: errorMessage }), {
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }
}