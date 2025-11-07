import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js"; 

// Resolve correct directory for .env (ensures it works even if run from a different location)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


console.log("MONGO_URI from .env:", process.env.MONGO_URI);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const makeKshitizAdmin = async () => {
      try {
        const user = await User.findOne({ email: "kshitizagrawal001@gmail.com" });

        if (!user) {
          console.log("❌ User not found!");
          return;
        }

        // Update role to admin
        user.role = "admin";
        await user.save();
        console.log("✅ Kshitiz is now an admin!");

      } catch (err) {
        console.error("❌ Error updating user:", err);
      } finally {
        mongoose.connection.close(); // Close connection after script runs
      }
    };

    makeKshitizAdmin();
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });
