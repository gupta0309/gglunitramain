import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Homepage";
import PrivacyPolicy from "../Common/Page/PrivacyPolicy";
import TermsAndConditions from "../Common/Page/TermsAndConditions";
import Contactus from "../Common/Page/ContactUs"
import Login from "../User/Auth/LoginPage";
import SignUp from "../User/Auth/SignUpPage";
import PosterGallery from "../Common/Page/PosterGallery";
// import Disclaimer from "../Common/Pages/Disclaimer";


const CommanRoutes = () => {
  return (
    <Routes>
     
       
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gallery" element={<PosterGallery/>}/>

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/contact" element={<Contactus />} />

      {/* <Route path="/disclaimer" element={<Disclaimer />} /> */}
       
    </Routes>
  );
};

export default CommanRoutes;
