import { Router } from "express";
import OrderController from "./Order.Controller";
import isAuth from "../middlewares/isAuth";

const orderRoutes = Router();

orderRoutes.post("/place", isAuth, OrderController.placeOrder);
orderRoutes.get("/get/:id", isAuth, OrderController.getOrderData);
export default orderRoutes;
