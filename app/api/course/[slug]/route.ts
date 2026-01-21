import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request :NextRequest, {  params } : { params : Promise<{ slug: string }>})  {
    try {

        const { slug } = await params;

        console.log(slug);

        const course = await prisma.course.findUnique({
            where : {
                slug : slug
            },
            select : {
                id : true,
                courseName : true,
                courseDescription : true,
                slug : true,
                section : {
                    select : {
                        sectionName : true,
                        sectionDescription : true,
                        slug : true,
                        subsection : {
                            select : {
                                subsectionName : true,
                                slug : true,
                                content : {
                                    select : {
                                        body : true,
                                        videoUrl : true
                                    }
                                },
                            }
                        }
                    },
                },
                createdAt : true,
                courseLevel : true,
                category : true
            }
        });

        if(!course){
            return NextResponse.json({
                message: "Course not found",
                error: null,
            }, {
                status: 404,
            })
        }

        return NextResponse.json({
            message: "Course fetched successfully",
            course: course,
        }, {
            status: 200,
        })
    }
    catch(error){
        console.error("Error fetching course:", error);
        return NextResponse.json({
            message: "Error fetching course",
            error: error,
        }, {
            status: 500,
        })
    }
}