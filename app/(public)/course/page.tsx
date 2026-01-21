import CourseComponents from "@/components/core/CourseComponets";
import { decoded } from "@/utils/decoded";
import { UserType } from "@/utils/type";

export default async function CoursePage() {

    const user = await decoded() as UserType;

    return <CourseComponents user = {user}/>
}