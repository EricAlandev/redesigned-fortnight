
//LOGIN TYPES
export type loginType = {
    enviar: (loginData: dadoLogin) => Promise<void> | void;
}
export type dadoLogin = {
    nome: string,
    senha: string
}

//Register TYPES
export type registerType = {
    enviar: (registerData: dadoCadastro) => Promise<void> | void;
}

export type dadoCadastro = {
    nome: string,
    senha: string,
    dd: string,
    numero: string,
    endereco: string,
    numero_casa: string
}