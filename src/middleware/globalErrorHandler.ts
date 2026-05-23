import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { sendResponse } from "../utils/sendResponse";

export const globalErrorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Handle Signup Errors
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "detail" in error
  ) {
    switch (error.code) {
      case "23505":
        return sendResponse(res, 409, {
          success: false,
          message: "User already exists with this email",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "Duplicate email!",
        });
      case "23514":
        return sendResponse(res, 400, {
          success: false,
          message: "Constraint did not match",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "Check constraints failed!",
        });
      case "23502":
        return sendResponse(res, 400, {
          success: false,
          message: "Required field is missing",
          errors:
            typeof error.detail === "string"
              ? error.detail
              : "Not null constraint failed",
        });
    }
  }
  //Handle Login Errors
  if (error instanceof Error) {
    switch (error.message) {
      case "Invalid Credentials!":
        return sendResponse(res, 401, {
          success: false,
          message: error.message,
          errors: "Invalid email or password",
        });

      case "User information is missing":
        return sendResponse(res, 401, {
          success: false,
          message: "Unauthorized access",
          errors: "User information is missing",
        });

      case "Access not allowed":
        return sendResponse(res, 403, {
          success: false,
          message: error.message,
          errors: "User is not allowed to do the operation",
        });

      case "No issues found":
        return sendResponse(res, 404, {
          success: false,
          message: error.message,
          errors: "The id didn't match any issue id",
        });

      case "No data provided for update!":
        return sendResponse(res, 400, {
          success: false,
          message: error.message,
          errors: "At least one field is needed to update",
        });

      case "Cannot update issue!":
        return sendResponse(res, 400, {
          success: false,
          message: error.message,
          errors: "Issue status is not open",
        });
    }
  }

  return sendResponse(res, 500, {
    success: false,
    message: "Something went wrong",
    errors: error instanceof Error ? error.message : "Internal server error!",
  });
};
