import { useEffect } from "react";
import "../Styles/S3RealEstate.css";
import dashboard from "../assets/Dashboard 1.png";
import { FaCheckCircle } from "react-icons/fa";

export default function RealEstateTokens() {

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
    <section className="realestate-section scroll-animate">
      <div className="content-wrapper">

        <h2 className="real-title scroll-animate scroll-up">
          YOUR REAL ESTATE TOKENS, ALL IN ONE PLACE
        </h2>

        <p className="real-subtitle scroll-animate scroll-up delay-1">
          Manage And Monitor Your Property Investments Effortlessly With Our
          Comprehensive Platform, Designed To Centralize All Your Real Estate
          Tokens For Easy Access And Oversight.
        </p>

        <div className="features scroll-animate scroll-up delay-2">
          <div className="feature-item">
            <FaCheckCircle />
            Track Gain
          </div>
          <div className="feature-item">
            <FaCheckCircle />
            Rental Income Overview
          </div>
          <div className="feature-item">
            <FaCheckCircle />
            Portfolio Diversification
          </div>
          <div className="feature-item">
            <FaCheckCircle />
            Real-Time Updates
          </div>
        </div>

        <div className="dashboard-wrapper scroll-animate scroll-down delay-3">
          <img src={dashboard} alt="Dashboard" />
        </div>

      </div>
    </section>
  );
}
