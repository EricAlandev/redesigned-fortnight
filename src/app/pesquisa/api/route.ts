export const dynamic = 'force-dynamic';

// ❌ REMOVED: import { searchServiceController } from "@/services/controllers/ServicesController"

export async function POST(req: Request){
    try {
        const { searchValue } = await req.json();
        if (searchValue === "" || !searchValue) {
            throw new Error("Parameters of search invalids");
        }

        console.log("value of searchValue", searchValue);

        //  ADDED: Dynamic import inside the execution path
        const { searchServiceController } = await import("@/services/controllers/ServicesController");

        const responseSearch = await searchServiceController(searchValue);

        return new Response(JSON.stringify(responseSearch), {
            status: 201,
            headers: {
                "Content-type" : "application/json"
            }
        });
    }

    catch(error: any){
        const errorMessage = error.message || "Ocorreu um erro inesperado";
        
        return new Response(JSON.stringify({ message: errorMessage }), {
            status: 400,
            headers: {
                "Content-type" : "application/json"
            }
        });
    }
}