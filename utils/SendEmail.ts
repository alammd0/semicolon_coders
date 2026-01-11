import { nodemailerConfig } from "@/config/nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to : string, subject : string, html : string) => {
    try{
        await nodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        });
    }
    catch(err){
        console.log(err);
    }
}