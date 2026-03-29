import { dadoCadastro, registerType } from "@/types/TypeLoginCadastro";
import Link from "next/link";
import React, { useState } from "react"


export default function FormCadastro({enviar} : registerType){

    const [dados, setDados] = useState<dadoCadastro>({
        nome: "",
        senha: "",
        dd: "",
        numero: "",
        endereco: "",
        numero_casa: "",
    });

    const pickValues = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDados((dado) => ({
            ...dado, [name] : value
        }))
    }

    return(
        <>
            <h2 className="mt-5 mb-5 text-center">CADASTRO DE USUÁRIO</h2>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                enviar(dados);
            }}
             className="flex flex-col w-[80vw] mx-auto bg-[black] text-[white]"
            >
                {/*Basic data 
                -- name, senha
                 */}
                <fieldset
                 className="flex w-[70vw] mx-auto"
                >
                   <div>
                    <label htmlFor="nome">
                            Digite seu nome
                        </label>

                        <input
                        id="nome"
                        name="nome"
                        value={dados.nome}
                        onChange={pickValues}
                        />
                   </div>

                    <div>
                        <label htmlFor="senha">
                            Digite sua senha
                        </label>

                        <input
                        id="senha"
                        name="senha"
                        value={dados.senha}
                        onChange={pickValues}
                        />
                    </div>
                </fieldset>

                {/*contact data 
                -- dd, number
                 */}
                <fieldset
                 className="flex w-[70vw] mx-auto"
                >
                    <div>
                        <label htmlFor="dd">
                            Digite seu dd
                        </label>

                        <input
                        id="dd"
                        name="dd"
                        value={dados.dd}
                        onChange={pickValues}
                        />
                    </div>

                    <div>
                        <label htmlFor="numero">
                            Digite seu numero
                        </label>

                        <input
                        id="numero"
                        name="numero"
                        value={dados.numero}
                        onChange={pickValues}
                        />
                    </div>
                </fieldset>
                
                {/*localization data 
                --number houve, house localization
                 */}
                <fieldset
                 className="flex w-[70vw] mx-auto"
                >
                    <div>
                        <label htmlFor="endereco">
                            Digite seu endereço
                        </label>

                        <input
                        id="endereco"
                        name="endereco"
                        value={dados.endereco}
                        onChange={pickValues}
                        />
                    </div>

                    <div>
                        <label htmlFor="numero_casa">
                            Digite seu numero de casa
                        </label>

                        <input
                        id="numero_casa"
                        name="numero_casa"
                        value={dados.numero_casa}
                        onChange={pickValues}
                        />
                    </div>
                </fieldset>

                <button
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>

            <Link
                href={"/login"}
                className="flex justify-center mt-5"
            >
                <p className="flex gap-2 ">
                    Tem conta? 
                    <span className="underline">
                        logar
                    </span>
                </p>
            </Link>
        </>
    )
}