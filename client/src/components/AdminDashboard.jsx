import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import { Bar } from "react-chartjs-2";
import RoomInfo from "./Roominfo";
import BookingForm from "./BookingForm"; 

// ✅ Import necessary ChartJS elements
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement, // ✅ Fix: Register LineElement
  PointElement, // ✅ Fix: Register PointElement
} from "chart.js";

// ✅ Register all required elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,  // ✅ Registered
  PointElement, // ✅ Registered
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, amount: 0 });
  const [weeklyData, setWeeklyData] = useState({ labels: [], bookings: [] });
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fetch total stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch weekly booking data
  const fetchWeeklyStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/weekly-stats");
      const { weeklyBookings } = res.data;

      setWeeklyData({
        labels: weeklyBookings.map(day => day.date),
        bookings: weeklyBookings.map(day => day.bookings),
      });
    } catch (err) {
      console.error("Error fetching weekly stats:", err);
    }
  };

  // Simulate a booking update
  const updateStats = async (amount) => {
    try {
      await axios.post("http://localhost:5000/api/admin/update-stats", { amount });
      fetchStats(); // Refresh total stats
      fetchWeeklyStats(); // Refresh weekly bookings chart
    } catch (err) {
      console.error("Error updating stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchWeeklyStats();
  }, []);

 return (
  <div className="admin-dashboard-container">
    <AdminSidebar setActiveTab={setActiveTab} />
    <div className="admin-dashboard">
      {activeTab === "dashboard" && (
        <>
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Bookings</h3>
              <p>{stats.bookings}</p>
            </div>
            <div className="card">
              <h3>Total Revenue</h3>
              <p>₹ {stats.amount}</p>
            </div>
          </div>

          <div className="chart-container">
            <h2>Bookings This Week</h2>
            <Bar
              data={{
                labels: weeklyData.labels,
                datasets: [
                  {
                    type: "bar",
                    label: "Daily Bookings",
                    data: weeklyData.bookings,
                    backgroundColor: "#E17A58",
                    borderRadius: 5,
                  },
                  {
                    type: "line",
                    label: "Trend",
                    data: weeklyData.bookings,
                    borderColor: "#FFD700",
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: "#FFD700",
                    pointRadius: 5,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 2,
                plugins: {
                  legend: { display: true, position: "top" },
                },
                scales: {
                  x: {
                    ticks: {
                      autoSkip: true,
                      maxRotation: 45,
                      minRotation: 30,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 },
                  },
                },
              }}
              height={200}
            />
          </div>

          <button onClick={() => updateStats(100)}>Add Booking (Test)</button>
        </>
      )}

      {activeTab === "rooms" && <RoomInfo />}
      {activeTab === "bookings" && <BookingForm />}
    </div>
  </div>
);


};

export default AdminDashboard;
