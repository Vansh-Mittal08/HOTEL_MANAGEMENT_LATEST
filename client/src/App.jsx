import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RoomsPage from "./routes/RoomsPage";  // Updated to use RoomsPage
import BookRoom from "./components/BookRoom";
import Join from "./components/Join";
import AdminDashboard from "./components/AdminDashboard";  // ✅ Import Fixed
import RoomInfo from "./components/Roominfo";


import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms" element={<RoomsPage />} />  {/* Renders room list properly */}
        <Route path="/book/:id" element={<BookRoom />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/roominfo" element={<RoomInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
