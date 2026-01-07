
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { data } from "react-router-dom";

export async function POST(request: Request, response: Response) {
    try {
        const { email, password, firstName, lastName } = await request.json();

        console.log(email, password, firstName, lastName);

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({
                message: "Please provide email, password, firstName, lastName",
            }, {
                status: 400,
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            return NextResponse.json({
                message: "User already exists",
            }, {
                status: 400,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
            },
        });

        return NextResponse.json({
            message: "User created successfully",
            data : {
                id : newUser.id,
                email : newUser.email,
                firstName : newUser.firstName,
                lastName : newUser.lastName
            }
        }, {
            status: 201,
        });
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