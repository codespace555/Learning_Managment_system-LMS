const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const router = require("./routes/user.route/user.route.js");
const dbconnect = require("./config/db.config.js");

const app = express();
dbconnect();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    Credential: true,
  })
);

app.use(cookieParser());

app.use("/ping", (req, res) => {
  res.status(200).send({
    success: true,
    data: "pong",
  });
});

app.use("/api/auth", router);

app.all("*", (req, res) => {
    res.status(400).send({
        success: false,
        data: "OOPS! Page Notb Found",
      });
});

module.exports = app;
