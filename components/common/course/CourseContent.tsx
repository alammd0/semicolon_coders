"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateSectionModal from "./CreateSectionModal";
import axios from "axios";
import Link from "next/link";

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

interface section {
    id : number,
    sectionName : string,
    slug : string,
    subsection : {
        subsectionName : string,
        slug : string,
    }[]
}

export default function CourseContent({ course, selectedSection, selectedSubsection }: { course : course, selectedSection : string, selectedSubsection : string }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const section = course.section.find((s) => s.slug === selectedSection);     
    const subsection = section?.subsection.find((sub) => sub.slug === selectedSubsection);

    const [sectionData, setSectionData] = useState({
        sectionName : "",
        sectionDescription : ""
    })

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

    const handleCreate = async () => {
        try {
            const response = await axios.post("/api/course/section", {
                sectionName : sectionData.sectionName,
                sectionDescription : sectionData.sectionDescription,
                courseId : course.id
            });

            if(response.status === 200){
                window.location.reload();
                setIsModalOpen(false);
            }
        }
        catch(error){
            console.error("Error creating section:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="flex-1 p-4 overflow-y-auto">
            <div className="mb-2 border-b pb-4 space-y-3 flex flex-col gap-2">
                <div>
                    <h1 className="text-3xl font-bold">
                        {course.courseName}
                    </h1>
                    <p className="mt-1 text-gray-800">
                        {course.courseDescription}
                    </p>
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

            {section && (
                <>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">
                            {section.sectionName}
                        </h2>
                    </div>


                    <div  className="flex justify-end">
                        <Link href={`/course/${course.slug}/section/subsection`}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#F9C505] px-4 py-2 font-bold"
                        >
                            <Plus className="h-4 w-4" />
                            Create SubSection
                        </Link>
                    </div>
                </>
                
            )}

            {subsection ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {subsection.subsectionName}
                    </h3>

                    <div className="rounded-lg border p-4 bg-muted">
                        <p>
                            Content for <b>{subsection.subsectionName}</b> will appear here.
                        </p>
                    </div>
                </div>
                ) : (
                <div className="mt-6 text-muted-foreground">
                    Select a lesson from the sidebar to start learning
                </div>
            )}

            {
                isModalOpen && <CreateSectionModal
                   sectionData={sectionData}
                   changeHandler={sectionOnchange}
                   handleCreate={handleCreate}
                   handleCancel={handleCancel}
                />
            }
        </main>
    );
}
