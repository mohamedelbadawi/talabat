import { check } from "express-validator";
import validator from "../../middlewares/validator";

export const requestRestaurantValidator = [
  check("name").notEmpty(),
  check("location").notEmpty(),
  check("description").notEmpty(),
  validator.validate,
];

export default requestRestaurantValidator;
