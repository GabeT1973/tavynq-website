import { useState, type FormEvent } from "react"

const ORGANIZATION_TYPES = [
  "HVAC",
  "Plumbing",
  "Roofing",
  "Electrical",
  "Other Home Services",
  "Other",
] as const

type FormState = {
  name: string
  email: string
  phone: string
  organizationType: string
  organizationName: string
  message: string
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  organizationType: "",
  organizationName: "",
  message: "",
}

type FormErrors = Partial<Record<keyof FormState, string>>
type Status = "idle" | "submitting" | "success" | "error"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClasses =
  "mt-2 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none dark:border-white/10 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = "Please enter your name."
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!EMAIL_PATTERN.test(form.email)) {
      nextErrors.email = "Please enter a valid email address."
    }
    if (!form.organizationType) {
      nextErrors.organizationType = "Please select an organization type."
    }
    if (!form.organizationName.trim()) {
      nextErrors.organizationName = "Please enter your organization name."
    }
    if (!form.message.trim()) nextErrors.message = "Please tell us how we can help."

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Something went wrong. Please try again.")
      }

      setStatus("success")
      setForm(initialState)
      setErrors({})
    } catch (error) {
      setStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center md:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Message sent
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Thanks for reaching out — we'll get back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Tell us about your business and we'll be in touch.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="organizationType"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Organization Type *
          </label>
          <select
            id="organizationType"
            value={form.organizationType}
            onChange={(e) => update("organizationType", e.target.value)}
            className={inputClasses}
          >
            <option value="" disabled>
              Select an option
            </option>
            {ORGANIZATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.organizationType && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationType}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="organizationName"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Organization Name *
          </label>
          <input
            id="organizationName"
            type="text"
            value={form.organizationName}
            onChange={(e) => update("organizationName", e.target.value)}
            className={inputClasses}
          />
          {errors.organizationName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationName}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-white">
            How Can We Help? *
          </label>
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClasses}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}
