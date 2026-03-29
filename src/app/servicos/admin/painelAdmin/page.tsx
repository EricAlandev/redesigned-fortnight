'use client'

import Header from "@/componentes/general/Header";
import ButtonCreateServer from "@/componentes/pages/servicosAdmin/createServers/ButtonCreateServer";
import NewData from "@/componentes/pages/servicosAdmin/createServers/CreateNewData";
import FormCreationService from "@/componentes/pages/servicosAdmin/createServers/FormCreationService";
import FormChangeService from "@/componentes/pages/servicosAdmin/services/FormChangeService";
import RenderServicesAdmin from "@/componentes/pages/servicosAdmin/services/RenderServicesAdmin";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServicesAdmin";
import EsqPopUpDelete from "@/componentes/skeletons/popup/EsqPopUpDelete";
import {useServicesAdmin} from "@/hooks/UseServiceAdmin";
import { useGlobal } from "@/lib/GlobalContext";

import { dataService, ServiceAndData, services } from "@/types/TypeService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageServicosAdmin(){

    const [popUp, setPopUp] = useState<boolean>(false);

    const {pullAllServices,
        addNewService,
        addNewData,
        changeValuesService,
        deleteActualService,
        idDelete,
        setIdDelete,
        dataService,
        setDataService,
        setNextPage,
        nextPage} = useServicesAdmin();

    const {user, token} = useGlobal();

    const router = useRouter();
    
    //basics verifycations;
    useEffect(() => {
            if(!user){
                return;
            }
            
            else if(user){
                if(user?.admin === false){
                    router.push("/")
                }
                
                else if(user?.admin === true){
                    pullAllServices();
                }
            }
            
    }, [user, token]);

    return(
        <>
            <Header

            />

            {nextPage === "first page" && (
                <div
                className="w-[80vw] pt-20.5 mx-auto"
                >
                   <ButtonCreateServer
                       click={() => {
                           setNextPage("cadastro");
                       }}
                   />

                   <RenderServicesAdmin
                        alterarService={(id) => {
                            setNextPage("alterarPage")
                            setIdDelete(id);
                        }}
                        deleteService={(id) => {
                            setPopUp(true)
                            setIdDelete(id)
                        }
                        }

                        adicionarHorario={(id) => {
                            setNextPage("addData")
                            setIdDelete(id);
                        }}
                        dataService={dataService}
                        isAdmin={user?.admin}
                    />
               </div>
            )}

            {nextPage === "cadastro" && (
                <div
                    className="w-[80vw] pt-20.5 mx-auto"
                >
                    <FormCreationService
                        enviar={addNewService}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}

            {nextPage === "alterarPage" && (
                <div
                    className="w-[80vw] pt-20.5 mx-auto"
                >
                    <FormChangeService
                        enviar={changeValuesService}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}

            {nextPage === "addData" && (
                <div
                    className="w-[80vw] pt-20.5 mx-auto"
                >
                    <NewData
                        enviar={addNewData}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}  


            {/*POP UPS PAGES */}
            {popUp === true && (
                <EsqPopUpDelete
                    fecharPopup={() => {
                        setPopUp(false)
                    }}
                    deletar={() => 
                        {
                            deleteActualService(idDelete);
                            setPopUp(false);
                            pullAllServices();
                        }

                    }
                />
            )}
        </>
    )
}