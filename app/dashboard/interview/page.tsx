import InterviewClient from "@/components/common/interview/InterviewClient";
import { decoded } from "@/utils/decoded";
import { User } from "@prisma/client";

export default async function InterviewPage() {

    const user = (await decoded()) as User | null;
    

    return (
        <InterviewClient user = {user}/>
    )
}