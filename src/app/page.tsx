'use client'

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import SearchBar from "@/componentes/pages/homePage/SearchBar";
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import { useHomePage } from "@/hooks/UseHomePage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  
  const [idPage, setIdPage] = useState(1);

  const router = useRouter();
  const {dados} = useHomePage();

  //logical of the quantity of pages per result;
  const resultsPerPage = 2
  const arrayPages: number[] = []

  const quantityPages = Math.ceil(dados.length/resultsPerPage);
      
  for(let i = 0; i < quantityPages; i++){
    arrayPages.push(i + 1);
  }

  const startIndex = (idPage - 1) * resultsPerPage;
  const pageServices = dados.slice(startIndex, startIndex + resultsPerPage);
  

  return (
    <div className="">
      <Header/>
      <HeaderDesktop/>

        {/*SearchBar */}
        <SearchBar
           enviar={(value) => {
              router.push(`/pesquisa?pesquisa=${value}`)
           }}
        />

        {/*Render of services */}
        <div
        className="w-[83vw] mx-auto lg:max-w-[1100px]"
        >
          <RenderServices
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
    </div>
  );
}
