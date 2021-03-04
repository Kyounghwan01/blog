---
title: react 웹팩 세팅
meta:
  - name: description
    content: react 웹팩 세팅
  - property: og:title
    content: react 웹팩 세팅
  - property: og:description
    content: react 웹팩 세팅
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/webpack/react-project-setting/
tags: ["webpack"]
---

# react 웹팩 세팅

## webpack.config.js 세팅 예시

- webpack을 처음부터 세팅하였으나, cra (create-react-app)에서 해주는 default 세팅보다 장점을 느끼지 못하여 cra로 세팅하기로 함
- 아래는 처음부터 세팅한 값

```js
// webpack.config.js
const path = require("path"); // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require("html-webpack-plugin"); // index.html 파일을 dist 폴더에 index_bundle.js 파일과 함께 자동으로 생성, 우리는 그냥 시작만 하고싶지 귀찮게 index.html 파일까지 만들고 싶지 않다.!!
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none",
  // moduel export (옛날 방식..)
  entry: "./src/index.js", // 리액트 파일이 시작하는 곳
  output: {
    // bundled compiled 파일
    path: path.join(__dirname, "/dist"), // __dirname : 현재 디렉토리, dist 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
    filename: "index_bundle.js"
  },
  module: {
    // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/, // node module 폴더는 babel 컴파일에서 제외
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /* devMode ? 'style-loader' : */
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader?indentedSyntax"
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html" // 생성한 템플릿 파일
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
```

- `.bablerc`

```js
{
  "presets": ["@babel/env", "@babel/react"]
}

```

## cra 세팅 값의 장점

1. cra을 통해 보일러 플레이트를 사용하면, 전세계가 따르는 하나의 빌드 dependency를 가지게 되므로, 에러 도출시 검색이 편하다
2. 위와 같은 맥락으로 이미 되어있는 세팅을 가지게 되어 webpack, babel, eslint 간의 연결고리를 생각하지 않아도 세팅되어있다
3. 이외에도 커스텀이 있다면 eject를 통해 커스텀 가능하다

## eject

- cra를 통해 가진 보일러 플레이트를 커스텀 하기 위한 방법이다
- cra를 통해 프로젝트를 만들면 `webpack.config.js` 같은 설정 파일이 보이지 않는다. 이때 이 파일을 조작할 필요가 있을 때, `yarn eject` 명령어를 통해 설정파일을 가시회 시킨다

### eject 관련 **주의**

- eject를 실행하면 eject 전 단계로 돌아갈 수 없다
- eject 후에는 모든 설정파일을 개발자가 책임져야한다
- cra의 경우 dependency간 의존성을 하나로 묶어줬으나, eject후 커스텀된다면 하나의 빌드 환경이 아니게되어 다른 패키지간 의존성을 신경써야한다
- 이 주의사항을 다 초월해도 eject를 해야한다면 그전에 `Customize-CRA`를 해보자

### Customize-CRA

- eject하지 않고 cra 설정파일을 커스텀하는 방법 (eject처럼 완전 자유롭지 않음)
- [Customize-CRA](https://github.com/arackaf/customize-cra) 참조

<TagLinks />

<Comment />
