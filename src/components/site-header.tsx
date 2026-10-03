import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { scrollToId } from "@/lib/scroll"
import { useActiveSection, useScrolled } from "@/lib/use-active-section"
import { cn } from "@/lib/utils"

const navLinks = [
  { id: "how-it-works", label: "How it works" },
  { id: "different", label: "Why Tavynq" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
] as const

const sectionIds = navLinks.map((link) => link.id)

export function SiteHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds, isHome)
  const solid = scrolled || menuOpen

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

    if (isHome) {
      scrollToId(id)
      window.history.replaceState(null, "", `#${id}`)
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none",
        solid
          ? "border-black/[0.06] bg-white/75 shadow-[0_1px_12px_-6px_rgb(0_0_0/0.08)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.06] dark:bg-gray-950/70"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-3.5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-8">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="justify-self-start rounded-md"
          aria-label="Tavynq home"
        >
          <Logo />
        </Link>

        <DesktopNav active={active} onSectionClick={handleSectionClick} />

        <div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <ThemeToggle />
          <BookCallLink size="sm" className="hidden min-[380px]:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-gray-700 transition-colors hover:border-blue-600/40 hover:text-blue-600 active:scale-95 md:hidden dark:border-white/10 dark:text-gray-200 dark:hover:border-blue-400/40 dark:hover:text-blue-400"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden motion-reduce:transition-none",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="border-t border-black/[0.06] px-4 pb-5 pt-2 dark:border-white/[0.06]">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => handleSectionClick(event, link.id)}
                    aria-current={active === link.id ? "location" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base transition-colors",
                      active === link.id
                        ? "bg-black/[0.04] text-gray-900 dark:bg-white/[0.06] dark:text-white"
                        : "text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <BookCallLink size="lg" className="mt-3 w-full" />
          </nav>
        </div>
      </div>
    </header>
  )
}

// Centered links with a pill that slides to whichever section is in view.
function DesktopNav({
  active,
  onSectionClick,
}: {
  active: string | null
  onSectionClick: (event: MouseEvent<HTMLAnchorElement>, id: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    function measure() {
      const target = active
        ? trackRef.current?.querySelector<HTMLElement>(`[data-section="${active}"]`)
        : null
      setIndicator(target ? { left: target.offsetLeft, width: target.offsetWidth } : null)
    }
    measure()
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => window.removeEventListener("resize", measure)
  }, [active])

  return (
    <nav aria-label="Main" className="hidden md:block">
      <div ref={trackRef} className="relative">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-black/[0.05] ring-1 ring-inset ring-black/[0.04] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none dark:bg-white/[0.07] dark:ring-white/[0.06]",
            indicator ? "opacity-100" : "opacity-0",
          )}
          style={
            indicator
              ? { transform: `translateX(${indicator.left}px)`, width: indicator.width }
              : undefined
          }
        />
        <ul className="relative flex items-center gap-1 text-sm">
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`/#${link.id}`}
              data-section={link.id}
              onClick={(event) => onSectionClick(event, link.id)}
              aria-current={active === link.id ? "location" : undefined}
              className={cn(
                "block rounded-full px-3.5 py-1.5 transition-colors duration-200",
                active === link.id
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
        </ul>
      </div>
    </nav>
  )
}
