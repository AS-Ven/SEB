let fs = require("fs");

function ReadData(file) {
  return JSON.parse(fs.readFileSync(`${(__dirname, "./")}/data/${file}.json`, "utf8"));
}

module.exports = { ReadData }