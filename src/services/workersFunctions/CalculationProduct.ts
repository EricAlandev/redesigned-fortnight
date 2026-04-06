import { getDataSource } from "@/lib/db";
import { Services } from "../entitys/PetServices/EntityServices";
import { AvaliationServices } from "../entitys/PetServices/EntityAvaliation";

export async function CalculationProduct(){
    
    const AppDataSource = await getDataSource();

    return await AppDataSource.transaction(async(app) => {

        const services = await app.find(Services, {
            relations: {
                comentsService: {
                    comentarios: true
                }
            }
        });

        //Queue - Verify the avaliation of the services;
        if(services.length > 0){
            for(let i = 0; i <services.length; i++){
                const serviceActual = services[i];

                let avaliationService = 0;

                if(serviceActual.comentsService.length > 0){
                    for(let y = 0; y < serviceActual.comentsService.length; y++){
                        const actualComent = serviceActual.comentsService[y];
                        
                        avaliationService += actualComent.comentarios.avaliacao;
                        
                    }
                }

                console.log("After 2 for", avaliationService);

                if(avaliationService > 0){
                    console.log("inside if avaliation > 0");
                    const averageAvaliation = (avaliationService/serviceActual.comentsService.length);

                    console.log("averageAvaliation", averageAvaliation);

                    
                    try{
                    console.log("inside of the try", serviceActual.comentsService.length, averageAvaliation);

                        const avaliation = await app.update(AvaliationServices, 
                            {servicos_id: serviceActual?.id},
                            {
                                quantidade: serviceActual.comentsService.length,

                                aprovacao_percentual: averageAvaliation
                            }
                        )

                        if(avaliation.affected === 0){
                            throw new Error("error trying to update the avaliation Service");
                        }

                    console.log("pass the if, that mean the actual service exists");

                    }

                    catch(error){
                        console.log(error);
                    }
                }
                

            }
        }
    })
}