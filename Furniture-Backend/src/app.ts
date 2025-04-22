import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

export const app = express();

app.use(morgan("dev")); // this logs all requests to the console
app.use(express.urlencoded({ extended: true })); // this parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.json()); // this parses incoming requests with JSON payloads and is based on body-parser
app.use(cors()); // this enables CORS for all requests
