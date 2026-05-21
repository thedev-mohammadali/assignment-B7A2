import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import type { IJwtPayload, Role } from "../types";
import { sendResponse } from "../utils/sendResponse";

export const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return sendResponse(res, 401, {
          success: false,
          message: "Unauthorized access",
          errors: "User is not authorized",
        });
      }

      const decoded = jwt.verify(token, config.secret) as IJwtPayload;

      if (!roles.includes(decoded.role)) {
        return sendResponse(res, 403, {
          success: false,
          message: "Access Frobidden!",
          errors: "Access is not available for the role",
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
