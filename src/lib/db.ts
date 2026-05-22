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
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres", 
    url: process.env.DATABASE_URL, 
    extra: {
        authPlugin: 'mysql_native_password',
        connectionLimit: 10
    },
    synchronize: false,
    logging: false,
    entities: [Authorizations,UserNumber, DataService, User, EndressUser, Services, AutoUser, UsuarioServicos, NServicosDataHorario, NComentsUser, Coments,  AvaliationServices,]
});

export const getDataSource = async() => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return AppDataSource
}