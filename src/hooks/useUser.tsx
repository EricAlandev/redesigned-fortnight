'use client'

import { useGlobal } from "@/lib/GlobalContext"
import { changeDataUser, putComents } from "@/services/services/ServicesUser";
import { DataAvaliation } from "@/types/TypeAvaliation";
import { DataUser } from "@/types/TypeUsuarios"

export default function useUser(){

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

    const userPutComent = async(data: DataAvaliation, token: string, idService : string) => {
        try{
            if(data && token){
                console.log('inside userputcoment before services', idService);
                const service = await putComents(data, token , idService);      
                
                return {message: service, status: 'sucess'};
            }
        }

        catch(error : any){
            return {message: error.message || 'error desconhecido', status: 'error'};
        }
    }

    return{
        change,
        userPutComent
    }
}