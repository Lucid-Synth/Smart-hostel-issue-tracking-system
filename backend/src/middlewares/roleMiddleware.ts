import type { AuthRequest } from "./authMiddleware.js";
import type { NextFunction, Response } from "express";

export const isStudent = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "STUDENT") {
    return res.status(403).json({ message: "Students only" });
  }
  next();
};

export const isManagement = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "MANAGEMENT") {
    return res.status(403).json({ message: "Management only" });
  }
  next();
};
