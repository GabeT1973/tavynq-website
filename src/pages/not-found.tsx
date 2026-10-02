import { Link } from "react-router-dom"
import { pillPrimary } from "@/components/book-call-link"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"

export function NotFound() {
  usePageMeta(`Page not found | ${site.name}`, "This page doesn't exist.", { noindex: true })

  return (
    <div className="mx-auto max-w-2xl px-4 py-28 text-center md:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        This page doesn't exist
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        The link may be old or mistyped. Everything you need is on the home page.
      </p>
      <Link to="/" className={`${pillPrimary} mt-8 px-6 py-3 text-sm`}>
        Back to home
      </Link>
    </div>
  )
}
