
import Food from "../models/Food.js";

// 1. Add a new food item
export const addFood = async (req, res, next) => {
  try {
    const {restaurantId, title, description, price, isAvailable, image, rating} = req.body;

    const food = await Food.create({
      restaurantId,
      title,
      description,
      price,
      isAvailable,
      image,
      rating
    });

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      data: food
    });
  } catch (err) {
    next(err);
  }
};
// 2. Get all food items
export const getAllFoods = async (req, res, next) => {
  try {
    const foods = await Food.find();

    res.status(200).json({
      success: true,
      message: "Food items fetched successfully",
      data: foods
    });
  } catch (err) {
    next(err);
  }
};
// 3. Get food item by ID
export const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item fetched successfully",
      data: food
    });
  } catch (err) {
    next(err);
  }
};
// 4. Get food items by restaurant ID
export const getFoodsByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const foods = await Food.find({ restaurantId });

    res.status(200).json({
      success: true,
      message: "Restaurant food items fetched successfully",
      data: foods
    });
  } catch (err) {
    next(err);
  }
};
// 5. Update food item details
export const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {restaurantId, title, description, price, isAvailable, image, rating} = req.body;

    const food = await Food.findByIdAndUpdate(
      id,
      {
        restaurantId,
        title,
        description,
        price,
        isAvailable,
        image,
        rating
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      data: food
    });
  } catch (err) {
    next(err);
  }
};
// 6. Delete food item
export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await Food.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};