import { dadoCadastro, dadoLogin, loginType } from "@/types/TypeLoginCadastro";


export const loginFunction = async(loginData: dadoLogin) => {
    try{
        const login = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/login/api`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: (JSON.stringify({
                loginData
            }))
        })

        const {user, token} = await login.json();
        return {user, token};
    }

    catch(error){
        console.log(error);
    }
}

export const registerFunction = async(registerData: dadoCadastro) => {
    try{
        const login = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cadastro/api`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: (JSON.stringify({
                registerData
            }))
        })

        console.log(login);

        return login;
    }

    catch(error){
        console.log(error);
    }
}