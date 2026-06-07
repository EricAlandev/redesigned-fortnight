'use client'

import { ServiceAndData, dataService } from "@/types/TypeService"
import { useState } from "react"
// Pulling the direct file system logic from our main services controller
import { pullOneService, userSelectService } from "@/services/controllers/ServicesController";

export default function useService(){
    const [data, setData] = useState<ServiceAndData>();

    const pullPageService = async (id: string, idUser?: number) => {
        try {
            if (id) {
                const idConvertido = Array.isArray(id) ? Number(id[0]) : Number(id);
                
                // Server action expects the parameters packaged inside an object configuration
                const service = await pullOneService({ idConvertido, idUser });
                console.log("service pulled from JSON:", service);
                
                setData(service as unknown as ServiceAndData);
            }
        }
        catch(error) {
            console.error("Error running pullPageService action:", error);
        }
    }

    const userSelectServiceToBuy = async (
        dataServiceObj: dataService, 
        idDate: string, 
        id: string, 
        idUser: number
    ) => {
        try {
            if (id) {
                const idConvertido = Array.isArray(id) ? Number(id[0]) : Number(id);
                console.log("Data service to buy", dataServiceObj, idConvertido, "idDate", idDate);
                
                // Matches our signature: userSelectService(id, idService, horario, idDate)
                // We pull the schedule raw value directly from your form data payload object
                const service = await userSelectService(
                    idUser, 
                    idConvertido, 
                    dataServiceObj.horario || "", 
                    idDate
                );
                
                console.log("booking response:", service);

                // Refresh state data right after a secure booking is completed
                pullPageService(id, idUser);
            }
        }
        catch(error) {
            console.error("Error booking service via server action:", error);
        }
    }

    return {
        data,
        userSelectServiceToBuy,
        pullPageService
    }
}