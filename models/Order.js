const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer ID is required']
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Restaurant ID is required']
  },
  foodItems: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: [true, 'Food ID is required']
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: [true, 'Price at time of purchase is required'],
        min: [0, 'Price cannot be negative']
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount cannot be negative']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: {
      values: ['Cash', 'Card', 'UPI', 'Wallet'],
      message: '{VALUE} is not a valid payment method'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['Placed', 'Preparing', 'Out For Delivery', 'Completed', 'Cancelled'],
      message: '{VALUE} is not a valid order status'
    },
    default: 'Placed'
  },
  deliveryAddress: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
    country: { type: String, default: 'US' }
  }
}, { timestamps: true });

export default mongoose.model("order", orderSchema)