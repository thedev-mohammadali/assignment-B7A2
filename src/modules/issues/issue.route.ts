import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Roles } from "../../types";
import { issueController } from "./issue.controller";

const router: Router = Router();

const { createIssue, deleteIssue, getAllIssues, getSingleIssue, updateIssue } =
  issueController;

router.post("/", auth(Roles.CONTRIBUTOR, Roles.MAINTAINER), createIssue);
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
router.patch("/:id", auth(Roles.CONTRIBUTOR, Roles.MAINTAINER), updateIssue);
router.delete("/:id", auth(Roles.MAINTAINER), deleteIssue);

export const issueRoute = router;
