import { dataService, ServiceAndData } from "@/types/TypeService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const searchService = async(searchValue: string) => {
    try {    
        const request = await fetch(`${API_BASE_URL}/pesquisa/api`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                searchValue
            })
        });

        if (!request.ok) {
            console.error(`searchService failed with status: ${request.status}`);
            return []; // Return fallback array
        }

        const response = await request.json();
        return Array.isArray(response) ? response : [];
    }
    catch(error) {
        console.error("Error in searchService:", error);
        return [];
    }
}

export const pullServices = async() => {
    try {    
        const request = await fetch(`${API_BASE_URL}/servicos/api`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });

        // CRITICAL FIX: If Render sends a 400, return an empty array instead of letting it break the UI
        if (!request.ok) {
            console.error(`pullServices failed with status: ${request.status}`);
            return []; 
        }

        const response = await request.json();
        
        // Double check that the data structure is a flat array before passing it along
        return Array.isArray(response) ? response : [];
    }
    catch(error) {
        console.error("Error in pullServices:", error);
        return []; // Fallback array prevents p.slice is not a function
    }
}

export const pullOneService = async(id: string, token?: string) => {
    try {    
        let headers: Record<string, string> = {'Content-type' : 'application/json'}

        if(token !== undefined){
            headers = {...headers, 'Authorization' : `Bearer ${token}`};
        }

        const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
            method: 'GET',
            headers: headers
        });

        if (!request.ok) {
            console.error(`pullOneService failed with status: ${request.status}`);
            return null;
        }

        const response = await request.json();
        return response;
    }
    catch(error) {
        console.error("Error in pullOneService:", error);
        return null;
    }
}

export const pullQueueServices = async(value?: string) => {
    try {    
        let values = null;
        if(value){
            values = value;
        }
        console.log("services queue, before", value);
        const request = await fetch(`${API_BASE_URL}/servicos/admin/servicesList/api?values=${values}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (!request.ok) {
            console.error(`pullQueueServices failed with status: ${request.status}`);
            return [];
        }

        const response = await request.json();
        console.log("services queue, after", response);
        
        return Array.isArray(response) ? response : [];
    }
    catch(error) {
        console.error("Error in pullQueueServices:", error);
        return [];
    }
}

export const UserSelectService = async(dados: dataService, token: string, idConvertido:string, idDate: string) => {
    try {    
        console.log(dados);

        const request = await fetch(`${API_BASE_URL}/user/service/${idConvertido}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({
                dados,
                idDate
            })
        });

        if (!request.ok) {
            console.error(`UserSelectService failed with status: ${request.status}`);
            return { error: true };
        }

        return await request.json();
    }
    catch(error) {
        console.error("Error in UserSelectService:", error);
        return { error: true };
    }
}

export const createService = async(dados: ServiceAndData, token: string) => {
    const request = await fetch(`${API_BASE_URL}/servicos/api`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            dados
        })
    });

    const response: any = await request.json();

    if(!request.ok){
        throw new Error(response?.message || "Failed to create service");
    }

    return {message: response?.message}
}

export const createNewData = async(dados: dataService, token: string, id: number) => {
    const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            dia_horario : dados
        })
    });

    const response = await request.json();

    if(!request.ok){
        throw new Error(response?.message || "Failed to create new data");
    }

    return {message: response?.message}
}

export const changeActualService = async(id: number, dados: ServiceAndData, token: string) => {   
    const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({
            dados
        })
    });

    const response = await request.json();

    if(!request.ok){
        throw new Error(response?.mensagem || "Failed to change service");
    }

    return {message: response?.mensagem}
}

export const deleteService = async(id: number, token: string) => {
    try {    
        const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        const response = await request.json();
        return response;
    }
    catch(error) {
        console.error("Error in deleteService:", error);
        return { error: true };
    }
}