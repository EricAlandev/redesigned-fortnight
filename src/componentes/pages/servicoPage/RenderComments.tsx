import EsqComment from "@/componentes/skeletons/EsqComment"
import { CommentService } from "@/types/TypeService"

type RenderComments = {
    comments: CommentService[]
}

export default function RenderComments(
    {comments}
    : RenderComments
){

    return(
        <div
            className="max-w-[87vw] mx-auto"
        >
            {/*line just for stetics */}
            <hr
                className="mt-3 mb-3 border-[#C1C1C1C1] md:hidden"
            />


            <h2
                className="text-center text-[18px]"
            >
                Comentários mais recentes
            </h2>

            {/*line just for stetics */}
                        <hr
                className="mt-3 mb-3 border-[#C1C1C1C1] md:hidden"
            />

            {/*PUT LATER SWIPER SLIDE, it probrably gonna be better */}
            <div
                className="flex flex-col gap-2"
            >
                {comments?.length > 0 && (
                    comments.map((c) => (
                        <EsqComment
                            key={c?.id}
                            idUser={c?.idUser}
                            avaliacaoComentario={c?.avaliacaoComentario}
                            comentario={c?.comentario}
                            nomeUser={c?.nomeUser}
                        />
                    ))
                )}
            </div>
        </div>
    )
}