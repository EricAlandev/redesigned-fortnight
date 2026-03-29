import { arrayAuthorizations } from "@/types/TypeAuthorizations";


//logical to know if the user its actual a admin
export async function VerifyAuthorization(authorizations: arrayAuthorizations[]){
    let itsAdmin = false;
    
    const admin = authorizations.find((s) => s.authorization.authorization === process.env.NEXT_PUBLIC_AUTHORIZATION);

    if(admin){
        itsAdmin = true;
    }

    return itsAdmin;
}