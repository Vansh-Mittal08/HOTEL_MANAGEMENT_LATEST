import React, { useState } from "react";
import "./Tabs.css"; // Ensure styles are in a separate CSS file

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container">
      <div className="tab" onClick={() => setActiveTab("room-rates")} 
        id={activeTab === "room-rates" ? "active-tab" : ""}>
        ROOM RATES
      </div>
      <div className="tab" onClick={() => setActiveTab("member-packages")} 
        id={activeTab === "member-packages" ? "active-tab" : ""}>
        MEMBER PACKAGES
      </div>
      <div className="tab" onClick={() => setActiveTab("other-packages")} 
        id={activeTab === "other-packages" ? "active-tab" : ""}>
        OTHER PACKAGES
      </div>
    </div>
  );
};

export default Tabs;
