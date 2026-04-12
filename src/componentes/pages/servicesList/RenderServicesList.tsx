'use client'

import EsqServiceList from "@/componentes/skeletons/EsqServiceList"
import {ServiceAndData, services, ServicesList } from "@/types/TypeService"
import { typeUsuario } from "@/types/TypeUsuarios"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"


type ServiceListArray = {
    services: ServicesList[],
    enviar: (value: string) => void 
}

type dataService = {
    ordem: string
}

export default function RenderServices(
    {
        services,
        enviar
    } : ServiceListArray
){
    const [data, setData] = useState<dataService>({
        ordem: ""
    });

    const handleChanger = (e:React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const {name, value} = e.target;

        setData((s) => ({
            ...s, [name] : value
        }))
    }

    useEffect(() => {
        enviar(data?.ordem)
    }, [data])

    return(
        <div
         className=" h-[75vh] mx-auto transform-none mt-5 lg:max-h-[800px]"
        >
            <h1
             className="mb-5 text-center text-[18px]"
            >
                Serviços
            </h1>

            {/*Form to select the order of pushing */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    enviar(data?.ordem)
                }}
            >
                <label>Serviços do(a)</label>

                <select
                 className="flex mt-2 p-2 bg-[#A0A0A0] rounded-md"
                 name="ordem"
                 value={data.ordem}
                 onChange={handleChanger}
                >
                    <option
                     value={"semana"}
                    >
                        Última semana
                    </option>

                    <option
                     value={"trinta"}
                    >
                        últimos 30 dias
                    </option>

                    <option
                     value={"sesenta"}
                    >
                        últimos 60 dias
                    </option>
                </select>
            </form>
                
                {/*slides in vertical */}
                <div
                    className="h-[66.5vh] max-h-[550px] overflow-y-auto flex flex-col gap-5  mt-5 lg:overflow-y-visible lg:grid lg:grid-cols-3 lg:grid-rows-3"
                >
                    {services?.length > 0 ? (
                        <>
                            {
                                services?.map((s) => (
                                        <EsqServiceList
                                            url={s?.url}
                                            nome_servico={s?.nome_servico}
                                            idService={s?.id}
                                            preco={s?.preco}
                                            preco_desconto={s?.preco_desconto}
                                            nome={s?.nome}
                                            dia_horario={s?.dia_horario}
                                            number={s?.number}
                                        />
                                    ))
                            }
                        </>
                    ): (
                        <>
                                <p
                                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[18px]"
                                >
                                    Sem nenhum produto ainda.
                                </p>
                        </>
                    )}
                </div>
        </div>
    )
}