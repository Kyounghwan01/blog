// const routes = ['Vue', '개발일기', 'Job', 'About'];
const routes = ['Vue', 'JS', 'TS', 'About', '개발일기'];

const createSidebar = () => {
  const sidebar = {}
  for (const route of routes) {
    Object.assign(sidebar, require('../' + route))
  }
  return sidebar
};

module.exports = {
  title: "기억보다 기록을",
  description: "vuepress 기반 기술 블로그입니다.",
  themeConfig: {
    nav: [
      { text: 'Vue', link:"/Vue/"},
      { text: 'JS', link:"/JS/"},
      { text: 'TS', link:"/TS/"},
      { text: '개발일기', link:"/개발일기/"},
      { text: 'About', link:"/About/"},
      { text: "Job", link: "/Job/" },
      { text: "Github", link: "https://github.com/Kyounghwan01" },
      {
        text: "project",
        items: [
          { text: "It's my seat - web", link: "https://www.knowgari.com/" },
          {
            text: "마타드림 앱 깃헙 주소",
            link: "https://github.com/Kyounghwan01/mata-dream-app"
          }
        ]
      }
    ],
    sidebar: createSidebar()
  },
  base: "/blog/",
  plugins: ['@vuepress/back-to-top'],
  // markdown: {
  //   lineNumbers: true
  // }
};
