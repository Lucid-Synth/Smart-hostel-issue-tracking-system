import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();


export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: "STUDENT" | "MANAGEMENT";
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "Server configuration error" });
  }

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as {
      id: number;
      role: "STUDENT" | "MANAGEMENT";
    };

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
