
import Order from "../models/Order.js";
import Food from "../models/Food.js";

// 1. Create a new order

export const createOrder = async (req, res, next) => {
  try {
    const {customerId, restaurantId, foodItems, paymentMethod, deliveryAddress} = req.body;

    if (!Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Food items are required"
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of foodItems) {
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be a positive integer"
        });
      }

      const food = await Food.findById(item.foodId);

      if (!food || !food.isAvailable) {
        return res.status(400).json({
          success: false,
          message: "Food item not found or unavailable"
        });
      }

      const itemTotal = food.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        foodId: food._id,
        quantity: item.quantity,
        price: food.price
      });
    }

    const order = await Order.create({
      customerId,
      restaurantId,
      foodItems: orderItems,
      totalAmount,
      paymentMethod,
      deliveryAddress
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
// 3. Get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order
    });
  } catch (err) {
    next(err);
  }
};
// 4. Get customer orders
export const getCustomerOrders = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const orders = await Order.find({ customerId });

    res.status(200).json({
      success: true,
      message: "Customer orders fetched successfully",
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
// 5. Update order status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status"
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });
  } catch (err) {
    next(err);
  }
};
// 6. Cancel an order
export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled"
      });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order
    });
  } catch (err) {
    next(err);
  }
};