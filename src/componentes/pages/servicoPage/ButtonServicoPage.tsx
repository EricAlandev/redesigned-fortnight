'use client'

import { dataService, NServicosData } from "@/types/TypeService"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

import { ParseTheTime } from "@/lib/functions/ParseTheTime";

type buttonOptions = {
    enviar: (data: dataService, idDate: string) => void,
    ServicesData: NServicosData[],


    //data to send the messages
    name: string,
    endereco: string,
    numero_casa: string,

    nome_servico : string,
    preco: string,
    preco_desconto?: string
}

export default function ButtonServicoPage({
    ServicesData,
    enviar,
    name,
    endereco,
    numero_casa,
    nome_servico,
    preco,
    preco_desconto
}: buttonOptions) {

    const [data, setData] = useState<dataService>({ dia_horario: ""});
    const [idDate, setIdDate] = useState<string>("");


    const router = useRouter();

    //Array to parse the date.
    const arrayDates = ServicesData?.map((s) => {
        const date = s?.DataService?.dia_horario;
        let actualDate;
        if(date){
            actualDate = ParseTheTime(date);
        }


        return {id: s?.DataService.id , date: actualDate}
    })

    console.log("arrayDates", arrayDates);
    
    const handleChanger = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;

        //verify the id of the services. With this id, i verify if exists;
        const dataValue = arrayDates.find((a) => a.date  === value);

        console.log(dataValue);

        //with the dataValue, verify if he found the value. if he find, gonna give the new value
        if(dataValue){
            setIdDate(dataValue?.id);

            //give the setData
            setData((d) => ({
                ...d, 
                [name]:  dataValue.date
            }));
        }
    };

    // Construct the message and encode it properly
    const message = `Ola pessoa! Eu sou a pessoa ${name}. Moro na rua ${endereco}, ${numero_casa}. Gostaria de fazer contigo o serviço ${nome_servico} no preco de R$${preco_desconto || preco} no horario de ${data.dia_horario}`;
    const encodedMessage = encodeURIComponent(message);

    return (
        <form
            id="form-id"
            onSubmit={(e) => {
                e.preventDefault();
                enviar(data, idDate);
            }}
            className="flex flex-col mx-auto max-w-[250px] gap-4"
        >
            <select
                name="dia_horario"
                value={data.dia_horario}
                onChange={handleChanger}
                className="p-2 border rounded"
            >
                
                {arrayDates?.length > 0 ? (
                    <>
                        <option value="">Selecione um horário</option>
                        {arrayDates?.map((d) => (
                        <option
                        key={d?.id}
                        value={d?.date}
                        >
                            {d?.date}
                        </option>
                    ))}
                    </>
                ) : (
                    <option
                        value={""}
                        >
                            Sem horário disponível.
                    </option>
                )}
            </select>

                 
                <Link
                    target="_blank"
                    href={`https://wa.me/5585986864233?text=${encodedMessage}`}
                    onClick={() => {
                        const form = document.getElementById('form-id') as HTMLFormElement;

                        form.requestSubmit();
                    }}
                    className={`p-2 text-center text-white rounded-md ${!data.dia_horario ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'}`}
                >
                    Escolher serviço
                </Link>
        </form>
    )
}