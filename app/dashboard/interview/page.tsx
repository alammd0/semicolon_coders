import InterviewClient from "@/components/common/interview/InterviewClient";
import { decoded } from "@/utils/decoded";

export default async function InterviewPage() {

    const user = await decoded()

    return (
        <InterviewClient user = {user}/>
    )
}