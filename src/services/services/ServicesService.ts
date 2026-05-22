import { dataService, ServiceAndData } from "@/types/TypeService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const searchService = async(searchValue: string) => {
    try{    
        const request = await fetch(`${API_BASE_URL}/pesquisa/api`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                searchValue
            })
        })

        const response = await request.json();
        
        return response;
    }

    catch(error){
        console.log();
    }
}

export const pullServices = async() => {
    try{    


        const request = await fetch(`${API_BASE_URL}/servicos/api`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        })

        const response = await request.json();
        
        return response;
    }

    catch(error){
        console.log(error);
    }
}

export const pullOneService = async(id: string , token?: string) => {
    try{    

        let headers : Record<string, string> = {'Content-type' : 'application/json'}

        if(token !== undefined){
            headers = {...headers, 'Authorization' : `Bearer ${token}`};
        }

        const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
            method: 'GET',
            headers: headers
        })

        const response = await request.json();
        
        return response;
    }

    catch(error){
                console.log(error);

    }
}

export const pullQueueServices = async(value?: string) => {
    try{    
        let values = null;
        if(value){
            values = value
        }
        console.log("servicecs queue, before", value);
        const request = await fetch(`${API_BASE_URL}/servicos/admin/servicesList/api?values=${values}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        const response = await request.json();
        console.log("servicecs queue, after", response);
        
        
        return response;
    }

    catch(error){
                console.log(error);

    }
}


export const UserSelectService = async(dados: dataService, token: string, idConvertido:string, idDate: string) => {
    try{    

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
        })
    }

    catch(error){
                console.log(error);

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
        })

        const response : any = await request.json();

        if(!request.ok){
            throw new Error(response?.message);
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
        })

        const response = await request.json();

        if(!request.ok){
            throw new Error(response?.message);
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
            throw new Error(response?.mensagem);
        }

        return {message: response?.mensagem}
        
}

export const deleteService = async(id: number, token: string) => {
    try{    
        const request = await fetch(`${API_BASE_URL}/servicos/${id}/api`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`

            }
        })

        const response = await request.json();

        return response;
    }

    catch(error){
                console.log(error);

    }
}