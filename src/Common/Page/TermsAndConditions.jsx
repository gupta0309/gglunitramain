
import Header from '../Directives/Header'
import Footer from '../Directives/Footer'

export default function TermsAndConditions() {
  return (
    <>
      <div className="bg-white  ">
        <Header />
        <section className="w-full bg-white py-20 px-4 font-['DM_Sans']">
          <div className="max-w-4xl mx-auto">

            {/* Title */}
            <h1 className="text-center text-[44px] md:text-[36px] sm:text-[28px] font-semibold text-black mb-12">
              Terms & Conditions
            </h1>

            {/* Content */}
            <div className="space-y-10">

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Acceptance
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  By accessing <span className="font-medium">urbanrwa.io</span> and
                  using our Services, you agree to be bound by these Terms &
                  Conditions and any future updates. If you do not agree with any
                  part of these Terms, you must not use the Services.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Eligibility
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  You must be at least 18 years old and possess the legal capacity
                  to enter into these Terms and use the Services.
                </p>
              </div>

               {/* Tokenized Property Investment Terms */}
              <div >
                <h2 className="text-[22px] font-semibold text-[#323232] mb-4">
                  Tokenized Property Investment Terms – URBANRWA
                </h2>

                <ul className="list-disc pl-5 space-y-3 text-[16px] leading-[1.6] text-[#414141]">
                  <li>
                    The Investor is investing in tokenized real estate assets listed on URBANRWA.
                  </li>
                  <li>
                    Each token represents a fractional economic interest in the underlying property.
                  </li>
                  <li>
                    Tokens do not represent direct physical ownership unless specifically stated.
                  </li>
                  <li>
                    Investment has a lock-in period of <span className="font-semibold">25 months</span> from the date of token allocation.
                  </li>
                  <li>
                    The Investor is eligible for monthly returns generated from the property.
                  </li>
                  <li>
                    Returns are credited as per property performance and platform policy.
                  </li>
                  <li>
                    The Investor has reviewed all project, return, and token details before investing.
                  </li>
                  <li>
                    The Investor agrees to complete KYC / AML verification.
                  </li>
                  <li>
                    This investment agreement is governed by the laws of Georgia.
                  </li>
                </ul>

                {/* <div className="mt-6 flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-5 h-5" />
                  <p className="text-[16px] text-[#323232] font-medium">
                    I have read, understood, and agree to the Tokenized Property Investment Agreement of URBANRWA.
                  </p>
                </div> */}
              </div>

             


              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Services
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  GGL UNITRA provides a Web3-enabled platform designed to support
                  real-world asset coordination and related functionality. We
                  reserve the right to modify, restrict, suspend, or discontinue
                  any part of the Services at any time without prior notice.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Accounts
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  Certain features may require account registration. You agree to
                  provide accurate and up-to-date information and to maintain the
                  confidentiality of your login credentials. You are responsible
                  for all activities conducted under your account.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  User Conduct
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  You agree not to misuse the Website, engage in unlawful activity,
                  interfere with platform operations, or violate intellectual
                  property rights. Any such misuse may result in suspension or
                  termination of access to the Services.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Intellectual Property
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  All content on the Website, including but not limited to logos,
                  software, text, graphics, and trademarks, is the property of
                  GGL UNITRA or its licensors and is protected under applicable
                  intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Limitation of Liability
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  To the maximum extent permitted by law, GGL UNITRA shall not be
                  liable for any direct, indirect, incidental, special, or
                  consequential damages arising from your use of the Website or
                  Services.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Governing Law
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  These Terms & Conditions shall be governed by and construed in
                  accordance with the laws applicable to GGL UNITRA’s jurisdiction,
                  without regard to conflict of law principles.
                </p>
              </div>

              <div>
                <h2 className="text-[22px] font-semibold text-[#323232] mb-3">
                  Changes to Terms
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#414141]">
                  We may update these Terms at any time. Continued use of the
                  Services following any changes constitutes acceptance of the
                  revised Terms.
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
