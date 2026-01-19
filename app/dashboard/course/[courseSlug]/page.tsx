"use client";

import CreateSectionModal from "@/components/common/course/CreateSectionModal";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface course {
    id : number,
    courseName : string,
    courseDescription : string,
    slug : string,
    section : {
        sectionName : string,
        sectionDescription : string,
        slug : string,
        subsection : {
            subsectionName : string,
            subsectionDescription : string,
            slug : string,
        }[]
    }[],
    createdAt : Date,
    courseLevel : string,
    category : string
}

export default function CoursePage() {

    const { courseSlug } = useParams<{ courseSlug: string }>();
    const [course, setCourse] = useState<course | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sectionData, setSectionData] = useState({
        sectionName : "",
        sectionDescription : ""
    })

    const router = useRouter()

    const sectionOnchange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setSectionData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect( () => {
        const fetchData = async ( ) => {
            try {
                setIsLoading(true);
                const response = await axios.get("/api/course/" + courseSlug);

                if(response.data.error){
                    toast.error("Error fetching data");
                    setIsLoading(false);
                    return;
                }
                                
                setCourse(response.data.course);
                toast.success("Course fetched successfully");
                setIsLoading(false)
            }
            catch(error){
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
                setIsLoading(false);
            }
        }

        fetchData();
     }, [courseSlug]);

     const handleCreate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/course/section", {
                sectionName : sectionData.sectionName,
                sectionDescription : sectionData.sectionDescription,
                courseId : course ? course.id : 0
            });

            if(response.status === 200){
                window.location.reload();
                toast.success("Section created successfully");
                setIsLoading(false);
                setIsModalOpen(false);
            }
        }
        catch(error){
            console.error("Error creating section:", error);
            toast.error("Error creating section");
            setIsLoading(false);
        }
    };


    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen">
            <div className="mx-auto max-w-11/12">

                <button
                    onClick={() => router.back()}
                    className="mb-8 inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                    </svg>
                        Back
                </button>

                {/* Course Header  */}
                <header className="mb-12 border-b border-slate-800 pb-6">
                    <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">{course && course.courseName}</h2>
                    <p className="text-[16px] leading-relaxed text-gray-800">{course && course.courseDescription}</p>

                    <div>
                        <div className="mt-6 flex flex-wrap gap-4">
                            {course && (
                                <>
                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Level</span> */}
                                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 capitalize">
                                            {course.courseLevel}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</span> */}
                                        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-300">
                                            {course.category}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category</span> */}
                                        <span className="rounded-full bg-[#F9C505]/10 px-3 py-1 text-sm font-medium text-[#F9C505]">
                                            {course.section.length} Sections
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div  className="flex justify-end">
                            <button
                                onClick={() => showModal()}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#F9C505] px-4 py-2 font-bold"
                            >
                                <Plus className="h-4 w-4" />
                                Create Section
                            </button>
                        </div>
                    </div>
                </header>

                {/* Course Sections */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Course Sections</h2>
                    <div className="grid gap-4">
                        {course && course.section.map((section) => (
                            <Link href={`/dashboard/course/${course.slug}/${section.slug}`}
                                key={section.slug}
                                className="group rounded-lg border border-[#F9C505] bg-[#F9C505]/20 p-4 transition-all duration-300 hover:border-[#F9C505]/30 hover:bg-[#F9C505]/50 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-800">
                                            {section.sectionName}
                                    </h3>
                                    <div className="flex items-center justify-center rounded-lg text-slate-400 transition-all duration-300 group-hover:text-[#F9C505]">
                                        <svg
                                            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>


            {
                isModalOpen && <CreateSectionModal 
                    sectionData={sectionData}
                    changeHandler={sectionOnchange}
                    handleCreate={handleCreate}
                    handleCancel={handleCancel}
                />
            }
        </main>
    )   
}