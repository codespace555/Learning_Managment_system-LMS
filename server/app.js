import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
const limit = "1mb";
app.use(express.json({ limit: limit }));
app.use(express.urlencoded({ extended: true, limit: limit }));
app.use(express.static("public"));
app.use(cookieParser());

export default app