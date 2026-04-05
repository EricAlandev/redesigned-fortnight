'use client'

import ImageRenderizator from "@/componentes/skeletons/avalations/ImageStars";
import { DataAvaliation } from "@/types/TypeAvaliation";
import { useState } from "react"

export default function PutComent(){

    const [data, setData] = useState<DataAvaliation>({
        avaliation: "",
        text: ""
    });

    const handleChanger = async(e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setData((d) => ({
            ...d, [name] : value
        }))
    }

    return(
        <div
         className="w-[87vw] mx-auto mt-2.5 mb-3 md:flex md:flex-col  md:max-w-[1200px] md:mx-auto md:mt-5 "
        >
            <p
              className=""
            >
                Avalie um produto
            </p>

            <form

                className=""
            >
                {/*Avaliation value */}
                <div
                  className="flex max-w-[120px] mt-2 mb-2"
                >
                    <ImageRenderizator
                        avaliation={data.avaliation}
                        chooseStars={(stars) => {
                            setData((d) => ({
                                ...d, avaliation : stars
                            }))
                        }}
                    />
                </div>

                {/*message of the avaliation */}
                <textarea
                    name="text"
                    value={data?.text}
                    onChange={handleChanger}
                    placeholder="Bote um comentário"
                    className="w-full min-h-[80px] max-h-[80px] mt-2 p-3 bg-[#D1D1D1] rounded-md"
                />
            </form>
        </div>
    )
}