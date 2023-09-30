import { Prisma, PrismaClient } from "@prisma/client";

export class MealRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(mealData: Prisma.MealUncheckedCreateInput) {
    return await this.prisma.meal.create({ data: mealData });
  }
  async update(id: string, mealData: Prisma.MealUncheckedUpdateInput) {
    return await this.prisma.meal.update({ where: { id: id }, data: mealData });
  }
  async delete(id: string) {
    return await this.prisma.meal.delete({ where: { id } });
  }
  async getOne(where: Prisma.MealWhereUniqueInput) {
    return await this.prisma.meal.findUnique({ where: where });
  }
}

export const mealRepository = new MealRepository();
