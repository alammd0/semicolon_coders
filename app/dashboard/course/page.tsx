import CourseClient from "@/components/common/course/CourseClient";
import { decoded } from "@/utils/decoded";
import { UserType } from "@/utils/type";

export default async function CoursePage() {

    const user = await decoded() as UserType;

    return (
        <CourseClient user={user} />
    )
}