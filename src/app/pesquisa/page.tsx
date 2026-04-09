'use client'

import Header from "@/componentes/general/Header"
import HeaderDesktop from "@/componentes/general/HeaderDesktop"
import SearchBar from "@/componentes/pages/homePage/SearchBar"
import RenderSearchServices from "@/componentes/pages/SearchPage/RenderSearchServices"
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage"
import { useHomePage } from "@/hooks/UseHomePage"
import { useSearchBar } from "@/hooks/UseSearchBar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PesquisaPage(){

    const [idPage, setIdPage] = useState(1);
    const router = useRouter();
    const parameters = useSearchParams();
    const pesquisa = parameters.get("pesquisa");

    const {FetchSearch, quantityResult, resultServices} = useSearchBar();

    //logical of the quantity of pages per result;
    const resultsPerPage = 2
    const arrayPages: number[] = []

    let quantityPages;
    let startIndex;
    let pageServices;

    if(resultServices?.length > 0){
        quantityPages = Math.ceil(resultServices.length/resultsPerPage);
        
        for(let i = 0; i < quantityPages; i++){
            arrayPages.push(i + 1);
        }

        startIndex = (idPage - 1) * resultsPerPage;
        pageServices = resultServices.slice(startIndex, startIndex + resultsPerPage);
    }
    

    useEffect(() => {
        if(pesquisa && pesquisa !== null){
            FetchSearch(pesquisa);
        }
    }, [pesquisa]);

    return(
        <>
            <Header/>
            <HeaderDesktop/>

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
                    dataService={pageServices}
                />
            </div>

            {/*Render of the quantity of pages */}
            <NumberPage
                arrayWithNumberPagers={arrayPages}
                setActualPage={setIdPage}
                actualPage={idPage}
                quantityOfPages={quantityPages}
            />

        </>
    )
}