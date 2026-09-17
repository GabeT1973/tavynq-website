export function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
        Terms and Conditions
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Last updated: September 16, 2026
      </p>

      <div className="mt-10 space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Acceptance of Terms
          </h2>
          <p className="mt-3 leading-relaxed">
            These Terms and Conditions ("Terms") govern your use of the automated SMS
            program provided by Tavynq ("Tavynq," "we," "us," or "our"). By texting with,
            or otherwise using, this SMS program you agree to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Description of the SMS Program
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq operates an automated missed-call text-back service on behalf of
            subscribed home service businesses, including HVAC, plumbing, and roofing
            companies. When a subscribed business misses an incoming call, Tavynq
            automatically sends the caller a text message on that business's behalf so
            their inquiry doesn't go unanswered.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Message Frequency and Data Rates
          </h2>
          <p className="mt-3 leading-relaxed">
            Message frequency varies. Message and data rates may apply. Standard rates
            from your wireless carrier apply to all messages sent and received through
            this program.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Opt-Out and Help
          </h2>
          <p className="mt-3 leading-relaxed">
            Reply STOP to unsubscribe at any time. Reply HELP for assistance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            No Guarantee of Availability
          </h2>
          <p className="mt-3 leading-relaxed">
            While we strive to provide reliable, timely automated responses, we do not
            guarantee that the service will be uninterrupted, error-free, or available at
            all times.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Limitation of Liability
          </h2>
          <p className="mt-3 leading-relaxed">
            To the fullest extent permitted by law, Tavynq and its officers, employees,
            and agents shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to this SMS
            program, including any actions taken or not taken by a subscribed business in
            response to messages facilitated by our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Changes to These Terms
          </h2>
          <p className="mt-3 leading-relaxed">
            We may update these Terms from time to time. Continued use of the service
            after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mt-3 leading-relaxed">
            Tavynq
            <br />
            20078 Stella Wy Apt. 365
            <br />
            Lutz, FL
          </p>
          <p className="mt-3 leading-relaxed">
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:gabe@tavynq.com" className="underline underline-offset-2">
              gabe@tavynq.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Legal Notices
          </h2>
          <p className="mt-3 leading-relaxed">
            &copy; {new Date().getFullYear()} Tavynq Automation. All rights reserved. These
            Terms, the SMS program, and the Tavynq service are provided by Tavynq
            Automation "as is," without warranty of any kind, express or implied.
          </p>
        </section>
      </div>
    </div>
  )
}
