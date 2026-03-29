import { arrayAuthorizations } from "./TypeAuthorizations"

export type numer = {
    id: number,
    dd: string,
    numero: string
}

export type adress = {
    id: number,
    endereco: string,
    numero_casa: string
}

export type typeUsuario = {
    id: number,
    nome: string, 
    number: numer,
    endress: adress,
    authorizations: arrayAuthorizations[]
    admin?: boolean
}