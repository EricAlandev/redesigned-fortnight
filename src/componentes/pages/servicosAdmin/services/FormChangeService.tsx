import { ServiceAndData } from "@/types/TypeService";
import { useState } from "react"

type FormChangeServiceProps = {
    enviar: (dados: ServiceAndData) => void,
    back: () => void
}
export default function FormChangeService({
    enviar,
    back
} : FormChangeServiceProps){

    const [dados, setDados] = useState<ServiceAndData>({
            nome_servico: "",
            preco_desconto: "",
            preco: "",
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
        enviar(dados);
    };

    return(
        <>
            <img
                src={"/general/back.png"}
                onClick={back}
                className="max-w-[45px] max-h-[45px] mb-5 p-2 rounded-[50%] border-[2px] cursor-pointer"
            />

            <form
               onSubmit={handleSubmit} 
               className="flex flex-col gap-4 p-5 bg-[black] text-[white]"
            >
                <label>Alterar nome</label>
                <input
                    name="nome_servico"
                    value={dados.nome_servico}
                    onChange={handleChanger}
                    className="text-black bg-[white]"
                />

                <label>Alterar descrição</label>
                <textarea
                    name="descricao"
                    value={dados.descricao}
                    onChange={handleChanger}
                    className="max-w-[400px] h-[20vw]   p-2 
                    text-black bg-[white] rounded-md

                    overflow-y-auto 
                    "
                />

                <label>Alterar preço</label>
                <input
                    name="preco"
                    value={dados.preco}
                    onChange={handleChanger}
                    className="text-black bg-[white]"
                />

                <label>Alterar desconto</label>
                <input
                    name="preco_desconto"
                    value={dados.preco_desconto}
                    onChange={handleChanger}
                    className="text-black bg-[white]"
                />

                <button type="submit" className="mt-4 bg-white text-black p-2">
                    Salvar
                </button>
            </form>
        </>
    )
}