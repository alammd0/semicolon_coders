"use client";


import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const features = [
  "Personalized learning paths",
  "Real-world project tutorials",
  "Interview preparation simulator",
  "Exclusive job opportunities",
];

export default function SignupPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

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

            const response = await axios.post("/api/auth/signup", {
                email : formData.email,
                password : formData.password,
                firstName : formData.firstName,
                lastName : formData.lastName
            })

            if(response.status === 201){
                toast.success(response.data.message);
                router.push("/verify");
                setLoading(false);
            }else{
                toast.error(response.data.message);
                setLoading(false);
            }
        }
        catch(error){
            console.log(error);
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


                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName">First name</label>
                            <input id="firstName" placeholder="Khalid" required 
                              className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                              onChange={handleChange}
                              name="firstName"
                              type="text"
                              value={formData.firstName}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName">Last name</label>
                            <input id="LastName" 
                              className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                              placeholder="alam" required 
                              name="lastName"
                              type="text"
                              onChange={handleChange} 
                              value={formData.lastName} 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email">Email address</label>
                        <input id="email"
                          className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                          type="email" placeholder="alam@example.com" required 
                          onChange={handleChange}
                          value={formData.email}
                          name="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password">Password</label>
                        <input id="password"
                          className="w-full rounded-sm border border-gray-300 px-2 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                          type="password" required placeholder="Password"
                          onChange={handleChange}  
                          value={formData.password}
                          name="password"
                        />
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