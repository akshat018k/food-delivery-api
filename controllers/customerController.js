import Customer from "../models/Customer.js";
import bcrypt from "bcrypt";

// 1. Register a new customer

export const registerCustomer = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, profileImage } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      profileImage,
    });

    const result = customer.toObject();
    delete result.password;

    res.status(201).json({
      success: true,
      message: "Customer created SuccessFully...",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// 2. Login customer

export const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email }).select("+password");

    if (!customer) {
      return res
        .status(401)
        .json({ success: true, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, customer.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: true, message: "Invalid password." });
    }

    const result = customer.toObject();
    delete result.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// 3. Get customer profile

export const getCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer profile fetched successfully.",
      data: customer,
    });
  } catch (err) {
    next(err);
  }
};
// 4. Update customer profile

export const updateCustomerProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, email, phone, address, profileImage } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        address,
        profileImage,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer profile update successfully.",
      data: customer,
    });
  } catch (err) {
    next(err);
  }
};
// 5. Delete customer account

export const deleteCustomerAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer profile delete successfully.",
    });
  } catch (err) {
    next(err);
  }
};
// 6. Export controller functions

export const getAllCustomers = async (req, res, next) => {
  try {
    const customer = await Customer.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Customer fetched successfully.",
      data: customer,
    });
  } catch (err) {
    next(err);
  }
};

// 7. Get Customer By ID

export const getCustomerById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findById(id).select("-password");

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer fetched successfully.",
      data: customer,
    });
  } catch (err) {
    next(err);
  }
};
