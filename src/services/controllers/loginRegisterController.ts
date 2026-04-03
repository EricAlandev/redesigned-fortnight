import { getDataSource } from "@/lib/db";
import { dadoCadastro, dadoLogin } from "@/types/TypeLoginCadastro";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../entitys/User/EntityUser";
import { UserNumber } from "../entitys/User/EntityUserNumber";
import { EndressUser } from "../entitys/User/EntityEnderecoUser";
import { Authorizations } from "../entitys/auhorizations/EntityAuthorization";
import { AutoUser } from "../entitys/auhorizations/EntityAutoUser";
import { VerifyAuthorization } from "@/lib/functions/VerifyAuthorization";


export async function loginController(loginData: dadoLogin){

    const AppDataSource = await getDataSource();

    const {nome, senha} = loginData;
    
    if(!nome || !senha){
        throw new Error("Faltando o nome ou a senha");
    }

    const user = await AppDataSource.getRepository(User).findOne({
        where: {
            nome: nome
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
        throw new Error("Usuário não existe");
    }

    console.log("senha",senha, "nome", nome);
    const password = await bcrypt.compare(senha, user.senha);
    console.log("password", password);
    

    if(!password){
        throw new Error("Senha errada");
    }

    const SECRET_KEY = process.env.JWT_SECRET!

    const payload = {
        id: user.id,
        nome: nome
    }

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h"
    })

    const updateUser = await AppDataSource.getRepository(User).update(
        {
        id: user.id
        },
        {
            token: token
        }
    )

    if(updateUser.affected === 0){
        throw new Error("Falha para criar o token");
    }

    const admin = await VerifyAuthorization(user?.authorizations);

    const finalUser = {
        id: user?.id,
        nome: user?.nome,
        number: user?.number,
        authorizations: user?.authorizations,
        endress: user?.endress,
        admin: admin
    }

    return {user : finalUser, token}

}


export async function registerController(dadoCadastro: dadoCadastro) {
    const AppDataSource = await getDataSource();

    // Use the transaction method
    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        const { nome, senha, dd, numero, endereco, numero_casa } = dadoCadastro;

        if (nome) {
            const existingUser = await transactionalEntityManager.findOne(User, {
                where: { nome: nome }
            });

            if (existingUser) {
                throw new Error("Já existe um usuário com esse nome");
            }
        }

        const password = await bcrypt.hash(senha, 10);

        const usuario = transactionalEntityManager.create(User, {
            nome: nome,
            senha: password
        });

        const userFeito = await transactionalEntityManager.save(User, usuario);

        if (!userFeito) {
            throw new Error("Erro ao cadastrar o user");
        }

        const userId = userFeito.id;

        const numberUser = transactionalEntityManager.create(UserNumber, {
            dd: dd,
            numero: numero,
            user: { id: userId }
        });

        const numberCreated = await transactionalEntityManager.save(UserNumber, numberUser);

        if (!numberCreated) {
            throw new Error("Erro ao cadastrar o número");
        }

        const address = transactionalEntityManager.create(EndressUser, {
            endereco: endereco,
            numero_casa: numero_casa,
            user: { id: userId }
        });

        const endressCreated = await transactionalEntityManager.save(EndressUser, address);

        if (!endressCreated) {
            throw new Error("Erro ao cadastrar o endereço");
        }

        const authorization = transactionalEntityManager.create(AutoUser, {
            authorization: { id: 1 },
            user: { id: userId }
        });

        const userAuthorization = await transactionalEntityManager.save(AutoUser, authorization);

        if (!userAuthorization) {
            throw new Error("Erro na criação da autorização do usuário");
        }

        return { mensagem: "Usuário criado!" };
    });
}