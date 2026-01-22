
"use client";

import CardSection from "@/components/common/blog/CardSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function BlogsPage(){

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs?populate=*`);

                if (response.status === 200) {
                    setBlogs(response.data.data);
                    toast.success("Blogs fetched successfully");
                    setLoading(false);
                }
                else{
                    console.error("Error fetching data:", response.data.message);
                    setLoading(false);
                }
            }
            catch(error){
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchData();

    }, []);

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">
                </div>
            </div>
        )
    }

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