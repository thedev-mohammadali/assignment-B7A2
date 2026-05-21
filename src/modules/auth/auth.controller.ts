import { type Request, type Response } from "express";
import type { ILoginPayload, ISignupPayload } from "./auth.interface";
import { authService } from "./auth.service";

const signup = async (req: Request<{}, {}, ISignupPayload>, res: Response) => {
  try {
    const result = await authService.signupService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      "detail" in error
    ) {
      switch (error.code) {
        case "23505":
          return res.status(409).json({
            success: false,
            message: "User already exists with this email",
            errors: error.detail,
          });
        case "23514":
          return res.status(400).json({
            success: false,
            message: "Role can either be contributor or maintainer!",
            errors: error.detail,
          });
        case "23502":
          return res.status(400).json({
            success: false,
            message: "Required field is missing",
            errors: error.detail,
          });
      }
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: "Internal Server Error",
    });
  }
};

const login = async (req: Request<{}, {}, ILoginPayload>, res: Response) => {
  try {
    const result = await authService.loginService(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid Credentials!") {
      return res.status(401).json({
        success: false,
        message: error.message,
        errors: "Invalid email or password",
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: "Internal server error",
    });
  }
};

export const authController = {
  signup,
  login,
};
