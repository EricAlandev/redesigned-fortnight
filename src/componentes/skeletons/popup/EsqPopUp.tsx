
type popUp = {
    setPopUp: any,
    message?: string,
    type?: string
}

export default function EsqPopUp({
    setPopUp,
    message,
    type
} : popUp){

    return(
        <div>
            {/*Overlay */}
            <div 
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => {
                setPopUp('none');
            }}
            >
            </div>

            {/*popUp */}
            <div
             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[30vh] mx-auto z-10 bg-[white] rounded-md"
            >
                {/*Pop Up type */}
                <div
                 className={`
                    flex justify-end p-1
                    ${
                    type === 'sucess' 
                     ?
                        "w-full bg-[green] " 
                     :  
                        "w-full bg-[red] " 
                 }`}
                >
                    <img
                        src={"/general/closeW.png"}
                        onClick={() => {
                            setPopUp('none')
                        }}
                        className="mr-2"
                    />
                </div>

                {/*Body of PopuP */}
                <div
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[18px] text-center "
                >
                    {/*Tittle */}
                    {type === 'sucess' ? (
                        <p
                        >
                            Sucesso!
                        </p>
                    ) : type === 'error' ? (
                        <p>
                            Erro!
                        </p>
                    ) : (
                        <p>
                            Error deconhecido
                        </p>
                    )}

                    <p
                        className=" min-w-[300px]"
                    >
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}