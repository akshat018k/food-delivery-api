
import Restaurant from "../models/Restaurant.js";

// 1. Register a new restaurant

export const registerRestaurant = async (req, res, next) => {
  try {
    // Get data from request
    const {ownerName, email, phone, address, city, description, image} = req.body;

    // Create restaurant in database
    const restaurant = await Restaurant.create({
      ownerName,
      email,
      phone,
      address,
      city,
      description,
      image
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Restaurant registered successfully",
      data: restaurant
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get all restaurants
export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurants
    });
  } catch (err) {
    next(err);
  }
};
// 3. Get restaurant by ID
export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant fetched successfully",
      data: restaurant
    });
  } catch (err) {
    next(err);
  }
};
// 4. Update restaurant details
export const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      ownerName,
      email,
      phone,
      address,
      city,
      description,
      image,
      rating,
      isActive
    } = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ownerName,
        email,
        phone,
        address,
        city,
        description,
        image,
        rating,
        isActive
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      data: restaurant
    });
  } catch (err) {
    next(err);
  }
};
// 5. Delete restaurant
export const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};