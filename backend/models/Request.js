import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  patientName: String,
  bloodGroup: String,
  hospital: String,
  city: String,
  contactNumber: String,
  requiredDate: Date,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);
