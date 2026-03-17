import React, { useEffect, useRef, useState } from "react";
import "../Styles/PosterGallery.css";
import Header from "../../componentPage/Directives/Header";
import TopStats from "../../componentPage/HomeComponent/TopStats";
import videotop from "../assets/gallery/videogallery.mp4";

import poster1 from "../assets/gallery/firstphoto.jpg";
import poster2 from "../assets/gallery/second.jpg";
import poster3 from "../assets/gallery/thirdphoto.jpg";
import poster4 from "../assets/gallery/fourth.jpg";
import poster5 from "../assets/gallery/fifthphoto.jpg";
import poster6 from "../assets/gallery/sixthphoto.jpg";
import poster7 from "../assets/gallery/seventhphoto.jpg";
import poster8 from "../assets/gallery/eighthphoto.jpg";

/* REAL VIDEOS IMPORT */
import video1 from "../assets/gallery/videogallery.mp4";
import video2 from "../assets/gallery/videogallery.mp4";
import video3 from "../assets/gallery/videogallery.mp4";
import video4 from "../assets/gallery/videogallery.mp4";
import video5 from "../assets/gallery/videogallery.mp4";

const posters = [
  poster1, poster2, poster3, poster4,
  poster5, poster6, poster7, poster8
];

/* PHOTO GALLERY DATA */
const photoGallery = [
  { img: poster1, title: "Skyline Heights" },
  { img: poster2, title: "Azure Residences" },
  { img: poster3, title: "Tower Elite" },
  { img: poster4, title: "Urban Crest" },
  { img: poster5, title: "Palm Horizon" },
  { img: poster6, title: "Imperial Homes" },
  { img: poster7, title: "Golden Residency" },
  { img: poster8, title: "Grand Habitat" },
];

/* VIDEO GALLERY DATA */
const videoGallery = [
  {
    video: video1,
    thumb: poster3,
    title: "Residential Tower",
    desc: "A complete walk-through of our premium residential tower crafted for modern living and lifestyle excellence.",
    duration: "04:15",
  },
  {
    video: video2,
    thumb: poster4,
    title: "Luxury Villa",
    desc: "Explore luxury architecture, premium interiors, and thoughtfully planned spaces built for comfort and elegance.",
    duration: "03:40",
  },
  {
    video: video3,
    thumb: poster5,
    title: "Urban Residences",
    desc: "Discover elevated city living through our signature urban residential developments and modern amenities.",
    duration: "05:10",
  },
  {
    video: video4,
    thumb: poster6,
    title: "Commercial Space",
    desc: "A detailed visual showcase of our modern commercial projects designed for growth and investment opportunity.",
    duration: "04:05",
  },
  {
    video: video5,
    thumb: poster7,
    title: "Premium Living",
    desc: "Experience architectural elegance and curated spaces built to redefine premium living standards.",
    duration: "03:55",
  },
];

