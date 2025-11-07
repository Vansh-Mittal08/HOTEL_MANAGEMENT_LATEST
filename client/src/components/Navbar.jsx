import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch authentication status from backend
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/status", { withCredentials: true });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchUserStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${location.pathname === "/admin/dashboard" ? "admin-navbar" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Logo" />
        </Link>
        <ul className="nav-links">
          {/* If user is admin, show Dashboard instead of Destinations */}
          {user && user.role === "admin" ? (
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
          ) : (
            <li><Link to="/destinations">Destinations</Link></li>
          )}
          
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="/dining">Dining</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/memberships">Memberships</Link></li>
          <li><Link to="/more">More</Link></li>

          {/* Show user name or "Admin" if logged in, else show login */}
          {user ? (
            <>
              <li className="user-name">Hello, {user.role === "admin" ? "Admin" : user.name}</li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login / Join</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
