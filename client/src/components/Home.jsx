import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  // Reference for Booking Section
  const bookingRef = useRef(null);
  const navigate = useNavigate(); 

  // Function to Scroll to Booking Section
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      {/* Video Section */}
      <div className="video-section">
        <video autoPlay loop muted className="background-video">
          <source
            src="https://assets-cug1-825v2.tajhotels.com/video/TAJ%20WEBSITE%20FILM_1920%20X%20930_148mb.mp4?Impolicy=Medium_High"
            type="video/mp4"
          />
        </video>
        <div className="overlay"></div>
        <div className="home-content">
          <h1>Welcome to ROYELLA Luxury Resorts</h1>
          <p>Experience comfort and elegance like never before</p>
          <button className="book-btn" onClick={scrollToBooking}>
            Book a Room
          </button>
        </div>
      </div>

      {/* Black Background Section */}
      <div className="black-section">
        <div className="features-section">
          <h2 className="section-title">FEATURES</h2>
          <h1 className="luxury-heading">
            THE FINEST LUXURY HOTELS WORLDWIDE FOR YOU
          </h1>

          {/* Image Section */}
          <div className="features-container">
            <div className="feature-card">
              <img
                src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/10/img1.png"
                alt="Luxury Dining Experiences"
              />
              <p>Luxury Dining Experiences</p>
            </div>
            <div className="feature-card">
              <img
                src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/10/img2.png"
                alt="Infinity Swimming Pools"
              />
              <p>Infinity Swimming Pools</p>
            </div>
          </div>
        </div>

        {/* Online Booking Section */}
        <div className="booking-section" ref={bookingRef}>
          <h2 className="section-title">ONLINE BOOKING</h2>
          <h1 className="luxury-heading1">
            EXCEPTIONAL SERVICES TAILORED TO YOUR EVERY DESIRE
          </h1>

          {/* Image & Form Section */}
          <div className="booking-container">
            {/* Image Section */}
            <div className="image-section">
              <img
                src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/11/resort1.png"
                alt="Luxury Pool"
              />
              <img
                src="https://wp.ditsolution.net/royella-multipurpose/wp-content/uploads/2024/11/resort-2.png"
                alt="Poolside Resort"
              />
            </div>

            {/* Booking Form */}
            <div className="booking-form">
              <h2>BOOK ONLINE</h2>
              <p>Rapidiously mycoardinate cross platform</p>
              <form>
                <input type="date" placeholder="Check In" />
                <input type="date" placeholder="Check Out" />
                <select>
                  <option>01 ROOM</option>
                  <option>02 ROOMS</option>
                </select>
                <div className="guests">
                  <select>
                    <option>01 ADU</option>
                    <option>02 ADU</option>
                  </select>
                  <select>
                    <option>01 CHILD</option>
                    <option>02 CHILD</option>
                  </select>
                </div>
                <button type="button" onClick={() => navigate("/rooms")}>
      CHECK AVAILABILITY
    </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
