import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <div
          key={location.pathname}
          className="animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
        >
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
