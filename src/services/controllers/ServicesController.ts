import { getDataSource } from "@/lib/db"
import { Services } from "../entitys/PetServices/EntityServices";
import { ServiceAndData } from "@/types/TypeService";
import { DataService } from "../entitys/PetServices/EntityDataService";
import { User } from "../entitys/User/EntityUser";
import { UsuarioServicos } from "../entitys/User/EntityUserServices";
import { NServicosDataHorario } from "../entitys/PetServices/EntityNServicosData";
import { ParseTheTime } from "@/lib/functions/ParseTheTime";
import { PhotoImage } from "@/lib/functions/PhotoIMage";
import { MoreThan } from "typeorm";

type servicePutParameter = ServiceAndData & {
    idParameter: string
}

//GET
export const pullServices = async() => {

    const AppDataSource = await getDataSource();

    console.log("before services");

    const services = await AppDataSource.getRepository(Services).find();

    console.log("services", services);


    if(services.length === 0){
        throw new Error("Fail to find the services created");
    }

    //fix the array and give the photo;
    let arrayServices = [];
    
    for(let i = 0; i < services.length; i++){
        const urlPhotos = await PhotoImage(services[i].nome_servico);
        const objectService = {
            escolhido: services[i].escolhido,
            id: services[i].id,
            nome_servico: services[i].nome_servico,
            preco: services[i].preco,
            preco_desconto: services[i].preco_desconto,
            ulr: urlPhotos
        }

        arrayServices.push(objectService);
    }

    return arrayServices;

}

//GET [ID]
export const pullOneService = async(id: number) => {

    const AppDataSource = await getDataSource();

    const services = await AppDataSource.getRepository(Services).findOne({
        where: {
            id: id,
        },
        relations: {
            ServicesData: true
        }
    });

    console.log("one service", services);

    if(!services){
        throw new Error("Fail to find the service");
    }

    const idService = await services?.id;

    const dateTime = await AppDataSource.getRepository(NServicosDataHorario).find({
        where: {
            servicos_id: idService,
            choosed: false
        },
        relations: {
            DataService: true
        }
    });

    console.log("dateTime values", dateTime);

    //define the array or not of the ServicesData
    let arrayServices: any = [];
    if(dateTime.length > 0){
        arrayServices = dateTime
    }

    const finalServices = {
        id: idService,
        nome_servico: services.nome_servico,
        preco: services.preco,
        preco_desconto: services.preco_desconto,
        descricao: services?.descricao,
        ServicesData:  arrayServices
    }

    return finalServices;

}

//GET
export const pullQueueOfServices = async(typeSearch: string) => {

    const AppDataSource = await getDataSource();

    //logical of pulling the services higher than a especifical date;
    let orderValue: any = {};
    let dateLimit = new Date();
    switch(typeSearch){
        case"semana":
            //7 days
            dateLimit.setDate((dateLimit.getDate()) - 7)
            break
        
        case"trinta":
            //30 days
            dateLimit.setDate((dateLimit.getDate()) - 30)
            break

        case"sesenta":
            //60 days
            dateLimit.setDate((dateLimit.getDate()) - 60)
            break

        default:
            dateLimit.setDate((dateLimit.getDate()) - 7)
            break
    }

    orderValue.dia_horario = MoreThan(dateLimit);

    console.log("order Value", orderValue);

    if(!orderValue.dia_horario){
        throw new Error("Error to make the orderValue");
    }

    const services = await AppDataSource.getRepository(UsuarioServicos).find({
        where: {
            NServicosData: {
                choosed: true,
                DataService: orderValue
            }
        },

        order: {
            NServicosData: {
                DataService: {
                    dia_horario: "DESC"
                }
            }
        },
        relations: { 
                NServicosData: {
                    DataService: true
                },
                usuarios: {
                    authorizations: true,
                    endress: true,
                    number: true
                },
                servicos: true
            },
        }
    )

    console.log("service", services);
    //object to being pushed;
    let oficialData: any = {};

    let finalArray = [];
    //picking only the date of the services
    //picking the data of the service; 
        for(let i = 0; i < services.length; i++){
            oficialData = {
                idData: services[i]?.NServicosData.DataService.id,
                dia_horario: ParseTheTime(services[i]?.NServicosData.DataService.dia_horario),
                
                idServer: services[i]?.servicos.id,
                nome_servico: services[i]?.servicos.nome_servico,
                preco: services[i]?.servicos.preco,
                preco_desconto: services[i]?.servicos.preco_desconto,
                url: PhotoImage(services[i]?.servicos.nome_servico),

                idUser: services[i]?.usuarios.id,
                authorizations: services[i]?.usuarios.authorizations,
                nome: services[i]?.usuarios.nome,
                endress: services[i]?.usuarios.endress,
                number: services[i]?.usuarios.number
            }

            finalArray.push(oficialData);
    }

    return finalArray;
}

