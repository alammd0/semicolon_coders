"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function BlogDetailsPage() {

    const { slug } = useParams<{ slug: string }>()
    const [blog, setBlog] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [error, setError] = useState(false)

    useEffect(() => {

        if (!slug) return

        const fetchBlog = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL_LOCAL}/blogs?filters[slug][$eq]=${slug}&populate=*`)
                const json = await res.json()

                if (!json.data?.length) {
                  setError(true)
                  return
                }

                setBlog(json.data[0])
              } catch (err) {
                setError(true)
              } finally {
                setLoading(false)
          }
        }

      fetchBlog()
    }, [slug])

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="loader">
                </div>
            </div>
        )
    }

    if (error)(
        <div className="min-h-screen flex items-center justify-center">
          {error}
        </div>
    )

    const { title, content, publishedAt, coverImage } = blog

    return (
        <div className="mx-auto max-w-4xl mt-4">
          <button
              onClick={() => router.back()}
              className="mb-8 inline-flex items-center gap-2 rounded-md bg-[#F9C505]/50 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 hover:bg-[#F9C505] cursor-pointer hover:text-white"
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
          <article className="mx-auto max-w-4xl px-4 py-8 bg-[#F9C505]/10 rounded-md mb-8">
              {coverImage?.url && (
                  <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
                      <Image
                        src={coverImage.url}
                        alt={title}
                        fill
                        className="object-cover opacity-100"
                      />
                  </div>
              )}

            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="secondary">Blog</Badge>
                  <span>{new Date(publishedAt).toDateString()}</span>
            </div>

            <div className="prose prose-lg max-w-none">
                <Markdown components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-semibold mt-8 mb-4" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-6 mb-2" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-[16px] font-bold mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside pl-5" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside pl-5" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                    a: ({ node, ...props }) => <a className="text-[#F9C505]/10 hover:underline" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-[#F9C505] pl-4 italic my-4" {...props} />,
                    code: ({ node, ...props }) => <code className="bg-[#F9C505]/10 p-1 rounded-md" {...props} />,
                    pre: ({ node, ...props }) => <pre className="bg-[#F9C505]/10 p-3 rounded-md text-sm overflow-x-auto mb-4" {...props} />,
                    table: ({ node, ...props }) => <table className="w-full border-collapse mb-4" {...props} />,
                    th: ({ node, ...props }) => <th className="border px-4 py-2 text-left bg-[#F9C505]/80 text-white" {...props} />,
                    td: ({ node, ...props }) => <td className="border px-4 py-2" {...props} />,
                  }}
                      remarkPlugins={[remarkGfm]}>{content}
                </Markdown>
            </div>
          </article>
      </div>
    )
}
