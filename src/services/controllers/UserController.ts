import { getDataSource } from "@/lib/db"
import { DataUser, typeUsuario } from "@/types/TypeUsuarios"
import { User } from "../entitys/User/EntityUser";
import { EndressUser } from "../entitys/User/EntityEnderecoUser";
import { UserNumber } from "../entitys/User/EntityUserNumber";
import { VerifyAuthorization } from "@/lib/functions/VerifyAuthorization";

export const ChangeDataOfUser = async(
    id:number, 
    nome : string, 
    endereco : string ,
    numero_casa : string ,
    dd : string ,
    numero : string
) => {
    
    const AppDataSource = await getDataSource();

    const objectAdress: Record<string, string> = {};
    const objectNumber: Record<string, string> = {};
    
    //gonna have a array of text(its gonna be converted after);
    let textMensage: any = [];
    let quantityChanges = 0;

    //Name Change
    if(nome){
        try{
            //make the verification first, to see if the value is the same of the actual value in database;
            const nameActualUser = await AppDataSource.getRepository(User).findOne(
                {
                    where: {
                        id: id
                    }
                }
            );

            if(!nameActualUser){
                throw new Error("Error ao achar o usuário para alteração");
            }

            if(nameActualUser?.nome === nome){
                throw new Error("O nome é igual ao nome atual");
            }

            const updateName = await AppDataSource.getRepository(User).update(
                id,
                { nome }
            )
    
            if(updateName.affected === 0){
                throw new Error("Error ao atualizar o nome do usuário");
            }
    
            textMensage.push(`Name changed`);
            quantityChanges++;
        }

        catch(error){
            throw new Error("Error to update the name of the user");
        }
    }

    //Adress change
    if(endereco){
        objectAdress.endereco = endereco;
    }

    if(numero_casa){
        objectAdress.numero_casa = numero_casa;
    }

    if(Object.keys(objectAdress).length > 0){
        try{
            //make the verification first, to see if the value is the same of the actual value in database;
            const actualAdress = await AppDataSource.getRepository(EndressUser).findOne(
                {
                    where: {
                        user: {
                            id: id
                        }
                    }
                }
            );

            if(!actualAdress){
                throw new Error("Error ao achar o endereço do usuário atual");
            }

            if(actualAdress?.endereco === endereco){
                throw new Error("O endereço é igual ao seu endereço atual.");
            }

            if(actualAdress?.numero_casa === numero_casa){
                throw new Error("O número atual é o mesmo da casa atual.");
            }


            const updateAdress = await AppDataSource.getRepository(EndressUser).update(
                id,
                objectAdress
            )

            if(updateAdress.affected === 0){
                throw new Error("Error to update the adress of the user");
            }

            textMensage.push(`Adress changed`);
            quantityChanges++;
        }

        catch(error){
            throw new Error(`Error, trying to change the adress. Error: ${error}`);
        }
    }

    //Number change
    if(numero){
        objectNumber.numero = numero;
    }

    if(dd){
        objectNumber.dd = dd;
    }

    if(Object.keys(objectNumber).length > 0){
        try{
            //make the verification first, to see if the value is the same of the actual value in database;
            const actualNumber = await AppDataSource.getRepository(UserNumber).findOne(
                {
                    where: {
                        user: {
                            id: id
                        }
                    }
                }
            );

            if(!actualNumber){
                throw new Error("Error ao achar o número do usuário atual");
            }

            if(actualNumber?.dd === dd){
                throw new Error("O dd é igual ao seu dd atual.");
            }

            if(actualNumber?.numero === numero){
                throw new Error("O número digitado é o mesmo número de telefone atual.");
            }

            const updateAdress = await AppDataSource.getRepository(UserNumber).update(
                id,
                objectNumber
            )

            if(updateAdress.affected === 0){
                throw new Error("Error to update the adress of the user");
            }

            textMensage.push(`Number changed`);
            quantityChanges++;
        }

        catch(error){
            throw new Error(`Error, trying to change the number. Error: ${error}`);
        }
    }
    
    //have the final message;
    let finalMessage: string = "";  
    let userAfterUpdates = {};
    
    //conver the final message and pick the data of the user after change;
    if(quantityChanges > 0){
        for(let i = 0; i < textMensage.length; i++){
            if((i + 1) === textMensage.length){
                finalMessage += textMensage[i];
            }
    
            else{
                finalMessage += textMensage[i] + ", ";
    
            }
        }

        //find the user and pull;
        try{
            const user = await AppDataSource.getRepository(User).findOne({
                where: {
                    id
                },
                relations: {
                    endress: true,
                    number: true,
                    authorizations: {
                        authorization: true
                    }
                }
            })
    
            if(!user){
                throw new Error("User dosn't founded after changes");
            }

            const userFormatado = {
                id: user?.id,
                nome: user?.nome,
                number: user?.number,
                endress: user?.endress,
                authorizations: user?.authorizations,
                admin: await VerifyAuthorization(user?.authorizations)
            };
            
            userAfterUpdates = userFormatado;

            return {
                message: finalMessage, 
                user: userAfterUpdates
            }
        }

        catch(error){
            throw new Error("User dosn't founded after changes");
        }

    }

    else{
        throw new Error("Nenhuma alteração foi conclúida. Error")
    }

}