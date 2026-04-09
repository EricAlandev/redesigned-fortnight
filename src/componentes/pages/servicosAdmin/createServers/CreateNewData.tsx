
import { dataService, ServiceAndData } from "@/types/TypeService";
import { useState } from "react"

type FormChangeServiceProps = {

    enviar: (dados: dataService) => void,
    back: () => void
}
export default function NewData({
    enviar,
    back
} : FormChangeServiceProps){

    const [dados, setDados] = useState<dataService>({
        dia_horario: ""
    });

    const handleChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div
            className="max-w-[1100px] mx-auto"
        >
            <img
                src={"/general/back.png"}
                onClick={back}
                className="max-w-[45px] max-h-[45px] mb-5 p-2 rounded-[50%] border-[2px] cursor-pointer"
            />

            {/*Tittle */}
            <p
             className="text-center text-[17px] mb-5"
            >
                Adicione um novo horário a regra
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 p-5 bg-[black] text-[white]"
            >
                <input
                    type="datetime-local"
                    name="dia_horario"
                    value={dados?.dia_horario}
                    onChange={handleChanger}
                    className="text-black bg-[white]"
                />

                <button
                 type="submit"
                 className="mt-4 bg-white text-black p-2"
                >
                    Enviar
                </button>
            </form> 
            
        </div>
    )
}
