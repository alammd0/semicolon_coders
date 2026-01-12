

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otp: string;
    expiresAt: Date;
    role: string;
    isVerified: boolean;
    createdAt: Date;
}