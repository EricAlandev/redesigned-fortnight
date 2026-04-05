import { getDataSource } from "@/lib/db"
import { DataUser, typeUsuario } from "@/types/TypeUsuarios"
import { User } from "../entitys/User/EntityUser";
import { EndressUser } from "../entitys/User/EntityEnderecoUser";
import { UserNumber } from "../entitys/User/EntityUserNumber";
import { VerifyAuthorization } from "@/lib/functions/VerifyAuthorization";
import { Services } from "../entitys/PetServices/EntityServices";
import { Coments } from "../entitys/coments/EntityComents";
import { NComentsUser } from "../entitys/coments/EntityNComentsUser";

export const ChangeDataOfUser = async (
    id: number,
    nome: string,
    endereco: string,
    numero_casa: string,
    dd: string,
    numero: string
) => {
    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        const objectAdress: Record<string, string> = {};
        const objectNumber: Record<string, string> = {};
        let textMensage: string[] = [];
        let quantityChanges = 0;

        //Name Change Logic
        if (nome) {
            const nameActualUser = await transactionalEntityManager.findOne(User, {
                where: { id }
            });

            if (!nameActualUser) {
                throw new Error("Usuário não encontrado para alteração");
            }

            if (nameActualUser.nome === nome) {
                throw new Error("O nome é igual ao nome atual");
            }

            const updateName = await transactionalEntityManager.update(User, id, { nome });

            if (updateName.affected === 0) {
                throw new Error("Erro ao atualizar o nome do usuário");
            }

            textMensage.push(`Name changed`);
            quantityChanges++;
        }

        //Address Change Logic
        if (endereco) objectAdress.endereco = endereco;
        if (numero_casa) objectAdress.numero_casa = numero_casa;

        if (Object.keys(objectAdress).length > 0) {
            const actualAdress = await transactionalEntityManager.findOne(EndressUser, {
                where: { user: { id } }
            });

            if (!actualAdress) {
                throw new Error("Endereço atual não encontrado");
            }

            if (endereco && actualAdress.endereco === endereco) {
                throw new Error("O endereço é igual ao atual");
            }
            if (numero_casa && actualAdress.numero_casa === numero_casa) {
                throw new Error("O número da casa é igual ao atual");
            }

            const updateAdress = await transactionalEntityManager.update(EndressUser, 
                { user: { id } }, // Using relation criteria for update
                objectAdress
            );

            if (updateAdress.affected === 0) {
                throw new Error("Erro ao atualizar o endereço");
            }

            textMensage.push(`Adress changed`);
            quantityChanges++;
        }

        //Number Change Logic
        if (numero) objectNumber.numero = numero;
        if (dd) objectNumber.dd = dd;

        if (Object.keys(objectNumber).length > 0) {
            const actualNumber = await transactionalEntityManager.findOne(UserNumber, {
                where: { user: { id } }
            });

            if (!actualNumber) {
                throw new Error("Número de telefone não encontrado");
            }

            if (dd && actualNumber.dd === dd) {
                throw new Error("O DD é igual ao atual");
            }
            if (numero && actualNumber.numero === numero) {
                throw new Error("O número é igual ao atual");
            }

            const updateNum = await transactionalEntityManager.update(UserNumber, 
                { user: { id } }, 
                objectNumber
            );

            if (updateNum.affected === 0) {
                throw new Error("Erro ao atualizar o número");
            }

            textMensage.push(`Number changed`);
            quantityChanges++;
        }

        //Final Verification and User Return
        if (quantityChanges > 0) {
            const finalMessage = textMensage.join(", ");

            const user = await transactionalEntityManager.findOne(User, {
                where: { id },
                relations: {
                    endress: true,
                    number: true,
                    authorizations: {
                        authorization: true
                    }
                }
            });

            if (!user) {
                throw new Error("Usuário não encontrado após as alterações");
            }

            const userFormatado = {
                id: user.id,
                nome: user.nome,
                number: user.number,
                endress: user.endress,
                authorizations: user.authorizations,
                admin: await VerifyAuthorization(user.authorizations)
            };

            return {
                message: finalMessage,
                user: userFormatado
            };
        } else {
            throw new Error("Nenhuma alteração foi concluída");
        }
    });
};


export const PutComentController = async(avaliation: string, text: string, idUser: number, idService: number) => {
    
    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        
        //Basic Verifications
        const user = await transactionalEntityManager.findOne(User, {
            where: {
                id: idUser
            }
        })

        if(!user){
            throw new Error("Não foi encontrado o usuário");
        }

        const service = await transactionalEntityManager.findOne(Services, {
            where: {
                id: idService
            }
        })

        if(!service){
            throw new Error("Não foi encontrado o serviço");
        }

        //Create comment
        const coment = await transactionalEntityManager.create(Coments, {
            comentario: text,
            avaliacao: Number(avaliation)
        })

        const saveComent = await transactionalEntityManager.save(Coments,
            coment
        )

        if(!saveComent){
            throw new Error("erro ao salvar o comentário");
        }

        const idComent : any = saveComent?.id;

        //Create relation beetwen coments and user
        const comentarioUser = await transactionalEntityManager.create(NComentsUser, {
            usuario_id: idUser,
            comentario_id: idComent,
            servicos_id: idService

        })

        const comentarioUserSave = await transactionalEntityManager.save(NComentsUser,
            comentarioUser
        )

        if(!comentarioUserSave){
            throw new Error("erro ao vincular usuário e comentário");
        }

        return {message: "Comentário adicionado!"}
    })
}