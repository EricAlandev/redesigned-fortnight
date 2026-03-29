import { VerifyToken } from "@/lib/functions/VerifyToken";
import { AddNewDataController, changeService, createService, deleteService, pullOneService, pullServices } from "@/services/controllers/ServicesController";

type params = {
    params: {
        id: string
    }
}

export async function GET(req:Request, {params} : params){

    try{
        const parameters = await params;
        const idParameter = parameters?.id;

        const idConvertido = Number(idParameter);

        const services = await pullOneService(idConvertido);

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

export async function POST(req:Request, {params} : params){

    try{
        await VerifyToken(req);

        const parameters = await params;
        const idParameter = parameters?.id;

        //idOfServer
        const idConvertido = Number(idParameter);

        const body = await req.json();

        const {dia_horario} = body;

        if(!dia_horario && !idConvertido){
            throw new Error("you need to put all of the values");
        }

        const services = await AddNewDataController(dia_horario.dia_horario, idConvertido);

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

export async function PUT(req:Request, {params} : params){

    try{
        await VerifyToken(req);
        
        console.log("passed the verifyToken of put");

        const parameters = await params;
        const idParameter = parameters?.id;

        const body = await req.json();
        console.log("values BOSYYYY", body);


        const bodyFinal = {
            idParameter : idParameter,
            nome_servico: body?.dados?.nome_servico,
            preco_desconto: body?.dados?.preco_desconto,
            descricao: body?.dados?.descricao,
            preco: body?.dados?.preco
        }

        console.log("values", bodyFinal);

        const services = await changeService(bodyFinal);

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


export async function DELETE(req:Request, {params} : params){

    try{
        await VerifyToken(req);

        const parameters = await params;
        const idParameter = parameters?.id;
        const services = await deleteService(idParameter);

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

