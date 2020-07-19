"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _jsonGraphqlServer = _interopRequireDefault(require("json-graphql-server"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = {
  posts: [{
    id: 1,
    title: "Lorem Ipsum",
    views: 254,
    user_id: 123
  }, {
    id: 2,
    title: "Sic Dolor amet",
    views: 65,
    user_id: 456
  }],
  users: [{
    id: 123,
    name: "John Doe"
  }, {
    id: 456,
    name: "Jane Doe"
  }],
  comments: [{
    id: 987,
    post_id: 1,
    body: "Consectetur adipiscing elit",
    date: new Date("2017-07-03")
  }, {
    id: 995,
    post_id: 1,
    body: "Nam molestie pellentesque dui",
    date: new Date("2017-08-17")
  }]
};
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use("/graphql", (0, _jsonGraphqlServer["default"])(data));
app.use("/", _index["default"]);
app.use("/users", _users["default"]);
var _default = app;
exports["default"] = _default;