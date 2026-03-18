
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../StylesPage/S4About.css';
import icon from "../../assetsPage/assets/S4About/Icon.png"
import video from "../../assetsPage/assets/S4About/video.mp4"
import { HashLink } from 'react-router-hash-link';

const stats = [
  { label: '  Year Established', left: '2014', },
  { label: '9001 : 2008 Certified', left: 'ISO', },
  { label: 'Landmark Projects', left: '10+' },
  { label: 'Years of Excellence', left: '25+', },
  { label:'Markets-INDIA & DUBAI',left:'2'},
];

const S4About = () => {

  /* 🔹 ADDED FOR VIDEO CONTROL */
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const vid = videoRef.current;

    const updateProgress = () => {
      if (!vid || !vid.duration) return;

      const percent = (vid.currentTime / vid.duration) * 100;

      if (progressRef.current) {
        progressRef.current.style.width = percent + "%";
      }
    };

    vid.addEventListener("timeupdate", updateProgress);

    return () => {
      vid.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  const toggleVideo = () => {
    const vid = videoRef.current;

    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="re-platform__wrapper">

      <header className="re-platform__header">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="re-platform__badge"
        >
          ABOUT US
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="re-platform__main-title"
        >
          ABOUT OUR <span className="re-platform__highlight">REAL ESTATE PLATFORM</span>
        </motion.h2>
      </header>

      <div className="re-platform__content-grid">

        {/* Left Side */}
        <motion.div 
          className="re-platform__text-area"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="re-platform__sub-heading">
            Finding Great Properties for Smart Investors
          </h3>

          <p className="re-platform__description">
           Over 14 years, GGL has grown from a Lucknow-based developer into one of Uttar Pradesh's most recognised and trusted real estate brands, with a portfolio spanning residential townships, commercial complexes, and hospitality developments.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#3bbd6d' }}
            whileTap={{ scale: 0.95 }}
            className="re-platform__cta-button"
          >
                 <HashLink smooth to="/about-us">
                       Learn More
                     </HashLink>
          </motion.button>
        </motion.div>

        {/* Right Side */}
        <div className="re-platform__image-area">

          <motion.div 
            className="re-platform__img-container"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >

            <div className="re-platform__video-wrapper">

              {/* 🔹 VIDEO */}
              <video
                ref={videoRef}
                className="re-platform__hero-video"
                src={video}
                autoPlay
                muted
                loop
                playsInline
              />

              {/* 🔹 VIDEO CONTROLS */}
              <div className="re-platform__video-controls">

                <button
                  className="re-platform__pause-btn"
                  onClick={toggleVideo}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                {/* Progress Bar */}
                <div className="re-platform__video-progress">
                  <div
                    ref={progressRef}
                    className="re-platform__video-progress-fill"
                  ></div>
                </div>

              </div>

            </div>

            {/* Floating Badge */}
            <motion.div 
              className="re-platform__floating-card"
              animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="re-platform__card-icon">
                <img src={icon} />
              </div>

              <div className="re-platform__card-text">
                <span className="re-platform__card-label">Average Profit</span>
                <span className="re-platform__card-val">Upto 20%</span>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>

    </section>
  );
};

export default S4About;
