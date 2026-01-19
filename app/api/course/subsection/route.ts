
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function GET(request : NextRequest){
    try{
        // const all
    }
    catch(error){
        return NextResponse.json({
            error : error
        }, {
            status : 500
        })
    }
}

// Create Subsection 
export async function POST(request : NextRequest) {
    try {
        const { subsectionName, sectionId } = await request.json();

        if(!subsectionName || !sectionId){
            return NextResponse.json({
                error : "Missing required fields"
            }, {
                status : 400
            })
        }

        const slug = slugify(subsectionName, { lower :  true, strict : true }) + "-" + Date.now();


        const findSection = await prisma.section.findUnique({
            where : {
                id : sectionId
            }
        });

        if(!findSection){
            return NextResponse.json({
                error : "Section not found"
            }, {
                status : 404
            })
        }

        const subsection = await prisma.subsection.create({
            data : {
                subsectionName : subsectionName,
                sectionId : findSection.id,
                slug : slug
            }
        });

        return NextResponse.json({
            subsection : subsection
        },{
            status : 200
        });
    }
    catch(error){
        return NextResponse.json({
            error : error
        }, {
            status : 500
        })
    }
}