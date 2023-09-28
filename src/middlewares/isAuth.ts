import { NextFunction, Response } from "express";
import Jwt from "jsonwebtoken";
import AuthRequest from "./Interfaces/AuthInterface";

export async function isAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // get the token
  // check if the token is valid
  // add UserId to the request
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "You don't have permission to enter this route" });
  }
  const decodedToken = Jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.userId = (decodedToken as any).userId;
      req.role = (decodedToken as any).role;
      next();
    }
  );
}
export default isAuth;
