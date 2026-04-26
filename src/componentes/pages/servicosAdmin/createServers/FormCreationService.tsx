'use client'

import { ServiceAndData, services } from "@/types/TypeService";
import { useState } from "react"

type FormCreationServiceProps = {
    enviar: (dados: ServiceAndData) => void,
    back: () => void
}

export default function FormCreationService(
    {
         enviar,
         back 

    }: FormCreationServiceProps) {

    const [dados, setDados] = useState<ServiceAndData>({
        nome_servico: "",
        preco_desconto: "",
        preco: "",
        horario: "",
        descricao: ""
    });

    const handleChanger = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDados((d) => ({
            ...d, 
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        enviar(dados)
    };

    return (
        <div
         className="lg:max-w-[750px] lg:mx-auto"
        >
            <img
                src={"/general/back.png"}
                onClick={back}
                className="max-w-[45px] max-h-[45px] mb-5 p-2 rounded-[50%] border-[2px] cursor-pointer"
            />

            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-1 p-5 bg-[black] text-[white] rounded-md"
            >
                {/* Nome do Serviço */}
                <fieldset className="flex flex-col gap-2 mb-4">
                    <label>Nome serviço</label>
                    <input
                        name="nome_servico"
                        value={dados.nome_servico}
                        onChange={handleChanger}
                        required
                        className="p-2 text-black bg-[white]"
                    />
                </fieldset>

                {/*Description */}
                <label>Descrição</label>
                    <textarea
                        name="descricao"
                        value={dados.descricao}
                        onChange={handleChanger}
                        required
                        className=" max-h-[200px] h-[20vw]   p-2 
                        text-black bg-[white] rounded-md

                        overflow-y-auto 
                        "
                    />

                {/* Preços */}
                <fieldset className="flex flex-col gap-2 mb-4">
                    <label>Preço</label>
                    <input
                        name="preco"
                        value={dados.preco}
                        onChange={handleChanger}
                        required
                        className="w-full p-2 text-black bg-[white]"
                    />

                    <label>Preço desconto (OPCIONAL)</label>
                    <input
                        name="preco_desconto"
                        value={dados.preco_desconto}
                        onChange={handleChanger}
                        className="w-full p-2 text-black bg-[white]"
                    />
                </fieldset>

                {/*Disponible time */}
                <fieldset className="flex flex-col gap-2 mb-4">
                    <label>Horário</label>
                    <input
                        type="datetime-local"
                        name="horario"
                        value={dados.horario}
                        onChange={handleChanger}
                        required
                        className="w-full p-2 text-black bg-[white]"
                    />
                </fieldset>

                <button
                    type="submit"
                    className="block mx-auto w-full mt-5 p-2 bg-[#A0A0A0] text-black font-bold"
                >
                    Enviar
                </button>
            </form>
        </div>
    )
}