const fs = require("fs");
const dirName = "error-report";

const listsNesting = [""];
const nesting = [];
const once = [];

function getFiles(dir) {
  const all = fs.readdirSync(dir);
  const filtersDir = all.filter(
    file => file.indexOf(".") === -1 || file.indexOf(".md") !== -1
  );

  return filtersDir.map(file => {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      return getFiles(`${dir}/${file}`);
    } else {
      if (dir.split("/").length === process.env.NODE_ENV ? 4 : 3) {
        once.push(`${dir.slice(process.env.NODE_ENV ? 6 : 1)}/`);
      } else if (dir.split("/").length === process.env.NODE_ENV ? 5 : 4) {
        let check = false;
        nesting.map(el => {
          if (el.title === dir.split("/")[dir.split("/").length - 2]) {
            check = true;
            el.children.push(`${dir.slice(process.env.NODE_ENV ? 6 : 1)}/`);
          }
        });
        if (!check) {
          nesting.push({
            collapsable: true,
            title: dir.split("/")[dir.split("/").length - 2],
            children: [`${dir.slice(process.env.NODE_ENV ? 6 : 1)}/`]
          });
        }
      }
    }
  });
}

const filePath = process.env.NODE_ENV ? `./docs/${dirName}` : `./${dirName}`;

getFiles(filePath);
const res = listsNesting.concat(nesting).concat(once);
module.exports = {
  [`/${dirName}/`]: res
};
