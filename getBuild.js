module.exports = function(dirName) {
  const envValue = process.env.NODE_ENV
    ? { "43": 4, "61": 6, "54": 5 }
    : { "43": 3, "61": 1, "54": 4 };

  const fs = require("fs");

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
        if (dir.split("/").length === envValue[43]) {
          once.push(`${dir.slice(envValue[61])}/`);
        } else if (dir.split("/").length === envValue[54]) {
          let check = false;
          nesting.map(el => {
            if (el.title === dir.split("/")[dir.split("/").length - 2]) {
              check = true;
              el.children.push(`${dir.slice(envValue[61])}/`);
            }
          });
          if (!check) {
            nesting.push({
              collapsable: true,
              title: dir.split("/")[dir.split("/").length - 2],
              children: [`${dir.slice(envValue[61])}/`]
            });
          }
        }
      }
    });
  }

  const filePath = process.env.NODE_ENV ? `./docs/${dirName}` : `./${dirName}`;

  getFiles(filePath);
  const res = listsNesting.concat(nesting).concat(once);
  return {
    [`/${dirName}/`]: res
  };
};
