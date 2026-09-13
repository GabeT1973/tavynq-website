export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: September 13, 2026
      </p>

      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq ("Tavynq," "we," "us," or "our") provides AI-powered SMS automation
            services on behalf of home service businesses, such as HVAC, plumbing, and
            roofing companies ("client businesses"). This Privacy Policy explains how we
            collect, use, and protect information when end users text a phone number
            operated by Tavynq on behalf of a client business.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Information We Collect
          </h2>
          <p className="mt-3 leading-relaxed">
            When a customer or prospective customer sends a text message to a client
            business's phone number, we collect that person's phone number and the
            content of the text message conversation. We collect this information
            solely to respond to and manage customer service text messages on behalf of
            our client businesses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            How We Use Information
          </h2>
          <p className="mt-3 leading-relaxed">
            Phone numbers and message content collected through this service are used
            exclusively to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
            <li>Send automated and, where applicable, human-reviewed replies to inbound text messages;</li>
            <li>Schedule, confirm, and manage service appointments on behalf of the client business;</li>
            <li>Maintain a record of the conversation so the client business can provide continuity of service; and</li>
            <li>Improve the reliability and accuracy of our automated response system.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            We Do Not Sell Your Data
          </h2>
          <p className="mt-3 leading-relaxed">
            We do not sell, rent, or trade phone numbers or message content to third
            parties for marketing or any other purposes. Information collected is shared
            only with the specific client business the end user contacted, and with
            service providers (such as SMS carriers and hosting infrastructure) strictly
            as needed to operate the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Data Retention
          </h2>
          <p className="mt-3 leading-relaxed">
            We retain phone numbers and message content for as long as necessary to
            provide the customer service functions described above and to comply with
            applicable legal, tax, or record-keeping obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Opting Out
          </h2>
          <p className="mt-3 leading-relaxed">
            End users may reply STOP at any time to a text message thread to opt out of
            further automated messages from that client business.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-3 leading-relaxed">
            If you have questions about this Privacy Policy or how your information is
            handled, please contact us at{" "}
            <a href="mailto:privacy@tavynq.com" className="underline underline-offset-2">
              privacy@tavynq.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
