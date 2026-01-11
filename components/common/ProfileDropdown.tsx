"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function ProfileDropdown({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        try {

            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                console.error("Logout failed");
            }

        } catch (error) {

            console.error("An error occurred during logout:", error);

        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" stroke-width="1.5" stroke="currentColor" className="size-9">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute -right-20 mt-3 w-48 bg-white rounded-md shadow z-50 ring-black ring-opacity-5 px-2 py-4 space-y-2">
                    <div className="px-4 py-2 text-sm text-gray-700">
                        <p className="font-semibold">{`${user.firstName}`}</p>
                    </div>
                    <Link href="/dashboard/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="text-left px-4 py-2 text-[16px] font-semibold text-white hover:bg-gray-100 bg-[#F9C505] rounded-md flex w-full items-center justify-center"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
