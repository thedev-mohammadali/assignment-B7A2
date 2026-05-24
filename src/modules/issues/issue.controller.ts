import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import type { IIssuePayload, IIssueQuery } from "./issue.interface";
import { issueService } from "./issue.service";

const {
  createIssueIntoDB,
  deleteIssueFromDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
} = issueService;

const createIssue = async (
  req: Request<{}, {}, IIssuePayload>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reporterId = req.user?.id;

    if (!reporterId) {
      throw new Error("User information is missing");
    }

    const result = await createIssueIntoDB(req.body, reporterId);

    sendResponse(res, 201, {
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllIssues = async (
  req: Request<{}, {}, {}, IIssueQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllIssuesFromDB(req.query);
    sendResponse(res, 200, {
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleIssue = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const result = await getSingleIssueFromDB(id);
    sendResponse(res, 200, {
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (
  req: Request<{ id: string }, {}, Partial<IIssuePayload>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const result = await updateIssueIntoDB(req.body, id);
    sendResponse(res, 200, {
      success: true,
      message: "Issue updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    await deleteIssueFromDB(id);
    sendResponse(res, 200, {
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
