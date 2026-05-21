import type { Response } from "express";
import type { IResponse } from "../types";

export const sendResponse = <T>(
  res: Response,
  statusCode = 200,
  payload: IResponse<T>,
): void => {
  res.status(statusCode).json(payload);
};
