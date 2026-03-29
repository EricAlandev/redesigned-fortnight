'use client'

import EsqService from "@/componentes/skeletons/EsqService";
import { ServiceAndData, services } from "@/types/TypeService";

type renderServices = {
    dataService?: ServiceAndData[]
}

export default function RenderServices({
    dataService
} : renderServices){

    console.log("service2", dataService);

    return(
        <div className=" max-h-[75vh] mx-auto overflow-y-auto mt-5 ">

                <div
                 className="flex flex-col gap-4"
                >
                        {dataService?.length > 0 ? (
                            <>
                            <p className="mt-2 mb-5 text-center ">
                                Nossos serviços
                            </p>

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
                                        url={s?.url}
                                        isAdmin={false}
                                    />
                                </div>
                            ))}
                            </>

                        ) : (
                            <p
                             className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  min-w-[230px] text-[18px] text-center"
                            >
                                Sem serviços disponíveis ainda. <br/>
                                Contate nós depois!
                            </p>
                        )}
                </div>
        </div>
    )
}