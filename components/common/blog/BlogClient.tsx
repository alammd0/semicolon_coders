"use client";

import CardSection from "@/components/common/blog/CardSection";
import { UserType } from "@/utils/type";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function BlogClient({ user }: { user: UserType | null }) {

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL_LOCAL}`+`/blogs?populate=*`);

                console.log(response)

                if (response.status === 200) {
                    setBlogs(response.data.data);
                    toast.success("Blogs fetched successfully");
                    setLoading(false);
                }else{
                    toast.error("Error fetching data");
                    setLoading(false);
                }
            }
            catch(error){
                toast.error("Error fetching data");
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // console.log(blogs)


    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">
                </div>
            </div>
        )
    }

    return (
       <div className="mx-auto max-w-12xl sm:px-2 lg:px-2">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full rounded-lg border border-border bg-card px-4 py-2 pl-12 text-card-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
            </div>

            {/* Card Section */}
            <CardSection blogs={blogs}/>
       </div>
    )
}