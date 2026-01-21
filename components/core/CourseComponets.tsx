"use client";

import CourseCard from "@/components/common/course/CourseCard";
import { course, UserType } from "@/utils/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function CourseComponents({ user } : { user : UserType }) {

    const [courses, setCourses] = useState<course[]>([]);
    const [loading, setLoading] = useState(true);

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
        <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-10"> 
            <div className="mb-16 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Courses</h2>
                <p className="mt-4 text-lg text-muted-foreground">Manage your documentation courses and learning materials</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <CourseCard courses={courses}  user={ user }/>
            </div>
        </div>
    )
}