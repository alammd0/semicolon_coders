"use client";

import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginPage() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        try{
            setLoading(true);
            const response = await axios.post("/api/auth/login", {
                email : formData.email,
                password : formData.password
            })

            if(response.status === 200){
                toast.success(response.data.message);
                setLoading(false);
                router.push("/");
            }
            else{
                toast.error(response.data.message);
                setLoading(false);
            }
        }
        catch(error){
            toast.error("Something went wrong");
            setLoading(false);
        }
    }

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg bg-background p-6 shadow-md">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Creating your account</h1>
                        <p className="mt-2 text-muted-foreground">Please wait while we create your account</p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-card px-4">
            <div className="w-full max-w-md space-y-4 rounded-lg bg-background p-6 shadow-md">
                
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                            <Image src="/Logo.jpg" alt="Logo" width={40} height={40} className="rounded-full"/>
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-muted-foreground">Log in to continue your learning journey</p>
                </div>
               
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            required
                            placeholder="Password"
                            className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#F9C505] py-2 text-sm text-white shadow-sm transition-all hover:shadow-lg"
                    >
                            Login
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-[#F9C505] hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}