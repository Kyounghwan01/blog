---
title: next.js seo 쉽게 적용하기 (next-seo)
meta:
  - name: description
    content: next.js seo 쉽게 적용하기 (next-seo), react, next, seo, ssr
  - property: og:title
    content: next.js seo 쉽게 적용하기 (next-seo)
  - property: og:description
    content: next.js seo 쉽게 적용하기 (next-seo), react, seo, ssr
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/next/next-seo/
tags: ["react", "next"]
---

# next.js seo 쉽게 적용하기

next의 `Head`를 이용해도 손쉽게 seo를 구현 가능 하지만 `next-seo`를 사용하면 더 손쉽게 seo, open-graph, 트위터 공유에 들어가는 seo 값을 구현할 수 있습니다.

사용방법도 매우 간단합니다. 아래와 같은 방법으로 seo 속성을 추가하려는 페이지에 넣으시면 됩니다. 페이지에 NextSeo가 포함되면 페이지의 Head에 구성한 seo속성을 전달합니다.

`src/pages/xxx` 이곳이 서비스의 가장 첫 지점이기 때문에 pages폴더의 만들어 지는 파일에 NextSeo를 넣어 줍니다.

```jsx
// src/pages/Login/index.jsx
import { NextSeo } from 'next-seo';

const Index = () => {
  return (
    <NextSeo
				title=""
				description=""
				openGraph={{
					type: 'website',
					url: '',
					title: '',
					description: '',
					images: [
						{
							url: '',
							width: 800,
							height: 400,
						},
					],
				}}
			/>
      <div>example</div>
  )
}
```

만약 같은 seo 값을 쓴다면 `_app.tsx`에 `DefaultSeo`를 설정할 수 있습니다.

```jsx
// _app.jsx
import { DefaultSeo } from "next-seo";

const DEFAULT_SEO = {
  title: "meta head title에 들어가는 값",
  description: "meta head description에 들어가는 값",
  canonical: "https://www.carrotins.com",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "카카오톡, 페이스북에 링크 넣으면 연결되 url",
    title: "카카오톡, 페이스북에 링크 넣으면 올라올 타이틀",
    site_name: "사이트이름",
    images: [
      {
        url: "카카오톡, 페이스북에에 링크 넣으면 올라올 이미지",
        width: 285,
        height: 167,
        alt: "캐롯손해보험"
      }
    ]
  }
  twitter: {
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
  },
};

const App = () => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <div>Next-seo</div>
    </>
  );
};

export default App;
```

이것 이외에도 다양한 기능을 지원하고 있으니 [next-seo](https://github.com/garmeeh/next-seo)에 방문 하시기를 권유드립니다!

<TagLinks />

<Comment />
