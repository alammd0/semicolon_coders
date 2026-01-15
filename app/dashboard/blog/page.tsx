import { decoded } from "@/utils/decoded";
import BlogClient from "@/components/common/blog/BlogClient";

export default async function BlogPage() {
  
  const user = await decoded();

  return <BlogClient user={user} />;
}
