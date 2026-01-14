

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

export interface Question {
    id? : number;
    title: string;
    question: string;
    answer: string;
    difficulty: "easy" | "medium" | "hard";
    category: string;
    experienceLevel: "beginner" | "mid" | "advanced";
    tags: string[];
    codeSnippet: string;
    published: boolean;
    createdAt: Date;
}

export interface QuestionDetails{
    id : number;
    title : string;
    question : string;
    answer : string;
    difficulty : "easy" | "medium" | "hard";
    category : string;
    experience : "beginner" | "mid" | "advanced";
    tags : {
        id : number;
        name : string;
    };
    slug : string
}