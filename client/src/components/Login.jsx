import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for session-based authentication
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed");
      } else {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
          window.location.reload(); // Refresh the home page
        }, 2000);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="background-section">
        <div className="background-image1"></div>
      </div>

      <div className="login-form-container">
        <div className="hotel-branding">
          <img src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2023/11/logo-1-2.png" alt="Hotel Logo" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="input-group">
            <div className="icon-container">
              <Mail className="input-icon" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="input-group">
            <div className="icon-container">
              <Lock className="input-icon" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="register-link">
            Don't have an account? <Link to="/join">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
