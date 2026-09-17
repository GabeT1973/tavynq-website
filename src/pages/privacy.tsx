export function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: September 16, 2026
      </p>

      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Overview
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq ("Tavynq," "we," "us," or "our") provides AI-powered SMS automation for
            home service businesses, such as HVAC, plumbing, and roofing companies
            ("client businesses"). When a client business misses an incoming call, Tavynq
            automatically sends a text message to the caller on that business's behalf so
            the inquiry doesn't go unanswered. This Privacy Policy explains what
            information we collect in connection with that service and how we use it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Information We Collect
          </h2>
          <p className="mt-3 leading-relaxed">
            In order to provide this service, we collect the phone numbers of callers who
            miss a call to a client business, and the content of any SMS messages
            exchanged between the caller and the client business's automated number.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            How We Use This Information
          </h2>
          <p className="mt-3 leading-relaxed">
            Caller phone numbers and SMS message content are used solely to send automated
            SMS replies related to missed calls for the client business the caller
            contacted, and to maintain a record of that conversation so the business can
            follow up appropriately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            We Do Not Sell or Share Your Data
          </h2>
          <p className="mt-3 leading-relaxed">
            We do not sell or share phone numbers or message data with third parties for
            marketing purposes. Information is shared only with the specific client
            business the caller contacted, and with service providers (such as SMS
            carriers and hosting infrastructure) strictly as needed to operate the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Opting Out
          </h2>
          <p className="mt-3 leading-relaxed">
            Customers can reply STOP at any time to stop receiving automated text
            messages from a client business.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-3 leading-relaxed">
            If you have questions about this Privacy Policy or how your information is
            handled, please contact us at{" "}
            <a href="mailto:gabe@tavynq.com" className="underline underline-offset-2">
              gabe@tavynq.com
            </a>
            .
          </p>
          <p className="mt-3 leading-relaxed">
            Tavynq
            <br />
            20078 Stella Wy Apt. 365
            <br />
            Lutz, FL
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Legal Notices
          </h2>
          <p className="mt-3 leading-relaxed">
            &copy; {new Date().getFullYear()} Tavynq Automation. All rights reserved. This
            Privacy Policy and the Tavynq service are provided by Tavynq Automation "as
            is," without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </div>
  )
}
