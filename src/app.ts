import express, { type Application } from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.use(globalErrorHandler);

export default app;
