import { Response } from "express";
import AuthRequest from "../middlewares/Interfaces/AuthInterface";
import { MealServices, mealServices } from "./Meal.services";
import { mealRepository } from "../repositories/Meal/MealRepository";

export class MealController {
  public static async createMeal(req: AuthRequest, res: Response) {
    try {
      const { name, description, price, status, restaurantId } = req.body;
      const userId = req.userId as string;

      const meal = await mealServices.createMeal({
        name,
        description,
        price,
        status,
        restaurantId,
        userId,
      });
      return res.json({
        message: "Meal created successfully",
        data: meal,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }
  public static async updateMeal(req: AuthRequest, res: Response) {
    try {
      const { name, description, price, status } = req.body;
      const { id } = req.params;
      const updatedMeal = await mealServices.updateMeal(id, {
        name,
        description,
        price,
        status,
      });

      return res.json({ message: "Updated successfully", data: updatedMeal });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }

  public static async deleteMeal(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await mealServices.deleteMeal(id);
      return res.json({ message: "meal deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }

  public static async getMeal(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const meal = await mealRepository.getOne({ id: id });
      return res.json({ data: meal });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }
}
export default MealController;
