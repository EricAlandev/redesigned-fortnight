'use client'

import Header from "@/componentes/general/Header";
import BodyService from "@/componentes/pages/servicoPage/BodyService";
import ButtonServicoPage from "@/componentes/pages/servicoPage/ButtonServicoPage";
import HeaderServico from "@/componentes/pages/servicoPage/HeaderServico";
import { useGlobal } from "@/lib/GlobalContext";
import { pullOneService, UserSelectService } from "@/services/services/ServicesService";
import { dataService, ServiceAndData } from "@/types/TypeService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServicosPage(){

    const [data, setData] = useState<ServiceAndData>();

    const {user,token} = useGlobal()!;
    const {id} = useParams();

    const pullPageService = async() => {
        try{
            if(id){
                const idConvertido = Array.isArray(id) ? id[0] : id;
                const service = await pullOneService(idConvertido);
                console.log("service", service);
                setData(service);
                
            }
        }

        catch(error){
            console.log(error);
        }
    }

    const userSelectServiceToBuy = async(data: dataService, idDate: string) => {
        try{
            if(id && token){
                const idConvertido = Array.isArray(id) ? id[0] : id;
                console.log("Data service to buy", data, token, idConvertido, "idDate", idDate)
                const service = await UserSelectService(data, token, idConvertido, idDate);
                console.log("service", service);

                pullPageService();
                
            }
        }

        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        pullPageService();
    }, [])

    return(
        <>
            <Header/>

            <div
            className="md:mt-15"
            >
                {data && (
                    <>
                        <div
                          className="max-h-[70vh] overflow-y-auto md:overflow-visible md:h-full"
                        >
                            <HeaderServico
                            nome_servico={data?.nome_servico}
                            preco={data?.preco}
                            preco_desconto={data?.preco_desconto}                  
                            />

                            <BodyService
                                descricao={data?.descricao}
                            />

                            <ButtonServicoPage
                                enviar={userSelectServiceToBuy}
                                ServicesData={data?.ServicesData}

                                name={user?.nome}
                                endereco={user?.endress.endereco}
                                numero_casa={user?.endress.numero_casa}
                                nome_servico={data?.nome_servico}
                                preco={data?.preco}
                                preco_desconto={data?.preco_desconto}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}