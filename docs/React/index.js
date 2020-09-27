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
      if (dir.split("/").length === 4) {
        once.push(`${dir.slice(6)}/`);
      } else if (dir.split("/").length === 5) {
        let check = false;
        nesting.map(el => {
          if (el.title === dir.split("/")[dir.split("/").length - 3]) {
            check = true;
            el.children.push(`${dir.slice(6)}/`);
          }
        });
        if (!check) {
          nesting.push({
            collapsable: true,
            title: dir.split("/")[dir.split("/").length - 3],
            children: [`${dir.slice(6)}/`]
          });
        }
      }
    }
  });
}
getFiles(`./docs/${dirName}`);
const res = listsNesting.concat(nesting).concat(once);
module.exports = {
  [`/${dirName}/`]: res
};
