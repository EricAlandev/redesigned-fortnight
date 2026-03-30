'use client'

import Header from "@/componentes/general/Header"
import SearchBar from "@/componentes/pages/homePage/SearchBar"
import RenderSearchServices from "@/componentes/pages/SearchPage/RenderSearchServices"
import { useHomePage } from "@/hooks/UseHomePage"
import { useSearchBar } from "@/hooks/UseSearchBar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function PesquisaPage(){

    const router = useRouter();
    const parameters = useSearchParams();
    const pesquisa = parameters.get("pesquisa");

    const {FetchSearch, quantityResult, resultServices} = useSearchBar();

    useEffect(() => {
        if(pesquisa && pesquisa !== null){
            FetchSearch(pesquisa);
        }
    }, [pesquisa]);

    return(
        <>
            <Header/>

            <SearchBar
                enviar={(value) => {
                        router.push(`/pesquisa?pesquisa=${value}`)
                 }}            />

            {/*Render of results */}
            <div
                className="w-[83vw] mx-auto"
            >
                <RenderSearchServices
                    quantity={quantityResult}
                    pesquisa={pesquisa}
                    dataService={resultServices}
                />
            </div>

        </>
    )
}