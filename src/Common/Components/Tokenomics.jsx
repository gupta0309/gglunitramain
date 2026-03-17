import { useEffect } from "react";
import "../Styles/Tokenomics.css";
import tokenomicsImg from "../assets/tokenn.png";

export default function Tokenomics() {

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
    <section id="tokenomics" className="tokenomics scroll-animate">
      <div className="container">

        {/* Heading */}
        <div className="tokenomics-header scroll-animate scroll-up">
          <span className="tokenomics-tag">TOKENOMICS</span>
          <h2>
            Enable smarter real estate operations with UrbanRWA
          </h2>
        </div>

        {/* TOKENOMICS IMAGE */}
        <div className="tokenomics-graph scroll-animate scroll-up delay-1">
          <img src={tokenomicsImg} alt="Tokenomics" />
        </div>

        {/* Bottom Info Boxes */}
        <div className="token-info scroll-animate scroll-up delay-2">

          {[
            ["Token Name", "Urban RWA"],
            ["Symbol", "URWA"],
            ["Network", "BEP 20"],
            ["Total Supply", "10 Billion"],
            ["Decimal", "18"],
          ].map((item, index) => (
            <div
              key={index}
              className={`info-box scroll-animate scroll-up delay-${index + 3}`}
            >
              <div className="left-h">{item[0]}</div>
              <div className="connectline"></div>
              <div className="right-v">{item[1]}</div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
