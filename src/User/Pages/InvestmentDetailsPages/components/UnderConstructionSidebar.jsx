import { SlBasket } from "react-icons/sl";
import { IoTimeOutline, IoWarningOutline } from "react-icons/io5";
import { FiShield, FiUsers } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const ICONS = {
  shield: <FiShield />,
  check: <FaRegCircleCheck />,
  building: <LuBuilding2 />,
  users: <FiUsers />,
};


export default function UnderConstructionSidebar({ property }) {
  const s = property.sidebar;
  const navigate = useNavigate();

  return (
    <div className="space-y-4 sticky top-24">

      {/* ================= MAIN CARD ================= */}
      <div className="bg-gradient-to-br from-[rgba(255,105,0,0.08)] to-[rgba(225,113,0,0.08)] rounded-2xl p-5 space-y-4">

        <div>
          <p className="text-sm text-black">Total Project Value</p>
          <p className="text-3xl font-bold text-black">${s.totalValue}</p>
          <p className="text-sm text-black mt-1">
            Min. Investment: ${s.minInv}
          </p>
        </div>

        <StatRow label="Monthly Income" value={s.expectedROI} />
        <StatRow label="Project Duration" value={s.duration} />
        <StatRow label="Completion Date" value={s.completion} />
        <StatRow label="Progress" value={`${s.progress}%`} />

        {/* FUNDING */}
        <div>
          <div className="flex justify-between text-xs font-medium text-black mb-1">
            <span>Funding Progress</span>
            <span>{s.funprogress}%</span>
          </div>

          <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F54900] to-[#FF9D59]"
              style={{ width: `${s.funprogress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-black mt-1">
            <span>{s.raised} raised</span>
            <span>{s.investors} investors</span>
          </div>
        </div>

        <button 
          onClick={() =>
            navigate(`/user/property-investments/construction/${property.id}`, {
              state: { tab: "calculator" }
            })
          }
        
        className="w-full h-[55px] rounded-xl bg-gradient-to-r from-[#F54900] to-[#FF9D59] text-white font-semibold flex items-center justify-center gap-2">
          <SlBasket className="text-xl" />
          Invest Now
        </button>

        <button className="w-full h-[55px] rounded-xl border bg-white text-black font-medium flex items-center justify-center gap-2">
          <IoTimeOutline className="text-xl" />
          View Progress
        </button>
      </div>

      {/* ================= KEY FEATURES ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
        <h4 className="font-semibold text-[#101828] text-lg">Key Features</h4>

        {property.keyFeatures.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg bg-[#DBEAFE] flex items-center justify-center text-[#155DFC]`}>
              {/* {ICONS[f.icon]} */}
              <IoCheckmarkDoneCircleSharp size={24}  />
            </div>
            <div>
              <p className="text-sm font-medium text-[#101828]">{f.title}</p>
              <p className="text-xs text-[#4A5565]">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ================= RISK ================= */}
      <div className="bg-[#FEFCE8] border border-[#FFF085] rounded-2xl p-4 flex gap-3">
        <IoWarningOutline className="text-[#D08700] text-xl shrink-0 mt-0.5" />
        <p className="text-sm text-[#4A5565]">
          <strong className="text-lg text-[#101828]">Investment Risk</strong><br />
          {property.risk}
        </p>
      </div>
    </div>
  );
}

/* ===== Helper ===== */
const StatRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-black">{label}</span>
    <span className="font-semibold text-black">{value}</span>
  </div>
);
