import { Prisma } from "@prisma/client";
import { restaurantRepository } from "../repositories/Restaurant/RestaurantRepository";
import AuthRequest from "../middlewares/Interfaces/AuthInterface";
import RestaurantFeatures from "./types/RestuarantFeatures";

export class RestaurantServices {
  // request to be a restaurant
  public async createRestaurant(
    restaurantData: Prisma.RestaurantUncheckedCreateInput
  ) {
    return await restaurantRepository.create(restaurantData);
  }

  public async getRestaurants(restaurantsFeature: RestaurantFeatures) {
    const data = await restaurantRepository.findMany(
      restaurantsFeature.page,
      restaurantsFeature.perPage,
      restaurantsFeature.orderBy,
      restaurantsFeature.order,

      {
        OR: [
          {
            description: {
              contains: restaurantsFeature.searchWord || undefined,
            },
          },
          {
            name: {
              contains: restaurantsFeature.searchWord || undefined,
            },
          },
        ],

        // AND: [
        //   {
        //     status: restaurantsFeature.status || "Active",
        //   },
        // ],
      }
    );
    return data;
  }
  async updateOne(id: string, data: Prisma.RestaurantUncheckedUpdateInput) {
    return await restaurantRepository.update(id, data);
  }
  async findById(id: string) {
    return await restaurantRepository.getOne({ id: id });
  }
  async deleteOne(id: string) {
    return await restaurantRepository.delete(id);
  }
  async getRestaurantMeals(id: string) {
    return await restaurantRepository.getOne(
      { id: id },
      {
        Meal: true,
      }
    );
  }
}
export const restaurantService = new RestaurantServices();
