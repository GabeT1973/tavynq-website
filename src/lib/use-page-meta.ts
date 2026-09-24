import { useEffect } from "react"

function setDescription(content: string) {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!tag) {
    tag = document.createElement("meta")
    tag.name = "description"
    document.head.appendChild(tag)
  }
  tag.content = content
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const previousTitle = document.title
    const previousDescription =
      document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ""

    document.title = title
    setDescription(description)

    return () => {
      document.title = previousTitle
      setDescription(previousDescription)
    }
  }, [title, description])
}
