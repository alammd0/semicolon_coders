"use client";

import { course, UserType } from "@/utils/type";
import Link from "next/link";
import Image from "next/image";
import { Book } from "lucide-react";

export default function CourseCard( {courses, user} : { courses : course[], user : UserType | null}) {
    
    const levelConfigs = {
        Beginner: {
            label: "Beginner",
            style: "text-yellow-700 bg-yellow-100 border-yellow-200"
        },
        Intermediate: {
            label: "Intermediate",
            style: "text-blue-700 bg-blue-100 border-blue-200"
        },
        Advanced: {
            label: "Advanced",
            style: "text-purple-700 bg-purple-100 border-purple-200"
        }
    };

    const getCourseLink = (role: string | undefined, slug: string) => role === "admin" ? `/dashboard/course/${slug}` : `/course/${slug}`;

    return (
        <div>
            {
                courses.map((course) => {

                    const config = levelConfigs[course.courseLevel as keyof typeof levelConfigs] || {
                        label: course.courseLevel,
                        style: "text-muted-foreground bg-secondary border-border",
                    };

                    return (
                        <div key={course.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-[#F9C505] hover:shadow-lg hover:shadow-[#F9C505]/20 hover:cursor-pointer">
                            <div className="relative h-48 overflow-hidden bg-secondary">
                                <Image
                                    src={course?.coverImage}
                                    alt={course.courseName}
                                    width={500}
                                    height={280}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex flex-col p-4">

                                <div className="flex items-center gap-2 mb-4">
                                    <p className={`text-xs font-bold px-2 py-0.5 rounded border capitalize ${config.style}`}>
                                        {config.label}
                                    </p>
                                    <p className="text-xs font-bold px-2 py-0.5 rounded border capitalize text-muted-foreground">
                                        {course.category}
                                    </p>
                                </div>

                                <h3 className="line-clamp-2 text-xl font-semibold text-card-foreground">{course.courseName}</h3>
                                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{course.courseDescription}</p>


                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2"> <Book className="h-5 w-4"/> {course.section.length} sections</span>
                                    <Link href={getCourseLink(user?.role, course.slug)}>
                                        <button
                                            className="rounded-md bg-[#F9C505] py-2 px-4 text-sm text-white shadow-sm transition-all hover:shadow-lg hover:cursor-pointer"
                                        >
                                            Learn 
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}