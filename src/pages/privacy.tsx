// DRAFT - have reviewed before relying on it.
import { LegalEmailLink, LegalPage, LegalSection } from "@/components/legal-page"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"

export function Privacy() {
  usePageMeta(
    `Privacy Policy | ${site.name}`,
    `How ${site.name} collects, uses, and protects information through its website and B2B outreach.`,
  )

  return (
    <LegalPage title="Privacy Policy" lastUpdated="October 3, 2026">
      <LegalSection title="Overview">
        <p>
          {site.legalName} ("{site.name}," "we," "us") is a lead generation agency for managed
          IT service providers (MSPs). We use email outreach to book sales calls for our own
          business and for our clients.
          This policy explains what information we collect through tavynq.com, our
          outreach, and our client work, and how we use it.
        </p>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>
          <strong className="font-medium text-gray-900 dark:text-white">From you directly.</strong>{" "}
          When you use our contact form, book a call, or email us, we collect what you
          provide, such as your name, work email, company website, metro, and question.
        </p>
        <p>
          <strong className="font-medium text-gray-900 dark:text-white">
            Booking calendar (Calendly).
          </strong>{" "}
          Our booking calendar is provided by Calendly and embedded on our site. It loads when
          you scroll to it. Calendly may set cookies, and it collects the details you enter to
          book a call (such as your name, email, chosen time, and answers to booking
          questions), which are shared with us. Calendly's own privacy policy also applies to
          how it handles that information.
        </p>
        <p>
          <strong className="font-medium text-gray-900 dark:text-white">
            Business contact information.
          </strong>{" "}
          To run outreach, we collect professional contact details (such as name, job title,
          company, work email, and company website) from business data providers and
          publicly available sources. We verify email addresses before sending.
        </p>
        <p>
          <strong className="font-medium text-gray-900 dark:text-white">
            Public business signals.
          </strong>{" "}
          We also review publicly available information about businesses, such as published
          DNS and email security records, job postings, office announcements, and company
          size. We only look at public information. We never scan, probe, or test anyone's
          systems.
        </p>
        <p>
          <strong className="font-medium text-gray-900 dark:text-white">
            Website usage.
          </strong>{" "}
          Our hosting provider may log basic technical data (such as IP address and browser
          type) to operate and secure the site. We don't set advertising or tracking
          cookies ourselves; the embedded Calendly calendar may set its own cookies, as
          described above. Your browser stores your light/dark theme choice locally on your
          device.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <p>
          We use information to reply to inquiries, schedule and hold calls, send relevant
          business outreach, deliver services to clients, send invoices, and keep our
          systems secure. We don't sell personal information.
        </p>
      </LegalSection>

      <LegalSection title="Business Outreach and Opting Out">
        <p>
          If you received an email from us or on a client's behalf, it was sent because your
          professional role appeared relevant to the sender's services. Every outreach email
          includes a way to opt out. You can also email <LegalEmailLink email={site.email} />{" "}
          at any time, and we'll stop contacting you and add you to our suppression list.
        </p>
      </LegalSection>

      <LegalSection title="Client Campaigns">
        <p>
          When we run campaigns for a client, we process prospect information on that
          client's behalf and under our agreement with them. We use it only to run that
          client's campaigns. If you book a call with one of our clients, we share a short
          brief with them before the call, including your business details, the public
          information that led to our outreach, and your reply.
        </p>
      </LegalSection>

      <LegalSection title="Service Providers">
        <p>
          We share information only with providers that help us operate, such as website
          hosting, email and inbox providers, our email sending platform, data and email
          verification providers, scheduling (Calendly), video hosting (YouTube), and
          payments (Stripe). They may use it only to provide their services to us. We may
          also disclose information if required by law.
        </p>
      </LegalSection>

      <LegalSection title="Retention and Security">
        <p>
          We keep information only as long as needed for the purposes above or as required
          by law. We keep opt-out records so we don't contact you again. We use reasonable
          safeguards to protect information, but no method of transmission or storage is
          completely secure.
        </p>
      </LegalSection>

      <LegalSection title="Your Choices and Rights">
        <p>
          You can ask us to access, correct, or delete the personal information we hold
          about you, or to stop contacting you, by emailing{" "}
          <LegalEmailLink email={site.email} />. Depending on where you live (for example,
          California), you may have additional rights under local law. We won't
          discriminate against you for exercising them.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our services are for businesses and aren't directed to anyone under 16. We don't
          knowingly collect information from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to This Policy">
        <p>
          We may update this policy from time to time. The "Last updated" date above shows
          when it last changed.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy? Email <LegalEmailLink email={site.email} />.
        </p>
        <address className="not-italic">
          {site.legalName}
          <br />
          {site.address}
        </address>
      </LegalSection>
    </LegalPage>
  )
}
