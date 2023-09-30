import { NextFunction, Response } from "express";
import AuthRequest from "./Interfaces/AuthInterface";
import { restaurantService } from "../Restaurant/Restaurant.services";

export async function restaurantOwner(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id || req.body.restaurantId;

  const restaurant = await restaurantService.findById(id);
  if (!restaurant) {
    return res.status(401).json({ message: "invalid restaurant" });
  }
  if (!(req.userId === restaurant.userId)) {
    return res.status(401).json({
      message: "you don't have the permission to update this restaurant",
    });
  }
  next();
}

export default restaurantOwner;
