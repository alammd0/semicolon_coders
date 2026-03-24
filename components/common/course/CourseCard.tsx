"use client";

import { course, UserType } from "@/utils/type";
import Link from "next/link";
import Image from "next/image";
import { Book, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CourseCard( {courses, user} : { courses : course[], user : UserType | null}) {

    const imageUrl = courses.map((course) => course.thumbnail.url).join(',');

    return (
        <div className="overflow-hidden hover:shadow-lg transition-shadow bg-card rounded-xl border">
             {/* Image */}
             <div
                className="h-50 m-3 rounded-md from-yellow-400 to-amber-500 flex items-center justify-center text-white font-semibold text-lg"
                style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: "cover"}}
             >
                {!imageUrl && "No Image"}
            </div>

            {
                courses.map((course, index) => {
                    return (
                        <div key={index}>
                            <div className="p-6">
                                <div className="mb-3">
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                        {course.Keyword}
                                    </Badge>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">
                                    {course.title}
                                </h3>

                    
                                {/* Description */}
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Badge className="bg-yellow-800 text-yellow-100 hover:bg-yellow-600">Lesson {
                                            course.sections.length}</Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between p-4 border-t border-border">
                                <span className="text-xl font-bold text-yellow-600 flex items-center justify-center"> <IndianRupee size={20}/> {course.price}</span>
                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer">
                                    Enroll
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}