import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import { BiSolidOffer } from "react-icons/bi";
import { BsMicrosoftTeams } from "react-icons/bs";
import {
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaBullseye,
  FaCog,
  FaPeopleArrows,
  FaWallet,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiProfit, GiTakeMyMoney } from "react-icons/gi";
import { TbPigMoney } from "react-icons/tb";
import { GrAnnounce, GrMoney } from "react-icons/gr";
import { IoTodayOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth, MdAutorenew } from "react-icons/md";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import logoicon from "../../../src/assets/userImages/Logo/icon2.png";
import banner1 from "../../assets/userImages/images/embot-banner.png";
import banner2 from "../../assets/userImages/images/embot-banner-2.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "../Components/Comman/Footer";
import Wallets from "./Wallets";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../config/appConfig";
import SkeletonLoader from "../Components/Comman/Skeletons";
import { useDemoMode } from "../Contexts/DemoModeContext";
import { getDemoData } from "../Data/demoData";

const Dashboard = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Default dashboard data to prevent undefined access
  const defaultDashboardData = {
    firstName: "Loading...",
    userName: "Loading...",
    referralCode: "N/A",
    walletAddress: "",
    wallets: {
      myWallet: "$0.00",
      depositWallet: "$0.00",
      principleWallet: "$0.00",
      emgtWallet: "$0.00",
      referralWallet: "$0.00",
      totalInvestment: "$0.00",
      totalTokenizedInvestment: "$0.00",
      totalUnderconstructionInvestment: "$0.00",
      totalReadyInvestment: "$0.00",

      totalWalletBalance: "$0.00",
    },
    profitTracker: {
      investment: "$0.00",
      earnings: "$0.00",
      earningWithoutCap: "$0.00",
      earningsTimes: "$0.00",
    },
    teamBusiness: {
      directBusiness: "$0.00",
      totalTeamBusiness: "$0.00",
      todayTeamBusiness: "$0.00",
    },
    incomes: {
      roiIncome: "$0.00",
      levelIncome: "$0.00",
      bonusIncome: "$0.00",
      totalBinaryRewards: "$0.00",
      totalLeadershipRewards: "$0.00",
    },
    transactions: {
      totalEarning: "$0.00",
      totalWithdraw: "0.00",
    },
    teamStats: {
      totalTeam: 0,
      myDirect: 0,
      indirect: 0,
    },
    tokenOverview: {
      price: 0,
    },
    referralLink: "N/A",
    userEmail: "N/A",
  };

  const {
    data: dashboardData = defaultDashboardData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }
      const response = await fetch(`${appConfig.baseURL}/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid token. Please log in again.");
        }
        throw new Error("Failed to load dashboard data.");
      }
      
      const data = await response.json();
      const referralLink = `${appConfig.frontendURL}/user/signup?referral=${
        data.data.referralCode || "N/A"
      }`;
      return {
        firstName: data.data.firstName || "User",
        userName: data.data.userName || "Unknown User",
        referralCode: data.data.referralCode || "N/A",
        walletAddress: data.data.walletAddress || "",
        userRank: data.data.userRank || "N/A",
        wallets: {
          myWallet: data.data.wallets?.myWallet
            ? `${Number(
                data.data.wallets.myWallet.replace("$", "")
              ).toLocaleString()}`
            : "0.00",
          depositWallet: data.data.wallets?.depositWallet
            ? `${Number(
                data.data.wallets.depositWallet.replace("$", "")
              ).toLocaleString()}`
            : "0.00",
          referralWallet: data.data.wallets?.referralWallet
            ? `${Number(
                data.data.wallets.referralWallet.replace("$", "")
              ).toLocaleString()}`
            : "0.00",
          principleWallet: data.data.wallets?.principalWallet
            ? `${Number(
                data.data.wallets.principalWallet.replace("$", "")
              ).toLocaleString()}`
            : "0.00",
          emgtWallet: data.data.wallets?.emgtWallet
            ? `${Number(data.data.wallets.emgtWallet)}`
            : "0.00",
          totalInvestment: data.data.wallets?.totalInvestment
            ? `${Number(
                data.data.wallets.totalInvestment.replace("$", "")
              ).toLocaleString()}`
            : "0.00",
          latestLevelRank: data.data.wallets?.latestLevelRank || "N/A",
          binaryDailyCap: data.data.wallets?.binaryDailyCap || "N/A",
          totalWalletBalance: data.data.wallets?.totalWalletBalance
            ? `${Number(
                data.data.wallets.totalWalletBalance.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalTokenizedInvestment: data.data.wallets?.totalTokenizedInvestment
            ? `${Number(
                data.data.wallets.totalTokenizedInvestment.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalReadyInvestment: data.data.wallets?.totalReadyInvestment
            ? `${Number(
                data.data.wallets.totalReadyInvestment.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalUnderconstructionInvestment: data.data.wallets?.totalUnderconstructionInvestment
            ? `${Number(
                data.data.wallets.totalUnderconstructionInvestment.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
        },
        profitTracker: {
          investment: data.data.profitTracker?.investment
            ? `${Number(
                data.data.profitTracker.investment.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          earning: data.data.profitTracker?.earning
            ? `${Number(
                data.data.profitTracker.earning.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          earningWithoutCap: data.data.profitTracker?.earningWithoutCap
            ? `${Number(
                data.data.profitTracker.earningWithoutCap.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          earningTimes: data.data.profitTracker?.earningTimes || "0X",
          
        },
        teamBusiness: {
          directBusiness: data.data.teamBusiness?.directBusiness
            ? `$${Number(
                data.data.teamBusiness.directBusiness.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalTeamBusiness: data.data.teamBusiness?.totalTeamBusiness
            ? `$${Number(
                data.data.teamBusiness.totalTeamBusiness.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          todayTeamBusiness: data.data.teamBusiness?.todayTeamBusiness
            ? `$${Number(
                data.data.teamBusiness.todayTeamBusiness.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
        },
        incomes: {
          roiIncome: data.data.incomes?.roiIncome
            ? `$${Number(
                data.data.incomes.roiIncome.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          levelIncome: data.data.incomes?.referralIncome
            ? `$${Number(
                data.data.incomes.referralIncome.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalLevelRewards: data.data.incomes?.totalLevelRewards
            ? `$${Number(
                data.data.incomes.totalLevelRewards.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          dailyIncome: data.data.incomes?.dailyIncome
            ? `$${Number(
                data.data.incomes.dailyIncome.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          monthlyIncome: data.data.incomes?.monthlyIncome
            ? `$${Number(
                data.data.incomes.monthlyIncome.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
            totalBinaryRewards: data.data.incomes?.totalBinaryRewards
            ? `$${Number(
                data.data.incomes.totalBinaryRewards.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
            totalLeadershipRewards: data.data.incomes?.totalLeadershipRewards
            ? `$${Number(
                data.data.incomes.totalLeadershipRewards.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
            leadershipShares: data.data.incomes?.leadershipShares
              ? `${Number(
                  data.data.incomes.leadershipShares.replace("$", "")
                ).toLocaleString()}`
              : "0.00",
        },
        transactions: {
          totalEarning: data.data.transactions?.totalEarning
            ? `$${Number(
                data.data.transactions.totalEarning.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
          totalWithdraw: data.data.transactions?.totalWithdraw
            ? `${Number(
                data.data.transactions.totalWithdraw.replace("$", "")
              ).toLocaleString()}`
            : "$0.00",
        },
        teamStats: {
          totalTeam: data.data.teamStats?.totalTeam || 0,
          myDirect: data.data.teamStats?.myDirect || 0,
          indirect: data.data.teamStats?.indirect || 0,
        },
        tokenOverview: {
          price: data.data.tokenOverview?.price || "N/A",
        },
        referralLink,
        userEmail: data.data.userEmail || "N/A",
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      if (err.message.includes("Invalid token")) {
        navigate("/user/login");
      }
    },
  });

  console.log("Dashboard Data:", dashboardData);

  const handleCopy = () => {
    navigator.clipboard.writeText(dashboardData.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const data = useMemo(
    () => [
      ["Type", "Value"],
      [
        "Investment",
        parseFloat(
          dashboardData.profitTracker?.investment?.replace("$", "") || "0"
        ) || 0,
      ],
      [
        "Earning",
        parseFloat(
          dashboardData.profitTracker?.earning?.replace("$", "") || "0"
        ) || 0,
      ],
    ],
    [dashboardData.profitTracker]
  );

  const options = {
    pieHole: 0.75,
    pieStartAngle: 270,
    slices: {
      0: { color: "#4ade80" },
      1: { color: "#3cadf3" },
    },
    tooltip: { trigger: "selection" },
    legend: "none",
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "100%" },
  };


  // Parse earningTimes for button condition
  const earningTimes = dashboardData.profitTracker.earningTimes;
  const parsedEarningTimes = typeof earningTimes === "string"
    ? parseFloat(earningTimes.replace("X", ""))
    : parseFloat(earningTimes);
  const shouldShowButton = earningTimes === "2.00X" ||
    (!isNaN(parsedEarningTimes) && parsedEarningTimes >= 1.98 && parsedEarningTimes <= 2.00);


  if (isLoading) {
    return (
      <div className="text-white  text-center">
        <SkeletonLoader variant="dashboard" rows={6} />
      </div>
    );
  }

  return (
    <div className="text-white p-0 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl uppercase text-blue-700 font-bold">
            Welcome, {dashboardData.firstName}! Have a nice day!
          </h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;