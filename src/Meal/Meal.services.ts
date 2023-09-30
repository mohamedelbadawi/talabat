import { Prisma } from "@prisma/client";
import { mealRepository } from "../repositories/Meal/MealRepository";

export class MealServices {
  async createMeal(mealData: Prisma.MealUncheckedCreateInput) {
    return await mealRepository.create(mealData);
  }

  async updateMeal(id: string, mealData: Prisma.MealUncheckedUpdateInput) {
    return await mealRepository.update(id, mealData);
  }
  async deleteMeal(id: string) {
    return await mealRepository.delete(id);
  }
  async getMealById(id: string) {
    return await mealRepository.getOne({ id: id });
  }
}
export const mealServices = new MealServices();
