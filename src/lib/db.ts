import { Authorizations } from "@/services/entitys/auhorizations/EntityAuthorization";
import { AutoUser } from "@/services/entitys/auhorizations/EntityAutoUser";
import { Cart } from "@/services/entitys/cart/EntityCart";
import { CategorysServices } from "@/services/entitys/categorys/EntityCategoryService";
import { NCategorysServices } from "@/services/entitys/categorys/EntityNCategory";
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
    type: "mysql", 
    url: process.env.DATABASE_URL, 
    extra: {
        authPlugin: 'mysql_native_password',
        connectionLimit: 10
    },
    synchronize: false,
    logging: true,
    entities: [Authorizations, Cart, UserNumber, CategorysServices, NCategorysServices, DataService, User, EndressUser, Services, AutoUser, UsuarioServicos, NServicosDataHorario]
});

export const getDataSource = async() => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize();
    }

    return AppDataSource
}