import jwt from 'jsonwebtoken'

//function to verify the token of the user;
export const VerifyToken = async(req: Request) => {

    try{
        const Authorization = req.headers.get("Authorization");

        if(!Authorization || !Authorization.startsWith("Bearer")){
            throw new Error("Authorization column dosn't exists")
        }

        const token = Authorization.split(" ")[1];

        const tokenVerify = await jwt.verify(token, process.env.JWT_SECRET as string);

        return tokenVerify;
    }

    catch(error){   
        throw new Error("Sua sessão expirou! \n Logue novamente!");
    }
}

//function to verify the token of the user from the worker;
export const VerifyTokenFromWorker = async(token: string) => {

    try{
        const tokenVerify = await jwt.verify(token, process.env.JWT_SECRET as string);

        return tokenVerify;
    }

    catch(error){   
        throw new Error("Sua sessão expirou! \n Logue novamente!");
    }
}


//verify with out breaking the application
export const verifyTokenWithOutBreking = async(req: Request) => {

    try{
        const Authorization = req.headers.get("Authorization");

        if(!Authorization || !Authorization.startsWith("Bearer")){
            throw new Error("Authorization column dosn't exists")
        }

        const token = Authorization.split(" ")[1];

        const tokenVerify = await jwt.verify(token, process.env.JWT_SECRET as string);

        return tokenVerify;
    }

    catch(error){   
        console.log("user dosn't have token");
        return 0
    }
}
