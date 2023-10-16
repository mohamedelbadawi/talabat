import { Request, Response } from "express";
import AuthRequest from "../middlewares/Interfaces/AuthInterface";
import { cartRepository } from "../repositories/Cart/CartRepository";
import { cartServices } from "./Cart.services";
export class CartController {
  public static async addToCart(req: AuthRequest, res: Response) {
    try {
      const { id, qty } = req.body;
      const userId = req.userId as string;
      const cartId = await cartServices.initializeCart(userId);

      await cartServices.addMeal(cartId, id, qty);

      await cartServices.updateCartWithTotalPrice(cartId);
      const cart = await cartServices.getCart(cartId);
      return res.json({ message: "meal added successfully", data: cart });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "server internal error" });
    }
  }
  public static async getCart(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId as string;
      const cartId = await cartServices.initializeCart(userId);
      const cart = await cartServices.getCart(cartId);
      return res.json({ data: cart });
    } catch (error) {
      return res.status(400).json({ error: "server internal error" });
    }
  }
  public static async deleteItemFromCart(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const cartItem = await cartServices.deleteItem(id);
      await cartServices.updateCartWithTotalPrice(cartItem.cartId);
      return res.json({ message: "item deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: "server internal error" });
    }
  }
}
export default CartController;
