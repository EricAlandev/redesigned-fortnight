import { VerifyToken } from "@/lib/functions/VerifyToken";
import { createService, pullServices } from "@/services/controllers/ServicesController";

export async function GET(){

    try{
        console.log("before the pull services");
        const services = await pullServices();

        console.log("after the pull services", services);


        return new Response(JSON.stringify(services), {
            status: 201,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }

    catch(error){
        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }
}


export async function POST(req: Request){

    try{
        await VerifyToken(req);

        const {dados} = await req.json();

        const {nome_service, preco_desconto, preco, horario, descricao} = dados;

        
        if(horario){
            const actualDate = new Date();
            const horarioAtual = new Date(horario)
            if(horarioAtual < actualDate){
                throw new Error("horario its seted to be before the actual date.")
            }
        }

        if(
            (!nome_service === undefined && !preco_desconto === undefined  && !horario === undefined) || 
            !preco === undefined  || !descricao
        ){
            throw new Error("Need all of the values");
        }

        console.log("after service");

        const service = await createService(dados);

        return new Response(JSON.stringify(service), {
            status: 201,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }

    catch(error: any){
        return new Response(JSON.stringify({message: error?.message}), {
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        })
    }
}