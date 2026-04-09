import { typeUsuario } from "@/types/TypeUsuarios";
import Link from "next/link";


export default function HeaderUser({
    nome,
    number, 
    endress,
    authorizations
}: typeUsuario){
    
    const adressUser = `${endress.endereco} ${endress.numero_casa}`
    const numberFone = `(55) ${number?.dd}9${number?.numero}`
    const arrayAuthorizations = authorizations.map((a, index) => {
        if((index + 1) >= authorizations.length){
            return {
                id: a?.id,
                authorizarion: (a?.authorization.authorization)
            }
        }

        else{
            return {
                id: a?.id,
                authorizarion: (a?.authorization.authorization) + " "
            }
        }
        
    });

    return(
        <>
            <div
             className="flex items-center gap-4 mt-5 lg:flex-col "
            >
                {/*Tittle + Photo*/}
                <div
                 className="flex flex-col items-center mt-3 mb-2"
                >   
                    <img
                        src={"/general/user.png"}
                    />

                    <h1
                    className=" mt-5 text-[18px] text-center"
                    >
                        Dados usuário
                    </h1>
                </div>

                {/*Data of user */}
                <div
                 className="flex flex-col gap-3 min-w-[400px]"
                >
                         {/*Name */}
                        <p
                         className=" min-w-[230px] p-2 border-[2px] border-[#A0A0A0] rounded-md"
                        >
                            Nome: <br/> {nome} 
                        </p>

                        {/*adress */}
                        <p
                         className=" min-w-[230px] p-2 border-[2px] border-[#A0A0A0] rounded-md"
                        >
                            Endereço: <br/>{adressUser} 
                        </p>

                        {/*fone */}
                        <p
                         className=" min-w-[230px] p-2 border-[2px] border-[#A0A0A0] rounded-md"
                        >
                            Número: <br/>{numberFone} 
                        </p>

                        {/*authorizations */}
                        <div
                         className="flex min-w-[230px]  gap-1.5 p-2 border-[2px] border-[#A0A0A0] rounded-md"
                        >
                            <p>Conta: </p>
                            {authorizations && (
                                <div
                                 className="flex gap-1"
                                >
                                    {arrayAuthorizations.map((a) => (
                                        <p
                                            key={a?.id}
                                        >
                                            {(a?.authorizarion).replace(" ", ",")}
                                        </p>
                                    ))}
                                </div>
                            )}

                        </div>
                </div>
            </div>

            {/*Form, to change the data */}
            <Link
                href={"/user/dataChange"}
                className="block w-max mx-auto mt-5 p-3 text-[white] bg-[#03859D] rounded-md"
                >
                    Alterar dados
            </Link>
        </>
    )
}