import express from "express";
import AdminStats from "../models/AdminStats.js";
import moment from "moment";

const router = express.Router();

/**
 * 📌 Route to Get Weekly Booking Stats
 */
router.get("/weekly-stats", async (req, res) => {
  try {
    const stats = await AdminStats.findOne();
    if (!stats || !stats.dailyBookings) {
      return res.json({ weeklyBookings: [] });
    }

    // Generate past 7 days dynamically
    const last7Days = Array.from({ length: 7 }, (_, i) =>
      moment().subtract(i, "days").format("YYYY-MM-DD")
    ).reverse();

    // Extract the booking data for each day
    const weeklyBookings = last7Days.map(date => ({
      date,
      bookings: stats.dailyBookings.get(date) || 0, 
    }));

    res.json({ weeklyBookings });
  } catch (error) {
    console.error("Error fetching weekly stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 📌 Route to Get Total Stats
 * Fetches total bookings & total revenue.
 */
router.get("/stats", async (req, res) => {
  try {
    const stats = await AdminStats.findOne();
    if (!stats) {
      return res.json({ bookings: 0, amount: 0 });
    }

    // Calculate total bookings dynamically from dailyBookings
    const totalBookings = Array.from(stats.dailyBookings.values()).reduce((sum, val) => sum + val, 0);

    res.json({
      bookings: totalBookings, // Total sum of all daily bookings
      amount: stats.amount,    // Total revenue
    });
  } catch (error) {
    console.error("Error fetching total stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * 📌 Route to Update Booking Stats
 */
router.post("/update-stats", async (req, res) => {
  try {
    const { amount } = req.body;
    const today = moment().format("YYYY-MM-DD");

    let stats = await AdminStats.findOne();
    if (!stats) {
      stats = new AdminStats({ dailyBookings: new Map(), bookings: 0, amount: 0 });
    }

    // Ensure dailyBookings is a Map
    if (!(stats.dailyBookings instanceof Map)) {
      stats.dailyBookings = new Map();
    }

    // Increment today's bookings count
    stats.dailyBookings.set(today, (stats.dailyBookings.get(today) || 0) + 1);

    // Recalculate total bookings from all daily values
    stats.bookings = Array.from(stats.dailyBookings.values()).reduce((sum, val) => sum + val, 0);

    // Update total revenue
    stats.amount += amount;

    await stats.save();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error updating stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
