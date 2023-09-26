import { check } from "express-validator";
import validator from "../../middlewares/validator";

const resetPasswordValidator = [
  check("password").notEmpty().withMessage("password is required"),
  check("id").notEmpty().withMessage("user id is required"),
  validator.validate,
];

export default resetPasswordValidator;
