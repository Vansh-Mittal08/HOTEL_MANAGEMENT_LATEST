import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone } from "lucide-react";
import "./Join.css";

const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, phone, password} = formData;


    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* Background Section */}
      <div className="background-section">
        <div className="background-image"></div>
      </div>

      {/* Registration Form Section */}
      <div className="login-form-container">
        <div className="hotel-branding">
          <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Hotel Logo" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {/* Name Input */}
          <div className="input-group">
            <div className="icon-container">
              <User className="input-icon" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <div className="icon-container">
              <Mail className="input-icon" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="input-group">
            <div className="icon-container">
              <Phone className="input-icon" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <div className="icon-container">
              <Lock className="input-icon" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Register
          </button>

          {/* Already have an account? */}
          <div className="register-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Join;
