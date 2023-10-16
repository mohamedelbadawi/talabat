import { Prisma, PrismaClient } from "@prisma/client";
import { orderRepository } from "../repositories/Order/OrderRepository";
import { mealRepository } from "../repositories/Meal/MealRepository";
import { cartRepository } from "../repositories/Cart/CartRepository";
import orderConfirmation from "../utils/email/templates/orderInformation";
import orderData from "./types/orderData";
import { emailService } from "../utils/email/SendEmail";
import EmailOptions from "../utils/email/EmailOptions";

export class OrderServices {
  async createOrder(
    orderData: Prisma.OrderUncheckedCreateInput,
    cartId: string
  ) {
    // create order
    const order = await orderRepository.create(orderData);
    // create order meals
    // first get cart items
    const cartItems = await cartRepository.getCartItems(cartId);

    cartItems.forEach(async (item: any) => {
      await orderRepository.createOrderMeal({
        orderId: order.id,
        mealId: item.mealId,
        quantity: item.quantity,
      });
    });

    return order.id;
  }
  public async getOrderData(orderId: string) {
    const order = await orderRepository.getOne(
      {
        id: orderId,
      },
      {
        user: {
          select: {
            email: true,
          },
        },
        id: true,
        createdAt: true,
        phoneNumber: true,
        notes: true,
        totalPrice: true,
        OrdersMeals: {
          select: {
            meal: {
              select: {
                name: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
        location: true,
      }
    );
    return order;
  }

  public async sendOrderInfoEmail(orderData: orderData) {
    const mailOptions: EmailOptions = {
      from: "team@talabat.com",
      to: orderData.user.email as string,
      subject: "your order is in processing",
      html: orderConfirmation(orderData) || undefined,
    };
    await emailService.send(mailOptions);
    return true;
  }
}
export const orderServices = new OrderServices();
