import { Prisma, PrismaClient } from "@prisma/client";

export class OrderRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(orderData: Prisma.OrderUncheckedCreateInput) {
    return await this.prisma.order.create({ data: orderData });
  }
  async update(id: string, orderData: Prisma.OrderUncheckedUpdateInput) {
    return await this.prisma.order.update({
      where: { id: id },
      data: orderData,
    });
  }
  async delete(id: string) {
    return await this.prisma.order.delete({ where: { id: id } });
  }
  async getOne(
    where: Prisma.OrderWhereUniqueInput,
    select: Prisma.OrderSelect
  ) {
    return await this.prisma.order.findUnique({ where: where, select: select });
  }
  async createOrderMeal(orderMealData: Prisma.OrderMealUncheckedCreateInput) {
    return await this.prisma.orderMeal.create({ data: orderMealData });
  }

  async getOrderMeals(orderId: string) {
    return await this.prisma.orderMeal.findMany({
      where: { orderId: orderId },
      select: {
        quantity: true,
        meal: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    });
  }
}
export const orderRepository = new OrderRepository();
