"use client";

import CourseContent from "@/components/common/course/CourseContent";
import CourseSidebar from "@/components/common/course/CourseSidebar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface course {
    id : number,
    courseName : string,
    courseDescription : string,
    slug : string,
    section : {
        sectionName : string,
        slug : string,
        subsection : {
            subsectionName : string,
            slug : string,
        }[]
    }[],
    createdAt : Date,
    courseLevel : string,
    category : string
}


export default function CourseSlugPage() {

    const { slug } = useParams<{ slug: string }>();

    const [course, setCourse] = useState<course | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedSection, setSelectedSection] = useState<string>("");
    const [selectedSubsection, setSelectedSubsection] = useState<string>("");

    useEffect( () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/course/" + slug);

                if(response.data.error){
                    toast.error("Error fetching data");
                    setLoading(false);
                    return;
                }
                
                setCourse(response.data.course);
                toast.success("Course fetched successfully");
                setLoading(false)
            }
            catch(error){
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
                setLoading(false);
            }
        }
        fetchData();
    }, [slug]);

    useEffect(() => {
        if (course) {
            setSelectedSection(course.courseName);
        }
    }, [course]);


    if(loading){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary" />
            </div>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {
                course && <CourseSidebar 
                    course={course}
                    selectedSection={selectedSection}
                    selectedSubsection={selectedSubsection}
                    setSelectedSection={setSelectedSection}
                    setSelectedSubsection={setSelectedSubsection}
                    
                    />
            }

            {
                course && <CourseContent 
                    course={course}
                    selectedSection={selectedSection}
                    selectedSubsection={selectedSubsection}
                />
            }
            
        </div>
    )
}