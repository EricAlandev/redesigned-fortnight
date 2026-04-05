'use client'

import Header from "@/componentes/general/Header";
import BodyService from "@/componentes/pages/servicoPage/BodyService";
import ButtonServicoPage from "@/componentes/pages/servicoPage/ButtonServicoPage";
import HeaderServico from "@/componentes/pages/servicoPage/HeaderServico";
import useService from "@/hooks/UseService";
import { useGlobal } from "@/lib/GlobalContext";


import { useParams } from "next/navigation";
import { useEffect } from "react";


export default function ServicosPage(){

    const {user, token} = useGlobal();

    const {id} = useParams();

    const {
        data, 
        userSelectServiceToBuy,
        pullPageService
    } = useService();
    

    useEffect(() => {
        if(id){
            pullPageService(id as string);
        }
    }, [id])
    
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
                                enviar={async(data, idDate) => {
                                   if(id){
                                    const idString = id as string
                                    userSelectServiceToBuy(data, idDate, idString, token)
                                   }
                                }}
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