
import prisma from "@/lib/prisma";
import { decoded } from "@/utils/decoded";
import { NextResponse } from "next/server";
import slugify from "slugify";


// Get all blogs
export async function GET(request: Request, response: Response) {
    try{
      const blogs = await prisma.blog.findMany();

      if(!blogs){
        return NextResponse.json({
          message : "No blogs found"
        }, {
          status : 404
        })
      };

      return NextResponse.json({
        message : "Blogs fetched successfully",
        blogs
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

// Create a new blog
export async function POST(request: Request, response: Response) {  
    try {
        const body = await request.json();

        // console.log(body);.

        const user = await decoded();

        if(!user){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 401
            })
        }

        const { title, excerpt, content, metaTitle, metaDescription, tags, coverImage } = body;

        // console.log(title, excerpt, content, metaTitle, metaDescription, tags, coverImage);

        if(!title || !content?.blocks?.length){
            return NextResponse.json({
                message : "Please provide title, slug and content"
            }, {
                status : 400
            })
        }

        const slug = slugify(title, { lower :  true, strict : true }) + "-" + Date.now();

        // find user 
        const existUser = await prisma.user.findUnique({
            where : {
                email : user.email
            }
        });

        console.log(existUser?.id);

        console.log("Hit Here - 01")

        if(!existUser){
            return NextResponse.json({
                message : "Please login first"
            }, {
                status : 404
            })
        }

        console.log("Hit Here - 02");

        const blog = await prisma.blog.create({
            data :{
                title : title,
                slug : slug,
                excerpt : excerpt,
                content : content,
                coverImage : coverImage,
                metaTitle : metaTitle,
                metaDescription : metaDescription,
                userId : existUser.id,
                postTags : {
                    connectOrCreate : tags.map( (tag : string) => ({
                        where : {
                            name : tag
                        },
                        create : {
                            name : tag
                        }
                    }))
                },
            }
        });

        console.log("Hit here - 03")

        return NextResponse.json({
            message : "Blog created successfully",
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