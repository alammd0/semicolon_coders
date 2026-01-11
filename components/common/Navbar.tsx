
import { NavbarData } from "@/data/Navbar"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import jwt from "jsonwebtoken";
import ProfileDropdown from "./ProfileDropdown";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    iat: number;
    exp: number;
}

export default async function Navbar() {

    const token = (await cookies()).get("token")?.value ;

    let user: User | null = null;

    if(token){
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as User;
            user = decodedToken;
        }   
        catch(error){
            user = null
        }
    }

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
                                <Link className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" href={item.link || "/"} key={item.id}>
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
                                <ProfileDropdown user={user} />
                            </div>
                    }

                </div>
            </div>
        </nav>
       
    )
}