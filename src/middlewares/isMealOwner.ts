import { NextFunction, Response } from "express";
import AuthRequest from "./Interfaces/AuthInterface";
import { mealServices } from "../Meal/Meal.services";

export async function isMealOwner(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  const meal = await mealServices.getMealById(id);
  if (!meal) {
    return res.status(401).json({ message: "invalid meal" });
  }
  if (!(req.userId === meal.userId)) {
    return res.status(401).json({
      message: "you don't have the permission to update this restaurant",
    });
  }
  next();
}

export default isMealOwner;
