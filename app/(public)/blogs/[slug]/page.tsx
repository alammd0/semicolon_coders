import BlogDetailsComponents from "@/components/common/blog/BlogDetailsComponents";
import { decoded } from "@/utils/decoded";
import { UserType } from "@/utils/type";

export default async function BlogDetailsPage() {

    const user = await decoded() as UserType;

    return (
        <div>
            <BlogDetailsComponents user = {user}/>
        </div>
    )
}