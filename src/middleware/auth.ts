import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { issueService } from "../modules/issues/issue.service";
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

      if (roles.length && !roles.includes(decoded.role)) {
        return sendResponse(res, 403, {
          success: false,
          message: "Access Forbidden!",
          errors: "Access is not available for the role",
        });
      }

      if (req.method === "PATCH") {
        const id = Number(req.params.id);
        const issueToUpdate = await issueService.getSingleIssueFromDB(id);
        const reporterId = issueToUpdate.reporter.id;
        if (decoded.role === "contributor" && decoded.id !== reporterId) {
          throw new Error("Access not allowed");
        }
        if (decoded.role === "contributor" && issueToUpdate.status !== "open") {
          throw new Error("Cannot update issue!");
        }
      }

      if (req.method === "DELETE" && decoded.role !== "maintainer")
        throw new Error("Access not allowed");

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};
