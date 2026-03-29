import { VerifyToken } from "@/lib/functions/VerifyToken";
import { AddNewDataController, changeService, createService, deleteService, pullOneService, pullServices, userSelectService } from "@/services/controllers/ServicesController";

type params = {
    params: {
        id: string
    }
}

export async function POST(req:Request, {params} : params){

    try{
        const user = await VerifyToken(req);
        const idUser = (user as any)?.id;

        const parameters = await params;
        const idParameter = parameters?.id;

        //idOfServer
        const idConvertido = Number(idParameter);

        const body = await req.json();

        const {dia_horario, idDate} = body;


        console.log("values before the controller service",dia_horario, idDate)

        if(!dia_horario && !idConvertido){
            throw new Error("you need to put all of the values");
        }

        const services = await userSelectService(idUser,  idConvertido, dia_horario, idDate);

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

