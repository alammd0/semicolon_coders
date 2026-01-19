import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest, { params } : { params : Promise<{ slug : string }>}) {
    try {
        const { slug } = await params;

        const section = await prisma.section.findUnique({
            where : {
                slug : slug
            },
            include : {
                course : true,
                subsection : true
            }
        })

        if(!section){
            return NextResponse.json({
                error : "Section not found"
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            section : section
        }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            error : "Error fetching section"
        }, {
            status : 500
        })
    }
}