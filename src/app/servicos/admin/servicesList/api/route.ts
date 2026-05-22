export const dynamic = 'force-dynamic';

// ❌ REMOVED: import { pullQueueOfServices } from "@/services/controllers/ServicesController";

export async function GET(req: Request){

    try{
        const {searchParams} = new URL(req?.url);
        const typeCall = searchParams.get("values")

        //verify if is first call or its another
        let valueBody = "semana";
        if(typeCall){
            valueBody = typeCall;
        }
        console.log("valueBody", valueBody);

        console.log("Before the queueServices")
        
        //  ADDED: Lazy-load the controller right before using it
        const { pullQueueOfServices } = await import("@/services/controllers/ServicesController");
        const services = await pullQueueOfServices(valueBody);

        console.log("after the queueServices", services);

        return new Response(JSON.stringify(services), {
            status: 201,
            headers: {
                'Content-type' : 'application/json'
            }
        })
    }

    catch(error: any){
        return new Response(JSON.stringify({ 
            message: error.message || "Internal Server Error",
            stack: error.stack 
        }), {
            status: 500,
            headers: { 'Content-type' : 'application/json' }
        });
    }
    
}