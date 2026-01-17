import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";


export async function POST(request : NextRequest) {
    try {
        const { sectionName, sectionDescription, courseId} = await request.json();


        if(!sectionName || !sectionDescription || !courseId){
            return NextResponse.json({
                error : "Missing required fields"
            }, {
                status : 400
            })
        }

        const findCourse = await prisma.course.findUnique({
            where : {
                id : courseId
            }
        })

        if(!findCourse){
            return NextResponse.json({
                error : "Course not found"
            }, {
                status : 404
            })
        }

        const slug = slugify(sectionName, { lower :  true, strict : true }) + "-" + Date.now();

        const section = await prisma.section.create({
            data : {
                sectionName : sectionName,
                sectionDescription : sectionDescription,
                slug : slug,
                courseId : findCourse.id
            }
        });

        return NextResponse.json(
            {
                message : "Section created successfully",
                section : section
            },
            {
                status : 200
            }
        )
    }
    catch(error){
        return NextResponse.json({
            error : "Error creating section"
        }, {
            status : 500
        })
    }
}