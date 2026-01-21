"use client";

import { course, UserType } from "@/utils/type";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { toast } from "react-toastify";


export default function CourseClient({ user }  : { user : UserType | null }) {

    const [courses, setCourses] = useState<course[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(user);

    useEffect( () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/course");

                if(response.data.error){
                    toast.error("Error fetching data");
                    setLoading(false);
                    return;
                }
                
                setCourses(response.data.course);
                toast.success("Courses fetched successfully");
                setLoading(false)
            }
            catch(error){
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
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
        <div className="mx-auto max-w-12xl sm:px-2 lg:px-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 sm:max-w-md">
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold sm:text-5xl">Courses</h2>
                        <p className="mt-2 text-[14px] font-normal">Manage your documentation courses and learning materials</p>
                    </div>
                </div>

                {user?.role === "admin" ?
                    <Link href="/dashboard/course/create-course">
                        <button className="flex items-center gap-2 rounded-lg bg-[#F9C505] px-4 py-2 text-sm transition-colors hover:bg-muted text-[14px] font-bold hover:text-white hover:shadow-lg shadow-gray-300 cursor-pointer">
                            <Plus className="h-4 w-4" />
                            Create Course
                        </button>
                    </Link> : null
                }
            </div>

            {/* Here Implement the Blogs List */}
            {/* Card Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <CourseCard courses={courses} user={ user }/>
            </div>
       </div>
    )
}