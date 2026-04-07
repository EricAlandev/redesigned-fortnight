import { CommentService } from "@/types/TypeService";
import { StarsRenderizer } from "./avalations/ImageStars";


export default function EsqComment({
    idUser,
    avaliacaoComentario,
    comentario,
    nomeUser
} : CommentService){

    return(
        <div
            className="w-[70vw] mx-auto p-2 bg-[#A0A0A0A0] rounded-md"
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

                {/*comment */}
                <StarsRenderizer
                    avaliation={avaliacaoComentario}
                />
                
                <p>
                    {comentario}
                </p>
            </div>
        </div>
    )
}