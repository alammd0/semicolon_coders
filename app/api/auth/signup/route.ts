
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/SendEmail";
import { otpEmailTemplate } from "@/lib/emailTemplates/otpEmail";

export async function POST(request: Request, response: Response) {
    try {
        const { email, password, firstName, lastName } = await request.json();

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


        // create OTP for user  -> 6 digits
        const otp  = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(new Date().getTime() + 10 * 60 * 1000);
        
        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                otp: otp,
                expiresAt: otpExpiry,
                isVerified: false
            },
        });

        await sendEmail(email, "Verify your email", otpEmailTemplate(otp));

        return NextResponse.json({
            message: "OTP sent successfully, Please check your email",
            otp : otp
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

