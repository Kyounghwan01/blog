// const routes = ['Vue', '개발일기', 'Job', 'About'];
const routes = ['Vue', 'About'];

const createSidebar = () => {
  const sidebar = {}
  for (const route of routes) {
    Object.assign(sidebar, require('../' + route))
  }
  return sidebar
};

module.exports = {
  title: "경환's 기술 블로그",
  description: "vuepress 기반 기술 블로그입니다.",
  themeConfig: {
    nav: [
      { text: 'Vue', link:"/Vue/"},
      { text: '개발일기', link:"/개발일기/"},
      { text: 'About', link:"/About/"},
      { text: "Job", link: "/Job/" },
      { text: "Github", link: "https://github.com/Kyounghwan01" },
      {
        text: "project",
        items: [
          { text: "web page", link: "https://www.knowgari.com/" },
          {
            text: "app github",
            link: "https://github.com/Kyounghwan01/mata-dream-app"
          }
        ]
      }
    ],
    sidebar: createSidebar()
  },
  base: "/blog/"
};

// function getSidebarArr() {
//   var fs = require("fs");
//   var docsPath = __dirname + "/../";
//   var sidebarArr = [];
//   var HomeFilelist = [];
//   var filelist = fs.readdirSync(docsPath);
//   filelist.forEach(function(file) {
//     if (file === ".vuepress") return;
//     var stat = fs.lstatSync(docsPath + "/" + file);
//     if (stat.isDirectory()) {
//       // directory
//       // title is file, children is readdirSync
//       var docsFolderPath = docsPath + "/" + file;
//       var list = fs.readdirSync(docsFolderPath);
//       sidebarArr.push(makeSidebarObject(file, list));
//     } else {
//       // NOT directory
//       // title is '/' children is file
//       HomeFilelist.push(file);
//     }
//   });
//   sidebarArr.unshift(makeSidebarObject("", HomeFilelist));
//   return sidebarArr;
// }
// function makeSidebarObject(folder, mdfileList) {
//   var path = folder ? "/" + folder + "/" : "/";
//   mdfileList = aheadOfReadme(mdfileList);
//   var tmpMdfileList = [];
//   // remove .md, add Path
//   mdfileList.forEach(function(mdfile) {
//     if (mdfile.substr(-3) === ".md") {
//       mdfile = mdfile.slice(0, -3) === "README" ? "" : mdfile.slice(0, -3);
//       tmpMdfileList.push(path + mdfile);
//     }
//   });
//   mdfileList = tmpMdfileList;
//   // remove folder prefix number
//   if (folder) {
//     var dotIdx = folder.indexOf(".");
//     var title = Number(folder.substr(0, dotIdx))
//       ? folder.substr(dotIdx + 1)
//       : folder;
//   } else {
//     title = "HOME";
//   }
//   return {
//     title: title,
//     children: mdfileList
//   };
// }
// function aheadOfReadme(arr) {
//   // ['1.test.md','README.md'] => ['README.md','1.test.md']
//   var readmeIdx = arr.indexOf("README.md");
//   if (readmeIdx > 0) {
//     arr.unshift(arr.splice(readmeIdx, 1)[0]);
//   }
//   return arr;
// }
