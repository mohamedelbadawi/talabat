import { Prisma, PrismaClient } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public async create(userData: Prisma.UserUncheckedCreateInput) {
    return await this.prisma.user.create({
      data: userData,
    });
  }
  public async getOne(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where: where,
    });
  }
  public async updateOne(
    id: string,
    userData: Prisma.UserUncheckedUpdateInput
  ) {
    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  public async deleteOne(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
export const userRepository = new UserRepository();
