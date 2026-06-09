'use client'

import { dataService } from "@/types/TypeService"
import Link from "next/link";
import React, { useState } from "react"
import { ParseTheTime } from "@/lib/functions/ParseTheTime";
import { useGlobal } from "@/lib/GlobalContext";

type SlotData = {
    idDate: number;
    dia_horario: string;
    choosed: boolean;
}

type buttonOptions = {
    enviar: (data: dataService, idDate: string) => void,
    actionPopUp: () => void,
    slots?: SlotData[], 
    name?: string,
    endereco?: string,
    numero_casa?: string,
    nome_servico?: string,
    preco?: string | number,
    preco_desconto?: string | number,
    changeProps?: string
}

export default function ButtonServicoPage({
    slots,
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

    // Filtra e formata os horários vindos de ServicesData (mapeados aqui como slots)
    const arrayDates = (slots || [])
        .filter((h) => h && h.choosed === false) 
        .map((h) => {
            const date = h?.dia_horario;
            let actualDate = "";
            
            if (date) {
                actualDate = ParseTheTime(date); 
            }
            
            return { 
                id: h?.idDate, 
                date: actualDate,
                rawDate: date
            };
        });

    const handleChanger = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const dataValue = arrayDates.find((a) => String(a.id) === selectedId);

        if (dataValue) {
            setIdDate(String(dataValue.id));
            setData({ dia_horario: dataValue.date }); 
        } else {
            setIdDate("");
            setData({ dia_horario: "" });
        }
    };

    const message = `Olá! Eu sou ${name || ''}. Moro na rua ${endereco || ''}, nº ${numero_casa || ''}. Gostaria de agendar o serviço "${nome_servico || ''}" por R$${preco_desconto || preco || '0.00'} no horário: ${data.dia_horario}`;
    const encodedMessage = encodeURIComponent(message);

    return (
        <div className="relative">
            <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:translate-x-0 w-full bg-white opacity-95 lg:w-max ${changeProps || ''} z-50 shadow-md rounded-lg border border-gray-200`}>
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
                        value={idDate} 
                        onChange={handleChanger}
                        className="text-center p-2 border rounded bg-white text-black text-sm w-full outline-none"
                    >
                        {arrayDates.length > 0 ? (
                            <>
                                <option value="">Selecione um horário</option>
                                {arrayDates.map((d) => (
                                    <option key={d.id} value={String(d.id)}>
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
                            className={`p-2 text-center text-white rounded-md font-medium transition-all ${!idDate ? 'bg-gray-400 cursor-not-allowed pointer-events-none' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                            Escolher serviço
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="p-2 text-center text-white rounded-md bg-gray-400 font-medium"
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