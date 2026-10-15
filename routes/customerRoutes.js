import express from "express";
import { CustomValidation } from "express-validator/lib/context-items/custom-validation.js";
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  deleteCustomerAccount,
  getAllCustomers,
  getCustomerById,
} from "../controllers/customerController.js";
import validate from "../validators/validate.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerProfile);
router.put("/", updateCustomerProfile);
router.put("/id", updateCustomerProfile);
router.delete("/:id", deleteCustomerAccount);
router.put("/", deleteCustomerAccount);

export default router;
