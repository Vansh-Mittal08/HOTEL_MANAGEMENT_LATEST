import React from "react";
import "./BookingSteps.css"; // Ensure this file exists

const BookingSteps = () => {
  return (
    <div className="booking-steps">
      <h2 className="booking-title">PLAN YOUR STAY</h2>
      <div className="steps-container">
        <div className="step active">
          <span className="step-number">1</span> <span className="step-text">Select Room</span>
        </div>
        <div className="step">
          <span className="step-number">2</span> <span className="step-text">Personal Details</span>
        </div>
        <div className="step">
          <span className="step-number">3</span> <span className="step-text">Payment Confirmation</span>
        </div>
      </div>
      <div className="separator-line"></div>
    </div>
  );
};

export default BookingSteps;
