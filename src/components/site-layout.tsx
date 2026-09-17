import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div key={location.pathname} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
