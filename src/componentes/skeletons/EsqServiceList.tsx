import { PhotoImage } from "@/lib/functions/PhotoIMage"
import { dataService, services, ServicesList } from "@/types/TypeService"
import Link from "next/link"

type EsqServiceList = ServicesList &{

}


export default function EsqServiceList({
    //dataService,
    idData,
    dia_horario,

    //services
    idService,  

    url,
    nome_servico,
    preco,
    preco_desconto,

    //user
    nome,
    number

}: ServicesList){
    const numero = 55 + ((number?.dd + 9) + number?.numero);

    return(
        <div className="flex flex-col gap-2 lg:max-w-[250px]">
            {/*image product */}
            <img
                src={url}
                className=""
            />
            
            {/*product name */}
            <p
             className=" text-[18px]"
            >
                {nome_servico}
            </p>
            {/*Prices */}
            <div>   
                {preco_desconto ? (
                    <div
                     className="flex flex-col leading-4.5"
                    >
                        <p
                         className="line-through text-[13px] text-[gray]"
                        >
                           R$ {preco}
                        </p>

                        <p
                         className="w-max pb-1 text-[14.5px] border-b-[2px] "
                        >
                            R$ {preco_desconto}
                        </p>
                    </div>
                ) : (
                    <>
                        <p
                         className="w-max pb-2 text-[18px] border-b-[2px] "
                        >
                            R$ {preco}
                        </p>
                    </>
                )}
            </div>

            {/*description */}
            <p
             className="leading-6.5"
            >
                O usuário 
                <Link
                href={`https://wa.me/${numero}`}
                target="_blank"
                 className=" ml-1 pb-0.5 border-b-[1px]"
                >
                    {nome}
                </Link>,

                 escolheu o serviço as

                <span
                 className=" ml-1"
                >
                    {dia_horario}
                </span>
            </p>
        </div>
    )
}