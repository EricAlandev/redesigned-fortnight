'use client'

import Header from "@/componentes/general/Header"
import HeaderDesktop from "@/componentes/general/HeaderDesktop"
import SearchBar from "@/componentes/pages/homePage/SearchBar"
import RenderSearchServices from "@/componentes/pages/SearchPage/RenderSearchServices"
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage"
import useLogicalNumber from "@/componentes/skeletons/numberPage/logicalNumber"
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

      const {
            actualPage, 
            quantityOfPages, 
            setActualPage, 
            arrayWithNumberPages, 
            actualServices
      } = useLogicalNumber(resultServices)

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
                className="w-[83vw] mx-auto lg:max-w-[1100px]"
            >
                <RenderSearchServices
                    quantity={quantityResult}
                    pesquisa={pesquisa}
                    dataService={actualServices}
                />
            </div>

            {/*Render of the quantity of pages */}
            <NumberPage
                arrayWithNumberPagers={arrayWithNumberPages}
                setActualPage={setActualPage}
                actualPage={actualPage}
                quantityOfPages={quantityOfPages}
            />

        </>
    )
}