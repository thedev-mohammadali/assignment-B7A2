import { type Request, type Response } from "express";
import { Roles } from "../../types";
import type { ISignupPayload } from "./auth.interface";
import { authService } from "./auth.service";

const signup = async (req: Request<{}, {}, ISignupPayload>, res: Response) => {
  try {
    const { email, name, password, role } = req.body;

    if (!email || !name || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Password, role are required!",
      });
    }

    if (role !== Roles.CONTRIBUTOR && role !== Roles.MAINTAINER) {
      return res.status(400).json({
        success: false,
        message: "Role must be either contributor or maintainer",
      });
    }

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
      error.code === "23505"
    ) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
        errors: error,
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        errors: error,
      });
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errors: error,
    });
  }
};

export const authController = {
  signup,
};
