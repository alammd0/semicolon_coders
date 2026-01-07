import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const features = [
  "Personalized learning paths",
  "Real-world project tutorials",
  "Interview preparation simulator",
  "Exclusive job opportunities",
];

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      <div className="flex flex-col items-center justify-center bg-card px-4 py-12 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-left">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                <Image src="/Logo.jpg" alt="Logo" width={40} height={40} className="rounded-full"/>
              </div>
              <span className="text-xl font-bold">Semicolon Coder's</span>
            </Link>
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-muted-foreground">Start learning for free today. No credit card required.</p>
          </div>


          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name">First name</label>
                <input id="first-name" placeholder="Khalid" required 
                  className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name">Last name</label>
                <input id="last-name" 
                  className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                 placeholder="alam" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email address</label>
              <input id="email"
               className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              type="email" placeholder="alam@example.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <input id="password"
                className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
               type="password" required placeholder="Password"/>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
            </div>
            <button className="bg-[#F9C505] rounded-md border py-2 px-4 text-center transition-all text-white text-sm shadow-sm hover:shadow-lg w-full" type="submit">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#F9C505] hover:underline">
              Log in
            </Link>
          </p>

        </div>
      </div>

      <div className="hidden flex-col justify-center bg-[#F9C505] p-12 text-primary-foreground lg:flex">
        <div className="max-w-md space-y-8">
          <h2 className="text-4xl font-bold">Unlock your potential with CodeLearn</h2>
          <div className="space-y-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />
                <span className="text-lg opacity-90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}