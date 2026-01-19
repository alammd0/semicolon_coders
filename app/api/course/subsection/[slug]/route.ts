import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, { params } : { params : Promise<{ slug : string }>}) {
    try {
        const { slug } = await params;

        console.log(slug);

        const subsection = await prisma.subsection.findUnique({
            where : {
                slug : slug
            },
            select : {
                id : true,
                subsectionName : true,
                slug : true,
                content : {
                    select : {
                        body : true,
                        videoUrl : true
                    }
                }
            }
        })

        if(!subsection){
            return NextResponse.json({
                error : "Subsection not found"
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            message : "Subsection fetched successfully",
            subsection : subsection
        }, {
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