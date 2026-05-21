import type { NextFunction, Request, Response } from "express";

const createIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
const getSingleIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
const updateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
const deleteIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
