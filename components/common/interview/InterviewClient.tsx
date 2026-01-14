"use client"

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuestionDetails } from "@/utils/type";
import { toast } from "react-toastify";
import QuestionCard from "./QuestionCard";
import { User } from "@prisma/client";

export default function InterviewClient({ user } : { user : User | null }) {

    const [questions, setQuestions] = useState<QuestionDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await fetch("/api/interview-prep", {
                    method : "GET",
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })

                const data = await response.json();
                
                if(data.message === "Questions fetched successfully"){
                    setQuestions(data.questions);
                    setIsLoading(false);
                }
                else{
                    console.error("Error fetching data:", data.message);
                }
            }
            catch(error){
                const errorMessage = error instanceof Error ? error.message : "An error occurred";
                toast.error(errorMessage);
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="mx-auto max-w-12xl sm:px-2 lg:px-2">
            <div className="mb-12 flex gap-6 sm:flex-row sm:items-center sm:justify-between">
                <header>
                    <h1 className="text-3xl font-bold text-pretty">Interview Questions Manager</h1>
                    <p className="text-muted-foreground mt-1">Manage and organize interview questions</p>
                </header>

                {
                    user?.role === "admin" ?
                    <Link href={`/dashboard/interview/create-question`}>
                        <button className="bg-[#F9C505] rounded-md border py-2 px-4 text-center transition-all text-white text-sm shadow-sm hover:shadow-lg flex items-center justify-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Question
                        </button>
                    </Link> : null
                }
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <h2 className="md-1 text-xl font-semibold text-foreground">Questions</h2>
                    <p className="text-[14px]  font-normal text-foreground">Total: {questions.length} Questions</p>
                </div>

                {
                    questions.map( (question, index) => (
                        <QuestionCard key={index} question={question}/>
                    ))
                }
            </div>
        </div>
    )
}