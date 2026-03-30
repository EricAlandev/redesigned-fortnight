'use client'

import Header from "@/componentes/general/Header";
import FormCadastro from "@/componentes/pages/cadastro/FormCadastro";
import UseLoginRegister from "@/hooks/UseLoginRegister";

export default function CadastroPage(){

    const {register} = UseLoginRegister();

    return(
        <div className="max-w-[400px]">
            <Header

            />
            
            <div className="pt-20.5">
                <FormCadastro
                    enviar={register}    
                />
            </div>

        </div>
    )
}