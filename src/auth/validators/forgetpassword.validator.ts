import { body } from "express-validator";
import validator from "../../middlewares/validator";

const forgetPasswordValidator = [
  body("email").notEmpty().withMessage("Email is required"),
  validator.validate,
];

export default forgetPasswordValidator;
