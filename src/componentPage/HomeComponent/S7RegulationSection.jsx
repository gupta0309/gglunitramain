import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../StylesPage/S7RegulationSection.css';
import avtar from "../../assetsPage/assets/S3WhyChoose/avtarone.png";
import avtarone from "../../assetsPage/assets/S3WhyChoose/avtartwo.png";
import avtartwo from "../../assetsPage/assets/S3WhyChoose/avtarthree.png";
import avtarthree from "../../assetsPage/assets/S3WhyChoose/avtarfour.png";


const testimonials = [
  {
    text: "The platform makes real estate investing simple and accessible. The transparency and structured documentation gave me confidence from day one.",
    name: "Ayesha K.",
    location: "Riyadh",
    image:avtar
  },
  {
    text: "I love how easy it is to diversify investments. Everything is clearly explained and the process is extremely smooth.",
    name: "Daniel M.",
    location: "London",
      image:avtarone
  },
  {
    text: "Finally a platform where real estate feels accessible to everyone. The experience has been transparent and reliable.",
    name: "Priya S.",
    location: "Mumbai",
      image:avtartwo
  },
  {
    text: "Professional team and excellent communication. The dashboard makes tracking investments very easy.",
    name: "Michael T.",
    location: "Dubai",
      image:avtarthree
  }
];

const S7RegulationSection = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="superunique-container">

      <div className="superunique-social-proof">

        <div className="superunique-badge-center">
          <span className="superunique-badge-small">SUCCESS STORIES</span>
        </div>

        <h2 className="superunique-testimonial-header">
          HEAR FROM OUR GLOBAL <span className="superunique-text-mint">INVESTORS</span>
        </h2>

        <div className="superunique-testimonial-layout">

          {/* LEFT SIDE */}
          <div className="superunique-stat-box">

            <h1 className="superunique-big-stat">
              Trusted by Over 5,000+ Investors
            </h1>

            <div className="superunique-stepper">

        {testimonials.map((_, index) => (
  <span
    key={index}
    className={`superunique-step ${
      activeIndex === index ? "superunique-step-active" : ""
    }`}
    onClick={() => setActiveIndex(index)}   // 🔥 CLICK FUNCTION
  ></span>
))}

            </div>

          </div>


          {/* RIGHT SIDE SLIDER */}

          <div className="superunique-slider-wrapper">

            <AnimatePresence mode="wait">

              <motion.div
                key={activeIndex}
                className="superunique-quote-container"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6 }}
              >

                {/* <span className="superunique-quote-icon">“</span> */}

                <p className="superunique-quote-body">
  <span className="superunique-quote-icon">“</span>
  {testimonials[activeIndex].text}
  <span className="superunique-quote-icon-close">”</span>
</p>

                {/* <span className="superunique-quote-icon-close">”</span> */}

                <div className="superunique-author-card">

                 <img
src={testimonials[activeIndex].image}
alt={testimonials[activeIndex].name}
className="superunique-avatar"
/>

                  <div className="superunique-author-meta">
                    <span className="superunique-author-name">
                      {testimonials[activeIndex].name}
                    </span>

                    <span className="superunique-author-loc">
                      {testimonials[activeIndex].location}
                    </span>
                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

      </div>

    </section>
  );
};

export default S7RegulationSection;