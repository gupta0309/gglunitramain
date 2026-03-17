import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../../StylesPage/S5Portfolio.css";

import properties from "../../assetsPage/assets/S5Portfolio/properties.png";
import cardone from "../../assetsPage/assets/S5Portfolio/cardone.jpg";
import cardtwo from "../../assetsPage/assets/S5Portfolio/cardtwo.png";
import bedsIcon from "../../assetsPage/assets/S5Portfolio/first.png";
import bath from "../../assetsPage/assets/S5Portfolio/second.png";
import sqft from "../../assetsPage/assets/S5Portfolio/thierd.png";
import avtar from "../../assetsPage/assets/S5Portfolio/avtar.jpg";

const propertyData = [
  {
    id: "Residential Tower",
    category: "Properties",
    mainHeading: "INVEST IN PROPERTIES IN PRIME AREAS",
    description:
      "Own fractional shares of high-demand properties located in rapidly growing urban markets.",
    title: "The Skyline Business Tower",
    location: "Downtown Business District",
    price: "50,000",
    totalPrice: "8,500,000",
    return: "14% - 18%",
    img: cardone,
  },
  {
    id: "Raw Houses",
    category: "Funds",
    mainHeading: "INVEST IN PRIVATE SINGLE-ASSET REAL ESTATE FUNDS",
    description:
      "Own fractional shares of high-demand properties located in rapidly growing urban markets.",
    title: "Oceanic Wellness Center",
    location: "Marina Bay Plaza",
    price: "75,000",
    totalPrice: "12,200,000",
    return: "12% - 15%",
    img: cardtwo,
  },
];

const S5Portfolio = () => {

  const sliderRef = useRef(null);
  const indexRef = useRef(0);

  /* LEFT BUTTON */
  const slideLeft = () => {

    if (indexRef.current === 0) {
      indexRef.current = propertyData.length - 1;
    } else {
      indexRef.current -= 1;
    }

    sliderRef.current.style.transform =
      `translateX(-${indexRef.current * 100}%)`;
  };

  /* RIGHT BUTTON */
  const slideRight = () => {

    if (indexRef.current === propertyData.length - 1) {
      indexRef.current = 0;
    } else {
      indexRef.current += 1;
    }

    sliderRef.current.style.transform =
      `translateX(-${indexRef.current * 100}%)`;
  };

  /* AUTO SCROLL */
  useEffect(() => {

    const autoSlide = setInterval(() => {

      if(indexRef.current === propertyData.length - 1){
        indexRef.current = 0;
      }else{
        indexRef.current += 1;
      }

      if(sliderRef.current){
        sliderRef.current.style.transform =
        `translateX(-${indexRef.current * 100}%)`;
      }

    },4000)

    return () => clearInterval(autoSlide)

  },[])

  return (

    <div className="portfolio-page">

      <div className="global-title">

        <span className="top-badge">
          Leading Digital Real Estate Platform
        </span>

        <h1>
          Build a <span className="green">global</span> and diversified
          <br/> real estate portfolio
        </h1>

      </div>


      <div className="main-stack-container">

        <div className="gglra-slider-track" ref={sliderRef}>

          {propertyData.map((data,index)=> (

            <div className="stack-layer" key={data.id}>

              {/* HEADER */}

                  <div className="type-tag">
                    <img src={properties} alt="" />
                    {data.category}
                  </div>

              <div className="content-header-row">

                <div className="header-left">

                  <h2>{data.mainHeading}</h2>

                </div>


                <div className="header-right">

                  <p>{data.description}</p>

                  <div className="discover-div">

                    <button className="discover-btn">
                      Discover More →
                    </button>

                    <div className="gglra-slider-buttons">

                      <button
                        className="gglra-slide-btn"
                        onClick={slideLeft}
                      >
                        ←
                      </button>

                      <button
                        className="gglra-slide-btn"
                        onClick={slideRight}
                      >
                        →
                      </button>

                    </div>

                  </div>

                </div>

              </div>


              {/* CARD */}

              <motion.div
                className="glass-card"
                initial={{y:50,opacity:0}}
                whileInView={{y:0,opacity:1}}
                viewport={{once:true}}
              >

                <div className="card-grid">


                  <div className="image-side">
                    <img src={data.img} alt={data.title} />
                  </div>



                  <div className="info-side">

                    {/* SAVE ICON */}

                    <div className="save-icon">
                      <i className="fa-regular fa-bookmark"></i>
                    </div>


                    <div className="info-top">

                      <div>

                        <h4>{data.id}</h4>

                        <p className="location-text">
<i className="fa-solid fa-location-dot"></i>                          Banglore India
                        </p>

                      </div>

                    </div>


                    <div className="features">

                      <span>
                        <img src={bedsIcon} alt=""/> 4 Beds
                      </span>

                      <span>
                        <img src={bath} alt=""/> Baths
                      </span>

                      <span>
                        <img src={sqft} alt=""/> 1,868 sqft
                      </span>

                    </div>


                    <div className="price-info">

                      <div>
                        <p>PRICE</p>
                        <h3>INR {data.totalPrice}</h3>
                      </div>

                      <div className="expected-div">

                        <p className="expected">
                          Expected Return
                          <span>{data.return}</span>
                        </p>

                      </div>

                    </div>


                    <div className="agent">

                      <div className="avatar">
                        <img src={avtar} alt=""/>
                      </div>

                      <div>
                        <strong>Amelia Stephenson</strong>
                        <p>Premier Agent • 12 years exp.</p>
                      </div>

                      <button className="enq">
                        Send Enquiry
                      </button>

                    </div>


                    <button className="main-btn">
                      Request Property Brochure
                    </button>

                  </div>


                </div>

              </motion.div>


            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default S5Portfolio;