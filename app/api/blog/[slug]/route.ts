

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET({params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        console.log(slug)

        const blog = await prisma.blog.findUnique({
            where : {
                slug : slug
            }
        });

        console.log(blog);

        if(!blog){
            return NextResponse.json({
                message : "Blog not found"
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            message : "Blog fetched successfully",
            blog
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