import React from "react";
import { motion } from "framer-motion";
import "../../StylesPage/Footer.css";
import footer from "../../assetsPage/assets/footer11.png";
import oneso from "../../assetsPage/assets/footer/one.png";
import twoso from "../../assetsPage/assets/footer/two.png";
import threeso from "../../assetsPage/assets/footer/three.png";
import fourso from "../../assetsPage/assets/footer/four.png";
import logo from "../../assetsPage/assets/logo.png";
import location from "../../assetsPage/assets/footer/location.png";
import call from "../../assetsPage/assets/footer/call.png";
import mail from "../../assetsPage/assets/footer/mail.png";
import { HashLink } from "react-router-hash-link";
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


      {/* Partner Logos */}
      <div className="nova-partner-row">
        <img src={footerone} alt="logo"/>
        <img src={footertwo} alt="logo"/>
        <img src={footerthree} alt="logo"/>
      </div>

      {/* Heading */}
      <div className="nova-footer-heading">
        <h2>
          Real Estate - <span>Ab Sab Ke Liye</span>
        </h2>
      </div>


      {/* Footer Section */}
      <footer className="nova-footer">
        <div className="nova-footer-top">

          <div className="nova-brand-area">
            <h3 className="nova-logo">
              <img src={logo} alt="logo"/>
            </h3>

            <p className="nova-brand-desc">
              GGL Unitra offers a seamless avenue for establishing a
              cutting-edge investment platform without necessitating coding
              expertise within a short time.
            </p>

            <div className="nova-social-row">
              <span className="nova-social-icon">
                <img src={oneso} alt="social"/>
              </span>

              <span className="nova-social-icon">
                <img src={twoso} alt="social"/>
              </span>

              <span className="nova-social-icon">
                <img src={threeso} alt="social"/>
              </span>

              <span className="nova-social-icon">
                <img src={fourso} alt="social"/>
              </span>
            </div>
          </div>


          <div className="nova-link-grid">

            <div className="nova-col">
              <h4 className="nova-col-title">Company</h4>

              <nav className="nova-nav">
                <span><HashLink smooth to="/">Home</HashLink></span>
                <span><HashLink smooth to="/#about-us">About Us</HashLink></span>
                <span><HashLink smooth to="/#portfolio">Property</HashLink></span>
                <span><HashLink smooth to="/gallery">Gallery</HashLink></span>
                <span><HashLink smooth to="/#how-money">Blog</HashLink></span>
              </nav>
            </div>


            <div className="nova-col">
              <h4 className="nova-col-title">Legal</h4>

              <nav className="nova-nav">
                <span>Terms & Conditions</span>
                <span>Privacy Policy</span>
                <span>Risk Disclosure</span>
                <span>Fraction Ownership Agreement</span>
              </nav>
            </div>


            <div className="nova-col">
              <h4 className="nova-col-title">Contact us</h4>

              <div className="nova-contact-info">

                <p>
                  <img src={location} alt="loc"/>
                  Andreas R38, Nehru Enclave, Gomti Nagar, Lucknow, Uttar Pradesh
                </p>

                <p className="nova-upcoming-row">
                  <img src={location} alt="loc"/>
                  Andreas R38, Nehru Enclave, Gomti Nagar, Noida Uttar Pradesh
                  <span className="nova-upcoming">UPCOMING</span>
                </p>

                <p className="nova-upcoming-row">
                  <img src={location} alt="loc"/>
                  Andreas R38, Nehru Enclave, Gomti Nagar, Udaipur, Rajasthan
                  <span className="nova-upcoming">UPCOMING</span>
                </p>

                <p>
                  <img src={mail} alt="mail"/>
                  Gangotriglobal@gmail.com
                </p>

                <p>
                  <img src={call} alt="call"/>
                  +918953840000 , +918953840000
                </p>

              </div>
            </div>

          </div>
        </div>


        <div className="nova-footer-bottom">
          <p className="nova-copyright">
            © 2026 <span>GGL UNITRA.</span> All Rights Reserved
          </p>

          <div className="nova-legal-links">
            <span>Privacy Policy</span>
            <span className="nova-divider"></span>
            <span>Terms of Service</span>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;