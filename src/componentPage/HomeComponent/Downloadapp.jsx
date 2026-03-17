import React from "react";
import { motion } from "framer-motion";
import "../../StylesPage/Footer.css";
import footer from "../../assetsPage/assets/footer11.png";
import footerone from "../../assetsPage/assets/footer/gglfooter.png"
import footertwo from "../../assetsPage/assets/footer/gglfootertwo.png"
import footerthree from "../../assetsPage/assets/footer/gglfooterthree.png"



const Footer = () => {
  return (
    <div className="nova-wrapper">
      
      {/* 3D App Banner */}
      <section className="nova-app-card">
        <div className="nova-content-side">
          <span className="nova-tag">Download our app</span>
          <h2 className="nova-hero-title">
            The Modern Way to Invest in Real Estate
          </h2>

          <p className="nova-hero-subtitle">
            Track investments, monitor fractions, download reports, and explore
            new opportunities — all from your mobile device.
          </p>

          <div className="nova-market-links">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="nova-store-img"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Play Store"
              className="nova-store-img"
            />
          </div>
        </div>

        <div className="nova-visual-side">
          <motion.div
            className="nova-phone-container"
            initial={{ rotateY: -25, rotateX: 10, opacity: 0 }}
            whileInView={{ rotateY: -15, rotateX: 5, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img src={footer} alt="phone" className="nova-phone-img" />
          </motion.div>
        </div>
      </section>


     
      </div>
      )};

      export default Footer;