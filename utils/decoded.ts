import { User } from "@prisma/client"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const decoded = async () => {
    const token = (await cookies()).get("token")?.value ;

    let user: User | null = null;

    if(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as User;
            user = decodedToken;
        }   
        catch(error){
            user = null
        }
    }

    return user;
}