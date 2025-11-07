import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },  // ✅ Added phone number
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
});

export default mongoose.model("User", UserSchema);
