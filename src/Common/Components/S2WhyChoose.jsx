import React, { useEffect } from "react";
import houseImg from "../assets/why/why-img.png";

export default function WhyChooseUs() {

  /* ================= SCROLL ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.25 }
    );

    document
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      className="w-full bg-white py-12 px-4 scroll-animate"
    >
      <div className="max-w-7xl mx-auto">

        {/* TOP HEADING */}
        <div className="mb-12 scroll-animate scroll-up">
          <span className="text-xl dm font-bold uppercase tracking-wide text-[#3334E3]">
            Why Choose Us
          </span>
          <h2 className="mt-3 dm font-medium text-[28px] md:text-[44px] leading-[1] text-black max-w-[618px]">
            The smart choice for profitable real estate investments
          </h2>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-[28%_68%]">

          {/* LEFT IMAGE */}
          <div className="flex justify-center scroll-animate scroll-left">
            <img
              src={houseImg}
              alt="Luxury Property"
              className="rounded-[26px] w-[331px] h-auto object-cover
                         transition-all duration-300 ease-out
                         hover:-translate-y-2 hover:scale-[1.03]
                         hover:shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            />
          </div>

          {/* RIGHT FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 dm scroll-animate scroll-right">

            {/* ITEM 1 */}
            <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
              <div
                className="
                  flex-shrink-0
                  sm:w-16 sm:h-16 w-12 h-12
                  rounded-full
                  border border-[#3334E3]
                  flex items-center justify-center
                  text-[#3334E3] font-semibold text-[28px]
                  transition-all duration-300 ease-out
                  group-hover:bg-gradient-to-br
                  group-hover:from-[#2460F5]
                  group-hover:to-[#3B1DDA]
                  group-hover:text-white
                  group-hover:border-transparent
                  group-hover:scale-110
                  group-hover:shadow-[0_8px_22px_rgba(36,96,245,0.45)]
                "
              >
                1
              </div>
              <p className="text-black text-[16px] sm:text-[18px] leading-relaxed">
                <span className="font-semibold">Expert Market Insights</span> – We analyze the best locations and properties for high returns.
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 sm:w-16 sm:h-16 w-12 h-12 rounded-full border border-[#3334E3]
                              flex items-center justify-center text-[#3334E3] font-semibold text-[28px]
                              transition-all duration-300
                              group-hover:bg-gradient-to-br group-hover:from-[#2460F5] group-hover:to-[#3B1DDA]
                              group-hover:text-white group-hover:border-transparent group-hover:scale-110
                              group-hover:shadow-[0_8px_22px_rgba(36,96,245,0.45)]">
                2
              </div>
              <p className="text-black text-[16px] sm:text-[18px] leading-relaxed">
                <span className="font-semibold">Hands-Free Investing</span> – Let us handle research, acquisition, and management.
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 sm:w-16 sm:h-16 w-12 h-12 rounded-full border border-[#3334E3]
                              flex items-center justify-center text-[#3334E3] font-semibold text-[28px]
                              transition-all duration-300
                              group-hover:bg-gradient-to-br group-hover:from-[#2460F5] group-hover:to-[#3B1DDA]
                              group-hover:text-white group-hover:border-transparent group-hover:scale-110
                              group-hover:shadow-[0_8px_22px_rgba(36,96,245,0.45)]">
                3
              </div>
              <p className="text-black text-[16px] sm:text-[18px] leading-relaxed">
                <span className="font-semibold">Diverse Portfolio Options</span> – Rental to commercial real estate opportunities.
              </p>
            </div>

            {/* ITEM 4 */}
            <div className="flex gap-4 group transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 sm:w-16 sm:h-16 w-12 h-12 rounded-full border border-[#3334E3]
                              flex items-center justify-center text-[#3334E3] font-semibold text-[28px]
                              transition-all duration-300
                              group-hover:bg-gradient-to-br group-hover:from-[#2460F5] group-hover:to-[#3B1DDA]
                              group-hover:text-white group-hover:border-transparent group-hover:scale-110
                              group-hover:shadow-[0_8px_22px_rgba(36,96,245,0.45)]">
                4
              </div>
              <p className="text-black text-[16px] sm:text-[18px] leading-relaxed">
                <span className="font-semibold">Proven Track Record</span> – Stable, high-yield real estate assets.
              </p>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-[#3334E3] my-8 md:my-16 scroll-animate"></div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[24%_24%_45%] max-w-7xl mx-auto scroll-animate scroll-up">

          {[
            { num: "10+", text: "Years of experience" },
            { num: "1K+", text: "Managed properties" },
            { num: "$500M+", text: "Real estate deals" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 justify-center sm:justify-start
                         transition-all duration-300 hover:-translate-y-2"
            >
              <span className="xl:text-[100px] lg:text-[90px] md:text-[80px] text-[50px] font-semibold">
                {item.num}
              </span>
              <p className="font-medium text-[15px] md:text-[20px] lg:text-[24px]">
                {item.text.split(" ").slice(0, 2).join(" ")}<br />
                {item.text.split(" ").slice(2).join(" ")}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
