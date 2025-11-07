import express from "express";
import BookingDetails from "../models/BookingDetails.js"; // Import using ESM

const router = express.Router();

// POST: Create a new booking detail entry
router.post("/", async (req, res) => {
    try {
        const newBooking = new BookingDetails(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking details saved successfully" });
    } catch (error) {
        console.error("Error saving booking details:", error);
        res.status(500).json({ error: "Failed to save booking details" });
    }
});

// GET: Fetch all booking details
router.get("/", async (req, res) => {
    try {
        const bookings = await BookingDetails.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({ error: "Failed to fetch booking details" });
    }
});

export default router;
