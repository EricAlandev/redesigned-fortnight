
import jwt from 'jsonwebtoken'

//function to verify the token of the user;
export const VerifyToken = async(req: Request) => {

    try{
        const Authorization = req.headers.get("Authorization");

        if(!Authorization || !Authorization.startsWith("Bearer")){
            throw new Error("Authorization column dosn't exists")
        }

        const token = Authorization.split(" ")[1];

        const tokenVerify = await jwt.verify(token, process.env.JWT_SECRET as string)

        return tokenVerify;
    }

    catch(error){
        throw new Error("Token not authentificaded");
    }
}