import { body } from "express-validator";
import validator from "../../middlewares/validator";
import { authServices } from "../Auth.services";

const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (email) => {
      const isUsed = await authServices.getUserByEmail(email);
      if (isUsed) {
        throw new Error("Email is already used");
      }
    }),
  body("password").notEmpty().withMessage("Password is required"),
  validator.validate,
];

export default registerValidator;
