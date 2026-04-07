import { getDataSource } from "@/lib/db"
import { Services } from "../entitys/PetServices/EntityServices";
import { ServiceAndData, services } from "@/types/TypeService";
import { DataService } from "../entitys/PetServices/EntityDataService";
import { User } from "../entitys/User/EntityUser";
import { UsuarioServicos } from "../entitys/User/EntityUserServices";
import { NServicosDataHorario } from "../entitys/PetServices/EntityNServicosData";
import { ParseTheTime } from "@/lib/functions/ParseTheTime";
import { PhotoImage } from "@/lib/functions/PhotoIMage";
import { ILike, Like, MoreThan } from "typeorm";
import { AvaliationServices } from "../entitys/PetServices/EntityAvaliation";

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
        return []
    }

    //fix the array and give the photo;
    let arrayServices = [];
    
    for(let i = 0; i < services.length; i++){
        const urlPhotos = await PhotoImage(services[i].nome_servico);
        const objectService = {
            id: services[i].id,
            nome_servico: services[i].nome_servico,
            preco: services[i].preco,
            preco_desconto: services[i].preco_desconto,
            url: urlPhotos
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
            ServicesData: true,
            avaliacao: true,
            comentsService: {
                comentarios: true,
                usuarios: true
            }
        }
    });

    console.log("services pullServices", services);

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

    let cleanComments : any = []
    //clean the session of comments
    for(let i =0; i < services?.comentsService.length; i++){
        let actualComment = services?.comentsService[i]
        let objeto = {
            comentario: actualComment?.comentarios?.comentario,
            avaliacaoComentario: String(actualComment?.comentarios?.avaliacao),
            idUser: actualComment?.usuarios?.id,
            nomeUser: actualComment?.usuarios?.nome
        }

        cleanComments.push(objeto);
    }

    const finalServices = {
        id: idService,
        nome_servico: services.nome_servico,
        preco: services.preco,
        preco_desconto: services.preco_desconto,
        descricao: services?.descricao,
        url: await PhotoImage(services?.nome_servico),
        ServicesData:  arrayServices,
        avaliacao: String(services?.avaliacao.aprovacao_percentual),
        quantidadeAvaliacoes: services?.comentsService.length,
        comentarios: cleanComments
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
             console.log("SERVICOS nome serviço",services[i]?.servicos.nome_servico);

            oficialData = {
                idData: services[i]?.NServicosData.DataService.id,
                dia_horario: ParseTheTime(services[i]?.NServicosData.DataService.dia_horario),
                
                idServer: services[i]?.servicos.id,
                nome_servico: services[i]?.servicos.nome_servico,
                preco: services[i]?.servicos.preco,
                preco_desconto: services[i]?.servicos.preco_desconto,
                url: await PhotoImage(services[i]?.servicos.nome_servico),
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
export const searchServiceController = async(searchValue: string) => {

    const AppDataSource = await getDataSource();

    const cleanSearch = decodeURIComponent(searchValue).trim();
    console.log("value of SearchValue inside of searchController", searchValue)
    const search = await AppDataSource.getRepository(Services).find({
        where: {
            nome_servico: Like(`%${cleanSearch}%`)
        }
    })

    console.log("values of search", search, searchValue);
    if(search.length === 0){
        return []
            
    }

    let finalArray: services[] = [];
    let quantityResult = search.length || 0;
    for(let i = 0; i < search.length; i++){
        const objeto = {
            id: search[i]?.id,
            descricao: search[i]?.descricao,
            nome_servico: search[i]?.nome_servico,
            preco: search[i]?.preco,
            preco_desconto: search[i]?.preco_desconto,
            url: await PhotoImage(search[i]?.nome_servico)
        }

        finalArray.push(objeto);
    }


    console.log("resultado finalArray", finalArray, quantityResult);

    return {services: finalArray, quantityResult};
}

//POST
export const createService = async ({
    nome_servico,
    preco,
    preco_desconto,
    horario,
    descricao
}: ServiceAndData) => {
    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        
        //Prepare Service Data
        let dataFinal: any = {
            nome_servico: nome_servico,
            preco: Number(preco),
            escolhido: false,
            descricao: descricao
        };

        if (preco_desconto !== null && preco_desconto !== "") {
            dataFinal.preco_desconto = Number(preco_desconto);
        }

        //Create and Save Service
        const serviceEntity = transactionalEntityManager.create(Services, dataFinal);
        const savedService = await transactionalEntityManager.save(Services, serviceEntity);

        if (!savedService) {
            throw new Error("Erro na criação do serviço");
        }

        const idService = savedService?.id;

        //Create avaliation services
        const avaliationServices = transactionalEntityManager.create(AvaliationServices, {
            quantidade: 0,
            aprovacao_percentual: 0,
            servicos_id: idService
        });

        const SaveAvaliationServices = await transactionalEntityManager.save(AvaliationServices, avaliationServices);

        if (!SaveAvaliationServices) {
            throw new Error("Error na criação da avaliação do usuário");
        }

        //Create and Save Date/Time
        const dateEntity = transactionalEntityManager.create(DataService, {
            dia_horario: horario
        });

        const savedDate = await transactionalEntityManager.save(DataService, dateEntity);

        if (!savedDate) {
            throw new Error("Erro na criação do horário");
        }

        //Create and Save Relation (Junction Table)
        const relationEntity = transactionalEntityManager.create(NServicosDataHorario, {
            data_horario_id: savedDate.id,
            servicos_id: savedService.id,
            choosed: false
        });

        const savedRelation = await transactionalEntityManager.save(NServicosDataHorario, relationEntity);

        if (!savedRelation) {
            throw new Error("Falha ao criar a relação entre serviço e horário");
        }

        return { 
            message: "Serviço e horário criados com sucesso!", 
            serviceId: savedService.id 
        };
    });
};

