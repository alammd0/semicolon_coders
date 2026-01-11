"use client";

import { User } from "@prisma/client";
import { Bell, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import jwt from "jsonwebtoken"


export default  async function DashboardLayout({ children } : { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
                <div className="flex h-full flex-col p-4">
                    <Link href="/" className="mb-8 flex items-center gap-2 px-2">
                        <span className="text-lg font-bold">Dashboard</span>
                    </Link>

                    <nav className="flex-1 space-y-1">

                        <Link
                            href="/dashboard/blog"
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                                       ${pathname === "/dashboard/blog" ? "bg-primary/10 text-[#F9C505]" : ""}`}
                        >
                            Blog
                        </Link>

                        <Link
                            href="/dashboard/course"
                             className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                                       ${pathname === "/dashboard/course" ? "bg-primary/10 text-[#F9C505]" : ""}`} >
                            Course
                        </Link>

                        <Link
                            href="/dashboard/job"
                             className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                                       ${pathname === "/dashboard/job" ? "bg-primary/10 text-[#F9C505]" : ""}`} >
                            Job
                        </Link>


                        <Link
                            href="/dashboard/interview"
                             className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                                       ${pathname === "/dashboard/interview" ? "bg-primary/10 text-[#F9C505]" : ""}`} >
                            Interview Prep
                        </Link>
                    </nav>
                    <div className="mt-auto border-t pt-4">
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                        <button
                            className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-destructive flex items-center"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-8 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-foreground font-medium tracking-wide-words">{pathname}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button>
                            <Bell className="h-5 w-5" />
                        </button>
                    </div>
                </header>
                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}