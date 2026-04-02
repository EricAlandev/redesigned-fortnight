import { VerifyToken } from "@/lib/functions/VerifyToken";
import { ChangeDataOfUser } from "@/services/controllers/UserController";


export async function PUT(req: Request){
    try{
        const user =  await VerifyToken(req);
        const idUser = (user as any)?.id;
        const body = await req.json();

        const {data} = body;
        const {nome, endereco, numero_casa, dd, numero} = data;

        if(!nome && !endereco &&  !numero_casa &&  !dd &&  !numero){
            throw new Error("Any values to change");
        }

        const nomeConvertido = nome.trim();
        const enderecoConvertido = endereco.trim();
        const numero_casaConvertido = numero_casa.trim();
      
        const dataChange = await ChangeDataOfUser(idUser, nomeConvertido, enderecoConvertido, numero_casaConvertido, dd, numero)

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