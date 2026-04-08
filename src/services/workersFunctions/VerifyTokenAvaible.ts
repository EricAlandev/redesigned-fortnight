import { getDataSource } from "@/lib/db";
import {VerifyTokenFromWorker } from "@/lib/functions/VerifyToken";
import { useGlobal } from "@/lib/GlobalContext";


export async function VerifyTokenAvaible(){

    const {token, logOut} = useGlobal();

        try{
            if(token){
                await VerifyTokenFromWorker(token);
            }
        }

        catch(error){
            await logOut();
        }
}