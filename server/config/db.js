import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 Connecting to MongoDB URI:", process.env.MONGO_URI); // Debug line
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
