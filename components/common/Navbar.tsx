import { NavbarData } from "@/data/Navbar"
import Image from "next/image"
import Link from "next/link"
import ProfileDropdown from "./ProfileDropdown";
import { decoded } from "@/utils/decoded";
import { UserType } from "@/utils/type";

export default async function Navbar() {

    const user : UserType | null = await decoded();

    const isActive = (path: string) => typeof window !== "undefined" && window.location.pathname === path

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* 1. Logo  */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                            <Image src="/Logo.jpg" alt="Logo" width={40} height={40} className="rounded-full"/>
                        </div>
                        <span className="text-xl font-bold">Semicolon Coder's</span>
                    </Link>

                    {/* 2. Main Section */}
                    <div className="hidden items-center gap-8 md:flex">
                        {
                            NavbarData.map((item) => (
                                <Link className={`${isActive(item.link) ? "text-[#F9C505] font-semibold" : "text-muted-foreground hover:text-foreground"} text-sm font-medium transition-colors`} href={item.link || "/"} key={item.id}>
                                    {
                                        item.label
                                    }
                                </Link>
                            ))
                        }
                    </div>

                    {
                        !user ?
                            <div className="hidden items-center gap-3 md:flex">
                                <button className="rounded-md py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600">
                                    <Link href="/login">Log In</Link>
                                </button>
                                <button className="bg-[#F9C505] rounded-md border py-2 px-4 text-center transition-all text-white text-sm shadow-sm hover:shadow-lg">
                                    <Link href="/signup">Start Learning Free</Link>
                                </button>
                            </div>
                         : 
                            <div className="hidden items-center gap-3 md:flex">
                                <ProfileDropdown user={user}/>
                            </div>
                    }

                </div>
            </div>
        </nav>  
    )
}