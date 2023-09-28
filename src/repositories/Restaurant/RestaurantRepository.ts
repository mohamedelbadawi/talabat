import { Prisma, PrismaClient } from "@prisma/client";

class RestaurantRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ log: ["query"] });
  }

  async create(data: Prisma.RestaurantUncheckedCreateInput) {
    return this.prisma.restaurant.create({
      data,
    });
  }
  async getOne(where: Prisma.RestaurantWhereUniqueInput) {
    return this.prisma.restaurant.findUnique({
      where,
    });
  }
  async update(id: string, data: Prisma.RestaurantUncheckedUpdateInput) {
    return this.prisma.restaurant.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
  public async findMany(
    page: number = 1,
    perPage: number = 10,
    orderBy: string = "id",
    order: string = "asc",
    where: Prisma.RestaurantWhereInput = {}
  ) {
    const skip = (page - 1) * perPage;
    console.log({
      skip: skip,
      perPage: perPage,
      orderBy: orderBy,
      order: order,
      where: where,
    });
    const restaurants = await this.prisma.restaurant.findMany({
      skip: skip,
      take: perPage,
      orderBy: {
        [orderBy]: order,
      },
      where: where,
    });
    const totalRestaurants = await this.countRestaurants(where);
    console.log(restaurants);
    const totalPages = Math.ceil(totalRestaurants / perPage);
    return { restaurants, totalPages };
  }

  public async countRestaurants(where: Prisma.RestaurantWhereInput = {}) {
    return this.prisma.restaurant.count({
      where,
    });
  }
}

export const restaurantRepository = new RestaurantRepository();
