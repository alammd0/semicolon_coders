import { decoded } from "@/utils/decoded";
import BlogClient from "@/components/common/blog/BlogClient";
import { UserType } from "@/utils/type";

export default async function BlogPage() {
  
  const User = await decoded() as UserType;

  return <BlogClient user={User} />;
}
