import { NextFunction, Response } from "express";
import AuthRequest from "./Interfaces/AuthInterface";

export async function isAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.role === "Admin") {
    next();
  } else {
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });
  }
}
