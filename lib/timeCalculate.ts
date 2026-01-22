
export function getReadingTime(content: string) {
    if (!content) return "0 min read"

    // Remove HTML tags (important for rich text)
    const plainText = content.replace(/<[^>]+>/g, "")

    // Count words
    const words = plainText.trim().split(/\s+/).length

    // Calculate reading time
    const minutes = Math.ceil(words / 200)

    return `${minutes} min read`
}
