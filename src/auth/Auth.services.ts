import { userRepository } from "./../repositories/UserRepository";
import { Prisma } from "@prisma/client";
import Jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import EmailOptions from "../utils/email/EmailOptions";
import { myQueue } from "../utils/Queue";
import * as fs from "fs";
import resetPasswordEmail from "../utils/email/templates/resetPassword";
import { emailService } from "../utils/email/SendEmail";

export class AuthServices {
  public async createUser(userData: Prisma.UserUncheckedCreateInput) {
    return await userRepository.create(userData);
  }
  public async getUserById(id: string) {
    return await userRepository.getOne({ id: id });
  }
  public async getUserByUsername(username: string) {
    return await userRepository.getOne({ username: username });
  }

  public async getUserByEmail(email: string) {
    return await userRepository.getOne({ email: email });
  }

  public async updateUser(
    id: string,
    updates: Prisma.UserUncheckedUpdateInput
  ) {
    return await userRepository.updateOne(id, updates);
  }
  public async deleteUser(id: string) {
    return await userRepository.deleteOne(id);
  }
  public async generateAccessToken(userId: string) {
    return Jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "24h",
    });
  }
  public async generateResetPasswordToken() {
    return uuidv4();
  }
  public async sendResetPasswordEmail(email: string, token: string,userId:string) {
    const mailOptions: EmailOptions = {
      from: "team@talabat.com",
      to: email,
      subject: "Reset Password",
      html: resetPasswordEmail(token,userId),
    };
    await emailService.send(mailOptions);
    return true;
  }
  public async verifyToken(userToken: string, token: string) {
    return userToken === token;
  }
  public async checkTokenExpire(tokenExpireAt: string) {
    return parseInt(tokenExpireAt) > new Date().getTime();
  }
}

export const authServices = new AuthServices();
