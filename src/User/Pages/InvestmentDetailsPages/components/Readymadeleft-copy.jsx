import { useState, useEffect, useRef } from "react";

import {
  FaHeart,
  FaShareAlt,
  FaBed,
  FaBath,
  FaExpandArrowsAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { HiDownload } from "react-icons/hi";
import { CiShoppingCart } from "react-icons/ci";

const STAT_CONFIG = [
  { key: "beds", label: "Bedrooms", icon: <FaBed />, color: "text-blue-600" },
  { key: "baths", label: "Bathrooms", icon: <FaBath />, color: "text-purple-600" },
  { key: "area", label: "Total Area", icon: <FaExpandArrowsAlt />, color: "text-green-600" },
  { key: "listed", label: "Listed", icon: <FaCalendarAlt />, color: "text-orange-600" },
];

export default function ReadymadeLeft({ property, activeTab, setActiveTab }) {

  // const [activeTab, setActiveTab] = useState("About Property");
  const financialRef = useRef(null);

  // const [activeImage, setActiveImage] = useState(property?.image || "");
  const [selectedSlots, setSelectedSlots] = useState(0); // user selected slots
  const [animating, setAnimating] = useState(false);

  const mobileGalleryRef = useRef(null);

  if (!property) {
    return (
      <div className="bg-white rounded-2xl border p-6 text-center text-gray-500">
        Property details are loading...
      </div>
    );
  }

  const images =
  Array.isArray(property?.gallery) && property.gallery.length > 0
    ? property.gallery
    : property?.image
    ? [property.image]
    : [];

const totalImages = images.length;

const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  if (!totalImages || totalImages <= 4) return;

  const interval = setInterval(() => {
    setActiveIndex((prev) =>
      prev + 1 >= totalImages ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, [totalImages]);



  // Mobile auto image slider
  // useEffect(() => {
  //   const isMobile = window.innerWidth < 768;
  //   if (!isMobile) return;

  //   const interval = setInterval(() => {
  //     setAnimating(true);
  //     setTimeout(() => {
  //       setActiveImage((prev) => {
  //         const currentIndex = property.gallery?.indexOf(prev) ?? 0;
  //         const nextIndex =
  //           currentIndex === (property.gallery?.length - 1 ?? 0) ? 0 : currentIndex + 1;
  //         return property.gallery?.[nextIndex] || prev;
  //       });
  //       setAnimating(false);
  //     }, 200);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [property.gallery]);

  // Mobile gallery scroll
  // useEffect(() => {
  //   const isMobile = window.innerWidth < 768;
  //   if (!isMobile || !mobileGalleryRef.current) return;

  //   const container = mobileGalleryRef.current;
  //   let scrollAmount = 0;

  //   const interval = setInterval(() => {
  //     scrollAmount += 130;
  //     if (scrollAmount >= container.scrollWidth - container.clientWidth) {
  //       scrollAmount = 0;
  //     }
  //     container.scrollTo({ left: scrollAmount, behavior: "smooth" });
  //   }, 2500);

  //   return () => clearInterval(interval);
  // }, []);

  const handleDownload = async (fileUrl, fileName) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "document.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
  }
};


//   const handleDownload = async (url, filename) => {
//   try {
//     const response = await fetch(url);
//     const blob = await response.blob();

//     const blobUrl = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = blobUrl;
//     link.download = filename || "file";
//     document.body.appendChild(link);
//     link.click();

//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(blobUrl);
//   } catch (error) {
//     console.error("Download failed", error);
//   }
// };


  // Calculate filled slots
  const totalSlots = property.totalSlots || 100;
  const availableTokens = property.availableTokens || 0;
  const availableSlots = Math.floor(availableTokens / (property.tokensPerSlot || 100));
  const filledPercentage = totalSlots > 0 ? ((totalSlots - availableSlots) / totalSlots) * 100 : 0;


  const visibleImages = [];

if (totalImages > 0) {
  for (let i = 0; i < Math.min(4, totalImages); i++) {
    visibleImages.push(
      images[(activeIndex + i) % totalImages]
    );
  }
}




  return (
    <div className="bg-white rounded-2xl border p-3 md:p-6 space-y-6 shadow-sm">
      {/* ===================== GALLERY ===================== */}
      <div className="grid grid-cols-12 gap-4">
        <div className="hidden md:block col-span-2 space-y-4">
          {/* {property.gallery?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              onClick={() => {
                if (img === activeImage) return;
                setAnimating(true);
                setTimeout(() => {
                  setActiveImage(img);
                  setAnimating(false);
                }, 200);
              }}
              className={`w-full h-[82px] object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${activeImage === img ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                }`}
            />
          ))} */}
          {visibleImages.map((img, index) => {
  const realIndex = (activeIndex + index) % totalImages;

  return (
    <img
      key={realIndex}
      src={img}
      alt={`Thumbnail ${realIndex + 1}`}
      onClick={() => setActiveIndex(realIndex)}
      className={`w-full h-[82px] object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
        index === 0
          ? "border-blue-500 ring-2 ring-blue-200"
          : "border-gray-200"
      }`}
    />
  );
})}

        </div>

        <div className="col-span-12 md:col-span-10 relative overflow-hidden rounded-2xl shadow-lg">
          <img
            key={activeIndex}
            src={images[activeIndex] || property.image}

            // key={activeImage}
            // src={activeImage || property.image}
            alt={property.title}
            className={`w-full h-[260px] md:h-[420px] object-cover rounded-2xl transition-all duration-700 ease-in-out ${animating ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
          />

          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow">
               {property.risk}
            </span>
            <div className="flex gap-2">
              <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow hover:bg-white">
                <FaHeart className="text-lg" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow hover:bg-white">
                <FaShareAlt className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile thumbnails */}
      <div className="md:hidden overflow-x-auto hide-scrollbar">
        <div className="flex gap-3 pb-2" ref={mobileGalleryRef}>
          {/* {property.gallery?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Mobile ${i + 1}`}
              onClick={() => {
                setAnimating(true);
                setTimeout(() => {
                  setActiveImage(img);
                  setAnimating(false);
                }, 200);
              }}
              className={`flex-shrink-0 w-[110px] h-[85px] object-cover rounded-lg cursor-pointer border-2 transition-all ${activeImage === img ? "border-blue-500 shadow-md" : "border-gray-200"
                }`}
            />
          ))} */}
          {visibleImages.map((img, index) => {
          const realIndex = (activeIndex + index) % totalImages;

          return (
            <img
              key={realIndex}
              src={img}
              alt={`Mobile ${realIndex + 1}`}
              onClick={() => setActiveIndex(realIndex)}
              className={`flex-shrink-0 w-[110px] h-[85px] object-cover rounded-lg cursor-pointer border-2 ${
                index === 0
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200"
              }`}
            />
          );
        })}

        </div>
      </div>

      {/* ===================== TITLE & LOCATION ===================== */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {property.title || "Property Title"}
        </h1>
        <p className="flex items-center gap-2 text-gray-600 text-base md:text-lg">
          <MdLocationOn className="text-red-500" />
          {property.location || "Location not available"}
        </p>
      </div>

      {/* ===================== STATS ===================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CONFIG.map((item) => (
          <div
            key={item.key}
            className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${item.color} bg-opacity-10`}>
              <span className="text-3xl">{item.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {property.stats?.[item.key] ?? property[item.key] ?? "—"}

              {/* {property[item.key] ?? "—"} */}
            </p>
            <p className="text-sm text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      {/* ===================== TABS ===================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-8">
        {["About Property", "Financial Details", "Documents", "Location"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-4 text-center font-medium rounded-xl transition-all duration-300 border
              ${activeTab === tab
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===================== ABOUT PROPERTY ===================== */}
      {activeTab === "About Property" && (
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description || "No description available for this property."}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities & Features</h2>
            {property.amenities?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3"
                  >
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No amenities listed for this property.</p>
            )}
          </div>
        </div>
      )}

      {/* ===================== FINANCIAL DETAILS WITH SLOTS ===================== */}
      {/* {activeTab === "Financial Details" && (
        <div className="space-y-10"> */}
      {activeTab === "Financial Details" && (
        <div ref={financialRef} className="space-y-10">

          <h2 className="text-2xl font-semibold text-gray-900">Investment Metrics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-blue-700 font-medium uppercase tracking-wide mb-1">
                Annual Yield
              </p>
              <p className="text-3xl font-bold text-blue-700">
                {property?.financials?.metrics?.annualYield ?? "—"}%
              </p>
              <p className="text-sm text-gray-600 mt-2">Expected return</p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-green-700 font-medium uppercase tracking-wide mb-1">
                Rental Income
              </p>
              <p className="text-3xl font-bold text-green-700">
                {property?.financials?.metrics?.rentalIncome ?? "—"}%
              </p>
              <p className="text-sm text-gray-600 mt-2">Of investment</p>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center">
              <p className="text-sm text-purple-700 font-medium uppercase tracking-wide mb-1">
                Value Growth
              </p>
              <p className="text-3xl font-bold text-purple-700">
                {property?.financials?.metrics?.valueGrowth ?? "—"}%
              </p>
              <p className="text-sm text-gray-600 mt-2">Expected annually</p>
            </div>
          </div>


          {/* ===================== PROPERTY SCORE BREAKDOWN ===================== */}
{property?.financials?.breakdown?.length > 0 && (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-gray-900">
      Property Score Breakdown
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gradient-to-br p-3 rounded-md from-[#EEF2FF] to-[#F5FAFF]">
      {property.financials.breakdown.map((item, index) => {
        const percent = item.max > 0 ? (item.value / item.max) * 100 : 0;

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-700 font-medium">
              <span>{item.label}</span>
              <span>
                {item.value}/{item.max}
              </span>
            </div>

            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${percent}%`,
                  background:
                    "linear-gradient(90deg, #6390FF 0%, #11006E 100%)",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}





          {/* ===================== INVESTMENT SLOTS SECTION ===================== */}
          <div className="space-y-8 mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Investment Slots Available
                </h3>
                <p className="text-gray-600">
                  Each slot represents fractional ownership with{" "}
                  <span className="font-semibold">{property.tokensPerSlot || 100} tokens</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{availableSlots}</p>
                <p className="text-sm text-gray-500">of {totalSlots} slots available</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Slots Filled</span>
                <span>{Math.round(filledPercentage)}%</span>
              </div>
              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${filledPercentage}%`,
                    background: "linear-gradient(90deg, #6390FF 0%, #11006E 100%)",
                  }}
                />
              </div>
            </div>

            {/* Slot Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${property.pricePerSlot?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Tokens per Slot</p>
                <p className="text-2xl font-bold text-gray-900">
                  {property.tokensPerSlot || "0"}
                </p>
              </div>
              <div className="text-end">
                <p className="text-sm text-gray-500 mb-1">Token Value</p>
                <p className="text-2xl font-bold text-green-600">
                  ${property.tokenValue || "0"}
                </p>
              </div>
            </div>

            {/* Slot Selection */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Select Your Slots</h3>
              <p className="text-sm text-gray-600 mb-6">
                Click on available slots to select ({selectedSlots} selected)
              </p>

              <div className="grid grid-cols-6 sm:grid-cols-10 gap-3 mb-8">
                {Array.from({ length: Math.min(totalSlots, 30) }).map((_, idx) => {
                  const isFilled = idx >= availableSlots;
                  const isSelected = false; // Add logic later if needed

                  return (
                    <button
                      key={idx}
                      disabled={isFilled}
                      className={`
                        w-12 h-12 rounded-full font-medium text-sm transition-all
                        ${isFilled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 border border-gray-300"
                        }
                        ${isSelected ? "bg-blue-600 text-white ring-4 ring-blue-200" : ""}
                      `}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                  <span>Filled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-300"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                  <span>Selected</span>
                </div>
              </div>
            </div>

            {/* Quick Select */}
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-700 mb-4">Quick Select</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {[1, 5, 10, 25].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedSlots(num)}
                    className={`
                      py-3 rounded-xl font-medium transition-all border
                      ${selectedSlots === num
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                      }
                    `}
                  >
                    {num} Slot{num > 1 && "s"}
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              disabled={selectedSlots === 0}
              className={`
                mt-8 w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all
                ${selectedSlots > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              <CiShoppingCart className="text-xl" />
              {selectedSlots > 0 ? `Invest in ${selectedSlots} Slot${selectedSlots > 1 ? "s" : ""}` : "Select Slots to Continue"}
            </button>

            {/* Investment Notice */}
            <div className="mt-6 flex gap-3 items-start bg-blue-50 border border-blue-200 rounded-xl p-4">
              <span className="text-blue-600 text-2xl mt-1">ℹ️</span>
              <p className="text-sm text-blue-800 leading-relaxed">
                <span className="font-semibold">Investment Notice:</span> Tokens will be issued to your wallet after payment confirmation. You can trade them on the marketplace or hold for capital appreciation and rental income.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DOCUMENTS & LOCATION TABS (same as before) ===================== */}
      {activeTab === "Documents" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Legal Documents</h2>
          {property.documents?.length > 0 ? (
            <div className="space-y-4">
              {property.documents.map((doc, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 rounded-xl p-4 border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <GrDocumentText className="text-2xl" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.title}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <button
  onClick={() => handleDownload(doc.link, doc.name)}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto justify-center"
>
  <HiDownload /> Download
</button>

                  {/* <a
                    href={doc.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <HiDownload /> Download
                  </a> */}
                  {/* <a href={doc.url} download className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto justify-center">
                    <HiDownload /> Download
                  </a> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No documents available.</p>
          )}
        </div>
      )}

      {activeTab === "Location" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
          <div className="w-full h-[400px] rounded-2xl overflow-hidden border shadow">
            <iframe
              title="Property Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(property.location || "Bhopal")}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}















// import { useState } from "react";
// import { useEffect } from "react";

// import { FaHeart, FaShareAlt, FaBed, FaBath, FaExpandArrowsAlt ,FaCalendarAlt  } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";
// import { GrDocumentText } from "react-icons/gr";
// import { HiDownload } from "react-icons/hi";
// import { CiShoppingCart } from "react-icons/ci";
// import { useRef } from "react";

// const STAT_CONFIG = [
//   {
//     key: "beds",
//     label: "Bedrooms",
//     icon: <FaBed />,
//     color: "text-blue-600",
//   },
//   {
//     key: "baths",
//     label: "Bathrooms",
//     icon: <FaBath />,
//     color: "text-purple-600",
//   },
//   {
//     key: "area",
//     label: "Total Area",
//     icon: <FaExpandArrowsAlt  />,
//     color: "text-green-600",
//   },
//   {
//     key: "listed",
//     label: "Listed",
//     icon: <FaCalendarAlt  />,
//     color: "text-orange-600",
//   },
// ];




// export default function ReadymadeLeft({ property }) {
//   const [activeTab, setActiveTab] = useState("About Property");
//   const [activeImage, setActiveImage] = useState(property.image);
//   const [selectedSlots, setSelectedSlots] = useState(property.slotselect || 0);


// const [animating, setAnimating] = useState(false);

// useEffect(() => {
//   const isMobile = window.innerWidth < 768;
//   if (!isMobile) return;

//   const interval = setInterval(() => {
//     setAnimating(true);

//     setTimeout(() => {
//       setActiveImage((prev) => {
//         const currentIndex = property.gallery.indexOf(prev);
//         const nextIndex =
//           currentIndex === property.gallery.length - 1 ? 0 : currentIndex + 1;
//         return property.gallery[nextIndex];
//       });
//       setAnimating(false);
//     }, 200);
//   }, 3000);

//   return () => clearInterval(interval);
// }, [property.gallery]);

// const mobileGalleryRef = useRef(null);
// useEffect(() => {
//   const isMobile = window.innerWidth < 768;
//   if (!isMobile || !mobileGalleryRef.current) return;

//   const container = mobileGalleryRef.current;
//   let scrollAmount = 0;

//   const interval = setInterval(() => {
//     scrollAmount += 130;

//     if (scrollAmount >= container.scrollWidth - container.clientWidth) {
//       scrollAmount = 0;
//     }

//     container.scrollTo({
//       left: scrollAmount,
//       behavior: "smooth",
//     });
//   }, 2500);

//   return () => clearInterval(interval);
// }, []);



//   return (

//     <div className="bg-white rounded-2xl border p-3 md:p-6 space-y-6">

     
     

//       {/* ================= GALLERY + FEATURE ================= */}
//       <div className="grid grid-cols-12 gap-4">

        
//         {/* LEFT GALLERY – desktop only */}
// <div className="hidden md:block col-span-2 space-y-4">
//   {property.gallery.map((img, i) => (
//     <img
//       key={i}
//       src={img}
//       onClick={() => {
//         if (img === activeImage) return;
//         setAnimating(true);
//         setTimeout(() => {
//           setActiveImage(img);
//           setAnimating(false);
//         }, 200);
//       }}

//      className={`w-full h-[82px] object-cover rounded-lg cursor-pointer border
//   transition-transform duration-300 ease-in-out
//   hover:scale-105
//   ${activeImage === img ? "ring-2 ring-blue-500" : ""}
// `}

//     />
//   ))}
// </div>


//         {/* FEATURE IMAGE */}
//        <div className="col-span-12 md:col-span-10 relative overflow-hidden rounded-2xl">

// <img
//   key={activeImage}
//   src={activeImage}
//   className={`
//     w-full h-[260px] md:h-[380px] object-cover rounded-2xl
//     transition-all duration-500 ease-in-out
//     ${animating ? "opacity-0 scale-105" : "opacity-100 scale-100"}
//   `}
// />


//   {/* OVERLAY */}
//   <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//     <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
//       Available for Investment
//     </span>

//     <div className="flex gap-2">
//       <button className="bg-white text-[#364153] p-2 rounded-full shadow">
//         <FaHeart />
//       </button>
//       <button className="bg-white text-[#364153] p-2 rounded-full shadow">
//         <FaShareAlt />
//       </button>
//     </div>
//   </div>
// </div>

// {/* MOBILE GALLERY */}


//       </div>

// {/* MOBILE GALLERY – below feature image */}
//       <div className="md:hidden mt-4 overflow-x-auto hide-scrollbar">
//   <div
//     className="flex gap-3 pb-2"
//     ref={mobileGalleryRef}
//   >
//     {property.gallery.map((img, i) => (
//       <img
//         key={i}
//         src={img}
//         onClick={() => {
//           setAnimating(true);
//           setTimeout(() => {
//             setActiveImage(img);
//             setAnimating(false);
//           }, 200);
//         }}
//         className={`
//           flex-shrink-0 w-[120px] h-[90px] object-cover rounded-lg cursor-pointer border
//           ${activeImage === img ? "ring-2 ring-blue-500" : ""}
//         `}
//       />
//     ))}
//   </div>
// </div>

//       {/* ================= TITLE ================= */}
//       <div>
//         <h1 className="text-xl md:text-3xl text-[#101828] font-semibold my-4 !mt-16">{property.title}</h1>
//         <p className="flex items-center gap-1 text-gray-500 text-sm md:text-lg">
//           <MdLocationOn />
//           {property.location}
//         </p>
//       </div>

      
    
// {/* ================= STATS ================= */}
// <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//   {STAT_CONFIG.map((item) => (
//     <Stat
//       key={item.key}
//       icon={item.icon}
//       value={property.stats[item.key]}  
//       label={item.label}
//       iconColor={item.color}
//     />
//   ))}
// </div>




//       {/* ================= TABS ================= */}
//      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-3 mb-12">
//   {["About Property", "Financial Details", "Documents", "Location"].map(tab => {
//     const isActive = activeTab === tab;

//     return (
//       <button
//         key={tab}
//         onClick={() => setActiveTab(tab)}
//         className={`
//           px-3 py-3 text-m font-semibold transition
//           ${isActive
//             ? "text-blue-600 font-medium border border-blue-500 rounded-xl"
//             : "text-[#0A0A0A]  border border-gray-200 rounded-xl"
//           }
//         `}
//       >
//         {tab}
//       </button>
//     );
//   })}
// </div>


// {/* ================= ABOUT PROPERTY TAB ================= */}
// {activeTab === "About Property" && (
//   <div className="space-y-10">

//     {/* DESCRIPTION */}
//     <div>
//      <h2 className="text-base sm:text-lg md:text-2xl font-[500] text-[#101828] !mb-6">
//       Description
//     </h2>
//       <p className="text-sm md:text-base text-gray-600 whitespace-pre-line tracking-wide leading-relaxed md:leading-loose">
//   {property.description}
// </p>



//     </div>

//     {/* AMENITIES */}
//     <div>
//       <h2 className="text-xl font-semibold text-[#101828] mb-4">
//         Amenities & Features
//       </h2>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {property.amenities.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm"
//           >
//             <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white text-xs">
//               ✓
//             </span>
//             <span className="text-gray-700">{item}</span>
//           </div>
//         ))}
//       </div>
//     </div>

//   </div>
// )}

// {/* ================= FINANCIAL DETAILS TAB ================= */}
// {activeTab === "Financial Details" && (
//     <>
//   <div className="space-y-8">

//     {/* TITLE */}
//    <h2 className="text-base sm:text-lg md:text-2xl font-[500] text-[#101828]">
//       Investment Matrics
//     </h2>

//     {/* METRICS CARDS */}
//     <div className="grid grid-cols-3  gap-4">
//       <MetricCard
//         title="Annual Yield"
//         value={`${property.financials.metrics.annualYield}%`}
//         subtitle="Expected return"
//         bg="bg-blue-50"
//         text="text-[#155DFC]"
//       />
//       <MetricCard
//         title="Rental Income"
//         value={`${property.financials.metrics.rentalIncome}%`}
//         subtitle="Of investment"
//         bg="bg-green-50"
//         text="text-green-600"
//       />
//       <MetricCard
//         title="Value Growth"
//         value={`${property.financials.metrics.valueGrowth}%`}
//         subtitle="Expected annually"
//         bg="bg-purple-50"
//         text="text-purple-600"
//       />
//     </div>

//     {/* BREAKDOWN */}
//     <div className="space-y-5">
//       <h3 className="text-lg font-semibold text-[#101828]">
//         Property Score Breakdown
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//         {property.financials.breakdown.map((item, index) => {
//           const percent = (item.value / item.max) * 100;

//           return (
//             <div key={index} className="space-y-2">
//               <div className="flex justify-between text-sm text-gray-700">
//                 <span>{item.label}</span>
//                 <span>
//                   {item.value}/{item.max}
//                 </span>
//               </div>

//               {/* BAR */}
//               <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-full rounded-full transition-all"
//                   style={{
//                     width: `${percent}%`,
//                     background:
//                       "linear-gradient(90deg, #6390FF 0%, #11006E 100%)",
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>

//   </div>

//   {/* ================= INVESTMENT SLOTS ================= */}
// <div className="space-y-6 mt-6 bg-white pt-6  ">
//   <div className="flex justify-between items-center mb-5">
//     <div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-3">
//         Investment Slots Available
//       </h3>
//       <p className="text-base  text-gray-500">
//         Each slot represents fractional ownership with {property.tokensPerSlot} tokens
//       </p>
//     </div>
//    <div className="flex flex-col items-center text-blue-600 font-bold text-xl">
//   <span className="mb-2">{property.availableTokens}</span>
//   <span className="text-base font-normal text-gray-500">
//     of {property.totalSlots} available
//   </span>
// </div>


//   </div>

//   {/* PROGRESS BAR */}
//   {/* LABEL ABOVE BAR */}
// <div className="flex justify-between  text-sm text-gray-700 font-medium">
//   <span>Slots Filled</span>
//   <span>
//     {Math.round(
//       ((property.totalSlots - property.availableTokens) / property.totalSlots) * 100
//     )}
//     %
//   </span>
// </div>

// {/* PROGRESS BAR */}
// <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
//   <div
//     className="h-full rounded-full transition-all"
//     style={{
//       width: `${
//         ((property.totalSlots - property.availableTokens) / property.totalSlots) * 100
//       }%`,
//       background: "linear-gradient(90deg, #6390FF 0%, #11006E 100%)",
//     }}
//   />
// </div>


//   {/* SLOT DETAILS */}
//   <div className="grid grid-cols-3 gap-4 !mt-14">
//     <div className="justify-between">
//       <p className="text-gray-500 text-sm mb-3">Price per Slot</p>
//       <p className="font-semibold text-[#101828] text-lg">${property.pricePerSlot}</p>
//     </div>
//     <div className="text-center">
//       <p className="text-gray-500 text-sm mb-3">Tokens per Slot</p>
//       <p className="font-semibold text-[#101828] text-lg">{property.tokensPerSlot}</p>
//     </div>
//     <div className="text-center">
//       <p className="text-gray-500 text-sm mb-3">Token Value</p>
//       <p className="font-semibold text-lg text-green-600">${property.tokenValue}</p>
//     </div>
//   </div>

//   {/* SLOT SELECTION */}
//   <div className="!mt-7">
//      <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Your Slots</h3>
//     <p className="text-sm  text-gray-800 mb-8">Click on available slots to select  ({property.slotselect} selected)</p>

//     <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
//   {Array.from({ length: Math.min(property.totalSlots, 30) }).map((_, idx) => {
//     const filled = idx >= property.availableSlots;
//     return (
//       <button
//         key={idx}
//         className={`h-12 w-12 text-[#6A7282] rounded-full text-sm font-medium ${
//           filled
//             ? "bg-[#D1D5DC] cursor-not-allowed"
//             : "bg-[#D1D5DC] hover:bg-blue-500 hover:text-white"
//         }`}
//         disabled={filled}
//       >
//         {idx + 1}
//       </button>
//     );
//   })}
// </div>


// <div className="flex items-center gap-3 text-xs text-gray-500 my-10">
//   <div className="flex items-center gap-2">
//     <span className="w-6 h-6 rounded-full bg-gray-300"></span>
//     Filled
//   </div>

//   <div className="flex items-center gap-2">
//     <span className="w-6 h-6 rounded-full border border-gray-400"></span>
//     Available
//   </div>

//   <div className="flex items-center gap-2">
//     <span className="w-6 h-6 rounded-full bg-[#5B5FFF]"></span>
//     Selected
//   </div>
// </div>




//     {/* QUICK SELECT */}
//    {/* QUICK SELECT */}
// <div className="mt-6">
//   <p className="text-sm font-medium text-gray-700 mb-3">
//     Quick Select
//   </p>

//   <div className="grid grid-cols-4 gap-3">
//     {property.quickSlots.map((num) => {
//       const isActive = selectedSlots === num;

//       return (
//         <button
//           key={num}
//           onClick={() => setSelectedSlots(num)}
//           className={`
//             py-3 rounded-xl text-sm font-medium transition
//             border
//             ${
//               isActive
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
//             }
//           `}
//         >
//           {num} Slot{num > 1 && "s"}
//         </button>
//       );
//     })}
//   </div>
// </div>



// <button
//   disabled={!selectedSlots}
//   className={`
//     mt-5 w-full flex items-center justify-center gap-2
//     py-4 rounded-xl font-medium transition
//     ${
//       selectedSlots
//         ? "bg-[#D1D5DC] text-[#6A7282] hover:bg-blue-700 hover:text-white"
//         : "bg-gray-300 text-gray-500 cursor-not-allowed"
//     }
//   `}
// >
//   <CiShoppingCart className="text-xl" />
//   Select Slots to Continue
// </button>


//   </div>

//  <div className="mt-4 flex gap-3 items-start bg-blue-50 border border-blue-100 rounded-xl p-4">
//   <span className="text-blue-600 text-lg">⚠️</span>
//   <p className="text-sm text-blue-700 leading-relaxed">
//     <span className="font-medium">Investment Notice:</span>{" "}
//     Tokens will be issued to your wallet after payment confirmation.
//     You can trade them on the marketplace or hold for capital appreciation.
//   </p>
// </div>

// </div>

//   </>

// )}



// {/* ================= DOCUMENTS TAB ================= */}
// {activeTab === "Documents" && (
//   <div className="space-y-6">

//     <h2 className="text-base sm:text-lg md:text-2xl font-[500] text-[#101828]">
//       Legal Documents
//     </h2>

//     <div className="space-y-4">
//       {property.documents.map((doc, index) => (
//         <div
//           key={index}
//          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-50 rounded-xl px-3 md:px-4 py-4"

//         >
//           {/* LEFT */}
//           <div className="flex items-center gap-4">
//            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
//   <GrDocumentText className="text-xl" />
// </div>


//             <div>
//               <p className="text-m font-[400] text-[#101828]">
//                 {doc.title}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {doc.type}
//               </p>
//             </div>
//           </div>

//           {/* RIGHT */}
//       <a
//   href={doc.url}
//   download
//   className="
//     flex items-center justify-center gap-2 
//     bg-blue-500 text-white text-sm md:text-m
//     px-4 py-3 rounded-xl 
//     hover:bg-blue-700 transition
//     w-full md:w-auto
//   "
// >
//   <HiDownload className="text-lg" />
//   Download
// </a>

//         </div>
//       ))}
//     </div>

//   </div>
// )}


// {/* ================= LOCATION TAB ================= */}
// {activeTab === "Location" && (
//   <div className="space-y-6">

//     {/* TITLE */}
//     <h2 className="text-base sm:text-lg md:text-2xl font-[500] text-[#101828] ">
//       Location
//     </h2>

//     {/* MAP */}
//     <div className="w-full h-[320px] rounded-2xl overflow-hidden border">
//       <iframe
//         title="Property Location"
//         src={`https://www.google.com/maps?q=${encodeURIComponent(
//           property.locationInfo.address
//         )}&output=embed`}
//         className="w-full h-full border-0"
//         loading="lazy"
//         referrerPolicy="no-referrer-when-downgrade"
//       />
//     </div>

//   </div>
// )}









//     </div>
//   );
// }




// const Stat = ({ icon, value, label, iconColor }) => {
//   return (
//     <div className="bg-white  rounded-xl p-4 flex flex-col items-center text-center space-y-2">

//       {/* ICON */}
//       <div
//         className={`w-20 h-20 rounded-full flex items-center justify-center ${iconColor}`}
//         style={{ backgroundColor: "#FAF5FF" }}
//       >
//         <span className="text-xl">{icon}</span>
//       </div>

//       {/* VALUE */}
//       <p className=" text-xl text-gray-900">
//         {value}
//       </p>

//       {/* LABEL */}
//       <p className="text-s text-gray-600">
//         {label}
//       </p>

//     </div>
//   );
// };


// const MetricCard = ({ title, value, subtitle, bg, text }) => (
//   <div className={`rounded-xl p-4 ${bg}`}>
//     <p className={`text-xs ${text}  mb-1`}>
//       {title.toUpperCase()}
//     </p>
//     <p className={`text-2xl font-semibold ${text}`}>
//       {value}
//     </p>
//     <p className={`text-xs ${text} mt-1`}>
//       {subtitle}
//     </p>
//   </div>
// );





