

export const getReadingTime = (content: any) => {
    const words = content.blocks.map((block: any) => {
        if (block.data?.text) {
                return block.data.text.replace(/<[^>]+>/g, "").split(" ").length
            }
            return 0
        }).reduce((a: number, b: number) => a + b, 0)

  return Math.ceil(words / 200)
}
