"use client";

import CardSection from "@/components/common/blog/CardSection";
import { User } from "@/utils/type";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function BlogClient({ user }: { user: User | null }) {

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

                {
                    user?.role === "admin" ?
                    <Link href="/dashboard/blog/create-blog">
                        <button className="flex items-center gap-2 rounded-lg text-[#F9C505] px-4 py-2 text-sm transition-colors hover:bg-muted hover:text-[#F9C505]">
                            <Plus className="h-4 w-4" />
                            Create Blog
                        </button>
                    </Link> : null
                }
            </div>

            {/* Here Implement the Blogs List */}
            {/* Card Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <CardSection blogs={blogs}/>
            </div>
       </div>
    )
}