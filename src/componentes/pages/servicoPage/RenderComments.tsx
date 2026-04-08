import EsqComment from "@/componentes/skeletons/EsqComment"
import { CommentService } from "@/types/TypeService"
import { useState } from "react";
import { SwiperSlide , Swiper } from "swiper/react";
import type {Swiper as swiperType } from "swiper";


type RenderComments = {
    comments: CommentService[]
}

export default function RenderComments(
    {comments}
    : RenderComments
){

    const [swiperPage, setSwiperPage] = useState<swiperType | null>(null);
    //logical of generation of how many pages of comments gonna have;
    const [actualPage, setActualPage] = useState(1);
    

    const commentsPerPage = 3;
    //define the quantity of pages and ceil to define the quantity of pages
    const quantityOfPages = Math.ceil(comments.length / commentsPerPage);

    const arrayWithNumberPagers : number[] = []

    for(let i = 0; i < quantityOfPages; i++){
        arrayWithNumberPagers.push(i + 1);
    }

    const startIndex = (actualPage - 1) * commentsPerPage;
    const actualComments = comments.slice(startIndex, startIndex + commentsPerPage);

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

            {/*PUT LATER SWIPER SLIDE, it probrably gonna be better 
            */}
            <Swiper
                onSwiper={setSwiperPage}
            >
                <div
                    className="flex flex-col gap-2"
                >
                        {actualComments?.length > 0 && (
                            actualComments.map((c, i) => (
                                <>
                                    <SwiperSlide key={i}>
                                        <EsqComment
                                            idUser={c?.idUser}
                                            avaliacaoComentario={c?.avaliacaoComentario}
                                            comentario={c?.comentario}
                                            nomeUser={c?.nomeUser}
                                            dataAvaliation={c?.dataAvaliation}
                                        />
                                    </SwiperSlide>
                                </>
                            ))
                        )}
                
                </div>
            </Swiper>
                    {/*Numbers of page comments */}
                    {arrayWithNumberPagers.length > 0 && (
                    <div
                        className="flex justify-center gap-2 mt-2.5"
                    >
                        {arrayWithNumberPagers.map((number, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActualPage(index + 1)
                                    if(swiperPage){
                                        swiperPage.slideTo(0, 0);
                                    }
                                }
                                    
                                }
                                className="px-3 py-1 bg-[#A0A0A0] rounded-md text-[white]"
                            >
                                {number}
                            </button>
                        ))}
                </div>
            )}
        </div>
    )
}