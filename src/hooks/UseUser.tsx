'use client'

import { useGlobal } from "@/lib/GlobalContext"
import { changeDataUser } from "@/services/services/ServicesUser";
import { DataUser } from "@/types/TypeUsuarios"

export default function UseUser(){

    const {token, login} = useGlobal();

    const change = async(data: DataUser) => {
        try{
            if(token){
            console.log('inside of the token');

                const dataChange = await changeDataUser(data, token);
                login(dataChange?.user);

                return {message: dataChange?.message, status: 'sucess'}
            }
        }

        catch(error : any){
            console.log('inside of the error');
            return {message: error.message || 'error desconhecido', status: 'error'};
        }
    }

    return{
        change
    }
}