import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUnderConstructionProperties } from "../../Data/UnderConstructionProperties";

import UnderConstructionLeft from "./components/UnderConstructionLeft";
import UnderConstructionSidebar from "./components/UnderConstructionSidebar";

export default function UnderConstructionDetails() {  
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const allConstruction = await getUnderConstructionProperties(); // API call
        const found = allConstruction.find(p => String(p.id) === String(id));

        setProperty(found || null);
      } catch (err) {
        console.error("Error loading construction property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading project details...</div>;
  }

  if (!property) {
    return <div className="p-10 text-center">Project not found</div>;
  }

  return (
    <div className="dmfont space-y-8 px-4 md:px-6 py-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold text-[#101828]">Investment</h2>
        <p className="text-[#4A5565]">
          Explore investment opportunities in real estate
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UnderConstructionLeft property={property} />
        </div>

        <div className="lg:col-span-1">
          <UnderConstructionSidebar property={property} />
        </div>
      </div>
    </div>
  );
}


