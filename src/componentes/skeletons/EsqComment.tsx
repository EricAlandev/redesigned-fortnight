import { CommentService } from "@/types/TypeService";
import { StarsRenderizer } from "./avalations/ImageStars";


export default function EsqComment({
    idUser,
    avaliacaoComentario,
    comentario,
    nomeUser,
    dataAvaliation
} : CommentService){

    return(
        <div
            className="w-[70vw] mx-auto p-3  rounded-md bg-[#D1D1D1] lg:max-w-[400px]"
        >
            <div
                className="max-w-[220px] mx-auto flex flex-col gap-2"
            >
                {/*Image +  name*/}
                <div
                    className="flex items-center gap-8 
                    "
                >
                    <img
                        src={"/general/user.png"}
                        className="max-w-[35px]"
                    />

                    <p>
                        {nomeUser}
                    </p>

                </div>

                {/*comment  + date*/}
                <div>
                    <StarsRenderizer
                        avaliation={avaliacaoComentario}
                        sizeStar={"max-w-[20px]"}
                    />

                    <p
                        className="mt-2.5 text-[14px]"
                    >
                        Avaliado em {dataAvaliation}
                    </p>
                </div>
                
                <p>
                    {comentario}
                </p>
            </div>
        </div>
    )
}