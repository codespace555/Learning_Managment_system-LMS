import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from 'morgan';
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
app.use(morgan('start'));
app.use(cookieParser());

import userRouts from "./routes/user.routes.js"

app.use("/api/v1/users",userRouts)





export default app