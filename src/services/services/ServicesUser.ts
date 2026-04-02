import { DataUser, typeUsuario } from "@/types/TypeUsuarios"

type reutrnOfDataChange = {
    user: typeUsuario,
    message: string
}

export const changeDataUser = async(data: DataUser ,token: string) => {
        console.log("Data change", data, token);
        
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/dataChange/api`, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({
                data
            })
        })

        const response: reutrnOfDataChange = await request.json();

        console.log("afeter date change", response);

        if (!request.ok) {
            // We throw the message sent by your API (e.g., "O nome é igual ao nome atual")
            throw new Error(response.message || "Erro na alteração dos dados");
        }

        return response;

}