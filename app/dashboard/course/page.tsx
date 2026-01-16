import { decoded } from "@/utils/decoded";
import { Plus, Search } from "lucide-react";
import Link from "next/link";


export default async function CoursePage() {

    const user = await decoded();

    return (
        <div className="mx-auto max-w-12xl sm:px-2 lg:px-2">
            <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 sm:max-w-md">
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold sm:text-5xl">Courses</h2>
                        <p className="mt-2 text-[14px] font-normal">Manage your documentation courses and learning materials</p>
                    </div>
                </div>

                {
                    user?.role === "admin" ?
                    <Link href="/dashboard/course/create-course">
                        <button className="flex items-center gap-2 rounded-lg bg-[#F9C505] px-4 py-2 text-sm transition-colors hover:bg-muted text-[14px] font-bold hover:text-white hover:shadow-lg shadow-gray-300 cursor-pointer">
                            <Plus className="h-4 w-4" />
                            Create Blog
                        </button>
                    </Link> : null
                }
            </div>

            {/* Here Implement the Blogs List */}
            {/* Card Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* <CardSection blogs={blogs}/> */}
            </div>
       </div>
    )
}