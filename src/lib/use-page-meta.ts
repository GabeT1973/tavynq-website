import { useEffect } from "react"
import { site } from "@/config/site"

function setMeta(name: string, content: string | null) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (content === null) {
    tag?.remove()
    return
  }
  if (!tag) {
    tag = document.createElement("meta")
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.appendChild(link)
  }
  link.href = href
}

type PageMetaOptions = {
  // Ask search engines not to index this page (used by the 404 page).
  noindex?: boolean
}

export function usePageMeta(title: string, description: string, options: PageMetaOptions = {}) {
  const { noindex = false } = options

  useEffect(() => {
    const previousTitle = document.title
    const previousDescription =
      document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? ""
    const previousCanonical =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? `${site.url}/`

    document.title = title
    setMeta("description", description)
    setCanonical(`${site.url}${window.location.pathname}`)
    if (noindex) setMeta("robots", "noindex")

    return () => {
      document.title = previousTitle
      setMeta("description", previousDescription)
      setCanonical(previousCanonical)
      if (noindex) setMeta("robots", null)
    }
  }, [title, description, noindex])
}
