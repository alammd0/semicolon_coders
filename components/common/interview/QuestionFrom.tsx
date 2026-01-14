"use client";

import { useState } from "react"
import { CATEGORIES } from "@/utils/Category";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function QuestionFrom(){

    const [formData, setFormData] = useState({
        title : "",
        question : "",
        answer : "",
        difficulty: "medium",
        category: "",
        experience: "mid",
        tags : [] as string[],
        codeSnippet: "",
        published: false,
    });

    const [tagInput, setTagInput] = useState("")
    
    const [errors, setErrors] = useState<Record<string, string>>({})

    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, tagInput.trim()],
            }))
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData((prevState) => ({
            ...prevState,
            tags: prevState.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }
        if (!formData.question.trim()) {
            newErrors.question = "Question is required"
        }
        if (!formData.answer.trim()) {
            newErrors.answer = "Answer is required"
        }
        if (!formData.category) {
            newErrors.category = "Category is required"
        }
        if (formData.tags.length === 0) {
            newErrors.tags = "Add at least one tag"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
        try{
            setIsLoading(true);
            const response = await fetch("/api/interview-prep", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(formData)
            });

            const data = await response.json();

            // only testing purpose
            // console.log(data);

            if(data.message === "Question created successfully"){
                toast.success(data.message);
                router.push("/dashboard/interview");
                setIsLoading(false);
            }
            else{
                toast.error(data.message);
                setIsLoading(false);
            }
        }
        catch(error){
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            setIsLoading(false);
            toast.error(errorMessage);
        }
    } else {
        console.log("Form is invalid.");
    }}

    return (
        <div className="max-w-4xl mx-auto">
            <div className="border rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                <div className="border-b py-4 px-6">
                    <h2 className="text-2xl font-bold">Create New Question</h2>
                    <p className="text-muted-foreground mt-1">
                        Add a new interview question to your database
                    </p>
                </div>
  
                <form onSubmit={handleSubmit} className="py-4 px-6 space-y-4 mb-4">
                    {/* title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                            Title <sup className="text-red-500">*</sup>
                        </label>

                        <input 
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter question title"
                            className= {errors.title ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            type="text" />
                        {errors.title && <p className="text-sm text-red-800 mt-1">{errors.title}</p>}
                    </div>

                        {/* Question */}
                        <div>
                            <label htmlFor="question" className="block text-sm font-medium text-foreground mb-2">
                                Question <sup className="text-red-500">*</sup>
                            </label>
                            <textarea
                                id="question"
                                name="question"
                                placeholder="Enter the interview question..."
                                value={formData.question}
                                onChange={handleChange}
                                rows={4}
                                className= {errors.question ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                            {errors.question && <p className="text-sm text-red-800 mt-1">{errors.question}</p>}
                        </div>

                        {/* Answer */}
                        <div>
                            <label htmlFor="answer" className="block text-sm font-medium text-foreground mb-2">
                                Answer <sup className="text-red-500">*</sup>
                            </label>

                            <textarea
                                id="answer"
                                name="answer"
                                placeholder="Enter the answer"
                                value={formData.answer}
                                onChange={handleChange}
                                rows={5}
                                className= {errors.answer ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                            {errors.answer && <p className="text-sm text-red-800 mt-1">{errors.answer}</p>}
                        </div>

                        {/*  Code Snippet  */}
                        <div>
                            <label htmlFor="codeSnippet" className="block text-sm font-medium text-foreground mb-2">
                                Code Snippet
                            </label>
                            
                            <textarea
                                id="codeSnippet"
                                name="codeSnippet"
                                placeholder="Enter example code..."
                                value={formData.codeSnippet || ""}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                            />
                        </div>

                        {/* Grid: Difficulty, Category, Experience Level */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="difficulty" className="block text-sm font-medium text-foreground mb-2">
                                    Difficulty <sup className="text-red-500">*</sup>
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className= {errors.difficulty ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                                >
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="easy">Easy</option>
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="medium">Medium</option>
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="hard">Hard</option>
                                </select>
                                {errors.difficulty && <p className="text-sm text-red-800 mt-1">{errors.difficulty}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                                    Category <sup className="text-red-500">*</sup>
                                </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className= {errors.category ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            >
                                <option className="hover:bg-[#F9C505] hover:text-white" value="">Select Category</option>
                                {
                                    CATEGORIES.map((cat, index) => (
                                        <option key={index} value={cat} className="hover:bg-[#F9C505] hover:text-white">
                                            {cat}
                                        </option>
                                    ))
                                }
                            </select>
                            {errors.category && <p className="text-sm text-red-800 mt-1">{errors.category}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="experienceLevel" className="block text-sm font-medium text-foreground mb-2">
                                    Experience Level <sup className="text-red-500">*</sup>
                                </label>
                                <select
                                    id="experienceLevel"
                                    name="experienceLevel"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className= {errors.experienceLevel ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                                >
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="junior">Junior</option>
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="mid">Mid-Level</option> 
                                    <option className="hover:bg-[#F9C505] hover:text-white" value="senior">Senior</option>
                                </select>
                                {errors.experienceLevel && <p className="text-sm text-red-800 mt-1">{errors.experienceLevel}</p>}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
                            <div className="flex gap-2">
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                        e.preventDefault()
                                        addTag()
                                        }
                                    }}
                                    placeholder="Add tag and press Enter..."
                                    className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                />
                                <button type="button" onClick={addTag} className="px-4 py-2 bg-[#F9C505] text-white rounded-md shadow-sm hover:shadow-lg">
                                    Add
                                </button>
                            </div>
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1 rounded-full"
                                    >
                                        <span className="text-sm">#{tag}</span>
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-80 transition">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    ))}
                                </div>
                            )}
                            {errors.tags && <p className="text-sm text-red-800 mt-1">{errors.tags}</p>}
                        </div>

                        {errors.submit && (
                            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                                <p className="text-sm text-red-800">{errors.submit}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 justify-end pt-4">
                            <button type="button" className="px-4 py-2 rounded-md shadow-sm hover:shadow-lg border">
                                Cancel
                            </button>
                            <button type="submit" className="bg-[#F9C505] hover:bg-primary/90 gap-2 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-lg">
                                Create Question
                            </button>
                        </div>

                </form>
            </div>
            
        </div>
    )
}

