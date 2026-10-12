// DRAFT - have reviewed before relying on it.
import { LegalEmailLink, LegalList, LegalPage, LegalSection } from "@/components/legal-page"
import { site } from "@/config/site"
import { usePageMeta } from "@/lib/use-page-meta"

const strong = "font-medium text-gray-900 dark:text-white"

export function Terms() {
  usePageMeta(
    `Terms of Service | ${site.name}`,
    `The terms that apply to using the ${site.name} website and its B2B lead generation services.`,
  )

  return (
    <LegalPage title="Terms of Service" lastUpdated="October 11, 2026">
      <LegalSection title="Agreement to These Terms">
        <p>
          These Terms of Service ("Terms") apply to your use of signalfill.com and to services
          provided by {site.legalName} ("{site.name}," "we," "us"). "You" means the person or
          business using the site or our services. By using the site or our services, you
          agree to these Terms.
        </p>
        <p>
          Client engagements are also covered by a signed client agreement. If a signed client
          agreement conflicts with these Terms, the signed client agreement controls.
        </p>
      </LegalSection>

      <LegalSection title="Our Services">
        <p>
          {site.name} provides lead generation for {site.niche.full}. Through{" "}
          {site.offer.systemName}, we research public business signals, build prospect lists,
          set up and warm up sending domains and inboxes, write email outreach for your
          approval, send it, handle replies, and book sales calls on your calendar, with a
          short Meeting Brief before each call.
        </p>
        <p>
          We use public information only and never scan, probe, or test anyone's systems. We
          only send messages you have approved. The exact scope of your engagement, including
          your target market and the written definition of a qualified call, is set in your
          client agreement.
        </p>
      </LegalSection>

      <LegalSection title="No Guarantee of Results">
        <p>
          Outreach results depend on many things outside our control, including your market,
          offer, pricing, reputation, and how you run sales calls. We do not guarantee any
          number of replies, meetings, or qualified calls, any closed deals, or any revenue.
        </p>
        <p>
          Any estimates, targets, examples, projections, or calculator outputs we share, on
          this site, on a call, or in writing, are illustrations only, not promises. Where we
          offer to replace a bad-fit call or a no-show, it means we'll work to book another
          call in its place at no extra cost. It isn't a commitment to deliver a set number of
          calls.
        </p>
      </LegalSection>

      <LegalSection title="Fees and Payment">
        <p>
          Prices shown on this site are a general guide. Your rate is set in your client
          agreement.
        </p>
        <LegalList>
          <li>
            <strong className={strong}>Billing.</strong> Services are billed monthly, in
            advance. Payment is due on receipt of each invoice.
          </li>
          <li>
            <strong className={strong}>Non-payment.</strong> If an invoice is unpaid, we may
            pause services, including sending, until it is paid.
          </li>
          <li>
            <strong className={strong}>Refunds.</strong> Fees are non-refundable once a billing
            period begins, including if services end partway through that period.
          </li>
          <li>
            <strong className={strong}>Price changes.</strong> We may change our prices with 30
            days' written notice. A change applies from your first billing period after the
            notice period ends.
          </li>
          <li>
            <strong className={strong}>Founding Partner rate.</strong> The Founding Partner
            plan is limited to our first three MSP clients and is offered in exchange for
            permission to publish a case study about your results. Your Founding Partner rate
            is locked for 12 months from the start of service while your subscription stays
            active and in good standing. If your subscription ends or lapses, the locked rate
            ends with it. After the 12-month lock, your rate may change with 30 days' written
            notice, like any other price change.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Term and Termination">
        <p>
          Each engagement starts with a {site.initialTermDays}-day initial term. After that, it
          continues month-to-month until either side ends it with{" "}
          {site.cancellationNoticeDays} days' written notice. Notice can be given during the
          initial term, to take effect when the initial term ends.
        </p>
        <p>
          Either side may end the engagement early, by written notice, if the other side
          materially breaches these Terms or the client agreement and doesn't fix the breach
          within {site.cancellationNoticeDays} days of being told about it in writing. Unpaid
          fees for services already provided stay due after termination.
        </p>
      </LegalSection>

      <LegalSection title="Your Responsibilities as a Client">
        <LegalList>
          <li>Give us accurate, up-to-date information about your business and offer.</li>
          <li>
            Review and approve or comment on draft copy promptly. Delays in approval delay
            launch and sending.
          </li>
          <li>Attend the calls booked for you, or reschedule them promptly.</li>
          <li>
            Tell us right away if a prospect asks you not to be contacted, so we can add them
            to the suppression list.
          </li>
          <li>
            You are responsible for your own offers, the claims made about your services, and
            your compliance with the laws and regulations that apply to your business and
            industry.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Email Compliance">
        <p>
          We run outreach to comply with the CAN-SPAM Act. Every email identifies the sender,
          includes a valid postal address, and gives recipients a clear way to opt out.
          Opt-outs are honored promptly and kept on a suppression list.
        </p>
        <p>
          We may decline, pause, or change any campaign, message, or list that we believe is
          unlawful, misleading, or harmful, or that puts sending domains or recipients at
          risk.
        </p>
      </LegalSection>

      <LegalSection title="Ownership">
        <p>
          Once all fees owed are paid, you own the sending domains registered for your
          campaigns, the prospect lists built for you, and the email copy you approved.
        </p>
        <p>
          {site.legalName} keeps ownership of its methods, processes, software, tools,
          templates, know-how, and {site.offer.systemName}, including any improvements we make
          while working with you. Nothing in these Terms transfers them to you.
        </p>
      </LegalSection>

      <LegalSection title="Metro Exclusivity">
        <p>
          While your account is active and in good standing, we won't run lead generation for
          another MSP in your metro, as defined in your client agreement. Exclusivity ends if
          your account lapses, is paused for non-payment, or terminates.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          Our services rely on third-party providers, such as Microsoft, Smartlead, Calendly,
          domain registrars, and the inbox providers that receive our email. Email
          deliverability depends partly on them. We aren't liable for their outages, errors,
          or changes to their policies, pricing, or filtering, though we'll work to adapt when
          they happen.
        </p>
        <p>
          This site also links to or embeds third-party services, such as Calendly for booking
          and YouTube for video. Their own terms and privacy policies apply when you use them.
        </p>
      </LegalSection>

      <LegalSection title="Confidentiality">
        <p>
          Each side will keep the other's non-public business information confidential, use
          it only for the engagement, and share it only with people who need it to do the
          work. This doesn't cover information that is public, already known to the receiving
          side, independently developed, or that must be disclosed by law. This obligation
          continues after the engagement ends.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer of Warranties">
        <p>
          Except as stated in your client agreement, the site and our services are provided
          "as is" and "as available," without warranties of any kind, express or implied,
          including warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          To the fullest extent allowed by law, {site.legalName} is not liable for any
          indirect, incidental, special, consequential, or punitive damages, or for lost
          profits, revenue, or business opportunities. Our total liability for any claim is
          limited to the fees you paid us in the three months before the claim arose.
        </p>
      </LegalSection>

      <LegalSection title="Indemnification">
        <p>
          You agree to defend, indemnify, and hold harmless {site.legalName} from claims,
          losses, and costs (including reasonable legal fees) arising from your offers, your
          content and the claims you approve, or your violation of any law or of these Terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing Law">
        <p>
          These Terms are governed by the laws of the State of Florida, without regard to its
          conflict-of-law rules.
        </p>
      </LegalSection>

      <LegalSection title="General Terms">
        <LegalList>
          <li>
            <strong className={strong}>Force majeure.</strong> Neither side is responsible for
            delays or failures caused by events beyond its reasonable control, such as natural
            disasters, outages, or government action. This doesn't excuse payment of fees
            owed.
          </li>
          <li>
            <strong className={strong}>Assignment.</strong> You may not transfer your rights or
            obligations without our written consent. We may assign them as part of a merger,
            acquisition, or sale of our business.
          </li>
          <li>
            <strong className={strong}>Severability.</strong> If any part of these Terms is
            found unenforceable, the rest stays in effect.
          </li>
          <li>
            <strong className={strong}>Entire agreement.</strong> These Terms, together with
            any signed client agreement, are the entire agreement between us about their
            subject and replace earlier discussions about it.
          </li>
          <li>
            <strong className={strong}>Changes to these Terms.</strong> We may update these
            Terms from time to time. The "Last updated" date above shows when they last
            changed. Continuing to use the site or our services after a change means you
            accept the updated Terms. Changes don't override a signed client agreement.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection title="Using This Website">
        <p>
          Content on this site is for general information only. It isn't legal, financial, or
          other professional advice, and it isn't an offer that binds us until a client
          agreement is signed.
        </p>
        <p>
          You may use this site for lawful purposes only. Don't attempt to disrupt it, gain
          unauthorized access to it, or submit false information through its forms. Site
          content, branding, and materials belong to {site.legalName} and may not be copied
          without permission.
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
