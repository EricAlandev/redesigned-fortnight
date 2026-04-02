'use client'

import Header from "@/componentes/general/Header";
import HeaderUser from "@/componentes/pages/UserPage/HeaderUser";
import { useGlobal } from "@/lib/GlobalContext";
import { useEffect } from "react";


export default function PageUser(){

    const {user} = useGlobal();

    useEffect(() => {
    }, [user])

    return(
        <>
            <Header/>

            {user && (
                <div
                 className="w-[83vw] mx-auto"
                >
                    <HeaderUser
                        nome={user?.nome}
                        endress={user?.endress}
                        number={user?.number}
                        authorizations={user?.authorizations}
                    />
                </div>
            )}
        </>
    )
}