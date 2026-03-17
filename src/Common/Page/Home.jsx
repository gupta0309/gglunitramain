// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import Header from '../Directives/Header'
// import S1Hero from '../Components/S1Hero'
// import About from "../Components/About"
// import S2Whychoose from '../Components/S2WhyChoose'
// import S3RealEstate from '../Components/S3RealEstate'
// import S4HowItWork from '../Components/S4HowItWork'
// import S5Tokenization from '../Components/S5Tokenization'
// import S6Invest from '../Components/S6Invest'
// import Tokenomics from '../Components/Tokenomics'
// import S7Benefits from '../Components/S7Benefits'
// import S8Faqs from '../Components/S8Faqs'
// import Footer from '../Directives/Footer'



// function HomePage() {

//   const location1 = useLocation();
//   useEffect(() => {
//     const scrollToElement = () => {
//       const { search } = location1;
//       const params = new URLSearchParams(search);
//       const scrollToId = params.get('');

//       if (scrollToId) {
//         const element = document.getElementById(scrollToId);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     };

//     scrollToElement();
//   }, [location1]);

//   return (
//     <>
//       <div className="bg-white  ">

//       <Header /> 
//       <S1Hero />
//       <About />
//       <S2Whychoose />
//       <S3RealEstate />
//       <S4HowItWork />
//       <S5Tokenization />
//       <S6Invest />
//       <Tokenomics />
//       <S7Benefits />
//       <S8Faqs />
//       <Footer /> 
//       </div>
//     </>
//   )
// }

// export default HomePage;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import S1Hero from "../../componentPage/HomeComponent/S1Hero.jsx";
import S2HowWorks from "../../componentPage/HomeComponent/S2HowWorks.jsx";
import S3WhyChoose from "../../componentPage/HomeComponent/S3WhyChoose.jsx";
import S4About from "../../componentPage/HomeComponent/S4About.jsx";
import S5Portfolio from "../../componentPage/HomeComponent/S5Portfolio.jsx";
import S6HowMoney from "../../componentPage/HomeComponent/S6HowMoney.jsx";
import S7RegulationSection from "../../componentPage/HomeComponent/S7RegulationSection.jsx";
import S1Secondsection from "../../componentPage/HomeComponent/S1Secondsection.jsx";
import Header from "../Directives/Header.jsx"
import Footer from "../Directives/Footer.jsx"
import Login from "../../Login/Login.jsx"
// Directive Components

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const { search } = location;
    const params = new URLSearchParams(search);
    const scrollToId = params.get("section");

    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        // Adding a slight timeout ensures the DOM is fully rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
    <Header/>
      <section id="home">
        <S1Hero />
      </section>
 <section id="secondsection">
        <S1Secondsection />
      </section>
      <section id="how-works">
        <S2HowWorks />
      </section>

        <section id="why-choose">
        <S3WhyChoose />
      </section>

      <section id="about-us">
        <S4About />
      </section>

      <section id="portfolio">
        <S5Portfolio />
      </section>

         <section id="howtomakemoney">
        <S6HowMoney />
      </section>


      
         <section id="regulation-section">
        <S7RegulationSection />
      </section>
<Footer/>
      {/* <Login/> */}
    </>
  );
}

export default HomePage;

