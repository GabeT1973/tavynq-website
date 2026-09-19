import { Link } from "react-router-dom"

const starRows = [
  { y: 0.9, xs: [1, 2.2, 3.4, 4.6, 5.8] },
  { y: 1.9, xs: [1.6, 2.8, 4, 5.2] },
  { y: 2.9, xs: [1, 2.2, 3.4, 4.6, 5.8] },
  { y: 3.9, xs: [1.6, 2.8, 4, 5.2] },
]

function UsaFlag() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 19 10"
      className="h-3.5 w-auto shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
    >
      <rect width="19" height="10" fill="#fff" />
      {[0, 2, 4, 6, 8].map((y) => (
        <rect key={y} y={y} width="19" height="1" fill="#b22234" />
      ))}
      <rect width="7.6" height="5.4" fill="#3c3b6e" />
      {starRows.flatMap((row) =>
        row.xs.map((x) => <circle key={`${row.y}-${x}`} cx={x} cy={row.y} r="0.3" fill="#fff" />),
      )}
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-screen-xl px-4 text-sm text-gray-500 dark:text-gray-400 md:px-8">
        <div className="flex items-center justify-center gap-2 border-b border-black/5 py-4 dark:border-white/5 md:justify-start">
          <UsaFlag />
          <p>Proudly built and operated in the USA.</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Tavynq Automation. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
              Terms and Conditions
            </Link>
            <Link
              to="/cancellation-policy"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
