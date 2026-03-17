import { useState, useEffect } from "react";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import "../Styles/S8Faqs.css";

const faqData = [
  {
    question: "What Is UrbanRWA?",
    answer:
      "UrbanRWA is a real-world asset enablement platform that integrates global real estate operations with a compliant Web3 utility layer to improve coordination, transparency, and efficiency.",
  },
  {
    question: "What Is The UrbanRWA Token (URWA)?",
    answer:
      "URWA is the native utility token used within the UrbanRWA ecosystem to access platform features, incentives, and governance utilities.",
  },
  {
    question: "Does UrbanRWA Tokenize Real Estate?",
    answer:
      "Yes, UrbanRWA enables compliant real estate tokenization, allowing fractional ownership and transparent asset management using blockchain technology.",
  },
  {
    question: "Is URWA An Investment Or Security?",
    answer:
      "URWA is designed as a utility token. Its classification may vary by jurisdiction and complies with applicable regulatory frameworks.",
  },
  {
    question: "How Can URWA Be Used?",
    answer:
      "URWA can be used for platform access, service payments, incentives, governance participation, and ecosystem utilities.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
    <section id="faq" className="faq-section scroll-animate">

      <h2 className="faq-title scroll-animate scroll-up">
        Frequently Asked Questions
      </h2>

      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item scroll-animate scroll-up delay-${index + 1} ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-left-bar"></div>

            <div className="faq-content">
              <div className="faq-question">
                <h4>{item.question}</h4>
                <span className="faq-icon">
                  {activeIndex === index ? (
                    <FaArrowUpLong />
                  ) : (
                    <FaArrowDownLong />
                  )}
                </span>
              </div>

              <div
                className={`faq-answer-wrapper ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
