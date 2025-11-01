import React from "react";
import { useNavigate } from "react-router-dom";

const ManagerNavigation = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
        onClick={() => navigate("/manager/dashboard")}
        className="flex-1 py-3 rounded-md bg-[#90CAF9] text-[#121212] font-medium text-lg shadow-md hover:bg-[#64B5F6] transition-all duration-300">
          Manager
        </button>

        <button
        onClick={() => navigate("/Volunteer/dashboard")}
        className="flex-1 py-3 rounded-md bg-[#FFB74D] text-[#121212] font-medium text-lg shadow-md hover:bg-[#FFA726] transition-all duration-300">
          Volunteer
        </button>
      </div>
    </div>
  );
};

export default ManagerNavigation;
