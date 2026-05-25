import "reflect-metadata";

import { DataSource } from "typeorm";
import path from "path";
import { Authorizations } from "@/services/entitys/auhorizations/EntityAuthorization";
import { AutoUser } from "@/services/entitys/auhorizations/EntityAutoUser";
import { Coments } from "@/services/entitys/coments/EntityComents";
import { NComentsUser } from "@/services/entitys/coments/EntityNComentsUser";
import { AvaliationServices } from "@/services/entitys/PetServices/EntityAvaliation";
import { DataService } from "@/services/entitys/PetServices/EntityDataService";
import { NServicosDataHorario } from "@/services/entitys/PetServices/EntityNServicosData";
import { Services } from "@/services/entitys/PetServices/EntityServices";
import { EndressUser } from "@/services/entitys/User/EntityEnderecoUser";
import { User } from "@/services/entitys/User/EntityUser";
import { UserNumber } from "@/services/entitys/User/EntityUserNumber";
import { UsuarioServicos } from "@/services/entitys/User/EntityUserServices";

export const AppDataSource = new DataSource({
    type: "postgres", 
    url: process.env.DATABASE_URL, 
    extra: {
        connectionLimit: 10
    },
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: false,
    entities: [
        Authorizations,
        AutoUser,
        Coments,
        NComentsUser,
        AvaliationServices,
        DataService,
        NServicosDataHorario,
        Services,
        EndressUser,
        User,
        UserNumber,
        UsuarioServicos
    ]
});

export const getDataSource = async() => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return AppDataSource
}