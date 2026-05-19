import { VerifyToken, verifyTokenWithOutBreking } from "@/lib/functions/VerifyToken";
import { AddNewDataController, changeService, deleteService, pullOneService } from "@/services/controllers/ServicesController";

// Next.js 15+ Type: params must be a Promise
type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(req: Request, context: RouteContext) {
    try {
        const user = await verifyTokenWithOutBreking(req);
        let idUser = -1;

        if (user !== 0) {
            idUser = (user as any)?.id;
        }

        // Await the params from context
        const { id } = await context.params;
        const idConvertido = Number(id);

        let finalObject: any = {
            idConvertido: idConvertido,
            idUser: idUser
        };

        const services = await pullOneService(finalObject);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: { "Content-type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error?.message || error }), {
            status: 400,
            headers: { "Content-type": "application/json" }
        });
    }
}

export async function POST(req: Request, context: RouteContext) {
    try {
        await VerifyToken(req);

        const { id } = await context.params;
        const idConvertido = Number(id);

        const body = await req.json();
        const { dia_horario } = body;

        if (!dia_horario && !idConvertido) {
            throw new Error("you need to put all of the values");
        }

        const services = await AddNewDataController(dia_horario.dia_horario, idConvertido);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: { "Content-type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error?.message }), {
            status: 400,
            headers: { "Content-type": "application/json" }
        });
    }
}

export async function PUT(req: Request, context: RouteContext) {
    try {
        await VerifyToken(req);
        
        const { id } = await context.params;

        const body = await req.json();

        const bodyFinal = {
            idParameter: id,
            nome_servico: body?.dados?.nome_servico,
            preco_desconto: body?.dados?.preco_desconto,
            descricao: body?.dados?.descricao,
            preco: body?.dados?.preco
        };

        // Logic check: ensuring at least one field is provided
        if (!id && !body?.dados?.nome_servico) {
            throw new Error('Identificador ou nome do serviço ausente');
        }

        const services = await changeService(bodyFinal);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: { "Content-type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error?.message }), {
            status: 400,
            headers: { "Content-type": "application/json" }
        });
    }
}

export async function DELETE(req: Request, context: RouteContext) {
    try {
        await VerifyToken(req);

        const { id } = await context.params;
        const services = await deleteService(id);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: { "Content-type": "application/json" }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error?.message || error }), {
            status: 400,
            headers: { "Content-type": "application/json" }
        });
    }
}