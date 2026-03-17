import { useEffect } from "react";
import "../Styles/S7Benefits.css";
import bgImage from "../assets/benefits-bg.png";
import { RiSecurePaymentFill } from "react-icons/ri";
import secu from "../assets/benefits/1.png";
import port from "../assets/benefits/2.png";

export default function Benefits() {

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
    <section className="benefits-section scroll-animate">

      <h2 className="benefits-title scroll-animate scroll-up">
        Benefits For Everyone
      </h2>

      <div
        className="benefits-wrapper scroll-animate scroll-up delay-1"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="benefits-cards">

          {/* Card 1 */}
          <div className="benefit-card scroll-animate scroll-up delay-2">
            <span className="benefit-icon">
              <img src={secu} alt="Security" />
            </span>
            <h3>Security</h3>
            <p>
              All Transactions Are Executed Via Secure Smart Contracts,
              Ensuring Transparency And Minimizing The Risk Of Fraud.
            </p>
          </div>

          {/* Card 2 */}
          <div className="benefit-card scroll-animate scroll-up delay-3">
            <span className="benefit-icon">
              <img src={port} alt="Portfolio" />
            </span>
            <h3>Diversification<br />of Your Portfolio</h3>
            <p>
              Our Platform Introduces You To A New Financial Instrument —
              Tokenized Real Estate — That Can Help You Earn Additional
              Income And Spread Your Investment Risk.
            </p>
          </div>

          {/* Card 3 */}
          <div className="benefit-card scroll-animate scroll-up delay-4">
            <span className="benefit-icon">
              <RiSecurePaymentFill />
            </span>
            <h3>Multiple Payment<br />Options</h3>
            <p>
              Buy Property Fractions Using Both Traditional (Fiat)
              Currencies And Popular Cryptocurrencies, Giving You Greater
              Flexibility And Convenience.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
