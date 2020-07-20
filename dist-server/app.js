"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _jsonGraphqlServer = _interopRequireDefault(require("json-graphql-server"));

var _cors = _interopRequireDefault(require("cors"));

var _fs = _interopRequireDefault(require("fs"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const data = require("./result.js");
let rawdata = _fs.default.readFileSync(_path.default.join(__dirname, "../public/json/result.json"));

let JSONobject = JSON.parse(rawdata);
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _cookieParser.default)());
app.use(_express.default.static(_path.default.join(__dirname, "../public")));
app.use("/graphql", (0, _jsonGraphqlServer.default)(JSONobject));
app.use("/", _index.default);
app.use("/users", _users.default);
var _default = app;
exports.default = _default;