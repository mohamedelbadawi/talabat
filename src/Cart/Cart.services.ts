import { Prisma } from "@prisma/client";
import { cartRepository } from "../repositories/Cart/CartRepository";

export class CartServices {
  async initializeCart(userId: string) {
    // check if the cart is already initialized
    const IsCreated = await cartRepository.getOne({ userId: userId });
    if (IsCreated) {
      return IsCreated.id;
    }
    // create a new cart if it doesn't already exist
    const cart = await cartRepository.create({ userId: userId });
    return cart.id;
  }
  async addMeal(cartId: string, mealId: string, quantity: number) {
    // check if the meal is already added
    return await cartRepository.createCartItem({
      cartId,
      mealId,
      quantity,
    });
  }

  async calculateTotal(cartId: string) {
    // get all the cart items
    const items = await cartRepository.getAllCartItems(cartId);

    // calculate the price for each item with quantity
    let total: number = 0;
    items?.items.forEach((item: any) => {
      total += item.quantity * item.meal.price;
    });
    return total;
  }
  async updateCartWithTotalPrice(cartId: string) {
    const total = await cartServices.calculateTotal(cartId);

    return await cartRepository.update(cartId, { total: total });
  }
  async deleteItem(cartItemId: string) {
    return cartRepository.deleteCartItem(cartItemId);
  }
  async updateItem(cartItemId: string, qty: number) {
    return cartRepository.updateCartItem(cartItemId, { quantity: qty });
  }
  async getCart(cartId: string) {
    return await cartRepository.getAllCartItems(cartId);
  }
}
export const cartServices = new CartServices();
