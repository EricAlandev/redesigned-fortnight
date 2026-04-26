'use client'

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import BodyService from "@/componentes/pages/servicoPage/BodyService";
import ButtonServicoPage from "@/componentes/pages/servicoPage/ButtonServicoPage";
import HeaderServico from "@/componentes/pages/servicoPage/HeaderServico";
import PutComent from "@/componentes/pages/servicoPage/PutComent";
import RenderComments from "@/componentes/pages/servicoPage/RenderComments";
import EsqPopUp from "@/componentes/skeletons/popup/EsqPopUp";
import useService from "@/hooks/UseService";
import UseUser from "@/hooks/UseUser";
import { useGlobal } from "@/lib/GlobalContext";
import { TypePopUp } from "@/types/TypePopUp";


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ServicosPage(){

    const [popUp, setPopUp] = useState<TypePopUp>('none');
    const [message, setMessage] = useState<string>();
    const {user, token} = useGlobal();

    const {id} = useParams();

    const {
        data, 
        userSelectServiceToBuy,
        pullPageService
    } = useService();

    const {
        userPutComent
    } = UseUser();
    

    useEffect(() => {
        if(id){
            pullPageService(id as string, token || undefined);
        }

    }, [id])
    
    return(
        <>
            <Header/>
            <HeaderDesktop/>

            <div
            className="md:mt-15"
            >
                {data&& (
                    <>
                        <div
                          className="max-h-[75vh] overflow-y-auto    lg:overflow-visible lg:h-full lg:max-w-[1100px] lg:mx-auto"
                        >
                            <HeaderServico
                            nome_servico={data?.nome_servico}
                            preco={data?.preco}
                            preco_desconto={data?.preco_desconto}            
                            avaliacao={data?.avaliacao}
                            quantidadeAvaliacoes={data?.quantidadeAvaliacoes}     
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

                                    //activate the popUp if the dosn't want its logged
                                    actionPopUp={() => {
                                        setPopUp('error')
                                        setMessage('É ncessário estar logado para acessar o produto')
                                    }}

                                    changeProps="lg:absolute  lg:top-[-110px]  lg:right-[-50px]"
                                />

                            <BodyService
                                descricao={data?.descricao}
                            />

                            {data?.userCanComment !== false && (
                                <PutComent
                                enviar={async(e) => {
                                    if(id && token){
                                        const coment: any = await userPutComent(e, token, id as string);
                                        setPopUp(coment?.status)
                                        setMessage(coment?.message.message)
                                    }
                                }}
                            />

                            )}
                                <RenderComments
                                    comments={data?.comentarios}
                                />
                        </div>

                        {popUp !== 'none' && (
                            <EsqPopUp
                            setPopUp={setPopUp}
                            message={message}
                            type={popUp}
                        />
                        )}
                    </>
                )}
            </div>
        </>
    )
}