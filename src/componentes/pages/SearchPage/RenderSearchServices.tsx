'use client'

import EsqService from "@/componentes/skeletons/EsqService";
import { ServiceAndData } from "@/types/TypeService";
import Link from "next/link";

type renderServices = {
    quantity?: number,
    pesquisa?: string,
    dataService?: ServiceAndData[]
}

export default function RenderSearchServices({
    dataService,
    pesquisa,
    quantity
} : renderServices){

    return(
        <div className=" h-[70.5vh] mx-auto overflow-y-auto mt-5 ">

                <div
                 className="flex flex-col gap-4"
                >
                        {(dataService !== undefined) && dataService.length > 0 ? (
                            <>
                            <p className=" max-w-[250px] mx-auto mt-2 mb-5 text-center ">
                                Foram encontrados de acordo com a sua pesquisa 
                                <span
                                 className={"pl-1"}
                                >
                                    ({quantity})
                                </span>
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
                            <div
                             className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  max-w-[300px] "
                            >
                                <p
                                className="flex flex-col min-w-[300px] text-[18px] text-center"
                                >
                                    Não foram encontrados nenhum serviço para a pesquisa:
                                    <span
                                     className="wrap-break-word"
                                    >
                                        "{pesquisa}".
                                    </span>
                                </p>

                                <Link
                                    href={"/"}
                                    className="block max-w-[230px] mx-auto mt-3 p-2 text-center bg-[#A0A0A0] rounded-md text-center"
                                >
                                    página inicial
                                </Link>
                            </div>
                        )}
                </div>
        </div>
    )
}