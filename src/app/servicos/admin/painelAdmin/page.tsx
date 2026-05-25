'use client'

export const dynamic = 'force-dynamic';

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage";
import ButtonCreateServer from "@/componentes/pages/servicosAdmin/createServers/ButtonCreateServer";
import NewData from "@/componentes/pages/servicosAdmin/createServers/CreateNewData";
import FormCreationService from "@/componentes/pages/servicosAdmin/createServers/FormCreationService";
import FormChangeService from "@/componentes/pages/servicosAdmin/services/FormChangeService";
import RenderServicesAdmin from "@/componentes/pages/servicosAdmin/services/RenderServicesAdmin";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServicesAdmin";
import useLogicalNumber from "@/componentes/skeletons/numberPage/logicalNumber";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import EsqPopUpDelete from "@/componentes/skeletons/popup/EsqPopUpDelete";
import {useServicesAdmin} from "@/hooks/UseServiceAdmin";
import { useGlobal } from "@/lib/GlobalContext";
import { TypePopUp } from "@/types/TypePopUp";

import { dataService, ServiceAndData, services } from "@/types/TypeService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageServicosAdmin(){

    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const [message, setMesage] = useState<string>();

    const {pullAllServices,
        addNewService,
        addNewData,
        changeValuesService,
        deleteActualService,
        idDelete,
        setIdDelete,
        dataService,
        setNextPage,
        nextPage} = useServicesAdmin();

    const {
        actualPage, 
        quantityOfPages, 
        setActualPage, 
        arrayWithNumberPages, 
        actualServices
    } = useLogicalNumber(dataService)

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
            <Header/>
            <HeaderDesktop/>

            {nextPage === "first page" && (
                <div
                className="w-[80vw] pt-8.5 mx-auto "
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
                            setPopUp('delete')
                            setIdDelete(id)
                        }
                        }

                        adicionarHorario={(id) => {
                            setNextPage("addData")
                            setIdDelete(id);
                        }}
                        dataService={actualServices}
                        isAdmin={user?.admin}
                    />

                    <NumberPage
                        actualPage={actualPage}
                        quantityOfPages={quantityOfPages}
                        setActualPage={setActualPage}
                        arrayWithNumberPagers={arrayWithNumberPages}
                    />
               </div>
            )}

            {nextPage === "cadastro" && (
                <div
                    className="w-[80vw] pt-5.5 mx-auto"
                >
                    <FormCreationService
                        enviar={async (f) => {
                            const add : any = await addNewService(f);
                            setPopUp(add?.status);
                            setMesage(add?.message);
                        }}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}

            {nextPage === "alterarPage" && (
                <div
                    className="w-[80vw] pt-5.5 mx-auto"
                >
                    <FormChangeService
                        enviar={async(e) => {
                            const change: any = await changeValuesService(e);
                            setPopUp(change?.status);
                            setMesage(change?.message);
                        }}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}

            {nextPage === "addData" && (
                <div
                    className="w-[80vw] pt-5.5 mx-auto"
                >
                    <NewData
                        enviar={async(data) => {
                            const newData : any = await addNewData(data);
                            setPopUp(newData?.status);
                            setMesage(newData?.message);
                        }}
                        back={() => setNextPage("first page")}
                    />
       
                </div>
            )}  


            {/*POP UPS */}
            {popUp !== 'none' && popUp !== 'delete' && (
                <EsqPopUp
                    type={popUp}
                    message={message}
                    setPopUp={setPopUp}
                />
            )}
            {popUp === 'delete' && (
                <EsqPopUpDelete
                    fecharPopup={() => {
                        setPopUp('none')
                    }}
                    deletar={() => 
                        {
                            deleteActualService(idDelete);
                            setPopUp('none');
                            pullAllServices();
                        }

                    }
                />
            )}
        </>
    )
}