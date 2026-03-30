'use client'

import Header from "@/componentes/general/Header";
import SearchBar from "@/componentes/pages/homePage/SearchBar";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import { useHomePage } from "@/hooks/UseHomePage";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  const {dados} = useHomePage();
  

  return (
    <div className="">
      <Header/>

        {/*SearchBar */}
        <SearchBar
           enviar={(value) => {
              router.push(`/pesquisa?pesquisa=${value}`)
           }}
        />

        {/*Render of services */}
        <div
        className="w-[83vw] mx-auto "
        >
          <RenderServices
            dataService={dados}
          />
        </div>
      
    </div>
  );
}
