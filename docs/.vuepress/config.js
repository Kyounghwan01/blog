const routes = ["Vue", "React" ,"JS", "TS", "기타", "About", "개발일기"];

const createSidebar = () => {
  const sidebar = {};
  for (const route of routes) {
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  title: "기억보다 기록을",
  description: "vuepress 기반 기술 블로그입니다.",
  "google-site-verification": "J993cuJJ-yFppfJKY8rMx3SzsN-3ZMBEM4uY7Jj075A",
  themeConfig: {
    nav: [
      { text: "Vue", link: "/Vue/" },
      { text: "React", link: "/React/" },
      { text: "JS", link: "/JS/" },
      { text: "TS", link: "/TS/" },
      { text: "기타", link: "/기타/" },
      { text: "개발일기", link: "/개발일기/" },
      { text: "About", link: "/About/" },
      { text: "Job", link: "/Job/" },
      { text: "Github", link: "https://github.com/Kyounghwan01" },
      {
        text: "project",
        items: [
          { text: "It's my seat - web", link: "https://www.knowgari.com/" },
          {
            text: "마타드림 앱 깃헙 주소",
            link: "https://github.com/Kyounghwan01/mata-dream-app"
          },
          {
            text: "매출분석 - web(vue + aws-lambda)",
            link: "https://sales-statistics.netlify.com/"
          }
        ]
      }
    ],
    sidebar: createSidebar()
  },
  base: "/blog/",
  plugins: ["@vuepress/back-to-top"]
  // markdown: {
  //   lineNumbers: true
  // }
};
