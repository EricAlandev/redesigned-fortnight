'use client'

import { useState } from "react"

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

    const handleChanger = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setData((d) => (
            {
                ...d, [name] : value
            }
        ))
    }

    return(
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    enviar(data?.search);
                    
                }}
                className="relative mx-auto w-[83vw]"
            >
                <input
                    name="search"
                    value={data.search}
                    onChange={handleChanger}
                    className="w-[83vw] max-h-[40px] mt-5 p-2 bg-[#A0A0A0] rounded-md"
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