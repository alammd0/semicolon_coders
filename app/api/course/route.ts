import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function Get(request : NextResponse) {
    try {

        const course = await prisma.course.findMany({
            select : {
                id : true,
                courseName : true,
                courseDescription : true,
                courseDuration : true,
                courseLevel : true,
                coverImage : true,
                category : true,
                slug : true,
                section : true,
                createdAt : true,
            }
        })

        if(course.length === 0){
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
    }catch(error){
        return NextResponse.json({
            message: "Error fetching data",
            error: error,
        }, {
            status: 500,
        })
    }
}

export async function POST(request : NextRequest) {
    try {
        const { courseName, courseDescription, courseDuration, courseLevel, category } = await request.json();
    }
    catch(error){
        return NextResponse.json({
            message: "Error fetching data",
            error: error,
        }, {
            status: 500,
        })
    }
}