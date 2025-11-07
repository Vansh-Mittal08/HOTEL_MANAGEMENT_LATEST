import mongoose from "mongoose";

const AdminStatsSchema = new mongoose.Schema({
  bookings: { type: Number, default: 0 }, // Total bookings (cumulative)
  amount: { type: Number, default: 0 },   // Total revenue (cumulative)
  dailyBookings: {
    type: Map, 
    of: Number, 
    default: {},
  },
});

const AdminStats = mongoose.model("AdminStats", AdminStatsSchema);
export default AdminStats;
