"use client";

import { renderEditorJsData } from "@/lib/editorRenderer";
import { useRouter } from "next/navigation";

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
            content : {
                body : JSON,
                videoUrl : string
            },
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

    const section = course.section.find( (s) => s.slug === selectedSection );
    const activeContent = section?.subsection.find((sub) => sub.slug === selectedSubsection);


    return (
        <main className="flex-1 space-y-4 p-4 overflow-y-auto bg-[#F9C505]/10 rounded-md">
            {!selectedSection && (
                <p className="text-muted-foreground">
                    Select a section to get started
                </p>
            )}

            {section && (
                <h2 className="text-4xl font-semibold text-center capitalize bg-[#F9C505]/10 rounded-md p-4 mb-4">
                    {section.sectionName}
                </h2>
            )}

            {activeContent ? ( 
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                        __html: renderEditorJsData(activeContent && activeContent.content.body),
                    }}
                />
            ) : (
                selectedSection && (
                    <div className="flex items-center justify-center mt-60">
                        <p className="text-muted-foreground text-2xl font-semibold capitalize">
                            Please select a section
                        </p>
                    </div>
                )
            )}
        </main>
    );
}
