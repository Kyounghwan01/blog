const routes = ["Tag", "Vue", "React", "JS", "TS", "etc", "dev-report"];

const createSidebar = () => {
  const sidebar = {};
  for (const route of routes) {
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  title: "기억보다 기록을",
  description: "개발 공부, 에러 해결을 기록하는 기술 블로그입니다!",
  "google-site-verification": "J993cuJJ-yFppfJKY8rMx3SzsN-3ZMBEM4uY7Jj075A",
  themeConfig: {
    nav: [
      { text: "Tag", link: "/tag/" },
      { text: "React", link: "/React/" },
      { text: "Vue", link: "/Vue/" },
      { text: "JS", link: "/JS/" },
      { text: "TS", link: "/TS/" },
      { text: "기타", link: "/etc/" },
      { text: "개발일기", link: "/dev-report/" },
      {
        text: "Info",
        items: [
          { text: "About", link: "/about/" },
          { text: "Github", link: "https://github.com/Kyounghwan01" },
          {
            text: "블로그 건의하기",
            link: "https://github.com/Kyounghwan01/blog/issues/20"
          },
          {
            text: "toy-project",
            items: [
              {
                text: "매출분석 (vue + aws-lambda)",
                link: "https://sales-statistics.netlify.com/"
              },
              {
                text: "롤전적조회 (react)",
                link: "https://khgg.netlify.app/"
              }
            ]
          }
          // { text: "It's my seat - web", link: "https://www.knowgari.com/" }
        ]
      }
    ],
    sidebar: createSidebar()
  },
  base: "/blog/",
  plugins: [
    [
      "vuepress-plugin-google-adsense",
      {
        google_ad_client: "ca-pub-5384867576714820", // ca-pub-0000000000000000
        enable_page_level_ads: true
      }
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-172169202-1" // UA-00000000-0
      }
    ],
    ["@vuepress/back-to-top"],
    ["sitemap", { hostname: "https://kyounghwan01.github.io/blog/" }],
    ["@vuepress/last-updated"]
  ]
  // markdown: {
  //   lineNumbers: true
  // }
};
