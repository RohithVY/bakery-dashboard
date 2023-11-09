import React from "react";

const ChartsHeader = () => {
  return (
    <div className="stats w-full shadow-xl mt-5 bg-[#1E293B]">
      <div className="stat place-items-center">
        <div className="stat-title">Branches</div>
        <div className="stat-value">1000+</div>
        <div className="stat-desc">For over 5 years</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Users</div>
        <div className="stat-value text-secondary">4,200</div>
        <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Employess</div>
        <div className="stat-value">12,000+</div>
        <div className="stat-desc">↗︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default ChartsHeader;
