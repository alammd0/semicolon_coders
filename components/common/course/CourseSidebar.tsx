"use client"

import { BookOpen, PlusCircle, Section, SectionIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

export default function CourseSidebar({ course, selectedSection, setSelectedSection, setSelectedSubsection, selectedSubsection} : { course : course, selectedSection : string, setSelectedSection : (section : string) => void, selectedSubsection : string, setSelectedSubsection : (subsection : string) => void }) {

    const searchParams = useSearchParams();
    const currentSubsection = searchParams.get("subsection");
    
    return (
        <div className="w-64 bg-[#F9C505]/10 p-4 border border-[#F9C505]/20 shadow-md">

            {/* Header */}
            <div className="p-2 border-b border-sidebar-border text-center">
                <button onClick={() => setSelectedSection(course.slug)}>
                    <span className="text-xl font-bold text-sidebar-foreground">
                        {course.courseName}
                    </span>
                </button>
            </div>

            {
                course.section.map((sec) => (
                    <div key={sec.slug} className="flex flex-col">
                        <button onClick={() => setSelectedSection(sec.slug)}
                          className={`text-left mt-4 cursor-pointer hover:bg-[#F9C505]/20 p-2
                             ${selectedSection === sec.slug
                                    ? "bg-[#F9C505] text-white font-semibold rounded-md"
                                    : "hover:bg-[#F9C505]/20 rounded-md"
                                }
                            `}
                        >
                            {sec.sectionName}
                        </button>

                        <div className="">
                            {
                                sec.subsection.map((subsec) => (
                                    <Link key={subsec.slug}
                                            href={`/course/${course.slug}?subsection=${subsec.slug}`}
                                            onClick={() => setSelectedSubsection(subsec.slug)}
                                            className={`block rounded p-2 text-sm ${
                                                selectedSubsection === subsec.slug
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-muted"
                                            }`}
                                     >
                                        {subsec.subsectionName}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            {
                course.section.length === 0 ?
                <div className="p-2 text-center">
                    <p className="text-muted-foreground">
                        No sections found
                    </p>
                </div> : null
            }

        </div>
    );
}
