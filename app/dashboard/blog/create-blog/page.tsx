"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import type EditorJS from "@editorjs/editorjs";


export default function CreateBlogPage() {

    const editorRef = useRef<InstanceType<typeof EditorJS> | null>(null)
    const [tagInput, setTagInput] = useState("")
    const [blogData, setBlogData] = useState({
        title: "",
        excerpt: "",
        metaTitle: "",
        metaDescription: "",
        tags: [] as string[],
        coverImage: "" as string,
    })

    const [mounted, setMounted] = useState(false)

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect( () => {
        setMounted(true)
    }, [])

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
            const ImageTool = (await import("@editorjs/image")).default;

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
                    table: Table,
                    image: ImageTool,
                },
            });
        };

        init();

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, [mounted])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setBlogData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })

    }}

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "blog_images");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            )

            const data = await response.json();

            setBlogData((prevState) => ({
                ...prevState,
                coverImage: data.secure_url,
            }))
        }
    }

    const addTag = () => {
        if (tagInput.trim() && !blogData.tags.includes(tagInput.trim())) {
            setBlogData((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, tagInput.trim()],
            }))
            setTagInput("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setBlogData((prevState) => ({
            ...prevState,
            tags: prevState.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!blogData.title.trim()) {
            newErrors.title = "Title is required"
        }

        if (!blogData.excerpt.trim()) {
            newErrors.excerpt = "Excerpt is required"
        }

        if (!blogData.metaTitle.trim()) {
            newErrors.metaTitle = "Meta title is required"
        }

        if (!blogData.metaDescription.trim()) {
            newErrors.metaDescription = "Meta description is required"
        }

        if (blogData.tags.length === 0) {
            newErrors.tags = "Add at least one tag"
        }

        if (!blogData.coverImage.trim()) {
            newErrors.coverImage = "Cover image is required"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {

        if (!validateForm()) {
            return
        }

        try {

            setIsLoading(true)

            if (!editorRef.current) {
                setErrors({ editor: "Editor not initialized" })
                return
            }

            const editorData = await editorRef.current.save()

            const completeData = {
                ...blogData,
                content: editorData,
            }

            console.log("Blog data:", completeData)

            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completeData),
            });

            const data = await response.json();

            if(data.message === "Blog created successfully"){
                toast.success(data.message);
                router.push("/dashboard/blog");
                setIsLoading(false);
            }
            else{
                toast.error(data.message);
                setIsLoading(false)
            }
        } catch (error) {
            console.error("Error saving blog:", error)
            setErrors({ submit: "Failed to save blog. Please try again." })
            setIsLoading(false)
    }}

  if(!mounted){
    return null
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-12xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Create Blog Post</h1>
                <p className="text-muted-foreground">Write and publish your next blog post</p>
            </div>

            <div className="space-y-8 mb-4">

                {/* Card */}
                <div className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                    {/* card header */}
                    <div className="mb-8">
                        <h2 className="text-[16px] font-bold text-foreground mb-2">Basic Information</h2>
                        <p className="text-[14px] font-normal text-gray-700">Title and excerpt for your blog post</p>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                                Title <sup className="text-red-500">*</sup>
                            </label>

                            <input
                                id="title"
                                name="title"
                                value={blogData.title}
                                onChange={handleChange}
                                placeholder="Enter blog title"
                                className= {errors.title ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                            {errors.title && <p className="text-sm text-red-800 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-foreground mb-2">
                                Excerpt <sup className="text-red-500">*</sup>
                            </label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                value={blogData.excerpt}
                                onChange={handleChange}
                                placeholder="Brief summary of your blog post"
                                rows={5}
                                className={ errors.excerpt ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                            {errors.excerpt && <p className="text-sm text-red-800 mt-1">{errors.excerpt}</p>}
                        </div>
                    </div>
                </div>

                  {/* Cover Image */}
                <div className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                    {/* card header */}
                    <div className="mb-8">
                        <h2 className="text-[16px] font-bold text-foreground mb-2">Cover Image</h2>
                        <p className="text-[14px] font-normal text-gray-700">Upload a cover image for your blog post</p>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-3">
                        <div>
                            <label htmlFor="coverImage" className="block text-sm font-medium text-foreground mb-2">
                                Cover Image <sup className="text-red-500">*</sup>
                            </label>

                            <div className="flex flex-col gap-4">
                                <input
                                    id="coverImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className= {errors.coverImage ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                                />
                                {errors.coverImage && <p className="text-sm text-red-800">{errors.coverImage}</p>}
                                {blogData.coverImage && (
                                    <div className="relative w-full">
                                        <img
                                            src={blogData.coverImage}
                                            alt="Cover preview"
                                            className="w-full h-64 object-cover rounded-md border border-border"
                                        />
                                        <button
                                            onClick={() =>
                                            setBlogData((prevState) => ({
                                                ...prevState,
                                                coverImage: "",
                                            }))
                                            }
                                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Card */}
                <div className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                    <div className="mb-8">
                        <h1 className="text-[16px] font-bold text-foreground mb-2">SEO Information</h1>
                        <p className="text-[14px] font-normal text-gray-700">Optimize your post for search engines</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="metaTitle" className="block text-sm font-medium text-foreground mb-2">
                                Meta Title *
                            </label>
                            <input
                                id="metaTitle"
                                name="metaTitle"
                                value={blogData.metaTitle}
                                onChange={handleChange}
                                placeholder="SEO title (50-60 characters)"
                                className={ errors.metaTitle ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                            {errors.metaTitle && <p className="text-sm text-red-800 mt-1">{errors.metaTitle}</p>}
                            </div>

                        <div>
                            <label htmlFor="metaDescription" className="block text-sm font-medium text-foreground mb-2">
                                Meta Description *
                            </label>
                            <textarea
                                id="metaDescription"
                                name="metaDescription"
                                value={blogData.metaDescription}
                                onChange={handleChange}
                                placeholder="SEO description (150-160 characters)"
                                rows={4}
                                className={ errors.metaDescription ? "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none" : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"}
                            />
                        </div>
                    </div>
                </div>

                {/* Tags Card */}
                 <div className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                    <div className="mb-8">
                        <h2 className="text-[16px] font-bold text-foreground mb-2">Tags</h2>
                        <p className="text-[14px] font-normal text-gray-700">Add tags to categorize your post</p>
                    </div>

                    <div className="space-y-4">
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
                                className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                placeholder="Add a tag and press Enter"
                            />
                            <button onClick={addTag} className="px-4 py-2 bg-[#F9C505] text-white rounded-md shadow-sm hover:shadow-lg">
                                Add
                            </button>
                        </div>

                        {blogData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {blogData.tags.map((tag) => (
                                    <p key={tag}>
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="ml-2 text-xs hover:opacity-70">
                                            ×
                                        </button>
                                    </p>
                                ))}
                            </div>
                        )}

                        {errors.tags && <p className="text-sm text-red-800">{errors.tags}</p>}
                    </div>
                </div>
                    
                {/* Editor Card */}
                <div className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400">
                    {/* Card Heading */}
                    <div className="mb-8">
                        <h1 className="text-[16px] font-bold text-foreground mb-2">Content</h1>
                        <p className="text-[14px] font-normal text-gray-700">Write your blog post content</p>
                    </div>

                    {/* Card Content */}
                    <div className="space-y-4">
                        <div
                            id="editorjs"
                            className="prose prose-sm max-w-none dark:prose-invert rounded-md border border-border p-4 min-h-96"
                        />
                        {errors.editor && <p className="text-sm text-red-800 mt-2">{errors.editor}</p>}
                    </div>
                </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-md">
                    <p className="text-sm text-red-800">{errors.submit}</p>
                </div>
            )}

            {/* Action Button */}
            <div className="flex gap-3 justify-end mt-4">
                <button className="px-4 py-2 rounded-md shadow-sm hover:shadow-lg border">Save as Draft</button>
                <button className="px-4 py-2 bg-[#F9C505] text-white rounded-md shadow-sm hover:shadow-lg" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? "Publishing..." : "Publish Blog"}
                </button>
            </div>
        </div>
    </div>
  );
}
