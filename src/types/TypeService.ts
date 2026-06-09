import { typeUsuario } from "./TypeUsuarios"

// 1. Corrigido para bater com o formato real do horário no seu JSON
export type dataService = {
    idDate?: number | string, // Mudado de 'id' para 'idDate' como está no seu log
    dia_horario?: string,
    choosed?: boolean         // Adicionado a propriedade que controla se foi pego
}

export type CommentService = {
    idUser: number,
    avaliacaoComentario: string,
    comentario: string,
    nomeUser: string,
    dataAvaliation: string
}

// 2. Este é o tipo correto para o seu Serviço completo
export type ServiceAndData = {
    id?: number,
    nome_servico?: string,
    preco?: number | string,       // Ajustado para aceitar number (seu JSON manda 200)
    preco_desconto?: number | string,
    url?: string,
    descricao?: string,
    avaliacao?: string | number,   // Seu JSON mandou "0" como string
    quantidadeAvaliacoes?: number,
    comentarios?: CommentService[],
    userCanComment?: boolean,
    // AQUI ESTÁ O SEGREDO: O array de horários direto, sem o nó intermediário 'DataService'
    ServicesData?: dataService[] 
}

// 3. Tipos auxiliares que você já usava (ajustados se necessário)
export type services = Omit<ServiceAndData, 'ServicesData'>;

export type ServicesList = dataService & services & typeUsuario & {
    idService?: number,
    idData?: number
}