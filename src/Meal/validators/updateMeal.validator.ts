import { body } from "express-validator";
import validator from "../../middlewares/validator";

export const updateMealValidator = [
  body("name").optional().notEmpty(),
  body("description").optional().notEmpty(),
  body("price").notEmpty().optional().isNumeric(),

  validator.validate,
];
