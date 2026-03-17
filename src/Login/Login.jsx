// import React from "react";
// import "../StylesPage/Login.css";
// import bgImage from "../assetsPage/assets/Login/villa.jpg";
// import logo from "../assetsPage/assets/logoblack.png"
// import google from "../assetsPage/assets/Login/SVG.png"
// import fb from "../assetsPage/assets/Login/fb.png"
// import opp from "../assetsPage/assets/Login/opp.jpg"
// import email from "../assetsPage/assets/Login/gmail.png"
// import password from "../assetsPage/assets/Login/password.png"
// import location from "../assetsPage/assets/locationicon.png"
// import {Link} from "react-router-dom"

// const GGLRAAuthPortalLogin = () => {
//   return (
//   <div
// className="gglra-auth-portal-wrapper"
// style={{
// backgroundImage: `linear-gradient(#0F172A66,#0F172A66), url(${bgImage})`
// }}
// >
//       <div className="gglra-auth-portal-overlay"></div>

//       {/* Logo */}
//       <div className="gglra-auth-portal-brand">
//        <Link to="/">
//     <img src={logo} alt="logo" />
//   </Link>
//       </div>

//       {/* Login Card */}
//       <div className="gglra-auth-portal-card">
//         <h1 className="gglra-auth-portal-heading">Welcome Back</h1>

//         <p className="gglra-auth-portal-subheading">
//           Experience the pinnacle of real estate management.
//         </p>

//         {/* <div className="gglra-auth-portal-field">
//           <label>Email Address</label>
//           <input
//             type="email"
//             className="gglra-auth-portal-input"
//             placeholder="Enter email"
//           />
//         </div> */}

//         <div className="gglra-auth-portal-field">
//   <label>Email Address</label>

//   <div className="gglra-auth-portal-input-box">
//     <img src={email}className="gglra-input-icon" alt="email"/>

//     <input
//       type="email"
//       className="gglra-auth-portal-input"
//       placeholder="Enter email"
//     />
//   </div>
// </div>

//         {/* <div className="gglra-auth-portal-field">
//           <div className="gglra-auth-portal-password-row">
//             <label>Password</label>
//             <span className="gglra-auth-portal-forgot-link">
//               Forgot Password?
//             </span>
//           </div>

//           <input
//             type="password"
//             className="gglra-auth-portal-input"
//             placeholder="Enter password"
//           />
//         </div> */}


        
//         <div className="gglra-auth-portal-field">
//  <div className="gglra-auth-portal-password-row">
//             <label>Password</label>
//           </div>

//   <div className="gglra-auth-portal-input-box">
//     <img src={password} className="gglra-input-icon-pass" alt="email"/>

//     <input
//       type="email"
//       className="gglra-auth-portal-input"
//       placeholder="Enter Password"
//     />
//   </div>
// </div>
//             <span className="gglra-auth-portal-forgot-link">
//               Forgot Password?
//             </span>

//         <button className="gglra-auth-portal-login-btn">
//           SIGN IN
//         </button>

//         <div className="gglra-auth-portal-divider">
//           OR CONTINUE WITH
//         </div>

//         <div className="gglra-auth-portal-social-row">
//           <button className="gglra-auth-portal-google-btn">
//            <img src={google} alt="" /> <div>Google</div>
//           </button>

//           <button className="gglra-auth-portal-facebook-btn">
//            <img src={fb} alt="" /> <div>Facebook</div>
//           </button>
//         </div>

//         <p className="gglra-auth-portal-signup-text">
//           Don’t have an account? <Link to="/signup"><span>Sign Up</span></Link>
//         </p>

//         <div className="gglra-auth-portal-footer-links">
//           <span>Privacy Policy</span>
//           <span>Terms of Service</span>
//           <span>Support</span>
//         </div>
//       </div>

//       {/* Opportunity Card */}
//       <div className="gglra-auth-portal-opportunity">
//         <img src={opp}></img>
//         <div>
//         <p className="gglra-auth-portal-opportunity-tag">
//           NEW OPPORTUNITY
//         </p>

//         <h4 className="gglra-auth-portal-opportunity-title">
//           The Grand Reserve Penthouse
//         </h4>

//         <span className="gglra-auth-portal-opportunity-location">
//          <img src={location} alt="" /> Manhattan, New York
//         </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GGLRAAuthPortalLogin;