import React from "react";
import RoomList from "../components/RoomList";

const roomsData = [
  {
    name: "LUXURY ROOM KING BED",
    size: "37 sq m",
    capacity: "Up to 3 guests",
    bedType: "King",
    warning: "⚠ Last Few Rooms Available",
    images: [
      "https://cdn.sanity.io/images/ocl5w36p/prod3/079c0e00c21394b0b9812679c8f7b4f8fb8a350e-1400x1120.jpg"
    ],
    pricing: [
      {
        type: "Best Available Rate - Room Only",
        details: [
          "Accommodation on room-only basis",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        memberPrice: "10,938",
        standardPrice: "12,500"
      },
      {
        type: "Breakfast Inclusive Rate",
        details: [
          "Inclusive of buffet breakfast at a designated dining venue",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        memberPrice: "12,250",
        standardPrice: "14,000"
      }
    ]
  },
  {
    name: "SERENE INFINITY SEA VIEW KING BED",
    size: "37 sq m",
    capacity: "Up to 3 guests",
    bedType: "King",
    images: ["https://cdn.sanity.io/images/ocl5w36p/prod3/4e925550fb7fe15be73360bad5ad4f0e078087fc-1398x1120.jpg"],
    pricing: [
      {
        type: "Best Available Rate - Room Only",
        details: [
          "Accommodation on room-only basis",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        memberPrice: "14,219",
        standardPrice: "16,250"
      },
      {
        type: "Breakfast Inclusive Rate",
        details: [
          "Inclusive of buffet breakfast at a designated dining venue",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        memberPrice: "15,531",
        standardPrice: "17,750"
      }
    ]
  },
  {
    name: "EXECUTIVE SUITE POOL VIEW KING BED",
    size: "63 sq m",
    capacity: "Up to 4 guests",
    bedType: "King",
    warning: "⚠ Last 2 Rooms Available",
    images: ["https://cdn.sanity.io/images/ocl5w36p/prod3/6021af7b275ff294e4e5b2b1b628b2e93ab9914a-1400x1120.jpg"],
    pricing: [
      {
        type: "Member Rate Copper - Breakfast Inclusive",
        details: [
          "Members only rate",
          "Inclusive of buffet breakfast at a designated dining venue",
          "10% Savings on Food and Beverages",
          "10% Savings on Spa"
        ],
        memberPrice: "56,000"
      },
      {
        type: "Suite Surprises",
        details: [
          "Enjoy great value on our Suites",
          "Inclusive of breakfast at a designated dining venue",
          "One Way Airport Transfer",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        standardPrice: "62,500"
      }
    ]
  },
  {
    name: "SIGNATURE SUITE SEA VIEW KING BED",
    size: "117 sq m",
    capacity: "Up to 3 guests",
    bedType: "King",
    warning: "⚠ Last 1 Room Available",
    images: ["https://cdn.sanity.io/images/ocl5w36p/prod3/dc9ccf6e9a5aca7058e573043dfd09521c825ce3-1400x1120.jpg"],
    pricing: [
      {
        type: "Member Rate Copper - Breakfast Inclusive",
        details: [
          "Members only rate",
          "Inclusive of buffet breakfast at a designated dining venue",
          "10% Savings on Food and Beverages",
          "10% Savings on Spa"
        ],
        memberPrice: "2,20,063"
      },
      {
        type: "Suite Surprises",
        details: [
          "Enjoy great value on our Suites",
          "Inclusive of breakfast at a designated dining venue",
          "One Way Airport Transfer",
          "Inclusive of standard Wi-Fi",
          "Applicable taxes extra"
        ],
        standardPrice: "2,50,000"
      }
    ]
  }
];

const RoomsPage = () => {
  return (
    <div>
      <RoomList rooms={roomsData} />
    </div>
  );
};

export default RoomsPage;
