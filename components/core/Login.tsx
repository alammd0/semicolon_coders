import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
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
               
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
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