import { Link } from "react-router-dom"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/5 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          Tavynq
        </Link>
        <nav className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
          <Link to="/#how-it-works" className="hover:text-gray-900 dark:hover:text-white">
            How it works
          </Link>
          <Link to="/#contact" className="hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
