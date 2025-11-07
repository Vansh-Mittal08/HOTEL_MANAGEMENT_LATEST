import mongoose from "mongoose";

const BookingDetailsSchema = new mongoose.Schema({
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    bookingType: { type: String, enum: ["luxury", "deluxe", "economy"], required: true },
    bookingRefNo: { type: String },
    arrivalFrom: { type: String },
    purposeOfVisit: { type: String },
    remarks: { type: String }
});

const BookingDetails = mongoose.model("BookingDetails", BookingDetailsSchema);

export default BookingDetails;
