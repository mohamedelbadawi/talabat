import { Router } from "express";
import CartController from "./Cart.controller";
import isAuth from "../middlewares/isAuth";

const cartRoutes = Router();

cartRoutes.post("/add", isAuth, CartController.addToCart);
cartRoutes.get("/get", isAuth, CartController.getCart);
cartRoutes.delete("/delete/:id", isAuth, CartController.deleteItemFromCart);
export default cartRoutes;
