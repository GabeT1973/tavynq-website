import type { MouseEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"

  function handleHowItWorksClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    if (location.pathname === "/") {
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/#how-it-works")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/5 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
          Tavynq Automation
        </Link>
        <nav className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 md:gap-5">
          <Link
            to="/"
            aria-hidden={isHome}
            tabIndex={isHome ? -1 : 0}
            className={`hidden transition-opacity duration-300 hover:text-blue-600 sm:inline dark:hover:text-blue-400 ${
              isHome ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            Home
          </Link>
          <a
            href="/#how-it-works"
            onClick={handleHowItWorksClick}
            className="hidden hover:text-blue-600 sm:inline dark:hover:text-blue-400"
          >
            How it works
          </a>
          <ThemeToggle />
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}
