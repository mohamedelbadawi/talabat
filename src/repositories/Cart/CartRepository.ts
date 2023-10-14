import { Prisma, PrismaClient } from "@prisma/client";

export class CartRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(cartData: Prisma.CartUncheckedCreateInput) {
    return await this.prisma.cart.create({ data: cartData });
  }
  async update(id: string, cartData: Prisma.CartUncheckedUpdateInput) {
    return await this.prisma.cart.update({ where: { id: id }, data: cartData });
  }
  async delete(id: string) {
    return await this.prisma.cart.delete({ where: { id: id } });
  }
  async getOne(where: Prisma.CartWhereUniqueInput) {
    return await this.prisma.cart.findUnique({ where: where });
  }
  async createCartItem(cartItemData: Prisma.CartItemUncheckedCreateInput) {
    return await this.prisma.cartItem.create({ data: cartItemData });
  }
  async getAllCartItems(cartId: string) {
    return await this.prisma.cart.findUnique({
      where: { id: cartId },
      select: {
        items: {
          select: {
            id: true,
            meal: {
              select: {
                name: true,
                id: true,
                description: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
        total: true,
      },
    });
  }
  async getCartItems(cartId: string) {
    return await this.prisma.cartItem.findMany({
      where: { cartId: cartId },
    });
  }
  async deleteCartItem(cartItemId: string) {
    return await this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
  async updateCartItem(
    cartItemId: string,
    itemData: Prisma.CartItemUncheckedUpdateInput
  ) {
    return await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: itemData,
    });
  }
}
export const cartRepository = new CartRepository();
