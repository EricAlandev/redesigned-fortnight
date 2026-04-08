
import { CommentService } from "@/types/TypeService"
import { useState } from "react";
import NumberPage from "./comments/NumberPage";
import CommentsRender from "./comments/CommentsRender";


type RenderComments = {
    comments: CommentService[]
}

export default function RenderComments(
    {comments}
    : RenderComments
){
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

                {/*Render of comments */}
                <CommentsRender
                    comments={actualComments}
                />

                {/*Render of numbers */}
                <NumberPage
                    arrayWithNumberPagers={arrayWithNumberPagers}
                    setActualPage={setActualPage}
                    actualPage={actualPage}
                    quantityOfPages={quantityOfPages}
                />
                    
        </div>
    )
}