//POST - ADD NEW DATA
export const AddNewDataController = async(dia_horario: string, idConvertido: number) => {
    
    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        
        //Create and save the new Date/Time record
        const newData = transactionalEntityManager.create(DataService, {
            dia_horario: dia_horario
        });

        const dataSave = await transactionalEntityManager.save(DataService, newData);

        if (!dataSave) {
            throw new Error("Erro ao salvar o novo horário");
        }
        
        const idDate = dataSave.id;

        // Create and save the relation in the junction table
        const servicoHorario = transactionalEntityManager.create(NServicosDataHorario, {
            servicos_id: idConvertido,
            data_horario_id: idDate,
            choosed: false
        });

        const saveServicoHorario = await transactionalEntityManager.save(NServicosDataHorario, servicoHorario);

        if (!saveServicoHorario) {
            throw new Error("Erro ao criar a relação entre serviço e horário");
        }

        return {message: "Data adicionada!"};
    });
}

//POST
export const userSelectService = async(id: number, idService: number, horario: string, idDate: string) => {

    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        
        // 1. Verify if service exists
        const service = await transactionalEntityManager.findOne(Services, {
            where: { id: idService }
        });
        
        if (!service) {
            throw new Error("O serviço selecionado não existe.");
        }

        // 2. Find the specific relationship between Service and Date
        const serviceDataHorario = await transactionalEntityManager.findOne(NServicosDataHorario, {
            where: {
                servicos_id: idService,
                data_horario_id: Number(idDate)
            }
        });

        if (!serviceDataHorario) {
            throw new Error("Este horário não está disponível para este serviço.");
        }

        // 3. Update the slot to 'choosed: true'
        // This "locks" the slot so no one else can take it
        const updateResult = await transactionalEntityManager.update(
            NServicosDataHorario,
            { id: serviceDataHorario.id },
            { choosed: true }
        );

        if (updateResult.affected === 0) {
            throw new Error("Falha ao reservar o horário do serviço.");
        }

        // 4. Create the User-Service link (The actual booking)
        const servicoUser = transactionalEntityManager.create(UsuarioServicos, {
            usuario_id: id,
            servicos_id: idService,
            NServicosData: { id: serviceDataHorario.id }
        });

        const servicoUserCreated = await transactionalEntityManager.save(UsuarioServicos, servicoUser);

        if (!servicoUserCreated) {
            throw new Error("Falha ao vincular o usuário ao serviço.");
        }

        return { success: true, message: "Serviço agendado com sucesso!" };
    });
}

//PUT
export const changeService = async ({
    idParameter,
    nome_servico,
    preco_desconto,
    preco,
    descricao
}: servicePutParameter) => {

    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
        
        // 1. Verify if the service exists using the transaction manager
        const service = await transactionalEntityManager.findOne(Services, {
            where: {
                id: Number(idParameter)
            }
        });

        if (!service) {
            throw new Error("Não foi possível encontrar o serviço atual");
        }

        // 2. Build the update object dynamically
        const parameters: any = {};

        if (nome_servico && nome_servico !== "") {
            parameters.nome_servico = nome_servico;
        }

        if (descricao && descricao !== "") {
            parameters.descricao = descricao;
        }

        if (preco_desconto !== undefined && preco_desconto !== "") {
            parameters.preco_desconto = Number(preco_desconto);
        }

        if (preco && preco !== "") {
            parameters.preco = Number(preco);
        }

        // 3. Safety check: Don't hit the DB if there's nothing to change
        if (Object.keys(parameters).length === 0) {
            throw new Error("Nenhum campo para atualizar");
        }

        // 4. Execute the update
        const updateService = await transactionalEntityManager.update(
            Services,
            { id: Number(idParameter) },
            parameters
        );

        if (updateService.affected === 0) {
            throw new Error("Falha na atualização do serviço");
        }

        return { mensagem: "Serviço atualizado com sucesso" };
    });
};

//DELETE
export const deleteService = async(id: string) => {

    const AppDataSource = await getDataSource();

    const service = await AppDataSource.getRepository(Services).delete({id: Number(id)});

    if(service.affected === 0){
        throw new Error("Error in the delete of the service");
    }

    return {mensagem: "service deleted"}
}