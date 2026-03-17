import Header from '../Directives/Header'
import Footer from '../Directives/Footer'

export default function PrivacyPolicy() {
  return (
    <>
    <div className="bg-white  ">
    <Header />
     <section className="w-full bg-white py-20 px-4 font-['DM_Sans']">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-center text-[44px] md:text-[36px] sm:text-[28px] font-semibold text-black mb-12">
          Privacy Policy
        </h1>

        {/* Block */}
        <div className="space-y-10">

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Introduction
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              GGL UNITRA values your privacy and is committed to protecting your
              personal information collected through our website{" "}
              <span className="font-medium">urbanrwa.io</span> and related
              services. This Privacy Policy explains what data we collect, how
              it is used, and your rights regarding that information.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Information We Collect
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141] mb-3">
              We may collect personal data when you register an account,
              subscribe to updates, or interact with the Website. This may
              include your name, email address, wallet address, transaction
              history, IP address, and other identifiers required to provide
              and improve our Services.
            </p>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              We may also collect usage data automatically through cookies and
              similar tracking technologies.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Use of Information
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-[16px] leading-[1.6] text-[#414141]">
              <li>Provide and maintain the Services, including account setup and support</li>
              <li>Respond to inquiries and communicate platform updates</li>
              <li>Comply with legal and regulatory requirements such as KYC and AML</li>
              <li>Improve and personalize your experience on the Website</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Data Sharing and Disclosure
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              We may share your information with affiliates, trusted service
              providers, or legal authorities when required by law. GGL UNITRA
              does not sell personal data to third parties for marketing
              purposes without explicit user consent.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Cookies and Tracking
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              We use cookies and similar technologies to analyze traffic,
              enhance security, and customize content. You may disable cookies
              through your browser settings; however, this may affect certain
              features of the Website.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Security
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              We implement industry-standard security measures to protect your
              data. However, no digital system is entirely secure. By using the
              Website, you acknowledge and accept these inherent risks.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Your Rights
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              Depending on your jurisdiction, you may have the right to access,
              update, or request deletion of your personal data, subject to
              legal and regulatory obligations.
            </p>
          </div>

          <div>
            <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
              Updates to This Policy
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#414141]">
              Any changes to this Privacy Policy will be posted on the Website.
              Continued use of our Services constitutes acceptance of the
              updated policy.
            </p>
          </div>

        </div>
      </div>
    </section>

        <Footer /> 
        </div>
    </>
   
  );
}
