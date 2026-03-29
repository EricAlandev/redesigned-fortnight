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
         className="transform-none"
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
                 className="flex"
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

            <Swiper
             slidesPerView={1}
             spaceBetween={15}
             breakpoints={{
                640: {
                    slidesPerView: 1.15
                },
                320: {
                    slidesPerView: 1.15
                }
             }}
            >
                {services?.map((s) => (
                  <SwiperSlide
                    key={s.id}
                    >

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
                 </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}