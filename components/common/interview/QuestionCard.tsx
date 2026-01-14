
"use client"

import { QuestionDetails } from "@/utils/type";
// Ensure QuestionDetails has tags as an array: tags: { id: number; name: string; }[]
import Link from "next/link";


export default function QuestionCard({ question }: { question: QuestionDetails }) {


    const difficultyStyles: Record<string, string> = {
        easy: "bg-green-100 text-green-700 border-green-300",
        medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
        hard: "bg-red-100 text-red-700 border-red-300",
    };

    const experienceStyles: Record<string, string> = {
        beginner: "bg-blue-100 text-blue-700 border-blue-300",
        mid: "bg-purple-100 text-purple-700 border-purple-300",
        advanced: "bg-indigo-100 text-indigo-700 border-indigo-300",
    };

    return (
        <div className="rounded-md border-2 border-[#F9C505] bg-primary p-6 text-foreground hover:border-[#F9C505]/30 hover:shadow-lg hover:shadow-[#F9C505]/20 cursor-pointer">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">

                    <div>
                        <h3 className="mb-2 text-2xl font-semibold">{question.title}</h3>
                        <p className="mb-3 text-lg text-black/90">
                            {question.answer.split(" ").length > 60
                                ? question.answer.split(" ").slice(0, 60).join(" ") + "..."
                                : question.answer
                            }
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${experienceStyles[question.experience]}`}>{question.experience}</span>
                                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${difficultyStyles[question.difficulty]}`}>{question.difficulty}</span>
                                <span className="rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{question.category}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 ">
                                {
                                    Array.isArray(question.tags) && question.tags.map( (tag) => (
                                        <span className="px-3 py-1 text-xs font-medium text-black hover:underline hover:text-blue-600" key={tag.id}>
                                            #{tag.name}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <Link href={`/interview-prep/${question.slug}`} className="flex flex-row justify-end items-end">
                        <button className="bg-accent text-black px-4 py-2 rounded-md shadow-sm hover:shadow-lg">
                            View answer
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}