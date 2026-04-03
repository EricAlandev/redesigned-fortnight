import { dadoCadastro, dadoLogin, loginType } from "@/types/TypeLoginCadastro";


export const loginFunction = async(loginData: dadoLogin) => {
        const login = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/api`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: (JSON.stringify({
                loginData
            }))
        })

        const data = await login.json();

        if(!login.ok) {
            // We throw the message sent by your API (e.g., "O nome é igual ao nome atual")
            throw new Error(data?.message);
        }

        const {user, token} = data;

        return {user, token};
    }




export const registerFunction = async(registerData: dadoCadastro) => {
    const register = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cadastro/api`, {
        method: 'POST',
        headers: {
                'Content-Type' : 'application/json'
        },
        body: (JSON.stringify({
                registerData
        }))
    })

    const response = await register.json();

    if(!register.ok){
        throw new Error(response?.message);
    }

    return {message: response?.mensagem};
}