import CourseClient from "@/components/common/course/CourseClient";
import { decoded } from "@/utils/decoded";

export default async function CoursePage() {
    const user = await decoded();

    return (
        <CourseClient user={user} />
    )
}