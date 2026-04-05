
type ImageChoose = {
    avaliation: string,
    chooseStars: (index: string) => void
}

export default function ImageRenderizator({
    avaliation, 
    chooseStars
} : ImageChoose){

    let stars = Number(avaliation);
    const arrayImage = [];
    
    //basic verification
    if(stars < 0 || stars > 5){
        stars = 0;
    }

    //verify how many stars they have, and put the 
    else if(stars >= 0 || stars <=5 ){
        for(let i = 0; i < 5; i++){
            //2
            if(stars === 0){
                arrayImage.push('empty');
            }

            //stars, stars, empty, empty, empty
            else if(stars > 0 && i < stars){
                arrayImage.push('stars');
            }

            else if(stars > 0 && i >= stars){
                arrayImage.push('empty');
            }
        }
    }

    return(
        <>
            {arrayImage.length >= 0 && (
                //Renderize full stars or empty by the actualArray;
                //If stars = full stars
                //else = empty stars;
                arrayImage.map((a, i) => {
                    let indexString = String(i + 1);
                    let imageValue = "/avaliations/EmptyStar.png"

                    if(a === 'stars'){
                        imageValue = "/avaliations/FullStar.png"
                    }

                    return(
                        <img
                            src={imageValue}
                            onClick={() => {
                                    //if the person click in the same star, gonna remove this star.
                                    if(indexString === avaliation && stars > 0){
                                        chooseStars(String(stars - 1));
                                    }

                                    else{
                                        chooseStars(indexString)
                                    }

                            }}
                            className="max-w-[40px]"
                        />
                    )
                })
            )}
        </>
    )
}
