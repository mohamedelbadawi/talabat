import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import restaurantOwner from "../middlewares/restaurantOwner";
import MealController from "./Meal.controller";
import { createMealValidator } from "./validators/createMeal.validator";
import { updateMealValidator } from "./validators/updateMeal.validator";
import isMealOwner from "../middlewares/isMealOwner";

const mealRoutes = Router();

mealRoutes.post(
  "/create",
  isAuth,
  createMealValidator,
  restaurantOwner,
  MealController.createMeal
);
mealRoutes.put(
  "/update/:id",
  isAuth,
  updateMealValidator,
  isMealOwner,
  MealController.updateMeal
);
mealRoutes.delete(
  "/delete/:id",
  isAuth,
  isMealOwner,
  MealController.deleteMeal
);
export default mealRoutes;
