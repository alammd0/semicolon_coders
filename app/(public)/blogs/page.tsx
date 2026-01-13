
"use client";

import CardSection from "@/components/common/blog/CardSection";
import { useEffect, useState } from "react";


export default function BlogsPage(){

    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{

                const response = await fetch("/api/blog", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data = await response.json();

                if(data.message === "Blogs fetched successfully"){
                    setBlogs(data.blogs);
                }
                else{
                    console.error("Error fetching data:", data.message);
                }
            }
            catch(error){
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
       <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-10">
            <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Learn & Grow</h2>
                <p className="mt-4 text-lg text-muted-foreground">Master new skills with our comprehensive collection of courses and tutorials</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CardSection blogs={blogs}/>
            </div>
       </div>
    )
}