import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  type: String,
  details: [String],
  memberPrice: String,
  standardPrice: String, // Added to match `roomsData`
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: String,
  capacity: String,
  bedType: String,
  warning: String,
  category: { type: String, enum: ["luxury", "deluxe", "economy"], required: true },
  images: [String],
  pricing: [pricingSchema],
});

// ✅ Export Room Model
const Room = mongoose.model("Room", roomSchema);
export default Room;
