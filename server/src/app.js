import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import passport from "passport";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
const limit = "16kb";
app.use(express.json({ limit: limit }));
app.use(express.urlencoded({ extended: true, limit: limit }));
app.use(express.static("public"));
app.use(morgan('start'));
app.use(cookieParser());

import userRouts from "./routes/user.routes.js"

app.use("/api/v1/users",userRouts)


import courseRouts from "./routes/course.routes.js"

app.use("/api/v1/course",courseRouts)


import TypingtestRouts from "./routes/Test.routs.js"
import passport, { Passport } from "passport";

app.use("/api/v1/typingtest",TypingtestRouts)


export default app