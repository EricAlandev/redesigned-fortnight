import { StarsRenderizer } from "@/componentes/skeletons/avalations/ImageStars";
import { services } from "@/types/TypeService";

export default function HeaderServico({

    nome_servico,
    preco_desconto,
    preco,
    avaliacao
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

    console.log(typeof(avaliacao), "type of avaliation");
    return(
        <>
            <div className=" md:max-w-[1200px] md:mx-auto md:flex md:gap-80">
                <img
                    src={imageService}
                    className="md:w-[27vw]"
                />

                {/*bottom image */}
                <div
                 className="flex flex-col gap-2 w-[87vw] mx-auto mt-2.5 mb-3"
                >
                        <p
                            className="font-semibold text-[22px] md:text-[25px] "
                        >
                            {nome_servico}
                        </p>

                        {/*Avaliaton */}
                        <div
                          className="flex items-center gap-2"
                        >
                            <StarsRenderizer
                                avaliation={avaliacao}
                           />
                           

                           <p
                                className="text-[18.5px]"
                           >
                                {avaliacao}
                           </p>
                        </div>

                        <div>
                            {preco_desconto ? (
                                <div className="leading-5.5">
                                    <p
                                    className="text-[15px] line-through md:text-[13px]"
                                    >
                                        R${preco}
                                    </p>

                                    <p className="text-[18px] md:text-[22px]">
                                        R${preco_desconto}
                                    </p>
                                </div>
                            ): (
                                <p className="text-[18px] md:text-[22px]">
                                    R${preco}
                                </p>
                            )}
                        </div>
                </div>
            </div>
        </>
    )
}