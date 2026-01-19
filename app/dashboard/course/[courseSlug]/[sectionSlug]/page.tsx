"use client";

import CreateSubSectionModal from "@/components/common/course/CreateSubSectionModal";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface section {
    id : number,
    sectionName : string,
    sectionDescription : string,
    course : {
        id : number,
        courseName : string,
        courseDescription : string,
        courseDuration : string,
        courseLevel : string,
        category : string,
        slug : string,
        section : section[],
        createdAt : string,
    },
    slug : string,
    subsection : {
        subsectionName : string,
        slug : string,
    }[]
}

export default function SubSectionPage() {

    const { sectionSlug } = useParams<{ sectionSlug: string }>();
    const [section, setSection] = useState<section | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subsectionName, setSubSectionName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const subSectionOnchange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSubSectionName(value);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect( () => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/course/section/" + sectionSlug);

                if(response.data.error){
                    toast.error("Error fetching data");
                    setLoading(false);
                    return;
                }
                
                setSection(response.data.section);
                toast.success("Section fetched successfully");
                setLoading(false)
            }
            catch(error){
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
                setLoading(false);
            }
        }
        fetchData();
    }, [sectionSlug]);

    const handleCreate = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/course/subsection", {
                subsectionName : subsectionName,
                sectionId : section?.id
            });

            if(response.status === 200){
                router.push(`/dashboard/course/${section?.course.slug}/${section?.slug}/${response.data.subsection.slug}`);
                setIsModalOpen(false);
                toast.success("Subsection created successfully");
                setLoading(false);
            }
        }
        catch(error){
            console.error("Error creating section:", error);
            toast.error("Error creating section");
            setLoading(false);
        }
    };

    if(loading){
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

                {/* Section Header  */}
                <header className="mb-12 border-b border-slate-800 pb-6">
                    <h2 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl">{section && section.sectionName}</h2>
                    <p className="text-[16px] leading-relaxed text-gray-800">{section && section.sectionDescription}</p>

                    <div>
                        <div  className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#F9C505] px-4 py-2 font-bold"
                            >
                                <Plus className="h-4 w-4" />
                                Add Lesson
                            </button>
                        </div>
                    </div>
                </header>

                {/* Sub Section Name */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Course Sections</h2>
                    <div className="grid gap-4">
                        {section && section.subsection.map((subSection) => (
                            <Link href={`/dashboard/course/${section?.course.slug}/${section?.slug}/${subSection.slug}`}
                                key={subSection.slug}
                                className="group rounded-lg border border-[#F9C505] bg-[#F9C505]/20 p-4 transition-all duration-300 hover:border-[#F9C505]/30 hover:bg-[#F9C505]/50 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold transition-colors duration-300 group-hover:text-gray-800">
                                            {subSection.subsectionName}
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
                isModalOpen && <CreateSubSectionModal 
                    subSectionName={subsectionName}
                    changeHandler={subSectionOnchange}
                    handleCreate={handleCreate}
                    handleCancel={handleCancel}
                />
            }
        </main>
    )   
}