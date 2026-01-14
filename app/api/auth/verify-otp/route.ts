
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request : Request) {
    try {
        const { otp } = await request.json();

        if (!otp) {
            return NextResponse.json({
                message: "Please provide otp",
            }, {
                status: 400,
            });
        }

        // check if otp is valid
        const user = await prisma.user.findFirst({
            where: {
                otp: otp,
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "Invalid OTP",
            }, {
                status: 400,
            });
        }

        await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                isVerified: true,
            },
        });

        return NextResponse.json({
            message: "OTP verified successfully",
        }, {
            status: 200,
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