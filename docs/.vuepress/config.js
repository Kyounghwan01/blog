// const routes = ['Vue', '개발일기', 'Job', 'About'];
const routes = ['Vue', 'About', '개발일기'];

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
  base: "/blog/",
  plugins: ['@vuepress/back-to-top'],
  markdown: {
    lineNumbers: true
  }
};
