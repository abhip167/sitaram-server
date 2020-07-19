import express from "express";
import cors from "cors";
import jsonGraphqlExpress from "json-graphql-server";
import bodyParser from "body-parser";
import data from "./result";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/graphql", jsonGraphqlExpress(data));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server Running on Port", port));
