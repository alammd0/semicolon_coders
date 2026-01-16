import { decoded } from "@/utils/decoded";
import BlogClient from "@/components/common/blog/BlogClient";

export default async function BlogPage() {
  
  const User = await decoded();

  return <BlogClient user={User} />;
}
