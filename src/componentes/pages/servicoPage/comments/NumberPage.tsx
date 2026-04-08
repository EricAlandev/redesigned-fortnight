import { CommentService } from "@/types/TypeService";

type NumberPage = {
    arrayWithNumberPagers: number[],
    setActualPage: any,
    actualPage: number,
    quantityOfPages: number
}


export default function NumberPage({
    arrayWithNumberPagers,
    setActualPage,
    actualPage,
    quantityOfPages
} : NumberPage){

    return(
        <>
            {/*Numbers of page comments */}
            {arrayWithNumberPagers.length > 0 && (
                    <div
                        className="flex justify-center gap-2 mt-2.5"
                    >
                        <button
                            onClick={() => {
                                    if(actualPage - 1 <= 0){
                                        setActualPage(actualPage);
                                    }

                                    else{
                                        setActualPage(actualPage - 1);
                                    }
                            }}
                            className="px-3 py-1 bg-[#A0A0A0] rounded-md text-[white]"
                        >
                            {`<`}
                        </button>

                        {arrayWithNumberPagers.map((number, index) => (
                            <>
                                <button
                                    key={index}
                                    onClick={() => {
                                        setActualPage(index + 1)
                                    }
                                        
                                    }
                                    className={`
                                            px-3 py-1 bg-[#A0A0A0] rounded-md 
                                            ${(index + 1) === actualPage ? "text-[white]" : "text-[gray]"}
                                        `}
                                >
                                    {number}
                                </button>
                            </>
                        ))}

                        <button
                            onClick={() => {
                                    if(actualPage + 1 > quantityOfPages){
                                        setActualPage(actualPage);
                                    }

                                    else{
                                        setActualPage(actualPage + 1);
                                    }
                            }}
                            className="px-3 py-1 bg-[#A0A0A0] rounded-md text-[white]"
                        >
                            {`>`}
                        </button>
                    </div>
            )}
        </>
    )
}