import { Response } from "express";
import AuthRequest from "../middlewares/Interfaces/AuthInterface";
import { restaurantService } from "./Restaurant.services";
import RestaurantFeatures from "./types/RestuarantFeatures";

class RestaurantController {
  public static async requestRestaurant(req: AuthRequest, res: Response) {
    try {
      const { name, description, location } = req.body;
      const userId = req.userId as string;
      const restaurant = await restaurantService.createRestaurant({
        name,
        description,
        location,
        userId,
      });
      res.status(201).json({
        data: restaurant,
        message: "Your request was successfully,stay tuned",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }
  public static async getAllRestaurants(req: AuthRequest, res: Response) {
    try {
      const { order, orderBy, searchWord, page, perPage } = req.query;

      const data: RestaurantFeatures = {
        page: parseInt(page as string, 10) || undefined,
        perPage: parseInt(perPage as string, 10) || undefined,
        order: order as string,
        searchWord: searchWord as string,
        orderBy: orderBy as string,
      };
      const restaurants = await restaurantService.getRestaurants(data);
      res.status(200).json({
        data: restaurants,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }

  public static async updateRestaurant(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, location, status } = req.body;
      const restaurant = await restaurantService.updateOne(id, {
        name,
        description,
        location,
        status,
      });
      return res.json({ message: "Updated successfully", data: restaurant });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }

  public static async deleteRestaurant(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await restaurantService.deleteOne(id);
      return res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }
  public static async getRestaurantById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.getRestaurantMeals(id);
      return res.json({ data: restaurant });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }

  public static async acceptRestaurantRequest(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const restaurant = await restaurantService.updateOne(id, {
        status: "Active",
      });
      return res.status(200).json({
        message: "Restaurant Accepted successfully",
        data: restaurant,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Internal server Error" });
    }
  }
}
export default RestaurantController;
