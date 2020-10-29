const fs = require("fs");
const dirName = "React";

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
      if (dir.split("/").length === process.env.VUE_APP_18) {
        once.push(`${dir.slice(process.env.VUE_APP_19)}/`);
      } else if (dir.split("/").length === process.env.VUE_APP_20) {
        let check = false;
        nesting.map(el => {
          if (el.title === dir.split("/")[dir.split("/").length - 2]) {
            check = true;
            el.children.push(`${dir.slice(process.env.VUE_APP_25)}/`);
          }
        });
        if (!check) {
          nesting.push({
            collapsable: true,
            title: dir.split("/")[dir.split("/").length - 2],
            children: [`${dir.slice(process.env.VUE_APP_25)}/`]
          });
        }
      }
    }
  });
}

const filePath =
  process.env.VUE_APP_VERSION === "production"
    ? `./docs/${dirName}`
    : `./${dirName}`;

getFiles(filePath);
const res = listsNesting.concat(nesting).concat(once);
module.exports = {
  [`/${dirName}/`]: res
};
