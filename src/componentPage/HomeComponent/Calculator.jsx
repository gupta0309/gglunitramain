import React, { useState } from "react";
import "../../StylesPage/Calculator.css";
import goa from "../../assetsPage/assets/goa.jpg"
import mumbai from "../../assetsPage/assets/mumbai.jpg"
import kerala from "../../assetsPage/assets/kerala.jpg"
import banglore from "../../assetsPage/assets/banglore.jpg"
const gglUnistraProperties = [
  {
    id: 1,
    name: "Goa Holiday Homes",
    tag: "Investment Opportunity",
    img: goa,
  },
  {
    id: 2,
    name: "Kerala Holiday Homes",
    tag: "Investment Opportunity",
    img: mumbai,
  },
  {
    id: 3,
    name: "Mumbai Smart Apartments",
    tag: "Investment Opportunity",
    img: kerala,
  },
  {
    id: 4,
    name: "Bangalore Rental Homes",
    tag: "Investment Opportunity",
    img: banglore,
  },
  {
    id: 5,
    name: "Delhi Premium Villas",
    tag: "Investment Opportunity",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
];

export default function UnistraCalculator() {

  const [gglUnistraQty, setGglUnistraQty] = useState(1);
  const [gglUnistraPlan, setGglUnistraPlan] = useState("one");

  const gglUnistraPrice = 10138.36;

  const gglUnistraTrade = gglUnistraQty * gglUnistraPrice;
  const gglUnistraVolatility = gglUnistraTrade * 0.01;
  const gglUnistraFees = 152.075;

  let gglUnistraMultiplier = 1;

  if (gglUnistraPlan === "monthly") gglUnistraMultiplier = 30;
  if (gglUnistraPlan === "daily") gglUnistraMultiplier = 365;

  const gglUnistraTotal =
    (gglUnistraTrade + gglUnistraVolatility + gglUnistraFees) *
    gglUnistraMultiplier;

  return (
    <div className="ggl-unistra-section">

      <div className="ggl-unistra-ribbon">COMING SOON</div>

      <p className="ggl-unistra-tag">IT’S YOUR MONEY, GROW IT</p>

      <h2 className="ggl-unistra-heading">
       now you start saving with  <span>GGL</span> Unitra
      </h2>


      {/* Toggle */}

      <div className="ggl-unistra-toggle">

        <button
          className={gglUnistraPlan === "one" ? "ggl-unistra-toggle-active" : ""}
          onClick={() => setGglUnistraPlan("one")}
        >
          One Time
        </button>

        <button
          className={gglUnistraPlan === "monthly" ? "ggl-unistra-toggle-active" : ""}
          onClick={() => setGglUnistraPlan("monthly")}
        >
          Monthly
        </button>

        <button
          className={gglUnistraPlan === "daily" ? "ggl-unistra-toggle-active" : ""}
          onClick={() => setGglUnistraPlan("daily")}
        >
          Daily
        </button>

      </div>



      {/* MAIN CARD */}

      <div className="ggl-unistra-main-card">

        {/* LEFT WRAPPER */}

        <div className="ggl-unistra-left-wrapper">

          <div className="ggl-unistra-left">

            {/* SQFT CARD */}

            <div className="ggl-unistra-calc-box">

              <p className="ggl-unistra-label">SQFT Quantity</p>

              <div className="ggl-unistra-qty-box">

                <button
                  onClick={() =>
                    setGglUnistraQty(
                      gglUnistraQty > 1 ? gglUnistraQty - 1 : 1
                    )
                  }
                >
                  -
                </button>

                <span>{gglUnistraQty}</span>

                <button
                  className="ggl-unistra-plus"
                  onClick={() =>
                    setGglUnistraQty(gglUnistraQty + 1)
                  }
                >
                  +
                </button>

              </div>

              <div className="ggl-unistra-market-card ggl-unistra-active">
                <i className="fa-solid fa-circle-dot" style={{color:"#4add97"}}></i><p>Market Price</p>
                <h4>
                  ₹{gglUnistraPrice} <span>/SQFT</span>
                </h4>
              </div>

              <div className="ggl-unistra-market-card">
               <i className="fa-regular fa-circle"style={{color:"#4add97"}}></i> <p>Limit Price</p>
                <h4>
                  ₹9536.89 <span>/SQFT</span>
                </h4>
              </div>

            </div>


            {/* TOTAL CARD */}

            <div className="ggl-unistra-calc-box-two">

              <p className="ggl-unistra-label">
                Total Amount Payable*
              </p>

              <h1 className="ggl-unistra-total">
                ₹{gglUnistraTotal.toFixed(2)}
              </h1>

<p className="small-box-two">(Incl.Fees, Other Levies & Discount)</p>
              <div className="ggl-unistra-breakdown">

                <div>
  <span>
    <i className="fa-solid fa-circle" style={{ fontSize: "8px", color:"#4add97"}}></i>
    {" "}Trade Value
  </span>
  <span>₹{gglUnistraTrade.toFixed(2)}</span>
</div>
                <div>
                  <span> <i className="fa-solid fa-circle" style={{ fontSize: "8px", color:"#4add97"}}></i>{" "}Volatility Margin</span>
                  <span>₹{gglUnistraVolatility.toFixed(2)}</span>
                </div>

                <div>
                  <span> <i className="fa-solid fa-circle" style={{ fontSize: "8px", color:"#4add97"}}></i>{" "}Fees & Other Levies</span>
                  <span>₹{gglUnistraFees}</span>
                </div>

              </div>

            </div>

          </div>



          {/* FOOTER LEFT SIDE */}

          <div className="ggl-unistra-footer">

            <label>
              <input type="checkbox" />
              I agree to be legally bound by this
              <span> Sales & Purchase Agreement</span><p className="text-small">* Returns and Liquidity are not guaranteed and are subjected to market risks.</p>
            </label>

            <div className="ggl-unistra-buttons">

              <button className="ggl-unistra-know-btn">
                Know More
              </button>

              <button className="ggl-unistra-buy-btn">
                Buy Now →
              </button>

            </div>

          </div>

        </div>



        {/* RIGHT */}
<div className="right-card-div">
        <div className="ggl-unistra-right">

          <h3>Related Opportunities</h3>

          <div className="ggl-unistra-property-list">

            {gglUnistraProperties.map((p) => (
              <div key={p.id} className="ggl-unistra-property-item">

                <img src={p.img} alt="" />

                <div>
                  <h4>{p.name}</h4>
                  <p>{p.tag}</p>
                </div>

              </div>
            ))}

          </div>

        </div>
</div>
      </div>

    </div>
  );
}