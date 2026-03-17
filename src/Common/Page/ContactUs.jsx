import Header from "../Directives/Header";
import Footer from "../Directives/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <>
    <div className="bg-white  ">
      <Header />

      <section className="w-full bg-white py-20 px-4 font-['DM_Sans']">
        <div className="max-w-7xl mx-auto">

          {/* PAGE HEADING */}
          <div className="text-center mb-14">
            <h1 className="text-[44px] md:text-[36px] sm:text-[28px] font-semibold text-black mb-4">
              Contact Us
            </h1>
            <p className="text-[16px] text-[#555555] max-w-2xl mx-auto">
              Have questions about UrbanRWA or our Web3 real estate platform?
              Reach out to us — our team is here to help.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* LEFT – CONTACT INFO */}
            <div className="space-y-8">

              <div>
                <h3 className="text-[22px] font-semibold text-[#323232] mb-4">
                  Get in Touch
                </h3>
                <p className="text-[16px] text-[#414141] leading-[1.6]">
                  Whether you’re an investor, partner, or platform user, feel
                  free to contact us for support, inquiries, or collaboration
                  opportunities.
                </p>
              </div>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#2460F5] to-[#3B1DDA] flex items-center justify-center text-white">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#777]">Phone</p>
                    <p className="text-[16px] font-medium text-[#111]">
                      +995 51000 2291
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#2460F5] to-[#3B1DDA] flex items-center justify-center text-white">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#777]">Email</p>
                    <p className="text-[16px] font-medium text-[#111]">
                      info@urbanrwa.io
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#2460F5] to-[#3B1DDA] flex items-center justify-center text-white">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#777]">Office</p>
                    <p className="text-[16px] font-medium text-[#111]">
                      Global Web3 Operations (Remote)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT – CONTACT FORM */}
            <div className="bg-[#F6F9FF] rounded-2xl p-8 md:p-10 shadow-lg">

              <h3 className="text-[22px] font-semibold text-[#323232] mb-6">
                Send Us a Message
              </h3>

              <form className="space-y-5">

                <div>
                  <label className="block text-[14px] mb-1 text-[#444]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#3B1DDA]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] mb-1 text-[#444]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#3B1DDA]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] mb-1 text-[#444]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#3B1DDA]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] mb-1 text-[#444]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="w-full px-4 py-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#3B1DDA]"
                  />
                </div>

                <div>
                  <label className="block text-[14px] mb-1 text-[#444]">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 rounded-lg border border-[#DADADA] focus:outline-none focus:border-[#3B1DDA]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#2460F5] to-[#3B1DDA] text-white font-medium hover:opacity-90 transition"
                >
                  Submit
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
