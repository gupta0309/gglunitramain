import React from 'react';
import '../../StylesPage/S3WhyChoose.css';
import right_img from '../../assetsPage/assets/S3WhyChoose/left__img.png';
import one from '../../assetsPage/assets/S3WhyChoose/first.png';
import two from '../../assetsPage/assets/S3WhyChoose/two.png';
import three from '../../assetsPage/assets/S3WhyChoose/three.png';
import four from '../../assetsPage/assets/S3WhyChoose/four.png';
import avtarone from "../../assetsPage/assets/S3WhyChoose/avtarone.png"
import avtartwo from "../../assetsPage/assets/S3WhyChoose/avtartwo.png"
import avtarthree from "../../assetsPage/assets/S3WhyChoose/avtarthree.png"
import avtarfour from "../../assetsPage/assets/S3WhyChoose/avtarfour.png"
const CARD_DATA = [
  {
    id: 1,
    title: 'Mission',
    description: 'Leverage Gangotri Global’s 25 years of expertise to deliver a transparent, SEBI-compliant platform generating passive income for investors.',
    icon: one 
  },
  {
    id: 2,
    title: 'Vision',
    description: 'To become India’s most trusted real estate investment platform, making premium income-generating assets accessible to every investor.',
    icon: two
  },
  {
    id: 3,
    title: 'SECURE OWNERSHIP',
    description: 'Digitally generated ownership certificate for every fractional investment.',
    icon: three
  },
  {
    id: 4,
    title: 'DIVERSIFIED INVESTMENT',
    description: 'Invest in multiple properties with lower capital.',
    icon: four
  }
];

const S3WhyChoose = () => {
  return (
    <section className="why-choose-section">
      
      <div className="why-header">
        <span className="mini-badge">
          BUILT TO HELP SMART INVESTORS INVEST SMARTER
        </span>

        <h2 className="why-main-title">
          WHY CHOOSE OUR CURATED 
          <span className="green-text">
            {' '}REAL <br /> ESTATE
          </span> PORTFOLIO
        </h2>
      </div>

      <div className="why-content-grid">
        
        {/* Left Side Image */}
        <div className="image-container-left">
          <div className="main-featured-image">
            <img src={right_img} alt="Premium Real Estate" />

            {/* Social Proof */}
            <div className="social-proof-tag">
              <div className="avatar-group">
                <img src={avtarone}></img>
                 <img src={avtartwo}></img>
                  <img src={avtarthree}></img>
                   <img src={avtarfour}></img>
                <div className="plus-count">99+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="cards-grid">
          {CARD_DATA.map((card) => (
            <div key={card.id} className="animated-border-card">
              <div className="card-inner">

                <div className="card-icon-wrapper">
                  <img src={card.icon} alt={card.title} />
                </div>

                <h3>{card.title}</h3>
                <p>{card.description}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default S3WhyChoose;