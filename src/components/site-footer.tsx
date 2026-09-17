import { Link } from "react-router-dom"

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-gray-500 dark:text-gray-400 md:flex-row md:px-8">
        <p>&copy; {new Date().getFullYear()} Tavynq. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}
