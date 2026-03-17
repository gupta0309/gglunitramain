import React from 'react';
import '../../StylesPage/S1Hero.css';
import left from '../../assetsPage/assets/S1Hero/VIDEO.mp4';

const S1Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* Badge */}
       <div className="hero-badge">
  <span className="typing-text">REAL ESTATE AB SAB KE LIYE </span>
</div>
        {/* Heading */}
        <h1 className="hero-title">
          Transforming Real Estate Into <span className="text-highlight">Future Wealth</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
         Build wealth through professionally managed properties, enjoy passive income, and invest in premium real estate with complete transparency and ease.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions">
          <button className="btn-primary">
            Explore Properties <span className="arrow">→</span>
          </button>
          <button className="btn-secondary">
            <span className="play-icon">▶</span> How it Works
          </button>
        </div>
      </div>

      {/* Hero Image Section with Floating Cards */}
     <div className="hero-image-wrapper">
  <video
    src={left}
    className="main-building"
    autoPlay
    loop
    muted
    playsInline
  />
        
        
        {/* <div className="floating-card card-left">
          <img src={left_card} alt="Marina Gate" className='left-card'/>
          <div className="card-info">
            <h4>Marina Gate 1, Mumbai</h4>
            <p className="percentage">+12.4%</p>
          </div>
        </div>

      
        <div className="floating-card card-right">
          <img src={right_card} alt="Estate Fund" />
          <div className="card-info">
            <h4>Chennai Tower</h4>
            <p className="percentage">+32.2%</p>
          </div>
        </div> */}


      </div>
      

      
    </section>
    

    
  );
};

export default S1Hero;

