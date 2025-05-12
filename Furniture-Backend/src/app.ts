import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { limiter } from "./middlewares/rateLimiter";
import healthRoutes from "./routes/v1/health";
import authRoutes from "./routes/v1/auth";

export const app = express();

app.use(morgan("dev")); // this logs all requests to the console
app.use(express.urlencoded({ extended: true })); // this parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.json()); // this parses incoming requests with JSON payloads and is based on body-parser
app.use(cors()); // this enables CORS for all requests
app.use(helmet()); // this adds security headers to the response
app.use(compression()); // this compresses the response body for all requests
app.use(limiter); // this limits the number of requests to the server

app.use("/api/v1", healthRoutes);
app.use("/api/v1", authRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({ message: error.message });
});
