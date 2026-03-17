import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LuBed, LuBath } from "react-icons/lu";
import { CgArrowsExpandRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuClock } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { TrendingUp, CheckCircle } from "lucide-react";
import { MdExitToApp } from "react-icons/md";
import { LuBuilding2 } from "react-icons/lu";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { BsPersonFillCheck } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { CiShoppingCart } from "react-icons/ci";



import { useQuery } from "@tanstack/react-query";
import { appConfig } from "../../../../config/appConfig.js";





const TABS = [
  "Overview",
  "Construction Milestones",
  "Investment Calculator",
  "Documents",
];

const BENEFIT_ICON_MAP = {
  income: TrendingUp,
  exit: CheckCircle,
  conversion: LuBuilding2,
};

export default function UnderConstructionLeft({ property }) {
  const navigate = useNavigate();
  // const [activeImage, setActiveImage] = useState(property.images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = property?.images || [];
  const totalImages = images.length;


  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Overview");

  const calculatorRef = useRef(null);

  const financialRef = useRef(null);           // ← add this ref

  const [selectedSlots, setSelectedSlots] = useState(0);

  // Add these lines (safe fallbacks)
  const totalSlots = property?.totalSlots || 1200;
  const availableSlots = property?.availableSlots || 847;   // example fallback
  const filledPercentage = totalSlots > 0
    ? Math.min(100, Math.max(0, ((totalSlots - availableSlots) / totalSlots) * 100))
    : 0;


  const { data: dashboardData } = useQuery({
    queryKey: ["dashboardData"], // same key as Dashboard page
    queryFn: async () => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      const response = await fetch(`${appConfig.baseURL}/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
  });


  // const MIN_INVEST = 5;
  const MIN_INVEST = property?.minInvestment || 0;
  // const walletBalance = property?.walletBalance || 500;
  const walletBalance = dashboardData?.wallets?.depositWallet
    ? Number(
      dashboardData.wallets.depositWallet
        .replace("$", "")
        .replace(/,/g, "")
    )
    : 0;

  // const [priceValue, setPriceValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [showDropdown, setShowDropdown] = useState(false);

  const [percent, setPercent] = useState(0);

  const currencyOptions = ["USDT"];

  const numericAmount = Number(totalValue) || 0;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTotalValue(value);

    const calcPercent =
      walletBalance > 0 ? (value / walletBalance) * 100 : 0;

    setPercent(Math.min(100, Math.max(0, calcPercent)));
  };

  const handleSliderClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = (clickX / rect.width) * 100;

    const finalPercent = Math.min(100, Math.max(0, newPercent));
    setPercent(finalPercent);

    const calculatedAmount = (walletBalance * finalPercent) / 100;
    setTotalValue(calculatedAmount.toFixed(2));
  };



  useEffect(() => {
    if (location.state?.tab === "calculator") {
      setActiveTab("Investment Calculator");
    }
  }, [location.state]);

  useEffect(() => {
    if (activeTab === "Investment Calculator") {
      setTimeout(() => {
        financialRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [activeTab]);


  useEffect(() => {
    if (totalImages <= 4) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 >= totalImages ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalImages]);








  const overview = property.tabs.overview;
  const milestones = property.tabs.milestones;
  const calculator = property.tabs.calculator;
  const documents = property.tabs.documents;




  const completedCount = milestones.filter(
    (m) => m.status === "Completed"
  ).length;

  const totalCount = milestones.length;

  const overallProgress = Math.round(
    milestones.reduce((sum, m) => sum + m.progress, 0) / totalCount
  );

  const QUICK_AMOUNTS = [10000, 25000, 50000, 100000];

  const [amount, setAmount] = useState(() => {
    const saved = localStorage.getItem("investment_amount");
    return saved ? Number(saved) : 10000;
  });



  useEffect(() => {
    localStorage.setItem("investment_amount", amount);
  }, [amount]);

  const monthlyRate = 2.5; // later backend se aayega
  const monthlyReturn = Math.round((amount * monthlyRate) / 100);
  const yearlyReturn = monthlyReturn * 12;


  const visibleImages = [];

  for (let i = 0; i < Math.min(4, totalImages); i++) {
    visibleImages.push(images[(activeIndex + i) % totalImages]);
  }





  return (
    <div className="space-y-6">

      {/* BACK */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-[#4A5565] cursor-pointer hover:text-[#101828]"
      >
        <FaArrowLeft />
        Back to Under Construction Projects
      </div>

      {/* IMAGE GALLERY */}
      <div
        className="
    flex flex-col sm:flex-row
    gap-4
    bg-white rounded-xl p-4
  "
      >
        {/* ================= THUMBNAILS ================= */}
        <div
          className="
      flex flex-row sm:flex-col
      gap-3
      order-2 sm:order-1
      overflow-x-auto sm:overflow-visible
      scrollbar-hide
      justify-center sm:justify-start
    "
        >
          {/* {property.images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`
          w-20 h-16 sm:w-24 sm:h-20
          shrink-0
          rounded-xl overflow-hidden
          border-2 transition
          ${activeImage === img
                  ? "border-[#F97316]"
                  : "border-transparent"}
        `}
            >
              <img
                src={img}
                alt="thumbnail"
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </button>
          ))} */}

          {visibleImages.map((img, index) => {
            const realIndex = (activeIndex + index) % totalImages;

            return (
              <button
                key={realIndex}
                onClick={() => setActiveIndex(realIndex)}
                className={`w-20 h-16 sm:w-24 sm:h-20
      shrink-0 rounded-xl overflow-hidden
      border-2 transition
      ${index === 0
                    ? "border-[#F97316]"
                    : "border-transparent"
                  }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </button>
            );
          })}


        </div>

        {/* ================= FEATURE IMAGE ================= */}
        <div
          className="
      relative
      rounded-2xl overflow-hidden
      flex-1
      order-1 sm:order-2
    "
        >
          <img
            src={images[activeIndex]}
            // src={activeImage}
            src={images[activeIndex]}
            className="
        w-full
        h-[240px] sm:h-[356px]
        object-cover
        transition-all duration-300
      "
          />

          <div className="absolute top-4 left-4 flex gap-2">

            <span className="bg-[#F7530B] text-white text-xs px-3 py-1 rounded-full">
              {property.risklevel}
            </span>
          </div>
        </div>
      </div>


      {/* TITLE */}
      <div>
        <h2 className="text-3xl font-semibold text-[#000000]">
          {property.title}
        </h2>

        <p className="flex items-center font-medium gap-2 text-lg text-[#000000E5] mt-1">
          <IoLocationOutline />
          {property.location}
        </p>

        <p className="flex items-center gap-2 text-sm font-medium text-[#000000CC] mt-1">
          <CiCalendarDate className="text-base" />
          Expected Completion Date: {property.expectedCompletion}
        </p>
      </div>


      <div className="bg-[#FFFFFF] border p-4 border-[#E5E7EB] rounded-xl">

        {/* TABS */}
        <div className="border-b border-[#E5E7EB]">
          <div className="flex flex-wrap gap-6 text-sm justify-between sm:justify-start">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-medium text-left
          w-[45%] sm:w-auto
          ${activeTab === tab
                    ? "border-b-2 border-[#F97316] text-[#F97316]"
                    : "text-[#6A7282]"
                  }
        `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "Overview" && (
          <div className="space-y-6">

            {/* ABOUT */}
            <div>
              <h3 className="font-semibold text-[#101828] my-4">
                About This Project
              </h3>
              <p className="text-md font-medium text-[#4A5565] leading-relaxed">
                {overview.about}
              </p>
            </div>

            {/* DETAILS */}
            <div>
              <h3 className="font-semibold text-xl text-[#101828] mb-4">
                Property Details
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <Detail icon={<LuBed />} label="Bedrooms" value={overview.details.beds} />
                <Detail icon={<LuBath />} label="Bathrooms" value={overview.details.baths} />
                <Detail icon={<CgArrowsExpandRight />} label="Area" value={overview.details.area} />
              </div>
            </div>

            {/* PROJECT TEAM */}
            <div>
              <h3 className="text-lg font-semibold text-[#101828] mb-4">
                Project Team
              </h3>

              <div className="space-y-2">
                {overview.team.map((t, i) => {
                  const Icon = t.icon;

                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl px-6 py-4 bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE]"
                    >
                      <div
                        className="w-12 h-12 rounded-xl text-white flex items-center justify-center  bg-[#155DFC]"

                      >
                        <BsPersonFillCheck size={32} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#4A5565]">{t.role}</p>
                        <p className="text-lg font-semibold text-[#101828]">
                          {t.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>

            {/* AMENITIES */}
            <div>
              <h3 className="font-semibold text-lg text-[#101828] mb-4">
                Planned Amenities
              </h3>

              <div className="grid grid-cols-2 gap-4 text-sm">
                {overview.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="bg-[#F4F9FF] text-[#364153] font-medium text-md rounded-lg px-6 py-3 flex gap-4"
                  >
                    <span><FaRegCircleCheck className="text-xl text-[#00A63E]" /></span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}



        {activeTab === "Construction Milestones" && (
          <div className="space-y-6">

            {/* ================= OVERALL PROGRESS ================= */}
            <div className="bg-gradient-to-br from-[#FFF7ED] to-[#FFFBEB] border border-[#FFEDD4] rounded-xl p-4 mt-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xl font-semibold text-[#101828] mb-2">
                    Overall Progress
                  </p>
                  <p className="text-md text-[#4A5565]">
                    {completedCount} of {totalCount} milestones completed
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-[#F54900]">
                    {overallProgress}%
                  </p>
                  <p className="text-sm text-[#4A5565]">Complete</p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="h-4 bg-[#E5E7EB] rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#F97316]"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>

              <div className="flex justify-between text-sm text-[#4A5565]">
                <span>Started: {property.Started}</span>
                <span>{property.structure}</span>
                <span>Target: {property.expectedCompletion}</span>
              </div>
            </div>

            {/* ================= TIMELINE ================= */}
            <p className="text-xl font-semibold text-[#101828]">
              Construction Timeline
            </p>

            <div className="space-y-4">
              {milestones.map((m, i) => {
                const completed = m.status === "Completed";
                const progress = m.status === "In Progress";

                return (
                  <div
                    key={i}
                    className={`border rounded-xl px-4 py-5 ${completed
                      ? "bg-[#F0FDF4] border-[#B9F8CF]"
                      : progress
                        ? "bg-[#FFF7ED] border-[#FFD6A7]"
                        : "bg-[#F9FAFB] border-[#E5E7EB]"
                      }`}
                  >
                    {/* TOP */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${completed
                            ? "bg-green-500 text-white"
                            : progress
                              ? "bg-orange-500 text-white"
                              : "bg-gray-300 text-white"
                            }`}
                        >
                          {completed ? (
                            <FaRegCircleCheck className="text-sm" />
                          ) : progress ? (
                            <LuClock className="text-sm" />
                          ) : (
                            <FaRegCircle className="text-sm" />
                          )}
                        </div>


                        <div>
                          <p className="text-lg font-semibold text-[#101828]">
                            {m.label}
                          </p>
                          <p className="text-sm text-[#4A5565]">{m.desc}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${completed
                            ? "text-[#00A63E]"
                            : progress
                              ? "text-[#F54900]"
                              : "text-[#6A7282]"
                            }`}
                        >
                          {m.status}
                        </p>
                        <p className="text-xs text-[#6A7282]">
                          Target: {m.target}
                        </p>
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-2">
                      <p className="text-xs text-[#4A5565] mt-2 justify-between flex mb-3">
                        <span>Progress </span>
                        <span>{m.progress}%</span>
                      </p>


                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className={`h-full ${completed
                            ? "bg-[#00A63E]"
                            : progress
                              ? "bg-[#F54900]"
                              : "bg-[#6A7282]"
                            }`}
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>


                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}




        {/* ================= CALCULATOR ================= */}

        {activeTab === "Investment Calculator" && (
          <div ref={financialRef} className="space-y-10 pt-2">
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

            {/* PROPERTY SCORE BREAKDOWN */}
            {property?.financials?.breakdown?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Property Score Breakdown
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-gradient-to-br from-[#EEF2FF] to-[#F5FAFF] p-5 rounded-xl">
                  {property.financials.breakdown.map((item, index) => {
                    const percent = item.max > 0 ? (item.value / item.max) * 100 : 0;

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-gray-700">
                          <span>{item.label}</span>
                          <span>
                            {item.value} / {item.max}
                          </span>
                        </div>
                        <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${percent}%`,
                              background: "linear-gradient(90deg, #F54900 0%, #FF9D59 100%)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INVESTMENT SLOTS SECTION */}

            <div className="space-y-8 mt-10 bg-white rounded-2xl p-7 border border-gray-200 shadow-sm">

              {/* HEADER */}
              <div className="pb-2">
                <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                  Invest Now
                </h3>
              </div>

              {/* PRICE PER SLOT */}
              <div className="flex justify-between items-center border border-gray-300 rounded-xl px-5 py-5 bg-gray-50 hover:shadow-sm transition">

                <span className="text-gray-800 text-lg font-medium">
                  Property Price (Per Slot)
                </span>

                <span className="text-xl font-bold text-gray-900">
                  {property?.pricePerSlot
                    ? `${property.pricePerSlot.toLocaleString()} ${selectedCurrency}`
                    : "N/A"}
                </span>

              </div>

              {/* TOTAL SECTION */}
              <div className="flex justify-between items-center border border-gray-300 rounded-xl px-5 py-5 bg-gray-50 hover:shadow-sm transition">

                <span className="text-gray-800 text-lg font-medium">
                  Total
                </span>

                <div className="flex items-center gap-3">

                  <input
                    type="number"
                    value={totalValue}
                    placeholder="amount"
                    onChange={(e) => setTotalValue(e.target.value)}
                    className="w-32 bg-white border border-gray-300 rounded-lg px-3 py-2 text-right text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F54900]"
                  />

                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-md font-semibold text-gray-900 hover:border-[#F54900] transition"
                    >
                      {selectedCurrency} ▾
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 bg-white border text-black border-gray-200 rounded-xl shadow-lg w-28 z-50">
                        {currencyOptions.map((currency) => (
                          <div
                            key={currency}
                            onClick={() => {
                              setSelectedCurrency(currency);
                              setShowDropdown(false);
                            }}
                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {currency}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SLIDER */}
              <div>
                <div
                  onClick={handleSliderClick}
                  className="relative h-4 bg-gray-300 rounded-full cursor-pointer"
                >
                  <div
                    className="absolute left-0 top-0 h-4 bg-gradient-to-r from-[#F54900] to-[#FF9D59] rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />

                  <div
                    className="absolute top-1/2 w-6 h-6 bg-white border-2 border-[#F54900] rounded-full shadow-md transform -translate-y-1/2 transition-all duration-300"
                    style={{ left: `calc(${percent}% - 10px)` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600 mt-3 font-medium">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* BALANCE INFO */}
              <div className="space-y-3 text-sm pt-2">
                <div className="flex justify-between text-gray-900">
                  <span className="text-gray-800 text-lg font-medium">Available Balance</span>
                  <span className="font-semibold text-lg  text-gray-900">
                    {walletBalance} {selectedCurrency}
                  </span>
                </div>

                <div className="flex justify-between text-gray-900">
                  <span className="text-gray-800 text-lg font-medium">Max Buy</span>
                  <span className="font-semibold text-lg  text-gray-900">
                    {walletBalance} {selectedCurrency}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              <button
                disabled={numericAmount < MIN_INVEST}
                className={`w-full py-3 rounded-xl font-semibold text-base transition-all duration-300
      ${numericAmount >= MIN_INVEST
                    ? "bg-gradient-to-r from-[#F54900] to-[#FF9D59] hover:shadow-lg text-white"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                  }`}
              >
                {numericAmount >= MIN_INVEST
                  ? "Buy Property"
                  : `Min $ ${MIN_INVEST} Required`}
              </button>

            </div>

            {/* <div className="space-y-8 mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">



              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Invest Now
                </h3>

              </div>

              
              <div className="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-4 bg-gray-50">
                <span className="text-gray-600 text-sm font-medium">
                  Property Price (Per Slot)
                </span>

                <span className="text-right text-lg font-semibold text-gray-900">
                  {property?.pricePerSlot
                    ? `${property.pricePerSlot.toLocaleString()} ${selectedCurrency}`
                    : "N/A"}
                </span>
              </div>

             
              <div className="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-4 bg-gray-50">

                <span className="text-gray-600 text-sm font-medium">
                  Total
                </span>

                <div className="flex items-center gap-3">

                  <input
                    type="number"
                    value={totalValue}
                    onChange={(e) => setTotalValue(e.target.value)}
                    // placeholder={`Min ${MIN_INVEST}`}
                    className="bg-transparent outline-none text-right text-lg font-semibold text-gray-900 w-28 placeholder:text-gray-400"
                  />

               
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 transition"
                    >
                      {selectedCurrency} ▾
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 bg-white border text-gray-700 border-gray-200 rounded-xl shadow-lg w-28 z-50">
                        {currencyOptions.map((currency) => (
                          <div
                            key={currency}
                            onClick={() => {
                              setSelectedCurrency(currency);
                              setShowDropdown(false);
                            }}
                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          >
                            {currency}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

           
              <div>
                <div
                  onClick={handleSliderClick}
                  className="relative h-4 bg-gray-200 rounded-full cursor-pointer"
                >
                  <div
                    className="absolute left-0 top-0 h-4 bg-gradient-to-r from-[#F54900] to-[#FF9D59] rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />

                  <div
                    className="absolute top-1/2 w-6 h-6 bg-white border-2 border-[#F54900] rounded-full shadow transform -translate-y-1/2 transition-all duration-300"
                    style={{ left: `calc(${percent}% - 8px)` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>



              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Available Balance</span>
                  <span className="font-medium text-gray-900">
                    {walletBalance} {selectedCurrency}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Max Buy</span>
                  <span className="font-medium text-gray-900">
                    {walletBalance} {selectedCurrency}
                  </span>
                </div>
              </div>

              <button
                disabled={numericAmount < MIN_INVEST}
                className={`w-full py-3 rounded-xl font-semibold transition-all
                  ${numericAmount >= MIN_INVEST
                    ? "bg-gradient-to-r from-[#F54900] to-[#FF9D59] hover:bg-gradient-to-r from-[#ff4d00] to-[#ffbe90] text-white shadow-md"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                  }`}
              >
                {numericAmount >= MIN_INVEST
                  ? "Buy Property"
                  : `Min $ ${MIN_INVEST} Required`}
              </button>

            </div> */}
          </div>
        )}



        {/* ================= DOCUMENTS ================= */}
        {activeTab === "Documents" && (
          <div className="p-4 space-y-4">
            <p className="text-md font-medium text-[#4A5565]">
              Access all important documents related to this construction project including permits, blueprints, and legal documentation.
            </p>

            {property.documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF6900] to-[#E17100] flex items-center justify-center">
                    <IoDocumentText className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#101828]">
                      {doc.name}
                    </p>
                    <p className="text-xs text-[#6A7282]">
                      {doc.type}
                    </p>
                  </div>
                </div>

                {/* VIEW BUTTON */}
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                          inline-flex items-center gap-2
                          text-sm px-3 py-1.5
                          rounded-lg
                          bg-[#F3F4F6]
                          text-[#364153] font-medium
                          hover:bg-[#EEF4FF]
                          transition
                        "
                >
                  <span>View</span>
                  <FaArrowUpRightFromSquare className="text-xs" />
                </a>

              </div>
            ))}
          </div>

        )}

      </div>

    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Detail = ({ icon, label, value }) => (
  <div className="bg-[#F2F9FF] rounded-xl p-4 text-start">
    <div className="flex justify-left gap-2 text-xl mb-2 text-[#4A5565]">
      {icon}
      <p className="text-sm text-[#4A5565]">{label}</p>
    </div>
    <p className="font-semibold text-2xl text-[#101828]">{value}</p>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between pb-4">
    <span className="text-[#6A7282]">{label}</span>
    <span className="font-semibold text-[#101828]">{value}</span>
  </div>
);
