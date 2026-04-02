'use client'

import { DataUser } from "@/types/TypeUsuarios";
import Link from "next/link";
import { useState } from "react"

type FormDataChangeProps = {
    enviar: (dados: DataUser) => void
}

export default function FormDataChange({
    enviar
}: FormDataChangeProps) {

    const [data, setData] = useState<DataUser>({
        nome: "",
        endereco: "",
        numero_casa: "",
        dd: "",
        numero: ""
    });

    const handleChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((s) => ({
            ...s, [name]: value
        }))
    }

    return (
        <>
            <Link
                href={"/user"}
            >
                <img
                    src={"/general/Back.png"}
                    className="absolute max-h-[35px] p-2 border-[2px] rounded-[50%]"
                />
            </Link>

            <h1 className="mt-5 text-center text-2xl font-bold">
                Alteração de dados
            </h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    enviar(data)
                }}
                className=" mt-5 flex flex-col gap-4"
            >
                {/* Name Group */}
                <div className="flex flex-col">
                    <label htmlFor="nome" className="font-semibold">Nome</label>
                    <input
                        id="nome"
                        name="nome"
                        className="border p-2 rounded"
                        value={data.nome}
                        onChange={handleChanger}
                    />
                </div>

                {/* Address Group */}
                <fieldset className="flex gap-4 border p-4 rounded">
                    <legend className="px-2 font-bold">Endereço</legend>
                    
                    <div className="flex flex-col flex-1">
                        <label htmlFor="endereco">Logradouro</label>
                        <input
                            id="endereco"
                            name="endereco"
                            className="border p-2 rounded"
                            value={data.endereco}
                            onChange={handleChanger}
                        />
                    </div>

                    <div className="flex flex-col w-24">
                        <label htmlFor="numero_casa">Número</label>
                        <input
                            id="numero_casa"
                            name="numero_casa"
                            className="border p-2 rounded"
                            value={data.numero_casa}
                            onChange={handleChanger}
                        />
                    </div>
                </fieldset>

                {/* Phone Group */}
                <fieldset className="flex gap-4 border p-4 rounded">
                    <legend className="px-2 font-bold">Contato</legend>

                    <div className="flex flex-col w-20">
                        <label htmlFor="dd">DDD</label>
                        <input
                            id="dd"
                            name="dd"
                            className="border p-2 rounded"
                            minLength={2}
                            maxLength={2}
                            value={data.dd}
                            onChange={handleChanger}
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <label htmlFor="numero">Número</label>
                        <input
                            id="numero"
                            name="numero"
                            className="border p-2 rounded"
                            minLength={9}
                            maxLength={9}
                            value={data.numero}
                            onChange={handleChanger}
                        />
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="block min-w-[150px] mx-auto p-2 bg-[#A0A0A0] hover:bg-gray-400 text-white font-bold rounded-md transition-colors"
                >
                    Alterar
                </button>
            </form>
        </>
    )
}