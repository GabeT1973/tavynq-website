import { useEffect, useState, type MouseEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { site } from "@/config/site"
import { scrollToId } from "@/lib/scroll"

const navLinks = [
  { id: "how-it-works", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
]

export function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [menuOpen])

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    setMenuOpen(false)

    if (location.pathname === "/") {
      scrollToId(id)
      window.history.replaceState(null, "", `#${id}`)
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/5 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 sm:gap-3 md:gap-5">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={(event) => handleSectionClick(event, link.id)}
              className="hidden hover:text-blue-600 md:inline dark:hover:text-blue-400"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <BookCallLink size="sm" className="hidden min-[380px]:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-gray-600 transition-colors hover:border-blue-600/40 hover:text-blue-600 md:hidden dark:border-white/10 dark:text-gray-300 dark:hover:border-blue-400/40 dark:hover:text-blue-400"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </div>
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-black/5 px-4 pb-5 pt-2 md:hidden dark:border-white/5"
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={(event) => handleSectionClick(event, link.id)}
                className="block rounded-lg px-2 py-3 text-base text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <BookCallLink size="lg" className="mt-3 w-full" />
      </div>
    </header>
  )
}
