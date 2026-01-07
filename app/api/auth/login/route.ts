
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: Request, response: Response) {
    try{

        const { email, password } = await request.json();
        

        if(!email || !password){
            return NextResponse.json({
                error : "Email or password is missing",
                message : "Please provide email and password"
            }, {
                status : 400
            })
        }

        const user = await prisma.user.findUnique(
            {
                where : {
                    email : email
                }
            }
        )

        if(!user){
            return NextResponse.json({
                message : "Please provide valid email and password"
            }, {
                status : 400
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return NextResponse.json({
                message : "Please provide valid email and password"
            }, {
                status : 400
            })
        }

        const payload = {
            id : user.id,
            email : user.email,
            firstName : user.firstName
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn : "1h"
        })



        if(!user){
            return NextResponse.json({
                message : "Please provide valid email and password"
            }, {
                status : 400
            })
        }


        return NextResponse.json({
            message : "Login successful",
            data : {
                token : token
            }
        }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            error : error,
            message : "Something went wrong"
        }, {
            status : 500
        })
    }
}