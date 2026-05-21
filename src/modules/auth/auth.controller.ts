import { type NextFunction, type Request, type Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import type { ILoginPayload, ISignupPayload } from "./auth.interface";
import { authService } from "./auth.service";

const signup = async (
  req: Request<{}, {}, ISignupPayload>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.signupService(req.body);

    sendResponse(res, 201, {
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request<{}, {}, ILoginPayload>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.loginService(req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signup,
  login,
};
