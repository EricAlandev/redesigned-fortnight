
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

            if(stars === 0){
                arrayImage.push('empty');
            }

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
                            className="max-w-[25px]"
                        />
                    )
                })
            )}
        </>
    )
}

type Avaliation = {
    avaliation: string
}
export function StarsRenderizer({avaliation}: Avaliation){

    const [firstValue, afterPoint] = avaliation.split(".");

    //array ho gonna decide how many stars have.
    let arrayStars : string[] = [];

    //Just the first number before the dot(,)
    let numberStars = Number(firstValue);

    //define if the half star was implemented
    let halfStarImplemented = false;
    
    for(let i = 0; i < 5; i++){
        //verify first the fixed number and give a full star
        if(i < numberStars){
            arrayStars.push('full');
        }

        //verify the rest and gives a half star
        else if(Number(afterPoint) >= 0.5 && halfStarImplemented === false){
            arrayStars.push('half');

            //with the halfStar = true, only gonna trigger one time
            halfStarImplemented = true;
        }

        else{
            arrayStars.push('empty');
        }
    }

    return(
        <>
            {arrayStars?.length > 0 && (
                <div
                  className="flex"
                >
                    {arrayStars.map((star) => {

                            let pathStar = '/avaliations/EmptyStar.png'

                            if(star === 'full'){
                                pathStar = '/avaliations/FullStar.png'
                            }

                            else if(star === 'half'){
                                pathStar = '/avaliations/halfStar.png'
                            }

                            return(
                                <>
                                    <img
                                        src={pathStar}
                                        className="max-w-[25px]"
                                    />
                                </>
                            )
                    })}
                </div>
            )}
        </>
    )
}
