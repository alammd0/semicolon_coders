import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { uploadToCloudinary } from "@/utils/UploadToCloudinary";
import { decoded } from "@/utils/decoded";

export async function GET(request : NextRequest) {
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

        const formData = await request.formData();

        const coverImage = formData.get("coverImage");
        const courseName = formData.get("courseName") as string;
        const courseDescription = formData.get("courseDescription") as string;
        const courseDuration = formData.get("courseDuration") as string;
        const courseLevel = formData.get("courseLevel") as string;
        const category = formData.get("category") as string;
        const tags = formData.getAll("tags") as string[];

        console.log("Hit Here - 01")

        const user = await decoded();

        console.log(user);

        if(!user){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 401
            })
        }

        const findUser = await prisma.user.findUnique({
            where : {
                email : user?.email
            },
            select : {
                id : true,
                role  : true,
            }
        });

        if(!findUser){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 404
            })
        }

        if(findUser?.role !== "admin"){
            return NextResponse.json({
                message : "You are not authorized to create course"
            }, {
                status : 403
            })
        }

        console.log("Hit here - 02")


        if(!coverImage || !courseName || !courseDescription || !courseDuration || !courseLevel || !category || tags.length == 0){
            return NextResponse.json({
                message: "Please fill all the required fields",
                error: null,
            }, {
                status : 400
            })
        }
        
        // Check if coverImage is a File
        if (!(coverImage instanceof File)) {
            return NextResponse.json({
                message: "Cover image is not a file",
            }, {
                status: 400,
            });
        }

        console.log("Hit here - 03")

        const slug = slugify(courseName, { lower :  true, strict : true }) + "-" + Date.now();

        // File → Buffer → Base64
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = `data:${coverImage.type};base64,${buffer.toString("base64")}`;

        const uploadResponse = await uploadToCloudinary(base64Image, coverImage.name);
        console.log(uploadResponse);

        console.log("Hit here - 03")

        if(!uploadResponse.success || !uploadResponse.result){
            return NextResponse.json({ 
                message: "File upload to Cloudinary failed" 
            }, { status: 500 });
        }

        console.log("Hit here - 04")

        const newCourse = await prisma.course.create({
            data : {
                courseName : courseName,
                courseDescription : courseDescription,
                courseDuration : courseDuration,
                courseLevel : courseLevel,
                category : category,
                tags : {
                    connectOrCreate : tags.map( (tag : string) => ({
                        where : {
                            name : tag
                        },
                        create : {
                            name : tag
                        }
                    }))
                },
                coverImage : uploadResponse.result.secure_url,
                slug : slug,
                userId : findUser.id,
            }
        })

        return NextResponse.json({
            message: "Course created successfully",
            course: newCourse,
        }, {
            status: 201
        })

    }
    catch(error){
        console.error("Error creating course:", error);
        return NextResponse.json({
            message: "Error creating course",
            error: error,
        }, {
            status: 500,
        })
    }
}