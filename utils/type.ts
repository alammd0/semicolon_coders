


export interface UserType {
    id: number;
    role: string;
    email: string;
    password: string | null;
    firstName: string;
    lastName: string | null;
    otp: string | null;
    expiresAt: Date | null;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
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


export interface course {
    id : number;
    title : string;
    description : string;
    courseDuration : string;
    courseLevel : string;
    thumbnail : thumbnail;
    price : string;
    Keyword :string;
    slug : string;
    sections : section[];
    createdAt : Date;
}

export interface thumbnail {
    id : number;
    url : string;
    createdAt : Date;
}

export interface section {
    id : number;
    sectionName : string;
    sectionDescription : string;
    subsection : subsection[];
    slug : string;
    createdAt : Date;
}

export interface subsection {
    id : number;
    subsectionName : string;
    slug : string;
    content : string;
    video : string;
    createdAt : Date;
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