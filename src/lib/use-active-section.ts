import { useEffect, useState } from "react"

// Scrollspy: returns the id of the last section whose top has passed a line ~35% down the
// viewport, or null above the first one. Uses one rAF-throttled passive scroll listener.
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    function update() {
      frame = 0
      const line = window.innerHeight * 0.35
      let current: string | null = null
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ids, enabled])

  return enabled ? active : null
}

// True once the page has scrolled past a few pixels (for the header's solid state).
export function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}
