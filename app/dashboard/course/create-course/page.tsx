"use client";

import axios from "axios";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateCourse() {
    const [courseData, setCourseData] = useState({
        courseName: "",
        courseDescription: "",
        courseDuration: "",
        courseLevel: "beginner", 
        tags: [] as string[],
        coverImage: "" as File | string,
        category: "",
    });

    const [previewImage, setPreviewImage] = useState<string>("");

    const router = useRouter()

    const [tagInput, setTagInput] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!courseData.courseName.trim()) {
            newErrors.courseName = "Course name is required";
        }

        if (!courseData.courseDescription.trim()) {
            newErrors.courseDescription = "Course description is required";
        }

        if (!courseData.courseDuration.trim()) {
            newErrors.courseDuration = "Course duration is required";
        }

        if (!courseData.courseLevel.trim()) {
            newErrors.courseLevel = "Course level is required";
        }

        if (courseData.tags.length === 0) {
            newErrors.tags = "At least one tag is required";
        }

        if (!courseData.coverImage) {
            newErrors.coverImage = "Cover image is required";
        }

        if (!courseData.category.trim()) {
            newErrors.category = "Category is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setCourseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Only images allowed");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image must be under 2MB");
            return;
        }

        setCourseData((prev) => ({
            ...prev,
            coverImage: file, 
        }));
        setPreviewImage(URL.createObjectURL(file));
    };


    const addTag = () => {
        if (tagInput.trim() && !courseData.tags.includes(tagInput.trim())) {
            setCourseData((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, tagInput.trim()],
            }));
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setCourseData((prevState) => ({
            ...prevState,
            tags: prevState.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {

            const formData = new FormData();
            formData.append("courseName", courseData.courseName);
            formData.append("courseDescription", courseData.courseDescription);
            formData.append("courseDuration", courseData.courseDuration);
            formData.append("courseLevel", courseData.courseLevel);
            formData.append("category", courseData.category);

            // tags
            courseData.tags.forEach((tag) => {
                formData.append("tags", tag);
            });

            // coverImage
            formData.append("coverImage", courseData.coverImage);

            try {

                const response = await axios.post("/api/course", formData);

                if(response.status === 201){
                    toast.success(response.data.message);
                    router.push("/dashboard/course");
                }else{
                    toast.error(response.data.message);
                }
            }
            catch(error){
                const errorMessage = error instanceof Error ? error.message : "An error occurred";
                toast.error(errorMessage);
            }
        }
    };

    return (
        <div className="mx-auto max-w-6xl sm:px-2 lg:px-2">
            <div className="mb-10 space-y-3">
                <div className="relative flex-1">
                    <h2 className="text-2xl font-semibold sm:text-4xl">Create New Course</h2>
                    <p className="mt-2 text-[14px] font-normal">Set up your course structure and basic information</p>
                </div>

                {/* Course Create Form */}
                <div
                    className="border p-4 rounded-md shadow-xl shadow-[#F9C505]/20 border-gray-400 mt-10"
                >
                    {/* card header */}
                    <div className="mb-8">
                        <h2 className="text-[16px] font-bold text-foreground mb-2">Course Information</h2>
                        <p className="text-[14px] font-normal text-gray-700">Fill in the basic details about your course</p>
                    </div>

                    {/* Card Content */}
                    <form onSubmit={handleSubmit}
                        className="space-y-4">
                        <div>
                            <label htmlFor="courseName" className="block text-sm font-medium text-foreground mb-2">
                                Course Name <sup className="text-red-500">*</sup>
                            </label>
                            <input
                                id="courseName"
                                name="courseName"
                                value={courseData.courseName}
                                onChange={handleInputChange}
                                placeholder="Enter course name"
                                className={
                                    errors.courseName
                                        ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                        : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                }
                            />
                            {errors.courseName && <p className="text-sm text-red-800 mt-1">{errors.courseName}</p>}
                        </div>

                        <div>
                            <label htmlFor="courseDescription" className="block text-sm font-medium text-foreground mb-2">
                                Course Description <sup className="text-red-500">*</sup>
                            </label>
                            <textarea
                                id="courseDescription"
                                name="courseDescription"
                                value={courseData.courseDescription}
                                onChange={handleInputChange}
                                placeholder="Brief summary of your course"
                                rows={4}
                                className={
                                    errors.courseDescription
                                        ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                        : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                }
                            />
                            {errors.courseDescription && (
                                <p className="text-sm text-red-800 mt-1">{errors.courseDescription}</p>
                            )}
                        </div>

                        {/* Cover Image */}
                        <div>
                            <label htmlFor="coverImage" className="block text-sm font-medium text-foreground mb-2">
                                Cover Image <sup className="text-red-500">*</sup>
                            </label>
                            <div className="flex flex-col gap-4">
                                <input
                                    id="coverImage"
                                    name="coverImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={
                                        errors.coverImage
                                            ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                            : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                }
                                />
                                {errors.coverImage && <p className="text-sm text-red-800">{errors.coverImage}</p>}
                                {previewImage && (
                                    <div className="relative w-full">
                                        <img
                                            src={previewImage}
                                            alt="Cover preview"
                                            className="w-full h-64 object-cover rounded-md border border-border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCourseData((prevState) => ({
                                                    ...prevState,
                                                    coverImage: "",
                                                }));
                                                setPreviewImage("");
                                            }}
                                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-medium hover:opacity-90"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-10">
                            {/* Tags */}
                            <div className="space-y-2 w-full">
                                <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                                    Tags <sup className="text-red-500">*</sup>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        id="tags"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addTag();
                                            }
                                        }}
                                        placeholder="Add tag and press Enter..."
                                        className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                    />
                                    <button type="button" onClick={addTag} className="px-6 py-1 bg-[#F9C505] text-white rounded-md shadow-sm hover:shadow-lg">
                                        Add
                                    </button>
                                </div>
                                {errors.tags && <p className="text-sm text-red-800 mt-1">{errors.tags}</p>}
                                {courseData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {courseData.tags.map((tag) => (
                                            <div
                                                key={tag}
                                                className="flex items-center gap-2 bg-primary/20 text-primary-foreground px-3 py-1 rounded-full"
                                            >
                                                <span className="text-sm">{tag}</span>
                                                <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-80 transition">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Course Duration */}
                            <div className="flex gap-2 flex-col w-full">
                                <label htmlFor="courseDuration" className="block text-sm font-medium text-muted-foreground">
                                    Duration <sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="courseDuration"
                                    name="courseDuration"
                                    value={courseData.courseDuration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 8 hours"
                                    className={
                                        errors.courseDuration
                                            ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                            : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                    }
                                />
                                {errors.courseDuration && <p className="text-sm text-red-800 mt-1">{errors.courseDuration}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between gap-10">
                            {/* course level */}
                            <div className="flex gap-2 flex-col w-full">
                                <label htmlFor="courseLevel" className="block text-sm font-medium text-muted-foreground">
                                    Level <sup className="text-red-500">*</sup>
                                </label>
                                <select
                                    id="courseLevel"
                                    name="courseLevel"
                                    value={courseData.courseLevel}
                                    onChange={handleInputChange}
                                    className={
                                        errors.courseName
                                            ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                            : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                    }
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                {errors.courseLevel && <p className="text-sm text-red-800 mt-1">{errors.courseLevel}</p>}
                            </div>

                            {/* course category */}
                            <div className="flex gap-2 flex-col w-full">
                                <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">
                                    Category <sup className="text-red-500">*</sup>
                                </label>
                                <input
                                    id="category"
                                    name="category"
                                    value={courseData.category}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Web Development"
                                    className={
                                        errors.courseName
                                            ? "border-destructive w-full rounded-sm border px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                            : "w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none"
                                    }
                                />
                                {errors.category && <p className="text-sm text-red-800 mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                type="button"
                                // onClick={onCancel} // You might want to add a cancel handler
                                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#F9C505] text-white rounded-md shadow-sm hover:bg-opacity-90"
                            >
                                Create Course
                            </button>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    );
}
