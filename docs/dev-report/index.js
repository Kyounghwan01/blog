const fs = require("fs");
const dirName = "dev-report";

const lists = [""];
fs.readdir(`./docs/${dirName}`, function(error, fileList) {
  for (let list of fileList) {
    if (list.indexOf(".") === -1) {
      lists.push(`${list}/`);
    }
  }
});

module.exports = {
  [`/${dirName}/`]: lists
};
