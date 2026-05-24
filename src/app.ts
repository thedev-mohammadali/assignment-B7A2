import cors from "cors";
import express, { type Application } from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issue.route";
import { sendResponse } from "./utils/sendResponse";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  sendResponse(res, 200, {
    success: true,
    message: "Welcome to DevPulse",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/issues", issueRoute);

app.use(globalErrorHandler);

export default app;
