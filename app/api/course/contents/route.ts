import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request : NextRequest) {
    try {
        
    }
    catch(error){
        return NextResponse.json({
            error : error
        }, {
            status : 500
        })
    }
}

export async function POST(request : NextRequest) {
    try {

        const { content, videoUrl, slug } = await request.json();

        const subsection = await prisma.subsection.findUnique({ 
            where : { 
                slug : slug 
            } 
        });

        if(!subsection){
            return NextResponse.json({
                error : "Subsection not found"
            }, {
                status : 400
            })
        }

        if(!content){
            return NextResponse.json({
                error : "Missing required fields"
            }, {
                status : 400
            })
        }

        const NewContent = await prisma.content.create({
            data : {
                body : content,
                videoUrl : videoUrl,
                subsectionId : subsection.id
            }
        })

        return NextResponse.json({
            message : "Content created successfully",
            content : NewContent
        }, {
            status : 201
        })
    }
    catch(error){
        return NextResponse.json({
            error : error
        }, {
            status : 500
        })
    }
}
