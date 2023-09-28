import { check } from "express-validator";
import validator from "../../middlewares/validator";

export const updateRestaurantValidator = [
  check("name").optional().notEmpty(),
  check("location").optional().notEmpty(),
  check("description").optional().notEmpty(),

  validator.validate,
];

export default updateRestaurantValidator;
