import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import jsonGraphqlExpress from "json-graphql-server";
import cors from "cors";
import fs from "fs";
// const data = require("./result.js");

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

let rawdata = fs.readFileSync(
  path.join(__dirname, "../public/json/result.json")
);
let JSONobject = JSON.parse(rawdata);

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/graphql", jsonGraphqlExpress(JSONobject));
app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
