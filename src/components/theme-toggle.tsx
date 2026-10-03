import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/lib/theme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white/60 text-gray-700 transition-[border-color,color,transform] duration-200 hover:border-blue-600/40 hover:text-blue-600 active:scale-95 motion-reduce:transition-none dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-blue-400/40 dark:hover:text-blue-400"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
