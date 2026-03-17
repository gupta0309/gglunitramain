import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo/Urban RWA Token/Urban RWA Token logo 3.png";
import "../Styles/Header.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <header id="header" className="header">
      
      {/* LOGO */}
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* NAV MENU */}
      <nav className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <ul onClick={() => setIsMobileMenuOpen(false)}>

          {/* HOME */}
          <li>
            <NavLink
              to="/"
              className={isHome ? "active" : ""}
            >
              HOME
            </NavLink>
          </li>

          {/* DASHBOARD */}
          <li>
            <NavLink
              to="/user/dashboard"
              className={
                location.pathname === "/user/dashboard" ? "active" : ""
              }
            >
              DASHBOARD
            </NavLink>
          </li>

          {/* HOME SECTIONS (NOT ROUTES) */}
          <li>
            <a
              href="/#about"
              className={location.hash === "#about" ? "active" : ""}
            >
              ABOUT US
            </a>
          </li>

          <li>
            <a
              href="/#invest"
              className={location.hash === "#invest" ? "active" : ""}
            >
              INVEST
            </a>
          </li>

          <li>
            <a
              href="/#tokenomics"
              className={location.hash === "#tokenomics" ? "active" : ""}
            >
              TOKENOMICS
            </a>
          </li>

          <li>
            <a
              href="/#faq"
              className={location.hash === "#faq" ? "active" : ""}
            >
              FAQs
            </a>
          </li>

        </ul>
      </nav>

      {/* AUTH */}
      <div className="auth-btns">
        <a href="/user/login" className="buy-token-btn">Login</a>
        <a href="/user/signup" className="signup-btn">Sign Up</a>
      </div>

      {/* MOBILE */}
      <div
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="hamburger-icon"></span>
      </div>
    </header>
  );
}

export default Navbar;


