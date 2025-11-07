import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detects current URL
  const [roomBookOpen, setRoomBookOpen] = useState(false);
  const [roomFacilitiesOpen, setRoomFacilitiesOpen] = useState(false);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="admin-title">Hello, Admin</h2>
        <ul className="menu-list">
          <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
            <Link to="/admin/dashboard">🏠 Dashboard</Link>
          </li>
          <li className={location.pathname === "/admin/roominfo" ? "active" : ""}>
            <Link to="/admin/roominfo">🏨 Room List</Link>
          </li>
          <li className={location.pathname === "/admin/bookingform" ? "active" : ""}>
            <Link to="/admin/bookingform">📝 Hotel Booking</Link>
          </li>
          <li className={location.pathname === "/admin/transactions" ? "active" : ""}>
            <Link to="/admin/transactions">💰 Transactions</Link>
          </li>

          {/* Room Booking Dropdown */}
          <li className="menu-item" onClick={() => setRoomBookOpen(!roomBookOpen)}>
            📖 Room Book ▾
            {roomBookOpen && (
              <ul className="submenu">
                <li><Link to="/admin/room-book/list">📃 Booking List</Link></li>
                <li><Link to="/admin/room-book/checkout">🚪 Room Checkout</Link></li>
                <li><Link to="/admin/room-book/status">📌 Room Status</Link></li>
              </ul>
            )}
          </li>

          {/* Room Facilities Dropdown */}
          <li className="menu-item" onClick={() => setRoomFacilitiesOpen(!roomFacilitiesOpen)}>
            🏗️ Room Facilities ▾
            {roomFacilitiesOpen && (
              <ul className="submenu">
                <li><Link to="/admin/facilities/list">📋 Facilities List</Link></li>
                <li><Link to="/admin/facilities/details">🔍 Facilities Details</Link></li>
                <li><Link to="/admin/facilities/size">📏 Room Size</Link></li>
                <li><Link to="/admin/facilities/manage">⚙️ Modify Accommodations</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/admin/housekeeping">🧹 House Keeping</Link></li>
          <li><Link to="/admin/cab-facility">🚖 Cab Facility</Link></li>
          <li><Link to="/admin/items">📦 Items Manage</Link></li>
          <li><Link to="/admin/personalised">🎨 Personalised</Link></li>
        </ul>
      </div>

      {/* Content Section (Right Side) */}
      <div className="admin-content">
        {/* This will display the selected page based on Route */}
      </div>
    </div>
  );
};

export default AdminSidebar;
