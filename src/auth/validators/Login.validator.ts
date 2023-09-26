import { body } from "express-validator";
import validator from "../../middlewares/validator";

const LoginValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  validator.validate,
];

export default LoginValidator;
