import DeliveryPartner from "../models/DeliveryPartner.js";

// 1. Register a delivery partner
export const registerDeliveryPartner = async (req, res, next) => {
  try {
    const {name, email, phone, vehicleNumber, vehicleType, licenseNumber, city, profileImage,} = req.body;

    const partner = await DeliveryPartner.create({
      name,
      email,
      phone,
      vehicleNumber,
      vehicleType,
      licenseNumber,
      city,
      profileImage,
    });

    res.status(201).json({
      success: true,
      message: "Delivery partner registered successfully",
      data: partner,
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get all delivery partners
export const getAllDeliveryPartners = async (req, res, next) => {
  try {
    const partners = await DeliveryPartner.find();

    res.status(200).json({
      success: true,
      message: "Delivery partners fetched successfully",
      data: partners,
    });
  } catch (err) {
    next(err);
  }
};
// 3. Get delivery partner by ID
export const getDeliveryPartnerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const partner = await DeliveryPartner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner fetched successfully",
      data: partner,
    });
  } catch (err) {
    next(err);
  }
};
// 4. Update delivery partner details
export const updateDeliveryPartner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {name, email, phone, vehicleNumber, vehicleType, licenseNumber, city, profileImage,} = req.body;

    const partner = await DeliveryPartner.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        vehicleNumber,
        vehicleType,
        licenseNumber,
        city,
        profileImage,
      },
      { new: true, runValidators: true },
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner updated successfully",
      data: partner,
    });
  } catch (err) {
    next(err);
  }
};
// 5. Update delivery partner availability
export const updateDeliveryAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const partner = await DeliveryPartner.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true },
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner availability updated successfully",
      data: partner,
    });
  } catch (err) {
    next(err);
  }
};
// 6. Update delivery partner location
export const updateDeliveryLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { coordinates } = req.body;

    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2 ||
      !coordinates.every(
        (value) => typeof value === "number" && Number.isFinite(value),
      ) ||
      coordinates[0] < -180 ||
      coordinates[0] > 180 ||
      coordinates[1] < -90 ||
      coordinates[1] > 90
    ) {
      return res.status(400).json({
        success: false,
        message: "Coordinates must be [longitude, latitude]",
      });
    }

    const partner = await DeliveryPartner.findByIdAndUpdate(
      id,
      {
        currentLocation: {
          type: "Point",
          coordinates,
        },
      },
      { new: true, runValidators: true },
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner location updated successfully",
      data: partner,
    });
  } catch (err) {
    next(err);
  }
};
// 7. Delete delivery partner
export const deleteDeliveryPartner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const partner = await DeliveryPartner.findByIdAndDelete(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delivery partner deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
