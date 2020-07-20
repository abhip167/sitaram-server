"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Converter } from "csvtojson";
// const details = "./DETAIL.csv";
// const summary = "./SUMMARY.csv";
// const fs = fsLib.promises;
// const readFile = util.promisify(fs.readFile);
const writeFile = _util.default.promisify(_fs.default.writeFile);

function CSVToMatrix(csv, delimiter) {
  let matrix = [];
  csv.split("\n").map(l => {
    l.trim() == "" ? 0 : matrix.push(l.trim().split(delimiter).map(v => v.trim()));
  });
  return matrix;
}

function MatrixToJSON(matrix, from, to) {
  let jsonResult = [];
  from = from || 0;
  matrix.map((a, i) => {
    let obj = Object.assign({}, ...matrix[0].map((h, index) => ({
      [h]: matrix[i][index]
    })));
    jsonResult.push(obj);
  });
  return to ? jsonResult.splice(from, to) : jsonResult.splice(from);
} // var details;
// var summary;
// const result = {};


const Convert = async () => {
  try {
    // const summary =
    //   (await readFile(path.join(__dirname, "../public/csv/SUMMARY.csv"))) + ``;
    // const details =
    //   (await readFile(path.join(__dirname, "../public/csv/DETAIL.csv"))) + ``;
    // const summaryMatrix = await CSVToMatrix(summary, ",");
    // const detailsMatrix = await CSVToMatrix(details, ",");
    // const summaryArray = await MatrixToJSON(summaryMatrix, 1);
    // const detailsArray = await MatrixToJSON(detailsMatrix, 1);
    const summaryArray = await (0, _csvtojson.default)().fromFile(_path.default.join(__dirname, "../public/csv/SUMMARY.csv"));
    const detailsArray = await (0, _csvtojson.default)().fromFile(_path.default.join(__dirname, "../public/csv/DETAIL.csv"));
    const result = await {
      summary: summaryArray,
      details: detailsArray
    }; // await writeFile(
    //   path.join(__dirname, "../public/json/test.json"),
    //   JSON.stringify(summaryArray, null, 4)
    // );

    await writeFile(_path.default.join(__dirname, "../public/json/result.json"), JSON.stringify(result, null, 4));
  } catch (error) {
    console.log(error);
  }
};

Convert();