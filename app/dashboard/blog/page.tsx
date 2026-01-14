import { decoded } from "@/utils/decoded";
import { User } from "@/utils/type";
import BlogClient from "@/components/common/blog/BlogClient";

export default async function BlogPage() {
  const user = (await decoded()) as User | null;

  return <BlogClient user={user} />;
}
