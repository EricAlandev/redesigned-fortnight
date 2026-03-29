
type esqPopUpDelete = {
    fecharPopup: () => void;
    deletar: () => void;
}

export default function EsqPopUpDelete({
    fecharPopup,
    deletar
} : esqPopUpDelete){
    

    return(
        <>
            <div className="fixed inset-0 bg-[black] opacity-70 "
            onClick={() => fecharPopup()}
            ></div >

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[35vh] bg-[white]">
                <img
                    src={"/general/close.png"}
                    className="absolute top-3 right-3 p-1 border-[2px] rounded-[50%]"
                />
                
                {/*popUp message */}
                <div className="mt-25">
                    {/*Message */}
                    <p className="text-[18px] text-center">
                        Deseja deletar o serviço?
                    </p>

                    {/*Yes or No for the deletion */}
                    <div className="flex justify-center gap-2 mt-3">
                        <button
                        className="min-w-[110px] p-2 text-[18px] bg-[#A0A0A0]  rounded-md"
                        onClick={() => fecharPopup()}
                        >
                            Não
                        </button>

                        <button
                        className="min-w-[110px] p-2 text-[18px] text-[#F0F0F0]  rounded-md bg-[green]"
                        onClick={() => deletar()}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}