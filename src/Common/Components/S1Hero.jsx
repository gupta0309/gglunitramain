import { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import "../Styles/S1Hero.css";
import { Link } from "react-router-dom";

const locations = ["New York", "California", "Texas", "Florida", "Georgia", "Nevada"];
const propertyTypes = ["Villa", "Apartment", "Bungalow", "Penthouse", "Studio", "Duplex"];
const prices = ["$50k", "$100k", "$150k", "$200k", "$250k", "$300k"];

export default function Hero() {
  const [open, setOpen] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    type: "Bungalow",
    price: "$5.00",
  });

  const selectValue = (key, value) => {
    setFilters({ ...filters, [key]: value });
    setOpen(null);
  };

  /* ================= SCROLL ANIMATION ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    document
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="hero scroll-animate">
      {/* TOP CONTENT */}
      <div className="hero-up scroll-animate scroll-up">
        <h2 className="h2-hero">
          Bridging <span>Real Estate</span> with Compliant Web3 Solutions
        </h2>

        <div className="buttons">
          <Link to="/" className="find-btn">
            Find Properties
          </Link>

          <Link
            to="https://urbanrwa.gitbook.io/urbanrwa-docs/"
            target="blank"
            className="wht-btn"
          >
            Whitepaper
          </Link>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="search-bar-main scroll-animate scroll-down">
        <div className="search-bar">

          {/* LOCATION */}
          <div className="dropdown">
            <div
              className="field"
              onClick={() => setOpen(open === "loc" ? null : "loc")}
            >
              <span className="field-label">
                Location {open === "loc" ? <FaAngleUp /> : <FaAngleDown />}
              </span>
              <span className="field-value">
                {filters.location || "Enter your location"}
              </span>
            </div>

            {open === "loc" && (
              <ul>
                {locations.map((item) => (
                  <li key={item} onClick={() => selectValue("location", item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="divider"></div>

          {/* PROPERTY TYPE */}
          <div className="dropdown">
            <div
              className="field"
              onClick={() => setOpen(open === "type" ? null : "type")}
            >
              <span className="field-label">
                Property Type {open === "type" ? <FaAngleUp /> : <FaAngleDown />}
              </span>
              <span className="field-value">{filters.type}</span>
            </div>

            {open === "type" && (
              <ul>
                {propertyTypes.map((item) => (
                  <li key={item} onClick={() => selectValue("type", item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="divider"></div>

          {/* MAX PRICE */}
          <div className="dropdown">
            <div
              className="field"
              onClick={() => setOpen(open === "price" ? null : "price")}
            >
              <span className="field-label">
                Max Price {open === "price" ? <FaAngleUp /> : <FaAngleDown />}
              </span>
              <span className="field-value">{filters.price}</span>
            </div>

            {open === "price" && (
              <ul>
                {prices.map((item) => (
                  <li key={item} onClick={() => selectValue("price", item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="divider"></div>

          <button className="search-btn">
            <IoSearchSharp />
          </button>
        </div>
      </div>
    </section>
  );
}


