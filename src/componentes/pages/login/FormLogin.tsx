import { dadoLogin, loginType } from "@/types/TypeLoginCadastro";
import Link from "next/link";
import React, { useState } from "react"


export default function FormLogin({enviar} : loginType){

    const [dados, setDados] = useState<dadoLogin>({
        nome: "",
        senha: ""
    });

    const pickValues = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDados((dado) => ({
            ...dado, [name] : value
        }))
    }

    return(
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] mx-auto lg:max-w-[600px]"
        >
            <h1
             className="text-[18px] text-center"
            >
                Login
            </h1>

            <form
            onSubmit={(e) => {
                e.preventDefault();
                enviar(dados);
            }}
             className="flex flex-col gap-2"
            >
                <label
                htmlFor="nome"
                className=""
                >
                    Digite seu nome
                </label>

                <input
                id="nome"
                name="nome"
                value={dados.nome}
                onChange={pickValues}
                className="w-full min-h-[35px] bg-[#A0A0A0] rounded-md"
                />

                <label htmlFor="senha">
                    Digite sua senha
                </label>

                <input
                id="senha"
                name="senha"
                value={dados.senha}
                onChange={pickValues}
                className="w-full min-h-[35px] bg-[#A0A0A0] rounded-md"
                />

                <button
                    type="submit"
                    className="mt-3 p-2 bg-[blue] text-[white] rounded-md"
                >
                    Logar
                </button>
            </form>

            <Link
                href={"/cadastro"}
            >
                <p className="flex gap-2 mt-5">
                    Não tem conta? 
                    <span className="underline">
                        criar
                    </span>
                </p>
            </Link>
        </div>
    )
}