//POST
export const createService = async({
    nome_servico,
    preco,
    preco_desconto,
    horario,
    descricao
} : ServiceAndData) => {

    const AppDataSource = await getDataSource();

    //CREATION OF THE SERVICE LOGICS
    let dataFinal = {
        nome_servico: nome_servico,
        preco: Number(preco),
        escolhido: false,
        descricao: descricao
    };

    if(preco_desconto !== null && preco_desconto !== ""){
        const data2 = {
            preco_desconto: Number(preco_desconto)
        }

        dataFinal = {...dataFinal,...data2} 
    }

    console.log("dataFinal", dataFinal);
    //Creation of services;
    const service = await AppDataSource.getRepository(Services).create(dataFinal);

    const createService = await AppDataSource.getRepository(Services).save(service);

    if(!createService){
        throw new Error("Error in the creation of the service");
    }

    const idService = createService?.id;

    //Creation of data;
    const date = await AppDataSource.getRepository(DataService).create({
        dia_horario: horario
    });

    const dateCreated = await AppDataSource.getRepository(DataService).save(date);

    if(!dateCreated){
        throw new Error("Error in the creation of data");
    }

    const idDateCreated = dateCreated?.id;

    //Creation of relation data and service;
    const relationDate = await AppDataSource.getRepository(NServicosDataHorario).create({
        data_horario_id: idDateCreated,
        servicos_id: idService,
        choosed: false
    });

    const relationDateCreated = await AppDataSource.getRepository(NServicosDataHorario).save(relationDate);

    if(!relationDateCreated){
        throw new Error("Fail to create the realation of data");
    }

    console.log("create service", createService);
}

//POST - ADD NEW DATA
export const AddNewDataController = async(dia_horario: string, idConvertido: number) => {
    
    const AppDataSource = await getDataSource();

    console.log("enter in the add new data, dia_horario", dia_horario);
    const newData = await AppDataSource.getRepository(DataService).create({
        dia_horario: dia_horario
    })

    const dataSave = await AppDataSource.getRepository(DataService).save(newData)

    if(!dataSave){
        throw new Error("Error saving the data")
    }
    
    const idDate = dataSave.id;

    console.log("after the data save", dataSave);

    const servicoHorario = await AppDataSource.getRepository(NServicosDataHorario).create({
        servicos_id: idConvertido,
        data_horario_id: idDate,
        choosed: false
    })

    const saveServicoHorario = await AppDataSource.getRepository(NServicosDataHorario).save(servicoHorario)

    if(!saveServicoHorario){
        throw new Error("Error creating the relation of Servico Horario");
    }

    console.log("after the relaiton saove", saveServicoHorario);


}

//POST
export const userSelectService = async(id: number, idService: number, horario: string, idDate: string) => {

    const AppDataSource = await getDataSource();

    console.log("Dentro do controller, id", id, "idService", idService, horario);

    {/*Verify if service exists.*/}
    const services = await AppDataSource.getRepository(Services).findOne({
        where: {
                id: idService
        }
    });
    
    if(!services){
        throw new Error("that service dosn't exists");
    }

    const serviceDataHorario = await await AppDataSource.getRepository(NServicosDataHorario).findOne({
        where: {
            servicos_id: idService,
            data_horario_id: Number(idDate)
        }
    })

    if(!serviceDataHorario){
        throw new Error("Dosn't exist this NServicosDataHorairo");
    }

    const idServiceDataHorario = serviceDataHorario?.id;

    const updateService = await AppDataSource.getRepository(NServicosDataHorario).update(
        {
            id: idServiceDataHorario
        },
        {choosed: true}
    )

    if(updateService.affected === 0){
        throw new Error("fail to update Service");
    }

    {/*create servicoUser.*/}
    const servicoUser = await AppDataSource.getRepository(UsuarioServicos).create({
        usuario_id: id,
        servicos_id: idService,
        NServicosData: {id: idServiceDataHorario}
    })

    const servicoUserCreated = await AppDataSource.getRepository(UsuarioServicos).save(servicoUser)

    if(!servicoUserCreated){
        throw new Error("Fail to create the service table");
    }

    return 
}

//PUT
export const changeService = async({
    idParameter,
    nome_servico,
    preco_desconto,
    preco
}: servicePutParameter) => {

    console.log(nome_servico, preco_desconto, preco, idParameter);

    const AppDataSource = await getDataSource();

    console.log("Enterend in the changeService")
    const service =  await AppDataSource.getRepository(Services).findOne({
        where: {
            id: Number(idParameter)
        }
    });

    if(!service){
        throw new Error("Error to find the actual service");
    }

    console.log("service found", service)


    //Verify if have some filed to change
    const parameters : Record<string,string | number> = {};

    if(nome_servico !== ""){
        console.log("NOME SERVÇO", nome_servico);
        parameters.nome_servico = nome_servico;
    }

    if(preco_desconto !== ""){
        console.log("NOME preco_desconto", preco_desconto);
        parameters.preco_desconto = Number(preco_desconto);
    }

    if(preco !== ""){
        console.log("NOME preco_desconto", preco_desconto);
        parameters.preco = Number(preco);
    }

    if(Object.keys(parameters).length === 0){
        throw new Error("Nothing to update")
    }

    console.log("parameters", parameters)


    const updateService = await AppDataSource.getRepository(Services).update(
    {
        id: Number(idParameter)
    }, 
    parameters
    )

    if(updateService.affected === 0){
        throw new Error("fail in the update of the service");
    }
    
    
    console.log("after the update");

    return {mensagem: "service deleted"}
}

//DELETE
export const deleteService = async(id: string) => {

    const AppDataSource = await getDataSource();

    const service = await AppDataSource.getRepository(Services).delete({id: Number(id)});

    if(service.affected === 0){
        throw new Error("Error in the delete of the service");
    }

    return {mensagem: "service deleted"}
}