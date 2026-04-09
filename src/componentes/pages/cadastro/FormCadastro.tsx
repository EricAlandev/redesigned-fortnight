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
        <div
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  lg:max-w-[1100px] bg-[#F1F1F1]"
        >
            <h2 className="mt-5 mb-5 text-center">CADASTRO DE USUÁRIO</h2>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                enviar(dados);
            }}
             className="flex flex-col w-[90vw] mx-auto p-3  text-[black] rounded-md lg:max-w-[1000px] lg:p-4 "
            >
                {/*Basic data 
                -- name, senha
                 */}
                <fieldset
                 className="flex w-[70vw] mx-auto items-center gap-10  lg:max-w-[800px]"
                >
                   <div
                     className="flex flex-col gap-1.5"
                   >
                    <label htmlFor="nome">
                            Digite seu nome
                        </label>

                        <input
                        id="nome"
                        name="nome"
                        value={dados.nome}
                        required
                        onChange={pickValues}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md max-w-[400px]"
                        />
                   </div>

                    <div
                     className="flex flex-col gap-1.5"
                    >
                        <label htmlFor="senha">
                            Digite sua senha
                        </label>

                        <input
                        id="senha"
                        name="senha"
                        value={dados.senha}
                        required
                        onChange={pickValues}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md max-w-[400px]"
                        />
                    </div>
                </fieldset>

                {/*contact data 
                -- dd, number
                 */}
                <fieldset
                 className="flex w-[70vw] mx-auto items-center gap-10 mt-2 lg:max-w-[800px]"
                >
                    <div
                     className="flex flex-col gap-1.5"
                    >
                        <label htmlFor="dd">
                            Digite seu dd
                        </label>

                        <input
                        id="dd"
                        name="dd"
                        value={dados.dd}
                        required
                        onChange={pickValues}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md lg:max-w-[400px]"
                        />
                    </div>

                    <div
                     className="flex flex-col gap-1.5"
                    >
                        <label htmlFor="numero">
                            Digite seu numero
                        </label>

                        <input
                        id="numero"
                        name="numero"
                        value={dados.numero}
                        required
                        onChange={pickValues}
                        minLength={9}
                        maxLength={9}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md lg:max-w-[400px]"
                        />
                    </div>
                </fieldset>
                
                {/*localization data 
                --number houve, house localization
                 */}
                <fieldset
                 className="flex items-center w-[70vw] mx-auto gap-10 mt-2 lg:max-w-[800px]"
                >
                    <div
                     className="flex flex-col gap-1.5"
                    
                    >
                        <label htmlFor="endereco">
                            Digite seu endereço
                        </label>

                        <input
                        id="endereco"
                        name="endereco"
                        value={dados.endereco}
                        required
                        onChange={pickValues}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md lg:max-w-[400]"
                        />
                    </div>

                    <div
                     className="flex flex-col gap-1.5"
                    >
                        <label htmlFor="numero_casa">
                           numero da casa
                        </label>

                        <input
                        id="numero_casa"
                        name="numero_casa"
                        value={dados.numero_casa}
                        required
                        onChange={pickValues}
                        className="w-[35vw] bg-[#A0A0A0] rounded-md lg:max-w-[400]"
                        />
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="w-[80vw] mx-auto mt-6 p-2 bg-[blue] text-[white] rounded-md lg:max-w-[300px]"
                >
                    Cadastrar
                </button>
            </form>

            <Link
                href={"/login"}
                className="flex justify-center mt-5 mb-5"
            >
                <p className="flex gap-2 ">
                    Tem conta? 
                    <span className="underline">
                        logar
                    </span>
                </p>
            </Link>
        </div>
    )
}