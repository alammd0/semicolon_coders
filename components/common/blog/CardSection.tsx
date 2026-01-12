import { getReadingTime } from "@/lib/timeCalculate";
import Image from "next/image";
import Link from "next/link";


export default function CardSection({ blogs }: { blogs: any[] }) {

    return (
        blogs.map((blog) => (
            <div key={blog.id} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-[#F9C505] hover:shadow-lg hover:shadow-[#F9C505]/20">
                <div className="relative h-48 overflow-hidden bg-secondary">
                    <Image
                        src={blog?.coverImage}
                        alt={blog.title}
                        width={500}
                        height={280}
                         className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <div className="flex flex-col p-6">
                    <h3 className="line-clamp-2 text-xl font-semibold text-card-foreground">{blog.title}</h3>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{blog.excerpt}</p>

                    <div className="mt-6 flex items-center justify-between pt-4">
                        <span className="text-sm font-medium text-muted-foreground">{getReadingTime(blog.content)} min read</span>

                        <Link href={`/blogs/${blog.slug}`}>
                            <button
                                className="rounded-md bg-[#F9C505] py-2 px-4 text-sm text-white shadow-sm transition-all hover:shadow-lg"
                            >
                                Learn 
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    )
)}