'use client'

import { dataService, NServicosData } from "@/types/TypeService"
import Link from "next/link";
import React, { useState } from "react"
import { ParseTheTime } from "@/lib/functions/ParseTheTime";
import { useGlobal } from "@/lib/GlobalContext";

type buttonOptions = {
    enviar: (data: dataService, idDate: string) => void,
    actionPopUp: () => void,
    ServicesData?: NServicosData[],
    name?: string,
    endereco?: string,
    numero_casa?: string,
    nome_servico?: string,
    preco?: string,
    preco_desconto?: string,
    changeProps?: string
}

export default function ButtonServicoPage({
    ServicesData,
    enviar,
    actionPopUp,
    name,
    endereco,
    numero_casa,
    nome_servico,
    preco,
    preco_desconto,
    changeProps
}: buttonOptions) {

    const [data, setData] = useState<dataService>({ dia_horario: "" });
    const [idDate, setIdDate] = useState<string>("");

    const { user, token } = useGlobal();

    const arrayDates = ServicesData?.map((s) => {
        const date = s?.DataService?.dia_horario;
        let actualDate = "";
        if (date) {
            actualDate = ParseTheTime(date);
        }
        return { id: s?.DataService.id, date: actualDate }
    }) || []; // Fallback to empty array to satisfy .length checks

    const handleChanger = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const dataValue = arrayDates.find((a) => a.date === value);

        if (dataValue && dataValue.id) {
            // Force ID to string to satisfy setIdDate(string)
            setIdDate(String(dataValue.id));

            setData((d) => ({
                ...d,
                [name]: dataValue.date
            }));
        } else {
            setIdDate("");
            setData((d) => ({ ...d, [name]: "" }));
        }
    };

    const message = `Ola pessoa! Eu sou a pessoa ${name}. Moro na rua ${endereco}, ${numero_casa}. Gostaria de fazer contigo o serviço ${nome_servico} no preco de R$${preco_desconto || preco} no horario de ${data.dia_horario}`;
    const encodedMessage = encodeURIComponent(message);

    return (
        <div className="relative">
            <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0 w-full bg-[#FFFFFF] opacity-85 lg:w-max ${changeProps}`}>
                <form
                    id="form-id"
                    onSubmit={(e) => {
                        e.preventDefault();
                        enviar(data, idDate);
                    }}
                    className="flex flex-col mx-auto max-w-[250px] gap-4 p-3"
                >
                    <select
                        name="dia_horario"
                        value={data.dia_horario}
                        onChange={handleChanger}
                        className="text-center p-2 border rounded"
                    >
                        {/* Safe length check using the fallback array */}
                        {arrayDates.length > 0 ? (
                            <>
                                <option value="">Selecione um horário</option>
                                {arrayDates.map((d) => (
                                    <option key={d.id} value={d.date}>
                                        {d.date}
                                    </option>
                                ))}
                            </>
                        ) : (
                            <option value="">Sem horário disponível.</option>
                        )}
                    </select>

                    {(user && token) ? (
                        <Link
                            target="_blank"
                            href={`https://wa.me/5585986864233?text=${encodedMessage}`}
                            onClick={() => {
                                const form = document.getElementById('form-id') as HTMLFormElement;
                                if (form) form.requestSubmit();
                            }}
                            className={`p-2 text-center text-white rounded-md ${!data.dia_horario ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600'}`}
                        >
                            Escolher serviço
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="p-2 text-center text-white rounded-md bg-gray-400"
                            onClick={() => actionPopUp()}
                        >
                            Escolher um serviço
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}