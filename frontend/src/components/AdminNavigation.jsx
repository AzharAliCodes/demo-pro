import React from "react";

const AdminNavigation = () => {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <h1 className="text-[#E0E0E0] text-3xl font-semibold mb-8 text-center">
        Support Portal Navigation
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        {/* Admin Button */}
        <button className="flex-1 py-3 rounded-md bg-[#90CAF9] text-[#121212] font-medium text-lg shadow-md hover:bg-[#64B5F6] transition-all duration-300">
          Admin
        </button>

        {/* Manager Button */}
        <button className="flex-1 py-3 rounded-md bg-[#B0BEC5] text-[#121212] font-medium text-lg shadow-md hover:bg-[#90A4AE] transition-all duration-300">
          Manager
        </button>

        {/* Volunteer Button */}
        <button className="flex-1 py-3 rounded-md bg-[#FFB74D] text-[#121212] font-medium text-lg shadow-md hover:bg-[#FFA726] transition-all duration-300">
          Volunteer
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
