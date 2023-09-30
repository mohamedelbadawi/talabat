import { body } from "express-validator";
import { restaurantService } from "../../Restaurant/Restaurant.services";
import validator from "../../middlewares/validator";

export const createMealValidator = [
  body("name").notEmpty(),
  body("description").notEmpty(),
  body("price").notEmpty().isNumeric(),
  body("restaurantId")
    .notEmpty()
    .custom(async (val) => {
      const result = await restaurantService.findById(val);
      if (!result) {
        throw new Error("invalid restaurant");
      }
    }),
  validator.validate,
];
