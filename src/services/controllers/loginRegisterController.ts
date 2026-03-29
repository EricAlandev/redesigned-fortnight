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
        throw new Error("Its faulting the name and password");
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
        throw new Error("User dosn't exists");
    }

    const password = bcrypt.compare(senha, user.senha);

    if(!password){
        throw new Error("wrong password");
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
        throw new Error("Fail to create the user token");
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


export async function registerController(dadoCadastro: dadoCadastro){   

    try{
        const AppDataSource = await getDataSource();

    const {nome, senha, dd, numero, endereco, numero_casa} = dadoCadastro;
    
    //verify if the user already exists
    if(nome){
        console.log("enter the if")
        const user = await AppDataSource.getRepository(User).findOne({
            where: {
                 nome: nome
            }
        })

        if(user){
            throw new Error("User already exists");
        }
    }

    const password = await bcrypt.hash(senha, 10);


    //REGISTERING THE NEW VALUES OF THE USER

    //USER CREATING
    const usuario =  AppDataSource.getRepository(User).create(
        {
            nome: nome,
            senha: password
        },
    )

    const userFeito = await AppDataSource.getRepository(User).save(usuario);


    if(!userFeito){
        throw new Error("error in the creation of the user");
    }

    const userId = userFeito?.id;

    //NUMBER CREATING
    const numberUser =  AppDataSource.getRepository(UserNumber).create(
        {
            dd: dd,
            numero: numero,
            user: {id: userId}
        },
    )

    const numberCreated = await AppDataSource.getRepository(UserNumber).save(numberUser);

    console.log("number created", numberCreated);

    if(!numberCreated){
        throw new Error("error in the creation of the user number");
    }

    //ENDRESS CREATING
    const endress =  AppDataSource.getRepository(EndressUser).create(
        {
            endereco: endereco,
            numero_casa: numero_casa,
            user: {id: userId}
        },
    )

    const endressCreated = await AppDataSource.getRepository(EndressUser).save(endress);

    if(!endressCreated){
        throw new Error("error in the creation of the user endress");
    }

    //create authorization
    const authorization =  AppDataSource.getRepository(AutoUser).create(
        {
            authorization: {id: 1},
            user: {id: userId}
        },
    )

    const userAuthorization = await AppDataSource.getRepository(AutoUser).save(authorization);

    if(!userAuthorization){
        throw new Error("error in the creation in the creation of the user authorization");
    }

    return {mensagem: "user created"}

    }

    catch(error){
        console.log(error);
    }
}