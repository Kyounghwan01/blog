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
    url: "카카오톡, 페이스북에 링크 넣으면 연결되는 url",
    title: "카카오톡, 페이스북에 링크 넣으면 올라올 타이틀",
    site_name: "사이트이름",
    images: [
      {
        url: "카카오톡, 페이스북에에 링크 넣으면 올라올 이미지",
        width: 285,
        height: 167,
        alt: "이미지"
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

## 카카오톡 미리보기 이슈

### 현상

next에서 카카오톡으로 링크를 공유시 카카오톡에서 제공하는 미리보기가 `DefaultSeo`에 설정한 값만 반영이 되는 문제가 있었습니다.

### 원인

카카오톡 측에 문의한 결과 카톡 미리보기는 meta tag의 og:xxx 값에 의해 미리보기가 활성화 되는데 이 값은 클라이언트 측에서 javascript를 이용하여 바꾸는 값에 대해서는 취급 하지 않고 백엔드에서 가져오는 meta tag에 의해서만 활성화 된다는 답변을 들었습니다.

next 프로젝트에 대입을 해보면 pages의 `<NextSeo />`는 클라이언트측 코드가 되는 것이고 이것에 의해 바뀌는 og 값들은 카톡 미리보기에 반영되지 않는다는 뜻이기도 합니다.

### 해결

`<DefaultSeo />`는 반영이 되기 때문에 `_app.jsx`는 카톡에서 말하는 백엔드 meta tag라고 생각을 하였고 클라이언트 페이지에서 `_app.jsx`로 meta tag에 관련된 정보를 넘긴 후 넘어온 값이 있다면 `<NextSeo />`를 사용하고 넘어오는 값이 없다면 `<DefaultSeo />`를 사용하는 방법으로 해결하였습니다.

위 방식대로 바꾸어도 반영이 되지 않는 경우가 있는데 이때는 카카오톡에 캐시가 남아있을 확률이 높습니다. 이 경우 [카카오톡 미리보기 캐시 삭제](https://developers.kakao.com/tool/clear/og) 여기로 들어가셔서 해당 url 캐시 삭제 하시면 됩니다.

### 카카오톡 문의 링크

- https://devtalk.kakao.com/t/url-url-meta/122803

<TagLinks />

<Comment />
