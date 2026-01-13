import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, {  params } : { params : { slug : string}}){
    try{

        const { slug } = await params;

        const blog = await prisma.blog.findUnique({
            where :{
                slug : slug
            },
            include: {
                user: true
            }
        })

        if(!blog){
            return NextResponse.json({
                message : "Blog not found"
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            message : "Blog fetched successfully",
            blog : blog   
        }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            message : "Error fetching Data"
        }, {
            status : 500
        })
    }
}