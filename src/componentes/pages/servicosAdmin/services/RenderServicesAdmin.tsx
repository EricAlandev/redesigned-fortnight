'use client'

import EsqService from "@/componentes/skeletons/EsqService";
import { ServiceAndData, services } from "@/types/TypeService";

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
        <div className=" max-h-[75vh] mx-auto overflow-y-auto mt-5 lg:max-w-[1100px]">


                <div
                 className="flex flex-col gap-4"
                >
                    
                        {dataService?.length > 0 ? (
                            <>
                                <p className="mt-2 mb-5 text-center ">
                                    Seus serviços
                                </p>

                                {dataService?.map((s) => (
                                <div
                                key={s?.id}
                                className="max-w-[250px]"
                                
                                >
                                    <EsqService
                                        id={s?.id}
                                        nome_servico={s?.nome_servico}
                                        preco={s?.preco}
                                        preco_desconto={s?.preco_desconto}
                                        isAdmin={isAdmin}
                                        url={s?.url}
                                        editar={() => alterarService(s?.id!)}
                                        adicionar={() => adicionarHorario(s?.id!)}
                                        deletar={() => deleteService(s?.id!)}
                                    />
                                </div>
                            ))}
                            </>
                        ) : (
                            <>
                                <p
                                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[18px]"
                                >
                                    Você ainda não tem nenhum produto
                                </p>
                            </>
                        )}
                    
                </div>
        </div>
    )
}