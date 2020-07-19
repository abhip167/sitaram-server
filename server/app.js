import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import jsonGraphqlExpress from "json-graphql-server";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import data from "./result";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/graphql", jsonGraphqlExpress(data));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
