import { Request, Response } from "express";
import { authServices } from "./Auth.services";
import * as argon from "argon2";
import { generateFromEmail } from "unique-username-generator";
import { Jwt } from "jsonwebtoken";
import date from "date-and-time";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await argon.hash(password);
      const username = generateFromEmail(email, 4);
      const user = await authServices.createUser({
        name,
        email,
        username,
        password: hashedPassword,
      });
      const token = await authServices.generateAccessToken(user.id, user.role);

      return res.json({ AccessToken: token });
    } catch (error) {
      return res.status(400).json({ error: "Internal server Error" });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await authServices.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const isMatch = await argon.verify(user.password, password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = await authServices.generateAccessToken(user.id, user.role);
      return res.json({ accessToken: token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server Error" });
    }
  }

  static async forgetPassword(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const user = await authServices.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = await authServices.generateResetPasswordToken();
      await authServices.sendResetPasswordEmail(email, token, user.id);
      await authServices.updateUser(user.id, {
        passwordToken: token,
        tokenExpireAt: (new Date().getTime() + 600000).toString(),
      });
      return res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server Error" });
    }
  }
  static async verifyToken(req: Request, res: Response) {
    try {
      const token = req.query.token;
      const id = req.query.id;
      const user = await authServices.getUserById(id as string);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const isMatch = await authServices.verifyToken(
        user?.passwordToken as string,
        token as string
      );
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid token" });
      }
      // check token expired
      if (
        !(await authServices.checkTokenExpire(user.tokenExpireAt as string))
      ) {
        return res
          .status(400)
          .json({ error: "token expired please request a new one" });
      }
      // update token verified to true
      await authServices.updateUser(user.id, {
        tokenVerfied: true,
      });

      return res.status(200).json({ message: "token verified", id: user.id });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server Error" });
    }
  }
  static async resetPassword(req: Request, res: Response) {
    try {
      const { password, id } = req.body;
      const user = await authServices.getUserById(id);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      if (user.tokenVerfied) {
        const hashedPassword = await argon.hash(password);
        await authServices.updateUser(user.id, {
          password: hashedPassword,
          tokenVerfied: false,
          passwordToken: null,
          tokenExpireAt: null,
        });
        return res.status(200).json({ message: "password reset successfully" });
      }
      return res.status(401).json({ error: "your token is not verified" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Internal server Error" });
    }
  }
}
