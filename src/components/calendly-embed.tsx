import { useEffect, useRef, useState } from "react"
import { CalendarDays } from "lucide-react"
import { BookCallLink } from "@/components/book-call-link"
import { site } from "@/config/site"
import { useTheme } from "@/lib/theme"

// Inline Calendly calendar. The script only loads when the calendar scrolls near the viewport,
// so it costs nothing on first load. If the script is blocked or fails, a normal
// "Book a call" link is shown instead.
// Docs: https://calendly.com/help/advanced-calendly-embed-for-developers

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"
const LOAD_TIMEOUT_MS = 10000

type CalendlyApi = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?: boolean }) => void
}

declare global {
  interface Window {
    Calendly?: CalendlyApi
  }
}

let scriptPromise: Promise<CalendlyApi> | null = null

function loadCalendly(): Promise<CalendlyApi> {
  if (window.Calendly) return Promise.resolve(window.Calendly)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<CalendlyApi>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    const timer = window.setTimeout(() => reject(new Error("Calendly timed out")), LOAD_TIMEOUT_MS)
    script.onload = () => {
      window.clearTimeout(timer)
      if (window.Calendly) resolve(window.Calendly)
      else reject(new Error("Calendly unavailable"))
    }
    script.onerror = () => {
      window.clearTimeout(timer)
      reject(new Error("Calendly blocked"))
    }
    document.body.appendChild(script)
  }).catch((error) => {
    scriptPromise = null
    throw error
  })

  return scriptPromise
}

// Colors match the site theme (Calendly applies these on paid plans). Event details are hidden
// because the section above already explains the call; the calendar shows dates and times only.
function embedUrl(theme: "light" | "dark") {
  const colors =
    theme === "dark"
      ? { background_color: "111827", text_color: "f9fafb", primary_color: "3b82f6" }
      : { background_color: "ffffff", text_color: "111827", primary_color: "2563eb" }
  const url = new URL(site.calendlyUrl)
  url.searchParams.set("hide_event_type_details", "1")
  url.searchParams.set("hide_gdpr_banner", "1")
  for (const [key, value] of Object.entries(colors)) url.searchParams.set(key, value)
  return url.toString()
}

type Status = "loading" | "ready" | "failed"

export function CalendlyEmbed() {
  const { theme } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  // Without IntersectionObserver support, just load right away.
  const [inView, setInView] = useState(() => !("IntersectionObserver" in window))
  const [status, setStatus] = useState<Status>("loading")

  useEffect(() => {
    const node = wrapperRef.current
    if (!node || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  // (Re)build the widget when it comes into view and whenever the theme changes.
  useEffect(() => {
    if (!inView) return
    let cancelled = false

    loadCalendly()
      .then((calendly) => {
        const parent = widgetRef.current
        if (cancelled || !parent) return
        parent.replaceChildren()
        calendly.initInlineWidget({ url: embedUrl(theme), parentElement: parent, resize: true })
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("failed")
      })

    return () => {
      cancelled = true
    }
  }, [inView, theme])

  // Calendly's inline widget is a cross-origin iframe, so the site can't force its internal
  // colors - the background_color/text_color params above only take effect on Calendly plans
  // that support embed branding. On plans that don't, the iframe always renders its own white
  // card regardless of theme, so this wrapper and its loading/failed states are deliberately
  // fixed to light colors that match THAT white card (not the app's dark/light theme), so the
  // panel reads as one consistent light surface rather than a broken dark-text-on-white flash.
  if (status === "failed") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 bg-white p-8 text-center">
        <CalendarDays aria-hidden="true" className="h-8 w-8 text-blue-600" />
        <p className="max-w-sm text-sm text-gray-600">
          The calendar couldn't load here. You can still pick a time on Calendly.
        </p>
        <BookCallLink />
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="relative min-h-[540px] bg-white">
      {status !== "ready" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-gray-500"
        >
          <CalendarDays className="h-7 w-7 animate-pulse text-blue-600/70 motion-reduce:animate-none" />
          Loading calendar…
        </div>
      )}
      <div
        ref={widgetRef}
        aria-label="Booking calendar"
        role="region"
        className="relative min-h-[540px] [&_iframe]:-mb-1 [&_iframe]:block [&_iframe]:min-h-[540px] [&_iframe]:w-full"
      />
    </div>
  )
}
