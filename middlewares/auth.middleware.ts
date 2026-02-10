import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";
import jwtService from "../services/jwt.service";
import "../types/Express.type";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError("No token provided", 401));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwtService.verifyToken(token);
    req.user = decoded; 
    next();
  } catch (err) {
    return next(new CustomError("Invalid token", 401));
  }
};