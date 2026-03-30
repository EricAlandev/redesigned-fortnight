import { searchServiceController } from "@/services/controllers/ServicesController"


export async function POST(req: Request){
    try{

        const {searchValue} = await req.json();
        if(searchValue === "" || !searchValue){
            throw new Error("Parameters of search invalids");
        }

        console.log("value of searchValue", searchValue);

        const responseSearch = await searchServiceController(searchValue);

        return new Response(JSON.stringify(responseSearch), {
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