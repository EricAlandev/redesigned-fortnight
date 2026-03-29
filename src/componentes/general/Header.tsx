'use client'

import { useGlobal } from "@/lib/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Header(){

    const {user, token, logOut} = useGlobal();

    const [dropper, setDropper] = useState(false);
    const [admin, setAdmin] = useState(false);

    console.log(user);

    return(
        <div className="relative w-full h-auto p-2 bg-[black]">
            <img
                src={"/general/Hamburguer.png"}
                onClick={() => setDropper(!dropper)}
                className="w-full h-full min-w-[25px] min-h-[25px] max-w-[45px] max-h-[45px] z-0"
            />

            <AnimatePresence>
                {dropper === true && (
                    <div className="z-50">

                        {/*Overlay */}
                        <div className="fixed inset-0 bg-[black] opacity-80 z-0"
                        onClick={() => setDropper(false)}
                        ></div>

                        {/*Header */}
                        <motion.nav 
                            className="absolute top-0 left-0 w-[50vw] h-screen bg-[#A0A0A0] z-10"
                            initial={{x: -120}}
                            animate={{x: 0}}
                            exit={{x: -25}}
                            transition={{duration: 0.2}}
                        >
                            
                            <ul
                             className="flex flex-col text-[white] text-[18px] text-center border-b-[2px]"
                            >
                                {/*Name of user */}
                                {(user && token ) && (
                                    <>
                                        <li
                                        className="mt-5 pb-2 border-[white] border-b-[2px]"
                                        >
                                            {user?.nome}
                                        </li>
                                    </>
                                )}

                                {/*Going to the homepage*/}
                                <>
                                    <Link
                                    href={"/"}
                                    className="mt-5 pb-2 border-[white] border-b-[2px] text-[white]"
                                    >
                                        <li>
                                            Início
                                        </li>
                                    </Link>
                                </>

                                {user && token ? (
                                <>
                                    {/*If user its admin */}
                                    {user.admin === true && (
                                        <li
                                        className={`mt-5 pb-2 border-[white] 
                                           border-b-[2px] text-[white]
                                        `}
                                        >
                                            <li
                                                onClick={() => {
                                                    setAdmin(!admin)
                                                }}
                                            >
                                                Serviços
                                            </li>
                                            
                                            {/*DropBar of tre services admin */}
                                            <AnimatePresence>
                                            {admin && (
                                                <>
           
                                                    <motion.div
                                                  initial={{y: -170, x:76}}
                                                  animate={{y: 0, x:76}}
                                                  exit={{y: -170, x:76}}
                                                  transition={{duration: 0.2}}
                                                 className="absolute  top-27 right-[-75px]  flex flex-col gap-2 p-2.5 bg-[#A0A0A0] text-[15px] rounded-md z-20"
                                                >
                                                                                           <img
                                                    src={"/general/triangle.png"}
                                                    className="fixed top-7 left-[-17px] rotate-150 max-h-[25px] z-0"
                                                    />

                                                    <Link
                                                        href={"/servicos/admin/painelAdmin"}
                                                        className={`
                                                                mx-auto pl-2 pb-1 pr-2
                                                                border-b-[2px] text-[white]
                                                            `}
                                                        >
                                                        Painel Admin
                                                        </Link>

                                                            <Link
                                                                href={"/servicos/admin/servicesList"}
                                                                className={`
                                                                    mx-auto
                                                                    pl-2 pb-1 pr-2
                                                                    border-b-[2px] text-[white]
                                                                `}
                                                            >
                                                            Lista Servicos
                                                            </Link>
                                                        </motion.div>
                                                </>
                                            )}
                                            </AnimatePresence>
                                        </li>
                                    )}
                                    
                                    <p
                                        onClick={() => {
                                            logOut()
                                        }}

                                        className="mt-5 pb-2  border-[white] ]"
                                    >
                                        Sair
                                    </p>
                                </>
                                ) : (
                                <>
                                    <Link
                                    href={"/login"}
                                    className="block mt-5 pb-2"
                                    onClick={() => setDropper(false)}
                                    >
                                        Entrar
                                    </Link>
                                </>
                                )} 
                            </ul>
            
                        </motion.nav>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}