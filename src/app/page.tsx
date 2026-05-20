'use client'

export const dynamic = 'force-dynamic';

import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import SearchBar from "@/componentes/pages/homePage/SearchBar";
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import useLogicalNumber from "@/componentes/skeletons/numberPage/logicalNumber";
import { useHomePage } from "@/hooks/UseHomePage";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const {dados} = useHomePage();

  const {
        actualPage, 
        quantityOfPages, 
        setActualPage, 
        arrayWithNumberPages, 
        actualServices
  } = useLogicalNumber(dados)
  

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
    </div>
  );
}
