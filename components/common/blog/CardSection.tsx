"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,

  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getReadingTime } from "@/lib/timeCalculate";
import { timeFormat } from "@/lib/timeFormat";


export default function CardSection({ blogs }: { blogs: any[] }) {

    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {
                blogs.map((blog, index) => {
                    return <Card key={index} className="group relative mx-auto w-full overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={blog.coverImage.url}
                                alt=""
                                width={500}
                                height={280}
                                className="relative z-50 aspect-video w-full object-cover dark:brightness-40"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#F9C505]/40 transition-opacity duration-300 group-hover:bg-[F9C505]/55" />
                        </div>
                        <CardHeader className="relative z-10 space-y-2">

                            <div className="flex justify-between">
                                {/* Here add reading time */}
                                <Badge variant="secondary" className="w-fit">
                                    {
                                        getReadingTime(blog.content)
                                    }
                                </Badge>

                                {/* Here add reading time */}
                                <Badge variant="secondary" className="w-fit">
                                    {
                                        timeFormat(blog.publishedAt)
                                    }
                                </Badge>
                            </div>

                            <CardTitle className="line-clamp-2">
                                {blog.title}
                            </CardTitle>
                            
                            <CardDescription className="line-clamp-3">
                                {blog.description}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="flex justify-end">
                            <Link href={`/blogs/${blog.slug}`}>
                                <Button className="w-full">Read More</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                })
            }
        </div>
    )
}