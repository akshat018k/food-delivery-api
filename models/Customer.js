import mongoose, { Types } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"],
    select:false
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true, default: "US" },
  },
  profileImage: { type: String, default: "https://example.com", trim: true },
},{timestamps:true});

export default mongoose.model("customer", CustomerSchema);
