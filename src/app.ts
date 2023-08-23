import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandlers";
import { AppRoutes } from "./routes/routes";

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Route
app.use("/api/v1/", AppRoutes);

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("🐂🐐 Welcome to Digital Cow Hut Backend 🐂🐐");
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found API Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found!",
    errorMessages: [{ path: req.originalUrl, message: "API Not Found!" }],
  });
  next();
}); 

export default app;
