const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant', // References the Restaurant model
    required: [true, 'A food item must belong to a restaurant']
  },
  title: {
    type: String,
    required: [true, 'Food title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  isAvailable: {
    type: Boolean,
    default: true 
  },
  image: {
    type: String,
    default: 'https://example.com'
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be below 0'],
    max: [5, 'Rating cannot be above 5'],
    set: val => Math.round(val * 10) / 10 
  }
},{timestamps:true});

export default mongoose.model("food", foodItemSchema)
