import { typeUsuario } from "./TypeUsuarios"

export type dataService = {
    id?: number | string,
    dia_horario?: string
}

export type NServicosData = {
    DataService: dataService
}

export type services = {
    id?: number,
    nome_servico?: string,
    preco?: string,
    preco_desconto?: string,
    url?: string
    descricao?: string,
    avaliacao?: number,
    quantidadeAvaliacoes?: number,
    comentarios?: CommentService[],
    dataAvaliation?: string,
    userCanComment?: boolean
}

//normal Service
export type ServiceAndData = dataService & {
    id?: number,
    nome_servico?: string,
    preco?: string,
    preco_desconto?: string,
    descricao?: string,
    ServicesData?: NServicosData[],
    url?: string
    avaliacao?: number,
    quantidadeAvaliacoes?: number,
    comentarios?: CommentService[],
    dataAvaliation?: string,
    userCanComment?: boolean
}

//type of order of services;
export type ServicesList = dataService & services & typeUsuario  &{
    idService?: number,
    idData?: number
}

export type CommentService = {
    idUser: number,
    avaliacaoComentario: string,
    comentario: string,
    nomeUser: string,
    dataAvaliation: string
}