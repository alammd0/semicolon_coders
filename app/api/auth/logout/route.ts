import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {

        (await cookies()).set("token", "", { path: "/" });
        
        return NextResponse.json({ 
            success: true, 
            message: "Logged out successfully" 
        }, { status: 200 });

    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ 
            success: false, 
            message: "An error occurred during logout." 
        }, { status: 500 });
    }
}
