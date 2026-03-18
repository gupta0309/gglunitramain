// import React, { useState } from 'react';
// import '../../Styles/Header.css';
// import logo from '../../assets/logo.png';
// import signin from '../../assets/Header/signin.png';
// import signup from '../../assets/Header/signup.png';

// const Navbar = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   return (
//     <nav className="navbar">
//       {/* Logo Section */}
//       <div className="nav-logo">
//         <img src={logo} alt="GGL Logo" className="logo-image" />
//       </div>

//       {/* Navigation Links */}
//       <ul className={isMobile ? "nav-links-mobile" : "nav-links"} 
//           onClick={() => setIsMobile(false)}>
//         <li><a href="#home">Home</a></li>
//         <li><a href="#about" className="">About</a></li>
//         <li><a href="#properties">Properties</a></li>
//         <li><a href="#blog">Blog</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>

//       {/* Auth Buttons */}
//       <div className="nav-auth">
//         <button className="btn-signin">
//           Sign In <img src={signin} alt="Sign In Icon" className="signin-icon" />
//         </button>
//         <button className="btn-signup">
//           Sign Up <img src={signup} alt="Sign Up Icon" className="signup-icon" />
//         </button>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
//         {isMobile ? <>&#10005;</> : <>&#9776;</>}
//       </button>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { HashLink } from "react-router-hash-link";
import '../../StylesPage/Header.css';
import logo from '../../assetsPage/assets/logo.png';
import signin from '../../assetsPage/assets/Header/signin.png';
import signup from '../../assetsPage/assets/Header/signup.png';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <HashLink smooth to="/#home">
          <img src={logo} alt="GGL Logo" className="logo-image" />
        </HashLink>
      </div>

      {/* Navigation Links */}
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <li>
          <HashLink smooth to="/#home">
            Home
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/about-us">
            About
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#portfolio">
            Properties
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/gallery">
            Gallery
          </HashLink>
        </li>
         <li>
          <HashLink smooth to="/blog">
            Blog
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/contact">
            Contact
          </HashLink>
        </li>
        <li className="btn-signin-mobile">
          <Link to="/signin">
            Sign In
          </Link>
        </li>
        <li className="btn-signup-mobile">
          <Link to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="nav-auth">
        <Link to="/signin" className="btn-signin">
          Sign In{" "}
          <img src={signin} alt="Sign In Icon" className="signin-icon" />
        </Link>
        <Link to="/signup" className="btn-signup">
          Sign Up{" "}
          <img src={signup} alt="Sign Up Icon" className="signup-icon" />
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? "✕" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;