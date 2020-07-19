import express from "express";
import cors from "cors";
import jsonGraphqlExpress from "json-graphql-server";
import bodyParser from "body-parser";
import data from "./result";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use("/graphql", jsonGraphqlExpress(data));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});
const port = 3000;
app.listen(process.env.PORT || 3000, () =>
  console.log("Server Running on Port", port)
);
