'use client'

import { useGlobal } from "@/lib/GlobalContext";
import { DataAvaliation } from "@/types/TypeAvaliation";
import { DataUser } from "@/types/TypeUsuarios";

// Directly accessing the server actions interface layer we just completed
import { changeDataUser, putComents } from "@/services/services/ServicesUser";

export default function useUser(){
    const { login, user } = useGlobal();

    // 1. CHANGE PROFILE DATA
    const change = async (data: DataUser) => {
        try {
            const userPayload = {
                ...data,
                id: data.id || (user as any)?.id
            };

            console.log('Invoking changeDataUser server action...');
            const dataChange = await changeDataUser(userPayload);
            
            // Updates Context memory cleanly on the client side
            if (dataChange?.user) {
                login(dataChange.user);
            }

            return { message: dataChange?.message, status: 'sucess' };
        }
        catch(error: any) {
            console.error('Error encountered in user change pipeline:', error);
            return { message: error.message || 'error desconhecido', status: 'error' };
        }
    }

    // 2. SUBMIT REVIEW COMMENT
    const userPutComent = async (data: DataAvaliation, tokenString: string, idService: string) => {
        try {
            if (data) {
                console.log('Submitting comment for service id target:', idService);
                const response = await putComents(data, idService);      
                
                return { message: response?.message || "Comentário adicionado!", status: 'sucess' };
            }
            return { message: "Dados inválidos", status: 'error' };
        }
        catch(error: any) {
            console.error('Error processing comment creation:', error);
            return { message: error.message || 'error desconhecido', status: 'error' };
        }
    }

    return {
        change,
        userPutComent
    };
}