"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { useRouter } from "next/navigation";
import { renderEditorJsData } from "@/lib/editorRenderer";
import { toast } from "react-toastify";

interface SubSection {
    id: number;
    subsectionName: string;
    content: {
        body : JSON,
        videoUrl : string
    }
    slug: string;
}

export default function SubSectionPage() {
    const { subsectionSlug } = useParams<{ subsectionSlug: string }>();
    const [subSection, setSubSection] = useState<SubSection | null>(null);
    const [content, setContent] = useState<string>("");
    const editorRef = useRef<EditorJS | null>(null);
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {

        if (!mounted || editorRef.current) return;

        const init = async () => {
            const EditorJS = (await import("@editorjs/editorjs")).default;
            const Header = (await import("@editorjs/header")).default;
            const Paragraph = (await import("@editorjs/paragraph")).default;
            const List = (await import("@editorjs/list")).default;
            const Code = (await import("@editorjs/code")).default;
            const Quote = (await import("@editorjs/quote")).default;
            const Table = (await import("@editorjs/table")).default;

            editorRef.current = new EditorJS({
                holder: "editorjs",
                autofocus: true,
                placeholder: "Start writing your blog...",
                tools: {
                    header: Header,
                    paragraph: Paragraph,
                    list: List,
                    code: Code,
                    quote: Quote,
                    table: Table
                },
            });
        };

        init();

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, [mounted]);

    useEffect(() => {
        if (!subsectionSlug) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/course/subsection/${subsectionSlug}`);
                setSubSection(response.data.subsection);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [subsectionSlug]);


    const handleSave = async () => {
        try {
            setIsLoading(true);
            if (!editorRef.current) {
                setErrors({ editor: "Editor not initialized" })
                return
            }

            const editorData = await editorRef.current.save()

            const completeData = {
                ...subSection,
                content: editorData,
            }

            const response = await axios.post("/api/course/contents", completeData);

            if (response.status === 201) {
                setErrors({})
                setContent(response.data.content.body)
                window.location.reload();
                setIsLoading(false)
            } else {
                toast.error("Something went wrong");
                setIsLoading(false)
            }
        }
        catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setIsLoading(false)
        }
    }

    if(!mounted || isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">
                </div>
            </div>
        )
    }
    
    return (
        <main className="bg-[#F9C505]/10 py-12 min-h-screen px-4 rounded-md">
            <header className="pb-6">
                <h2 className="text-4xl font-bold sm:text-2xl text-center">
                    {subSection?.subsectionName}
                </h2>
            </header>

            {
                subSection?.content ? (
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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

                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{
                                __html: renderEditorJsData(subSection.content.body),
                            }}
                        />
                    </div>

                ) : (
                    <>
                        <div
                            id="editorjs"
                            className="prose prose-sm max-w-none dark:prose-invert rounded-md border p-4 min-h-96"
                        />

                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                                <p className="text-sm text-red-800">{errors.submit}</p>
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="flex gap-3 justify-end mt-4">
                            <button className="px-4 py-2 rounded-md shadow-sm hover:shadow-lg border">Save as Draft</button>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                            >
                                {isLoading ? "Publishing..." : "Publish"}
                            </button>
                        </div>
                    </>
                )
            }
        </main>
    );
}
