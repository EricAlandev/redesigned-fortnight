export const dynamic = 'force-dynamic';

import { VerifyToken, verifyTokenWithOutBreking } from "@/lib/functions/VerifyToken";

// ❌ REMOVED: import { AddNewDataController, changeService, deleteService, pullOneService } from "@/services/controllers/ServicesController";

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

        const { id } = await context.params;
        const idConvertido = Number(id);

        let finalObject: any = {
            idConvertido: idConvertido,
            idUser: idUser
        };

        //  Lazy-load controller logic for GET
        const { pullOneService } = await import("@/services/controllers/ServicesController");
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

        //  Lazy-load controller logic for POST
        const { AddNewDataController } = await import("@/services/controllers/ServicesController");
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

        if (!id && !body?.dados?.nome_servico) {
            throw new Error('Identificador ou nome do serviço ausente');
        }

        //  Lazy-load controller logic for PUT
        const { changeService } = await import("@/services/controllers/ServicesController");
        const services = await changeService(bodyFinal as any);

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

        //  Lazy-load controller logic for DELETE
        const { deleteService } = await import("@/services/controllers/ServicesController");
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