const PosterGallery = () => {
  const trackRef = useRef(null);

  /* ORIGINAL STATES */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const [slideMove, setSlideMove] = useState(51);

  /* NEW GALLERY STATES */
  const [photoIndex, setPhotoIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(3);
  const [galleryMove, setGalleryMove] = useState(34);

  /* POPUP MODAL STATE */
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth <= 600) {
        setVisibleCards(1);
        setSlideMove(100);

        setGalleryVisible(1);
        setGalleryMove(100);
      } else if (window.innerWidth <= 991) {
        setVisibleCards(2);
        setSlideMove(50);

        setGalleryVisible(2);
        setGalleryMove(50);
      } else {
        setVisibleCards(2);
        setSlideMove(50);

        setGalleryVisible(3);
        setGalleryMove(33.3333);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  /* ORIGINAL POSTER SLIDER */
  const maxIndex = Math.max(posters.length - visibleCards, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  /* PHOTO GALLERY AUTO SLIDE */
  const maxPhotoIndex = Math.max(photoGallery.length - galleryVisible, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev >= maxPhotoIndex ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, [maxPhotoIndex]);

  /* VIDEO GALLERY AUTO SLIDE */
  const maxVideoIndex = Math.max(videoGallery.length - galleryVisible, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev >= maxVideoIndex ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [maxVideoIndex]);

  /* OPTIONAL: BODY SCROLL LOCK WHEN MODAL OPEN */
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeVideo]);

  return (
    <>
      <TopStats />
      <Header />

      <div className="pg-page">
        {/* VIDEO BANNER */}
        <div className="pg-banner">
          <video className="pg-video" autoPlay muted loop playsInline>
            <source src={videotop} type="video/mp4" />
          </video>
          <div className="pg-breadcrumb">HOME / GALLERY</div>
        </div>

        {/* HEADER */}
        <div className="poster-gallery-wrapper">
        <div className="pg-header">
          <div className="pg-heading">
            <h2>Poster Gallery</h2>
            <p>
              Explore our portfolio of residential and commercial projects,
              thoughtfully developed to deliver modern lifestyles and
              accessible real estate investment opportunities.
            </p>
          </div>
          <button className="pg-add-btn">
            <i className="fa-solid fa-circle-plus"></i> Add Poster
          </button>
        </div>

        {/* ORIGINAL POSTER SLIDER */}
        <div className="pg-slider">
          <div
            className="pg-track"
            ref={trackRef}
            style={{ transform: `translateX(-${currentIndex * slideMove}%)` }}
          >
            {posters.map((img, index) => (
              <div className="pg-slide-item" key={index}>
                <div className="pg-card">
                  <img src={img} alt={`poster-${index}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORIGINAL CONTROLS */}
        <div className="pg-controls">
          <button className="pg-nav-btn" onClick={handlePrev}><i className="fa-solid fa-arrow-left"></i></button>
          <button className="pg-nav-btn" onClick={handleNext}><i className="fa-solid fa-arrow-right"></i></button>
        </div>
</div>
        {/* ===================== NEW PHOTO GALLERY ===================== */}
        <div className="lg-wrap">
          <div className="lg-box">
            <div className="lg-head">
              <div className="lg-head-left">
                <h2>Photo Gallery</h2>
                <p>
                 Discover our curated collection of luxury residential and commercial
developments. Architecturally significant spaces designed for modern living.  </p>
              </div>

              <button className="lg-add-btn">
                <i className="fa-solid fa-circle-plus"></i> Add Photo
              </button>
            </div>

            <div className="lg-photo-slider">
              <div
                className="lg-photo-track"
                style={{ transform: `translateX(-${photoIndex * galleryMove}%)` }}
              >
                {photoGallery.map((item, index) => (
                  <div className="lg-photo-card" key={index}>
                    <img src={item.img} alt={item.title} />
                    <div className="lg-photo-overlay">
                      <span className="lg-tag">RESIDENTIAL</span>
                      <h4>{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg-arrow-wrap">
              <button
                className="lg-arrow-btn"
                onClick={() =>
                  setPhotoIndex((prev) => (prev <= 0 ? maxPhotoIndex : prev - 1))
                }
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                className="lg-arrow-btn"
                onClick={() =>
                  setPhotoIndex((prev) => (prev >= maxPhotoIndex ? 0 : prev + 1))
                }
              >
               <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* ===================== NEW VIDEO GALLERY ===================== */}
          <div className="lg-box">
            <div className="lg-head">
              <div className="lg-head-left">
                <h2>Video Gallery</h2>
                <p>
                 Discover our curated collection of luxury residential and commercial
developments. Architecturally significant spaces designed for modern living.   </p>
              </div>

              <button className="lg-add-btn">
                <i className="fa-solid fa-circle-plus"></i> Add Video
              </button>
            </div>

            <div className="lg-video-slider">
              <div
                className="lg-video-track"
                style={{ transform: `translateX(-${videoIndex * galleryMove}%)` }}
              >
                {videoGallery.map((video, index) => (
                  <div className="lg-video-card" key={index}>
                    <div className="lg-video-thumb">
                      <video
                        src={video.video}
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="lg-video-file"
                        poster={video.thumb}
                      />
                      <span className="lg-time">{video.duration}</span>

                      <button
                        className="lg-play-btn"
                        onClick={() => setActiveVideo(video.video)}
                      >
                        <i className="fa-solid fa-play"></i>
                      </button>
                    </div>

                    <div className="lg-video-info">
                      <span className="lg-mini-tag">RESIDENTIAL</span>
                      <h4>{video.title}</h4>
                      <p>{video.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           

            <div className="lg-view-more-wrap">
              <button className="lg-view-more-btn">
                View More <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================== VIDEO POPUP MODAL ===================== */}
        {activeVideo && (
          <div className="lg-modal" onClick={() => setActiveVideo(null)}>
            <div className="lg-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="lg-close-btn" onClick={() => setActiveVideo(null)}>
                ✕
              </button>

              <video
                src={activeVideo}
                controls
                autoPlay
                className="lg-modal-video"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PosterGallery;