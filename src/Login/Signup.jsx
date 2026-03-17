// import React from "react";
// import bgImage from "../assetsPage/assets/Login/villa.jpg";
// import logo from "../assetsPage/assets/logoblack.png";
// import "../StylesPage/Signupui.css"
// import opp from "../assetsPage/assets/Login/opp.jpg"
// import location from "../assetsPage/assets/locationicon.png"
// import { Link } from "react-router-dom";

// const GGLRAAuthSignupPortal = ({ switchToLogin }) => {
//   return (
//     <div
//       className="gglra-auth-signup-portal-wrapper"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="gglra-auth-signup-portal-overlay"></div>

//       {/* Brand */}
//       <div className="gglra-auth-signup-portal-brand">
//         <Link to="/"> <img src={logo} alt="logo" /></Link>
//       </div>

//       {/* Card */}
//       <div className="gglra-auth-signup-portal-card">

//         <h1 className="gglra-auth-signup-portal-heading">
//           SIGN UP
//         </h1>

//         <p className="gglra-auth-signup-portal-subheading">
//           Create Your New GGL Unitra Account
//         </p>

//         {/* Name Row */}
//         <div className="gglra-auth-signup-portal-row">

//           <div className="gglra-auth-signup-portal-field">
//             <label>First Name</label>
//             <input className="gglra-auth-signup-portal-input" placeholder="Enter Name" />
//           </div>

//           <div className="gglra-auth-signup-portal-field">
//             <label>Last Name</label>
//             <input className="gglra-auth-signup-portal-input" placeholder="Enter Lastname"/>
//           </div>

//         </div>

//         {/* Email + Phone */}
//         <div className="gglra-auth-signup-portal-row">

//           <div className="gglra-auth-signup-portal-field">
//             <label>Email</label>
//             <input className="gglra-auth-signup-portal-input" placeholder="Enter email"/>
//           </div>

//           <div className="gglra-auth-signup-portal-field">
//             <label>Mobile Number</label>
//             <input className="gglra-auth-signup-portal-input" placeholder="Enter Mobile" />
//           </div>

//         </div>

//         {/* Country */}
//        <div className="gglra-auth-signup-portal-field">
//   <label>Select Country</label>

//   <select className="gglra-auth-signup-portal-input">
//     <option value="">Select Country</option>
//     <option value="india">India</option>
//     <option value="usa">United States</option>
//     <option value="uk">United Kingdom</option>
//     <option value="canada">Canada</option>
//     <option value="australia">Australia</option>
//   </select>

// </div>
//         {/* Password */}
//         <div className="gglra-auth-signup-portal-row">

//           <div className="gglra-auth-signup-portal-field">
//             <label>Password</label>
//             <input
//               type="password"
//               className="gglra-auth-signup-portal-input" placeholder="Enter Password"
//             />
//           </div>

//           <div className="gglra-auth-signup-portal-field">
//             <label>Reset Password</label>
//             <input
//               type="password"
//               className="gglra-auth-signup-portal-input" placeholder="Reset Password"
//             />
//           </div>

//         </div>

//         <button className="gglra-auth-signup-portal-button">
//           SIGN UP
//         </button>

//         <p className="gglra-auth-signup-portal-login-text">
//           Already have an account?
//         <Link to="/signin" ><span onClick={switchToLogin}> Sign In</span></Link>
//         </p>

//         <div className="gglra-auth-signup-portal-footer">
//           <span>Privacy Policy</span>
//           <span>Terms of Service</span>
//           <span>Support</span>
//         </div>

//       </div>

//   <div className="gglra-auth-portal-opportunity">
//         <img src={opp}></img>
//         <div>
//         <p className="gglra-auth-portal-opportunity-tag">
//           NEW OPPORTUNITY
//         </p>

//         <h4 className="gglra-auth-portal-opportunity-title">
//           The Grand Reserve Penthouse
//         </h4>

//         <span className="gglra-auth-portal-opportunity-location">
//         <img src={location} alt="" /> Manhattan, New York
//         </span>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default GGLRAAuthSignupPortal;