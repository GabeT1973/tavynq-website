// DRAFT - have reviewed before relying on it.
import { LegalEmailLink, LegalPage, LegalSection } from "@/components/legal-page"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"

export function Terms() {
  usePageMeta(
    `Terms of Service | ${site.name}`,
    `The terms that apply to using the ${site.name} website and its B2B lead generation services.`,
  )

  return (
    <LegalPage title="Terms of Service" lastUpdated="October 1, 2026">
      <LegalSection title="Agreement to These Terms">
        <p>
          These Terms of Service ("Terms") apply to your use of signalfill.com and to services
          provided by {site.legalName} ("{site.name}," "we," "us"). By using the site or
          our services, you agree to these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Our Services">
        <p>
          {site.name} provides lead generation for managed IT service providers: we research
          public business signals, build prospect lists, write and send email outreach from
          sending domains we manage, handle replies, and book sales calls on our clients'
          calendars. We use public information only and never scan or test anyone's
          systems.
        </p>
        <p>
          Each client engagement is governed by a separate written agreement covering scope,
          fees, the definition of a qualified call, and billing. If that agreement conflicts
          with these Terms, the written agreement controls.
        </p>
      </LegalSection>

      <LegalSection title="Pricing and Billing">
        <p>
          Prices shown on this site are a general guide. Your final pricing is set in your
          written agreement. Our standard model is a one-time setup fee plus a fee for each
          qualified call that takes place. No-shows are not billed, and neither are calls you
          flag as a bad fit within {site.badFitWindowHours} hours under the written criteria
          in your agreement. Qualified calls are billed monthly, and invoices are due as
          stated in your agreement.
        </p>
      </LegalSection>

      <LegalSection title="Term and Cancellation">
        <p>
          There is no long-term contract. Services are month-to-month, and either side can
          cancel with {site.cancellationNoticeDays} days' written notice. The setup fee covers
          domains, inboxes, and campaign setup, so it is non-refundable once campaigns
          launch.
        </p>
      </LegalSection>

      <LegalSection title="No Guarantee of Results">
        <p>
          Outreach results depend on many factors outside our control, including your
          market, offer, pricing, and how you handle sales calls. Any targets we discuss are
          goals, not guarantees. We don't guarantee any number of calls, clients, or revenue.
        </p>
      </LegalSection>

      <LegalSection title="Your Responsibilities as a Client">
        <p>
          You agree to give us accurate information about your business and offer, to only
          offer lawful products and services, to attend the calls booked for you or
          reschedule them promptly, and to tell us right away if a prospect asks not to be
          contacted.
        </p>
      </LegalSection>

      <LegalSection title="Using This Website">
        <p>
          You may use this site for lawful purposes only. Don't attempt to disrupt it, gain
          unauthorized access to it, or submit false information through its forms. Site
          content, branding, and materials belong to {site.legalName} and may not be copied
          without permission.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          The site links to or embeds third-party services, such as Calendly for booking
          and YouTube for video. Their own terms and privacy policies apply when you use
          them.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers and Limitation of Liability">
        <p>
          The site and its content are provided "as is," without warranties of any kind. To
          the fullest extent allowed by law, {site.legalName} is not liable for indirect,
          incidental, or consequential damages, and our total liability for any claim is
          limited to the fees you paid us in the three months before the claim arose.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Florida, without regard to
          its conflict-of-law rules.
        </p>
      </LegalSection>

      <LegalSection title="Changes to These Terms">
        <p>
          We may update these Terms from time to time. The "Last updated" date above shows
          when they last changed. Continuing to use the site after a change means you accept
          the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these Terms? Email <LegalEmailLink email={site.email} />.
        </p>
        <address className="not-italic">
          {site.legalName}
          <br />
          {site.displayLocation}
        </address>
      </LegalSection>
    </LegalPage>
  )
}
