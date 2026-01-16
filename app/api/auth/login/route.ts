
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
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

        if(!user.isVerified){
            return NextResponse.json({
                message : "Please verify your email first"
            }, {
                status : 400
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password as string);

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
            firstName : user.firstName,
            role : user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn : "7d"
        })

        const response = NextResponse.json({
            message : "Login successful",
        }, {
            status : 200
        });

        response.cookies.set("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            path : "/",
            maxAge : 60 * 60 * 24 * 30
        });

        return response;
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