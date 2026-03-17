import React, { useEffect } from "react";
import "../Styles/About.css";
import aboutImg from "../assets/about.png";

const AboutUrbanRWA = () => {

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
      {
        threshold: 0.25,
      }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-rwa-section scroll-animate">
      <div className="about-rwa-wrapper">

        <div className="about-rwa-content scroll-animate scroll-left">
          <span className="about-badge">About GGL UNITRA</span>

          <h2>
            Redefining Ownership with
            <span> Real-World Asset Tokenization</span>
          </h2>

          <p>
            GGL UNITRA is a next-generation Web3 platform focused on bridging
            real-world assets with blockchain technology.
          </p>

          <p>
            By leveraging blockchain, smart contracts, and Web3 tools, GGL UNITRA
            enables fractional ownership and improved liquidity.
          </p>

          <div className="about-highlight">
            We believe the future of asset ownership lies in decentralization.
          </div>
        </div>

        <div className="about-rwa-image scroll-animate scroll-right">
          <img src={aboutImg} alt="Urban RWA Platform" />
        </div>

      </div>
    </section>
  );
};

export default AboutUrbanRWA;
