import { Request } from "express";

interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export default AuthRequest;
