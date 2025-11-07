// const express = require("express");
// const router = express.Router();
// const Room = require("../models/Room");

// // ✅ Fetch all rooms
// router.get("/", async (req, res) => {
//   try {
//     const rooms = await Room.find();
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ✅ Add a new room
// router.post("/", async (req, res) => {
//   try {
//     const newRoom = new Room(req.body);
//     await newRoom.save();
//     res.status(201).json(newRoom);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid data" });
//   }
// });

// // ✅ Update a room
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedRoom);
//   } catch (err) {
//     res.status(400).json({ error: "Invalid data" });
//   }
// });

// // ✅ Delete a room
// router.delete("/:id", async (req, res) => {
//   try {
//     await Room.findByIdAndDelete(req.params.id);
//     res.json({ message: "Room deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
