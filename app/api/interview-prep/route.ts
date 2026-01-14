import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { decoded } from "@/utils/decoded";
import slugify from "slugify";

// get all Questions
export async function GET(request : NextRequest){
    try{
        const question = await prisma.question.findMany({
            select : {
                id : true,
                title : true,
                question : true,
                answer : true,
                difficulty : true,
                experience : true,
                category : true,
                tags : {
                    select : {
                        id : true,
                        name : true
                    }
                },
                slug : true
            }
        });

        if(!question){
            return NextResponse.json({
                message : "No questions found"
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            message : "Questions fetched successfully",
            questions : question
        }, {
            status : 200
        })
    }
    catch(error){
        return NextResponse.json({
            error : error,
            message : "Something went wrong"
        }, {
            status : 500
        })
    }
}

// Create a new Question 
export async function POST(request : NextRequest) {
    try {

        const { title, question, answer, difficulty, category, experience, tags, codeSnippet } = await request.json();
        // console.log(title, question, answer, difficulty, category, experience, tags, codeSnippet);

        if(!title || !question || !answer || !difficulty || !category || !experience || !tags){
            return NextResponse.json({
                message : "all fields are required"
            }, {
                status : 400
            })
        }

        const user = await decoded();

        if(!user){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 401
            })
        }

        const slug = slugify(title, { lower :  true, strict : true }) + "-" + Date.now();

        // check user exiting or not 
        const existUser = await prisma.user.findUnique({
            where : {
                email : user.email
            }
        });

        if(!existUser){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 404
            })
        }

        // also check user role 
        if(existUser.role !== "admin"){
            return NextResponse.json({
                message : "You are not authorized to create question"
            }, {
                status : 401
            })
        }

        // here create New Question Entry
        const newQuestion = await prisma.question.create({
            data : {
                title : title,
                question : question,
                answer : answer,
                difficulty : difficulty,
                category : category,
                experience : experience,
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
                codeSnippet : codeSnippet,
                slug : slug,
                userId : existUser.id
            }
        });

        return NextResponse.json({
            message : "Question created successfully",
            question : newQuestion
        }, {
            status : 201
        })
    }
    catch(error){
        return NextResponse.json({
            error : error,
            message : "Something went wrong"
        }, {
            status : 500
        })
    }
}