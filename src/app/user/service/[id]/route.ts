export const dynamic = 'force-dynamic';

import { VerifyToken } from "@/lib/functions/VerifyToken";

// ❌ REMOVED: import { userSelectService } from "@/services/controllers/ServicesController";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

export async function POST(req: Request, context: RouteContext) {
    try {
        const user = await VerifyToken(req);
        const idUser = (user as any)?.id;

        const { id } = await context.params;
        const idConvertido = Number(id);

        const body = await req.json();
        const { dia_horario, idDate } = body;

        console.log("values before the controller service", dia_horario, idDate);

        if (!dia_horario || isNaN(idConvertido)) {
            throw new Error("You need to provide all valid values");
        }

        // 🔄 Lazy-load the services controller right here before execution
        const { userSelectService } = await import("@/services/controllers/ServicesController");
        const services = await userSelectService(idUser, idConvertido, dia_horario, idDate);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: {
                "Content-type": "application/json"
            }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message || "Internal Error" }), {
            status: 400,
            headers: {
                "Content-type": "application/json"
            }
        });
    }
}