import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="sm:px-6 lg:px-8 bg-gradient-to-br from-white via-beige to-white !pt-[128px] !pb-[24px] !pl-[16px] !pr-[16px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-navy mb-4">Privacy Policy</h1>
          <p className="text-slate text-lg">Last Updated: January 5, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="sm:px-6 lg:px-8 !pt-[32px] !pb-[24px] !pl-[16px] !pr-[16px] bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="text-slate leading-relaxed space-y-8">
            <p>
              LIGHTHOUSE INSURANCE ("Lighthouse Insurance," "we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit https://www.lighthouseinsgroup.com (the "Website") or contact us to request information or an insurance quote.
            </p>
            
            <p>
              Our data practices comply with Florida insurance regulations and applicable federal laws.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Information We Collect</h2>
            <p>
              We collect limited personal information that you voluntarily provide to us through forms or direct communication, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
            </ul>
            <p>
              We do not collect payment information, Social Security numbers, or banking details through this Website.
            </p>

            <h2 className="!font-bold !text-3xl !mt-[48px] !mb-[12px] text-navy">How We Use Your Information</h2>
            <p>
              We use the information you provide for purposes such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Responding to quote requests and inquiries</li>
              <li>Communicating with you about insurance-related questions or next steps</li>
              <li>Providing customer support</li>
              <li>Operating and improving our Website and services</li>
            </ul>
            <p>
              We use this information only in ways consistent with the purpose for which it was provided.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Text Messaging and Communications</h2>
            <p>
              If you choose to communicate with us by phone or text message, we may respond using business phone systems, including VoIP services.
            </p>
            <p>
              <strong>Regarding text message data privacy:</strong> No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
            <p>
              Message and data rates may apply depending on your mobile carrier. You may opt out of text communications at any time by notifying us directly.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">How We Share Information</h2>
            <p>
              We do not sell personal information.
            </p>
            <p>
              We may share information only in limited circumstances, such as:
            </p>

            <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">With Insurance Partners</h3>
            <p>
              We may share your information with insurance carriers or related service providers when necessary to assist with a quote or insurance inquiry you requested.
            </p>

            <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">With Service Providers</h3>
            <p>
              We may share information with vendors that support our business operations (such as communications or hosting services), solely to perform services on our behalf.
            </p>

            <h3 className="text-2xl font-semibold text-navy mt-8 mb-4">For Legal Compliance</h3>
            <p>
              We may share information when required to comply with legal obligations or lawful requests.
            </p>
            <p>
              Information is shared only as reasonably necessary for business or legal purposes.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Cookies and Website Analytics</h2>
            <p>
              Our Website uses cookies and similar technologies for functionality and to understand how visitors use our site. We use Google Analytics, which collects information about your visit such as pages viewed, time spent on the site, and general location information. This helps us improve our Website and services.
            </p>
            <p>
              <strong>What are cookies?</strong> Cookies are small text files stored on your device that help websites function properly and collect usage information.
            </p>
            <p>
              <strong>Your choices:</strong> You can control cookies through your browser settings or opt out of Google Analytics by visiting <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">https://tools.google.com/dlpage/gaoptout</a>. Disabling cookies may affect certain Website features.
            </p>
            <p>
              <strong>Do Not Track:</strong> Our Website does not currently respond to Do Not Track signals from browsers.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Data Security</h2>
            <p>
              We take reasonable administrative and technical measures designed to protect the information you provide, including SSL/HTTPS encryption for data transmitted through our Website and secure hosting for stored information. However, no method of transmission over the internet or electronic storage is completely secure.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Data Retention</h2>
            <p>
              We retain personal information for 3-5 years from the date of collection or last contact, or as long as reasonably necessary to respond to inquiries, maintain records, and comply with legal or regulatory obligations.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Your Privacy Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request access to the personal information we have about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Children's Privacy</h2>
            <p>
              This Website is not intended for children under the age of 13, and we do not knowingly collect personal information from children under 13 in compliance with the Children's Online Privacy Protection Act (COPPA).
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Third-Party Links</h2>
            <p>
              Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies before providing any personal information.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-3xl font-bold text-navy mt-12 mb-6">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights, you may contact us at:
            </p>
            <div className="bg-beige p-6 rounded-lg mt-4">
              <p className="font-semibold text-navy mb-2">LIGHTHOUSE INSURANCE</p>
              <p>Website: <a href="https://www.lighthouseinsgroup.com" className="text-gold hover:underline">https://www.lighthouseinsgroup.com</a></p>
              <p>Email: <a href="mailto:luis@lhinsur.com" className="text-gold hover:underline">luis@lhinsur.com</a></p>
              <p>Phone: <a href="tel:9545843417" className="text-gold hover:underline">(954) 584-3417</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-beige">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="text-gold hover:text-navy font-semibold text-lg transition-colors">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>);

};