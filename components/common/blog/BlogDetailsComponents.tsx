"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { renderEditorJsData } from "@/lib/editorRenderer";
import Image from "next/image";

type EditorContent = {
  time?: number;
  blocks: any[];
  version?: string;
};

export default function BlogDetailsComponents() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [blog, setBlog] = useState<EditorContent>({ blocks: [] });
  const [loading, setLoading] = useState(true);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        console.log(data);

        if (data.message === "Blog fetched successfully") {
          setBlog(data.blog.content);
          setCoverImageUrl(data.blog.coverImage);
          setHeading(data.blog.title);
          setAuthor(data.blog.user.firstName);
          setDate(data.blog.createdAt);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  console.log(author)
  console.log(date);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9C505]/10 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>

        <div className="z-10 rounded-md bg-[#F9C505]/10 px-2 py-4 backdrop-blur-md space-y-7">
          <h1 className="text-3xl font-bold">{heading}</h1>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div>
                <p className="text-sm">Author</p>
                <p className="font-medium text-foreground">{author}</p>
              </div>
              <div>
                <p className="text-sm">Published</p>
                <p className="font-medium text-foreground">
                  {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
        </div>

        <div className="my-8">
          {coverImageUrl && (
            <Image
              src={coverImageUrl}
              alt="coverImage"
              width={900}
              height={400}
              className="w-full rounded-lg"
            />
          )}
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: renderEditorJsData(blog),
          }}
        />
      </div>


      {/* Newsletter CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-lg p-8 border border-[#F9C505]/20 bg-[#F9C505]/10">
            <h3 className="text-2xl font-bold text-foreground mb-3">Enjoy this article?</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to get more articles like this delivered to your inbox every week.
            </p>
            <div className="flex gap-3 max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-background border border-[#F9C505] rounded-md focus:outline-none focus:border-primary"
              />
              <button className="bg-[#F9C505] rounded-md border py-2 px-4 text-center transition-all text-white text-sm shadow-sm hover:shadow-lg">Subscribe</button>
            </div>
          </div>
        </section>
    </div>
  );
}
