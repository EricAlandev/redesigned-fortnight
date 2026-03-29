'use client'

import Header from "@/componentes/general/Header";
import FormCadastro from "@/componentes/pages/cadastro/FormCadastro";
import { registerFunction } from "@/services/services/loginRegisterService";
import { dadoCadastro } from "@/types/TypeLoginCadastro";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react"

export default function CadastroPage(){

    const register = async(dadoCadastro: dadoCadastro) => {
        try{
            console.log(dadoCadastro);
            const regi = await registerFunction(dadoCadastro);
        }

        catch(error){
            console.log(error);
        }
    }

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