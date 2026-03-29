'use client'

import EsqService from "@/componentes/skeletons/EsqService";
import { ServiceAndData, services } from "@/types/TypeService";
import { Swiper, SwiperSlide } from "swiper/react";

type renderServices = {
    dataService?: ServiceAndData[],
    alterarService: (id: number) => void,
    deleteService: (id: number) => void,
    adicionarHorario: (id: number) => void,

    isAdmin: boolean
}

export default function RenderServicesAdmin({
    dataService,
    alterarService,
    deleteService,
    adicionarHorario,
    isAdmin
} : renderServices){

    console.log("service2", dataService);

    return(
        <div className=" max-h-[75vh] mx-auto overflow-y-auto mt-5 ">

                <p className="mt-2 mb-5 text-center ">
                    Seus serviços
                </p>

                <div
                 className="flex flex-col gap-4"
                >
                    
                        {dataService?.map((s) => (
                        <div
                        key={s?.id}
                        className="min-w-[50px]"
                        
                        >
                            <EsqService
                                id={s?.id}
                                nome_servico={s?.nome_servico}
                                preco={s?.preco}
                                preco_desconto={s?.preco_desconto}
                                isAdmin={isAdmin}
                                
                                editar={() => alterarService(s?.id!)}
                                adicionar={() => adicionarHorario(s?.id!)}
                                deletar={() => deleteService(s?.id!)}
                            />
                        </div>
                    ))}
                    
                </div>
        </div>
    )
}