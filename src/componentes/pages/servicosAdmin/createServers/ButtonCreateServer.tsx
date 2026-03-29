
type buttonCreateServer = {
    click: () => void;
}

export default function ButtonCreateServer( {click} : buttonCreateServer){
    return(
        <>
            <div className="flex gap-4 justify-center"
                onClick={() => {
                    click()
                }}
            >
                <p>
                    Criar nova regra
                </p>

                <img
                    src={"/general/create.png"}
                    className="max-w-[30px] max-h-[30px]"
                />
            </div>
        </>
    )
}