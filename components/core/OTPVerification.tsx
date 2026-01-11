"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

export default function OTPVerification() {

    const [otp, setOtp] = useState("");
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleChange = (value : string) => {
        setOtp(value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{

            setLoading(true)
            const response = await axios.post("/api/auth/verify-otp", {
                otp : otp
            })

            if(response.status === 200){
                toast.success(response.data.message);
                setLoading(false);
                router.push("/login");
            }
            else{
                toast.error(response.data.message);
                setLoading(false)
            }
        }
        catch(error){
            console.log(error);
            setLoading(false)
        }
    }


    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg bg-background p-6 shadow-md">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Verifying your account</h1>
                        <p className="mt-2 text-muted-foreground">Please wait while we verify your account</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full space-y-8 rounded-xl bg-card p-8 shadow-xl shadow-[#F9C505]/20">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Verify Your Account
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your email address.
                    </p>
                </div>
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        shouldAutoFocus
                        inputType="tel"
                        renderInput={(props) => (
                            <input
                                {...props}
                                className="!w-12 h-12 text-2xl rounded-lg border border-[#F9C505] bg-transparent text-center text-foreground transition-all focus:border-[#F9C505] focus:ring-1 focus:ring-[#F9C505]"
                                />
                            )}
                        containerStyle="flex justify-center gap-3"
                    />
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-[#F9C505] text-primary-foreground rounded-lg font-medium hover:bg-[#F9C505]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
                        >
                            Verify
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm">
                    <p className="text-muted-foreground">
                        Didn&apos;t receive the code?{" "}
                        <button className="font-medium text-[#F9C505] underline-offset-4 hover:underline focus:outline-none">
                            Resend OTP
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}