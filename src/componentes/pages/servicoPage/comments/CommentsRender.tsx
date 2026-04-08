import { CommentService } from "@/types/TypeService";
import EsqComment from "@/componentes/skeletons/EsqComment"

type RenderComments = {
    comments: CommentService[]
}

export default function CommentsRender({comments} : RenderComments){

    return(
        <>
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

            {/*PUT LATER SWIPER SLIDE, it probrably gonna be better 
            */}
                <div
                    className="flex flex-col gap-2 min-h-[470px] max-h-[470px]"
                >
                        {comments?.length > 0 && (
                            comments.map((c, i) => (
                                <>
                                        <EsqComment
                                            idUser={c?.idUser}
                                            avaliacaoComentario={c?.avaliacaoComentario}
                                            comentario={c?.comentario}
                                            nomeUser={c?.nomeUser}
                                            dataAvaliation={c?.dataAvaliation}
                                        />
                                </>
                            ))
                        )}
                </div>
        </>
    )
}