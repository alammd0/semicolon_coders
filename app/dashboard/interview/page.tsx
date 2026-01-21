import InterviewClient from "@/components/common/interview/InterviewClient";
import { decoded } from "@/utils/decoded";
import { UserType } from "@/utils/type";

export default async function InterviewPage() {

    const user = await decoded() as UserType

    return (
        <InterviewClient user = {user}/>
    )
}