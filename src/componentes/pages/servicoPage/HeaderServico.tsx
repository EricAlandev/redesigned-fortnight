import { services } from "@/types/TypeService";

export default function HeaderServico({

    nome_servico,
    preco_desconto,
    preco,
    descricao
}: services){

    let imageService;

    switch(nome_servico){
        case "hidratação":
            imageService = "/services/HydrateSkin.png"
            break
        case "tosa higiênica":
            imageService = "/"
            break
        default:
            imageService = "/services/HydrateSkin.png"
            break
    }


    return(
        <>
            <div className="">
                <img
                    src={imageService}
                />

                {/*bottom image */}
                <div
                 className="w-[87vw] mx-auto mt-2.5 mb-3"
                >
                        <p
                            className="text-[22px]"
                        >
                            {nome_servico}
                        </p>

                        <p>
                            {descricao}
                        </p>

                        <div>
                            {preco_desconto ? (
                                <>
                                    <p
                                    className="text-[15px] line-through"
                                    >
                                        R${preco}
                                    </p>

                                    <p className="text-[18px] ">
                                        R${preco_desconto}
                                    </p>
                                </>
                            ): (
                                <p className="text-[18px] ">
                                    R${preco}
                                </p>
                            )}
                        </div>
                </div>
            </div>
        </>
    )
}