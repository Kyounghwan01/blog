---
title: 사용하지 않는 css 제거하여 렌더링 성능 높이기
meta:
  - name: description
    content: 사용하지 않는 css 제거하여 렌더링 성능 높이기, react, next, css, postcss, purgecss, 브라우저 렌더링 과정
  - property: og:title
    content: 사용하지 않는 css 제거하여 렌더링 성능 높이기, react, next, css, postcss, purgecss, 브라우저 렌더링 과정
  - property: og:description
    content: 사용하지 않는 css 제거하여 렌더링 성능 높이기, react, next, css, postcss, purgecss, 브라우저 렌더링 과정
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/optimize-performance/delete-unuse-css/
tags: ["react", "optimize-performance"]
---

# 사용하지 않는 css 제거하여 렌더링 성능 높이기

이번 포스팅은 프로젝트 내에서 사용하지 않는 css를 제거하여 css 용량을 줄이고 그에 따라 css 다운로드 속도를 빠르게 하여 렌더링 속도를 높이는 방법에 대해 알아보겠습니다.

## 왜 css 다운로드 속도를 높이면 렌더링 속도가 높아지는가?

결과를 먼저 말씀드리면 html이 다 파싱되어 렌더링하기 위해서는 css, js 자원을 모두 파싱해야 가능하기 때문입니다.

위 결론을 이해하기 위해서는 먼저 브라우저가 렌더링 되는 과정을 알아야 합니다.

맨 처음 브라우저가 실행되면, 프로세싱 단계가 실행되어 html, css, js 순서대로 프론트 자원을 파싱하게 됩니다. html이 파싱되는 도중 css, js가 파싱되기 시작하면 html 파싱은 중지됩니다.(css, js 파싱 도중 html이 변경될 수 있으므로 html 파싱 중지됩니다. 이때 css와 js를 블록 리소스라고 부릅니다. 참고: js는 async, defer 기능을 이용하면 블록 리소스를 회피할 수 있습니다.)

자, 왜 html을 파싱하는 도중 css를 파싱하면 html 파싱이 중지되는지 알아보겠습니다.

브라우저 렌더링 과정을 쭉 나열해보면 왜 위와 같은 현상이 나타는지 이해가 가능합니다.

1. 처음 html을 파싱하여 돔 트리를 만든다.
2. 스타일 정보 파싱하여 css som을 만들고 돔트리와 css som을 합하여 렌더 트리를 완성합니다.
3. 레이아웃 과정(화면의 크기를 하나하나 계산하는 과정)
4. 프린팅
5. 브라우저 렌더링

- 위 과정을 보면 css가 있어야 돔 트리와 css som이 합쳐져서 브라우저 렌더링이 가능하기 때문에 css의 파싱 속도가 브라우저 렌더링 속도에 영향을 미치게 됩니다.
- 자원을 다운로드하는 속도는 네트워크의 영향을 받고 그 부분은 간섭할 수 없으니 우리는 css 다운로드 용량 자체를 줄이는 방향으로 개선합니다.

## 어떻게 용량을 줄이는가?

[purgecss](https://purgecss.com/guides/react.html)를 사용하여 용량을 줄입니다. 아래에서 실습으로 css 용량이 줄여봅시다. 측정 지표는 크롬 개발자 도구의 `Coverage` 탭을 이용합니다.

## 실습

#### 1. 먼저 cra로 프로젝트를 하나 만듭니다

#### 2. `index.css`에 사용 하지 않는 css를 많이 만들어줍니다.

#### 3. `yarn build` 명령어로 프로젝트를 빌드하고 `serve -s build` 명령어로 빌드된 결과물을 실행합니다 (serve가 없다면 `yarn global add serve`)

#### 4. 먼저 최적화가 되지 않은 css 용량을 파악합니다. (개발자 도구 열고 command+shift+p 눌러서 coverage를 실행하면 하단에 탭이 있습니다. 아래 사진 참고하세요)

<center><img style="margin-top:30px" src="~@source/.vuepress/public/image/purgecss-before.png" width="1000" height="300" /></center>

위 사진의 `xxxx.css`가 css 자원인데 저의 경우 142755 byte로 되어있습니다. 다음으로 최적화 진행해보겠습니다.

#### 5. `yarn add -d @craco/craco @fullhuman/postcss-purgecss`, `yarn add -g croco`

#### 6. 프로젝트의 루트 디렉토리(node_modules와 같은 레벨)에 `craco.config.js`를 만들고 아래 코드를 넣습니다.

```js
// craco.config.js
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  style: {
    postcss: {
      plugins: [
        purgecss({
          content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"], // 상황에 맞게 바꾸세요
          variables: true
        })
      ]
    }
  }
};
```

#### 7. `package.json`에 script 부분 start, build 수정합니다.

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build"
  }
}
```

#### 8. 이전과 동일한 방법으로 `yarn build`를 실행하고 성공하면 `serve -s build`를 실행하여 프로젝트를 실행합니다.

<center><img style="margin-top:30px" src="~@source/.vuepress/public/image/purgecss-next.png" width="1000" height="300" /></center>

위 사진으로 볼때 css 용량이 142755 byte에서 2964 byte로 불필요한 css가 제거되고 다운로드 된 것을 볼 수 있습니다.

프로젝트 규모가 크고 오랫동안 유지보수가 되면 쓰지 않는 css가 증가하여 위 방법이 좀 더 효과적으로 렌더링 속도 향상에 기여할 수 있을 것 같습니다. react 뿐만 아니라 vue, next, nuxt도 [공식문서](https://purgecss.com/guides/vue.html)에서 지원하고 있으니 사용하시는 스택에 맞춰서 사용 하시면 좋을 것 같습니다.

<TagLinks />

<Comment />
