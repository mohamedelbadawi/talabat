import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import requestRestaurantValidator from "./validators/requestRestaurant.validator";
import RestaurantController from "./Restaurant.controller";
import restaurantOwner from "../middlewares/restaurantOwner";
import updateRestaurantValidator from "./validators/updateRestaurant.validator";

const restaurantRouter = Router();

restaurantRouter.post(
  "/request",
  isAuth,
  requestRestaurantValidator,
  RestaurantController.requestRestaurant
);
restaurantRouter.get("/all", isAuth, RestaurantController.getAllRestaurants);
restaurantRouter.put(
  "/update/:id",
  updateRestaurantValidator,
  isAuth,
  restaurantOwner,
  RestaurantController.updateRestaurant
);
restaurantRouter.delete(
  "/delete/:id",
  isAuth,
  restaurantOwner,

  RestaurantController.deleteRestaurant
);
restaurantRouter.get("/:id", isAuth, RestaurantController.getRestaurantById);

export default restaurantRouter;
