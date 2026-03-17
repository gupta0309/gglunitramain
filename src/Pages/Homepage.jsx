import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import S1Hero from "../componentPage/HomeComponent/S1Hero.jsx";
import S2HowWorks from "../componentPage/HomeComponent/S2HowWorks.jsx";
import S3WhyChoose from "../componentPage/HomeComponent/S3WhyChoose.jsx";
import S4About from "../componentPage/HomeComponent/S4About.jsx";
import S5Portfolio from "../componentPage/HomeComponent/S5Portfolio.jsx";
import S6HowMoney from "../componentPage/HomeComponent/S6HowMoney.jsx";
import S7RegulationSection from "../componentPage/HomeComponent/S7RegulationSection.jsx";
import S1Secondsection from "../componentPage/HomeComponent/S1Secondsection.jsx";
import Header from "../componentPage/Directives/Header.jsx"
import Footer from "../componentPage/Directives/Footer.jsx"
import "./IndexGgl.css";
import TopStats from "../componentPage/HomeComponent/TopStats.jsx"
import Calculator from "../componentPage/HomeComponent/Calculator.jsx"
import Downloadapp from "../componentPage/HomeComponent/Downloadapp.jsx"
// import Login from "../Login/Login.jsx"
// Directive Components

// akshay

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
    <TopStats/>
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
      
{/* 
        <section id="why-choose">
        <S3WhyChoose />
      </section> */}

      <section id="about-us">
        <S4About />
      </section>

      <section id="portfolio">
        <S5Portfolio />
      </section>


<Calculator/>
      
         <section id="regulation-section">
        <S7RegulationSection />
      </section>
         <section id="howtomakemoney">
        <S6HowMoney />
      </section>
      <Downloadapp/>
<Footer/>
      {/* <Login/> */}
    </>
  );
}

export default HomePage;
