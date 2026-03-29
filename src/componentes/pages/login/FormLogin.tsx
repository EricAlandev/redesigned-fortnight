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
            className="w-[80vw] mx-auto"
        >
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
                />

                <label htmlFor="senha">
                    Digite sua senha
                </label>

                <input
                id="senha"
                name="senha"
                value={dados.senha}
                onChange={pickValues}
                />

                <button
                    type="submit"
                    className="p-2 bg-[blue] text-[white] rounded-md"
                >
                    Logar
                </button>
            </form>

            <Link
                href={"/cadastro"}
            >
                <p className="flex gap-2">
                    Não tem conta? 
                    <span className="underline">
                        criar
                    </span>
                </p>
            </Link>
        </div>
    )
}