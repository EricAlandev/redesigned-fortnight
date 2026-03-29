'use client'

import { PhotoImage } from "@/lib/functions/PhotoIMage";
import { ServiceAndData, services } from "@/types/TypeService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


type EsqServiceAdmin = ServiceAndData & {
    deletar?: () => void,
    editar?: (id: number) => void,
    adicionar?: (id: number) => void,
    isAdmin: boolean
}

export default function EsqService({
    id,
    nome_servico,
    preco,
    preco_desconto,
    url,
    isAdmin,
    deletar,
    editar,
    adicionar
} : EsqServiceAdmin){

    const router = useRouter();
    console.log("data", nome_servico, preco, preco_desconto, isAdmin, url);

    return(
        <div
            onClick={() => {
                if(!isAdmin && id){
                    router.push(`/servicos/${id}`)
                }
            }}
        >
            <div className="">
                <img
                    src={url}
                />

                <p
                    className="text-[22px]"
                >
                    {nome_servico}
                </p>

                <div>
                    {preco_desconto ? (
                        <>
                            <p
                            className="text-[15px] line-through"
                            >
                                R${preco}
                            </p>

                            <p className="text-[18px] ">
                                R${preco_desconto}
                            </p>
                        </>
                    ): (
                        <p className="text-[18px] ">
                            R${preco}
                        </p>
                    )}
                </div>
                
                <div
                 className="relative"
                >
                    {isAdmin === true && (
                        <>
                            {/*Buttons of delete and update */}
                            <div className="absolute bottom-4 right-0 flex items-center gap-2">
                            <img
                                src={"/general/delete.png"}
                                onClick={() => {
                                    deletar?.();
                                }}
                                className="max-w-[30px] max-h-[30px] p-1 border-[2px] rounded-[50%]"
                            />


                            <img
                                src={"/general/edit.png"}
                                onClick={() => {
                                    editar?.(id!)
                                }}
                                className="max-w-[30px] max-h-[30px] p-1 border-[2px] rounded-[50%]"
                            />

                            <img
                                src={"/general/create.png"}
                                onClick={() => {
                                    adicionar?.(id!);
                                }}
                                className="max-w-[30px] max-h-[30px] p-1 border-[2px] rounded-[50%]"
                            />
                            </div>
                        </>
                    )}
                </div>
                
            </div>
        </div>
    )
}