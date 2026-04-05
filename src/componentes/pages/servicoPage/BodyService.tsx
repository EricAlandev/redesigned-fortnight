

type bodyService = {
    descricao: string
}

export default function BodyService({
    descricao
}:bodyService){

    return(
        <div
            className="w-[87vw] mx-auto mt-2.5 mb-3 md:flex md:flex-col  md:max-w-[1200px] md:mx-auto md:mt-5 "
        >

            
            {/*Description */}
            <div>
                {/*line just for stetics */}
                <hr
                        className="mt-3 mb-3 border-[#C1C1C1C1]"
                />

                <h2
                    className="w-max pb-1 border-b-[1px] text-[18px] md:text-[22px]"
                >
                    Descrição
                </h2>

                <div
                className="md:flex md:items-center md:gap-50"
                >
                    <p
                    className="mt-1 md:flex md:flex-col  md:text-[18.5px]"
                    >
                        {descricao} 
                    </p>
                </div>
            </div>

            {/*Methods of paymente */}
            <div
             className="mt-3 p-0.5 rounded-md md:flex md:flex-col md:items-center md:w-[27vw] md:mx-auto md:border-[2px] md:border-[#A0A0A0] md:rounded-md"
            >
                    {/*line just for stetics */}
                    <hr
                        className="mt-3 mb-3 border-[#C1C1C1C1] md:hidden"
                    />

                    <h2
                     className="w-max pb-1 border-b-[1px] text-[18px] md:text-[21px]"
                    >
                        Opções de pagamento
                    </h2>

                    {/*credit card*/}
                    <div
                     className="flex items-center gap-2 mt-2"
                    >
                        
                        <img
                            src={"/OptionsPayment/card.png"}
                            className="w-[8vw] md:max-w-[50px] md:h-auto"
                        />
                        
                        <p
                         className="min-w-[80px] text-[16px] md:text-[17.5px]"
                        >
                            Cartão
                        </p>
                    </div>

                {/*money*/}
                <div
                    className="flex items-center gap-2 "
                >

                    <img
                            src={"/OptionsPayment/Money.png"}
                            className="w-[8vw] md:max-w-[50px] md:h-auto"
                    />

                    <p
                        className="min-w-[80px] text-[16px] md:text-[17.5px]"
                    >
                            Dinheiro
                    </p>
                </div>
            </div>
        </div>
    )
}