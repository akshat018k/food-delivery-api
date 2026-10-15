import mongoose, { Types } from "mongoose";

const DeliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"],
  },
  vehicleNumber: {
    type: String,
    required: [true, "Vehicle number is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  vehicleType: {
    type: String,
    required: [true, "Vehicle type is required"],
    enum: {
      values: ["Bicycle", "Bike", "Scooter", "Car", "Van", "Truck"],
      message: "{VALUE} is not a supported vehicle type",
    },
  },
  licenseNumber: {
    type: String,
    required: [true, "License number is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Operating city is required"],
    trim: true,
  },
  profileImage: { type: String, default: "https://example.com", trim: true },
  isActive: {
    type: Boolean,
    default: false,
  },
  currentLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [0, 0],
    },
  },
},{timestamps:true});

export default mongoose.model("delivery", DeliveryPartnerSchema);
