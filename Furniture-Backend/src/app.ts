import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import { limiter } from "./middlewares/rateLimiter";
import healthRoutes from "./routes/v1/health";
import authRoutes from "./routes/v1/authRoutes";
import usersRoutes from "./routes/v1/admin/userRoutes";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth";

export const app = express();

const whitelist = ["http://example1.com", "http://localhost:5173"];
const corsOptions = {
  origin: function (
    origin: any,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin) return callback(null, true); // allow requests with no origin (like mobile apps or curl requests)
    // allow requests with origin in the whitelist
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow credentials (cookies, authorization headers, etc.)
};

app.use(morgan("dev")); // this logs all requests to the console
app.use(express.urlencoded({ extended: true })); // this parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.json()); // this parses incoming requests with JSON payloads and is based on body-parser
app.use(cookieParser()); // this parses incoming requests with cookies
app.use(cors(corsOptions)); // this enables CORS for all requests
app.use(helmet()); // this adds security headers to the response
app.use(compression()); // this compresses the response body for all requests
app.use(limiter); // this limits the number of requests to the server

app.use("/api/v1", healthRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1/admin", auth, usersRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.code || "Error_Invalid";
  res.status(status).json({ message, error: errorCode });
});
