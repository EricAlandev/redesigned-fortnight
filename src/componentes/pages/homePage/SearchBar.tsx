'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type SearchValue = {
    search: string
}

type SearchBarPage = {
    enviar: (search: string) => void
}

export default function SearchBar({
    enviar
} : SearchBarPage){

    const [data, setData] = useState<SearchValue>({search: ""});
    const searchParams = useSearchParams();
    const pesquisa = searchParams.get("pesquisa");

    const handleChanger = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setData((d) => (
            {
                ...d, [name] : value
            }
        ))
    }

        //verify the normal value
        useEffect(() => {
        if(pesquisa){
            setData((s) => (
                {
                    ...s, search: pesquisa
                }
            ))
        }
    }, [pesquisa]);

    return(
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    enviar(data?.search);
                    
                }}
                className="relative mx-auto w-[83vw] md:max-w-[1200px] lg:max-w-[1100px] "
            >
                <input
                    name="search"
                    value={data.search}
                    onChange={handleChanger}
                    className="w-[83vw] max-h-[40px] mt-5 p-2 bg-[#A0A0A0] 
                    rounded-md md:w-full"
                />
                
                {/*Visual button */}
                <button
                    type="submit"
                >
                    <img
                        src={"/general/lupa.png"}
                        className="absolute max-h-[40px] top-5 right-0 p-1.5 bg-[#A0A0A0] border-l-[0.5px] border-[#F1F1F1] rounded-r-[10px]"
                    />
                </button>
            </form>
        </>
    )
}