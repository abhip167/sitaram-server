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

// const data = {
//   posts: [
//     { id: 1, title: "Lorem Ipsum", views: 254, user_id: 123 },
//     { id: 2, title: "Sic Dolor amet", views: 65, user_id: 456 },
//   ],
//   users: [
//     { id: 123, name: "John Doe" },
//     { id: 456, name: "Jane Doe" },
//   ],
//   comments: [
//     {
//       id: 987,
//       post_id: 1,
//       body: "Consectetur adipiscing elit",
//       date: new Date("2017-07-03"),
//     },
//     {
//       id: 995,
//       post_id: 1,
//       body: "Nam molestie pellentesque dui",
//       date: new Date("2017-08-17"),
//     },
//   ],
// };

let rawdata = fs.readFileSync(path.join(__dirname, "../public/result.json"));
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
