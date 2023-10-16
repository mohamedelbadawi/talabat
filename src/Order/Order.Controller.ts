import { Response } from "express";
import AuthRequest from "../middlewares/Interfaces/AuthInterface";
import { cartRepository } from "../repositories/Cart/CartRepository";
import { orderRepository } from "../repositories/Order/OrderRepository";
import { Decimal } from "@prisma/client/runtime/library";
import { orderServices } from "./Order.services";
import orderData from "./types/orderData";
import { cartServices } from "../Cart/Cart.services";

export class OrderController {
  public static async placeOrder(req: AuthRequest, res: Response) {
    try {
      // create order
      // create order items
      // send email notification
      // clear cart items
      const { phone, notes, location } = req.body;
      const userId = req.userId as string;
      const cart = await cartRepository.getOne({ userId: userId });
      if (!cart) {
        return res.status(404).send({ message: "add meals to cart " });
      }
      const orderId = await orderServices.createOrder(
        {
          userId: userId,
          totalPrice: cart?.total as Decimal,
          notes: notes,
          location: location,
          phoneNumber: phone,
        },
        cart?.id as string
      );
      const order = await orderServices.getOrderData(orderId);
      await orderServices.sendOrderInfoEmail({
        createdAt: order?.createdAt || undefined,
        id: order?.id,
        location: order?.location,
        phoneNumber: order?.phoneNumber,
        user: {
          email: order?.user.email,
        },
        notes: order?.notes || undefined,
        totalPrice: order?.totalPrice || undefined,
        items: order?.OrdersMeals,
      });

      await cartServices.freeCart(cart.id);
      return res.json({
        message: "Order created successfully",
        order: order,
      });
    } catch (error) {
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }

  public static async getOrderData(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const orderData = await orderServices.getOrderData(id);
      return res.json({ orderData: orderData });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Internal Server Error" });
    }
  }
}
export default OrderController;
