

export const PhotoImage = async(campo: string) => {

    let imageService;

    switch(campo){
        case "hidratação":
            imageService = "/services/HydrateSkin.png"
            break
        case "tosa higiênica":
            imageService = "/"
            break
        default:
            imageService = "/services/HydrateSkin.png"
            break
    }

    return imageService
}