const routes = [
  "Tag",
  "Vue",
  "React",
  "Svelte",
  "JS",
  "TS",
  "etc",
  "dev-report"
];

const createSidebar = () => {
  const sidebar = {};
  for (const route of routes) {
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-GK96B5Q500"
      }
    ],
    [
      "script",
      {},
      [
        "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-GK96B5Q500');"
      ]
    ],
    [
      "script",
      {
        "data-ad-client": "ca-pub-6192551181326997",
        async: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      }
    ]
  ],
  title: "기억보다 기록을",
  description: "개발 공부, 에러 해결을 기록하는 기술 블로그입니다!",
  "google-site-verification": "J993cuJJ-yFppfJKY8rMx3SzsN-3ZMBEM4uY7Jj075A",
  themeConfig: {
    nav: [
      { text: "Tag", link: "/Tag/" },
      { text: "React", link: "/React/" },
      { text: "Vue", link: "/Vue/" },
      { text: "Svelte", link: "/Svelte/" },
      { text: "JS", link: "/JS/" },
      { text: "TS", link: "/TS/" },
      { text: "기타", link: "/etc/" },
      // { text: "개발일기", link: "/dev-report/" },
      {
        text: "Info",
        items: [
          // { text: "About", link: "/about/" },
          { text: "Github", link: "https://github.com/Kyounghwan01" },
          {
            text: "블로그 건의하기",
            link: "https://github.com/Kyounghwan01/blog/issues/20"
          }
        ]
      }
    ],
    sidebar: createSidebar(),
    lastUpdated: "최근변경일"
  },
  base: "/blog/",
  plugins: [
    // [
    //   "vuepress-plugin-google-adsense",
    //   {
    //     google_ad_client: "ca-pub-6192551181326997",
    //     enable_page_level_ads: true
    //   }
    // ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-172169202-1" // UA-00000000-0
      }
    ],
    ["@vuepress/back-to-top"],
    ["vuepress-plugin-code-copy"],
    ["sitemap", { hostname: "https://kyounghwan01.github.io/blog/" }],
    ["@vuepress/last-updated"]
  ]
  // markdown: {
  //   lineNumbers: true
  // }
};
