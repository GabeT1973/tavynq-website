import type { VercelRequest, VercelResponse } from "@vercel/node"
import nodemailer from "nodemailer"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function parseBody(body: unknown): Record<string, unknown> | null {
  if (typeof body === "string") {
    try {
      return JSON.parse(body || "{}")
    } catch {
      return null
    }
  }
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = parseBody(req.body)
  if (!body) {
    return res.status(400).json({ error: "Invalid request." })
  }

  const { name, email, phone, company, message } = body

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(company) ||
    !isNonEmptyString(message)
  ) {
    return res.status(400).json({ error: "Please fill in all required fields." })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } =
    process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: missing SMTP environment variables")
    return res.status(500).json({ error: "Email service is not configured." })
  }

  const port = SMTP_PORT ? Number(SMTP_PORT) : 587

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL || "gabe@tavynq.com",
      replyTo: email,
      subject: `New lead-gen inquiry: ${name} (${company})`,
      text: [
        "New inquiry from the tavynq.com contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${isNonEmptyString(phone) ? phone : "N/A"}`,
        `Company: ${company}`,
        "",
        "Message:",
        message,
        "",
        "Reply to this email to respond directly.",
      ].join("\n"),
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Contact form: failed to send email", error)
    return res.status(500).json({ error: "Failed to send message. Please try again later." })
  }
}
