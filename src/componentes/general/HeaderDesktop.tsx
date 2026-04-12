'use client'

import { useGlobal } from "@/lib/GlobalContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function HeaderDesktop(){

    const {user, token, logOut} = useGlobal();
    const [admin, setAdmin] = useState(false);

    const router = useRouter();

    return(
        <div className="hidden lg:block p-3 bg-[#03859D] z-50 min-h-[90px]">
                
                {/*Div pai */}
                <div
                    className="flex items-center max-w-[1100px] mx-auto gap-2"
                >
                    {/*Logo of the CrPet */}
                    <Link
                        href={"/"}
                    >
                        <img
                            src={"/services/Logo.png"}
                            className="absolute top-[-12.5px] max-w-[100px] max-h-[120px]"
                        />
                    </Link>

                    <nav
                        className="mt-5 ml-25"
                    >
                        <ul
                                className="flex lg:max-w-[1100px] mx-auto gap-4 text-[white] text-[18px] text-center"
                                >
                                    {/*Name of user */}
                                    {(user && token ) && (
                                        <>
                                            <Link
                                            href={"/user"}
                                            className=" pb-1 border-[white] border-b-[2px] cursor-pointer"
                                            >
                                                {user?.nome}
                                            </Link>
                                        </>
                                    )}

                                    {/*Going to the homepage*/}
                                    <>
                                        {(!user && !token) && (
                                                <Link
                                                    href={"/login"}
                                                    className=" border-[white] border-b-[2px] text-[white] cursor-pointer"
                                                >
                                                    Entrar
                                                </Link>
                                        )}

                                        <Link
                                        href={"/"}
                                        className=" border-[white] border-b-[2px] text-[white] cursor-pointer"
                                        >
                                            <li>
                                                Início
                                            </li>
                                        </Link>
                                    </>

                                    {user && token && (
                                    <>
                                        {/*If user its admin */}
                                        {user.admin === true && (
                                            <li
                                            className={`
                                                border-[white] border-b-[2px]
                                             text-[white] cursor-pointer
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
                                                    <div 
                                                     className="relative"
                                                    >
                                                    
                                                    {/*style image of triangle */}
                                                    <img
                                                        src={"/general/triangle.png"}
                                                        className="absolute top-[5px]
                                                        max-w-[35px] 
                                                        "
                                                    />
                                                    
                                                    {/*Dropdown */}
                                                    <motion.div
                                                    initial={{y: -20, x:76}}
                                                    animate={{y: 0, x:76}}
                                                    exit={{y: -20, x:76}}
                                                    transition={{duration: 0.2}}
                                                    className="absolute top-4 left-[-75px] flex flex-col p-2 bg-[#03859D] rounded-md z-50"
                                                    >
                                                                                        
                                                        <Link
                                                            href={"/servicos/admin/painelAdmin"}
                                                            className="block hover:text-[19px] 
                                                            hover:border-b-[2px]
                                                            duration-150 cursor-pointer"
                                                        >
                                                            Painel Admin
                                                        </Link>

                                                        <Link
                                                        href={"/servicos/admin/servicesList"}
                                                        className="block hover:text-[19px] 
                                                        hover:border-b-[2px]
                                                        duration-150 cursor-pointer"
                                                        >
                                                                Lista Servicos
                                                        </Link>
                                                            </motion.div>
                                                    </div>
                                                )}
                                                </AnimatePresence>
                                            </li>
                                        )}
                                        
                                        <p
                                            onClick={() => {
                                                logOut();
                                                router.push("/")
                                            }}

                                            className=" border-b-[2px] cursor-pointer"
                                        >
                                            Sair
                                        </p>
                                    </>
                                    )}
                                </ul>
                    </nav>
                </div>
        </div>
    )
}