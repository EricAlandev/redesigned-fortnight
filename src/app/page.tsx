'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from "react"; // 1. Import Suspense
import Header from "@/componentes/general/Header";
import HeaderDesktop from "@/componentes/general/HeaderDesktop";
import SearchBar from "@/componentes/pages/homePage/SearchBar";
import NumberPage from "@/componentes/pages/servicoPage/comments/NumberPage";
import RenderServices from "@/componentes/pages/servicosAdmin/services/RenderServices";
import useLogicalNumber from "@/componentes/skeletons/numberPage/logicalNumber";
import { useHomePage } from "@/hooks/useHomePage";
import { useRouter } from "next/navigation";

// 2. Create a separate component for the content
function HomeContent() {
  const router = useRouter();
  const { dados } = useHomePage();

  const {
    actualPage,
    quantityOfPages,
    setActualPage,
    arrayWithNumberPages,
    actualServices
  } = useLogicalNumber(dados);

  return (
    <div className="">
      <Header />
      <HeaderDesktop />
      <SearchBar
        enviar={(value) => {
          router.push(`/pesquisa?pesquisa=${value}`);
        }}
      />
      <div className="w-[83vw] mx-auto lg:max-w-[1100px]">
        <RenderServices dataService={actualServices} />
      </div>
      <NumberPage
        arrayWithNumberPagers={arrayWithNumberPages}
        setActualPage={setActualPage}
        actualPage={actualPage}
        quantityOfPages={quantityOfPages}
      />
    </div>
  );
}

// 3. The main export just wraps everything in Suspense
export default function Home() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomeContent />
    </Suspense>
  );
}