---
title: webpack 내용 정리
meta:
  - name: description
    content: webpack 내용 정리
  - property: og:title
    content: webpack 내용 정리
  - property: og:description
    content: webpack 내용 정리
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/webpack/webpack/
tags: ["webpack"]
---

# webpack 내용 정리

## 웹팩이란?

- 웹팩은 모듈 번들러(**웹 앱을 구성하는 자원(html, css, js, img 등)을 각 모듈로 보고 이를 조합하여 하나의 패키지로 만드는 도구**)입니다.
- 모듈, 모듈 번들링을 알아야 웹팩을 안다고 할 수 있습니다.
- lazy loading, code splitting을 통해 효율적으로 파일을 찢어 최적화 할 수 있다.

## 웹팩 등장 이유

### 파일 단위 js 모듈 관리 필요

- 자바스크립트는 전역 스코프를 사용하게 되면 변수가 오염된다.

```js
// app.js
var num = 10;
const getNum = () => console.log(num);
```

```js
// main.js
var num = 20;
const getNum = () => console.log(num);
```

```html
<html>
  <body>
    <script src="./app.js"></script>
    <script src="./main.js"></script>
    <script>
      getNum(); // app.js의 num이라는 변수가 main.js에도 쓰여 변수가 오염되고 20이 출력된다
    </script>
  </body>
</html>
```

- 위 예시처럼 파일 단위로 js가 분리 되지 않게 됨
- name-space 방식으로 해결

```js
var app = {
  num: 10
};
var main = {
  num: 20
};
```

- 또는 requirejs 같은 라이브러리로 해결
- es6의 [modules](https://kyounghwan01.github.io/blog/JS/JSbasic/module/) 문법, 웹팩 모듈 번들링으로 해결

### 웹 개발 작업 자동화 도구 (web task manager)

- 웹에서 가장 많이 하는 것 vscode 같이 편집기에서 코드 수정하고 저장하고 웹에서 확인 및 새로고침 하는 것
- html,css,js 압축, 이미지 압축, scss->css 전처리 변환
- 이런 자동화 해주는 일을 웹팩이 해준다.

### 웹 앱의 빠른 로딩속도, 높은 성능

- 브라우저에서 서버로 request 파일 숫자를 줄여 로딩 속도를 줄이거나
- 웹 테스트 매니저로 파일을 압축 병합
- 초기 로딩 속도 높이기 위해 나중에 필요한 데이터를 요청하는 lazy loading 있다
- 웹팩은 기본적으로 필요한 자원은 미리 로딩이 아닌 그때 그때 요청하는 철학을 가지고 있음

### Dynamic loading & laze loading & 트리 쉐이킹

- `laze loading`: code splitting 기능으로 모듈을 원하는 타이밍에 로딩한다.
- `트리 쉐이킹`: 사용하지 않는 라이브러리를 떨궈낸다

## 모듈

- 특정 기능을 가진 코드 단위
- 모듈을 합쳐 다른 모듈을 만들 수 있으며, 모듈을 다른 모듈에 활용 할 수 있다.
- 웹팩에서 모듈은 js에 국한하지 않고 html,css, image 등 모든 파일을 모듈이라고 본다

## 모듈 번들링

- 웹서비스를 구성하는 js, sass, png, jpg 등등 다양한 파일들의 연관관계를 파악해서 -> 웹팩이 하나의 js, css, png로 만들도록 번들링 한다
- 필요에 의해 css 파일로 분할, jpg, png 이미지 압축, 최적화 기능도 한다
  > 빌드, 번들링, 변환 모두 같은 의미입니다.

## 웹팩 적용

- `npm install webpack webpack-cli` 설치

```html
<html>
  <body>
    <script src="./dist/main.js"></script>
  </body>
</html>
```

```js
//index.js
import _ from 'lodash'
...

```

```json
{
  "script": {
    "build": "webpack"
  }
}
```

- 위 처럼 수정 후 `npm run build` 실행시 dist 파일에 `main.js` 가 생기면 기본적인 웹팩 적용 완료

### 웹팩 mode 적용

- 버전 3에서 없다가 버전 4에서 추가된 것
- `development`, `production`, `none`으로 구성됨
- 기본적으로 `none`로 생성
- mode를 적용하지 않으면 `dist/main.js`가 가독성 없게 생성되나 mode 적용시 인덴팅된 상태로 바뀐다

```json
{
  "script": {
    "build": "webpack --mode=none"
  }
}
```

### webpack.config.js 추가

- 만약 웹팩 빌드된 파일을 다른 것으로 바꾸고 싶다면

```json
{
  "script": {
    "build": "webpack --mode=none --entry=src/index.js --output=./public/output.js"
  }
}
```

- `package.json`의 `script`중 `build` 가 위 처럼 한줄로 길게 만들어진다.
- 이러한 상황을 관리하기 좋게 하기 위해 `webpack.config.js`를 사용한다.
- 프로젝트 루트 레벨에 `webpack.config.js` 생성
- 웹팩의 module의 rules use는 오른쪽에서 왼쪽으로 읽으며 각각 순서에 따라 에러를 뿜을 수 있다.

- 플러그인: 빌드된 결과물을 바꾸는데 사용됨

```js
// webpack.config.js

var path = require("path");

module.exports = {
  mode: "none",
  entey: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader, sass-loader']
      // 오른쪽에서 왼쪽 순서로 적용됨
      // sass를 css로 바꾸고 css를 웹팩안으로 넣고, 웹팩안에 있는 css를 인라인으로 바꾸어 작동하도록 한다.
      // 순서 바뀌면 빌드 안됨
      use: [
        {loader: MiniCssExtractPlugin.loader},
        "css-loader"
      ]
    }
  },
  plugins: [
    // 플러그인은 새로운 객체를 만듬으로 사용
    new MiniCssExtractPlugin()
  ]
};
```

### webpack.config.js property 값 해석

```js
// webpack.config.js

var path = require("path");
// path라는 라이브러리를 가져와 path 변수에 담고, path.resolve 메소드를 사용한다.
// path.resolve: output의 파일의 유효한 경로를 가지기 위해 사용

module.exports = {
  mode: "none",
  // 빌드 대상
  entry: "./src/index.js",
  // 빌드 된 파일이 저장될 파일
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

### npm install vs index.html에 cdn 차이 (웹팩 전환 결과 차이)

- cdn에 처리한 경우 맨처음 웹에 접속시 cdn 홈페이지에 request를 보냄
- 라이브러리가 여러개일 경우 모두 cdn을 사용하면 웹에 접속시 여러개 request를 사용하게 되고
- npm을 통해 웹팩을 사용한 경우, 라이브러리 파일, 내가 작성한 파일을 하나로 합쳐서 요청하기 때문에 로딩이 빠르게 진행된다.
- 결론적으로, cdn을 쓰면 웹 초기 로딩시간이 매우 느려 진다.
- 웹팩의 장점이 여러가지 파일을 하나로 합치고, 요청을 최소화 하는 것이다.

### 웹팩 빌드 response 결과

#### `dist/main.js`

- 웹팩은 파일 하나하나를 0번부터 숫자로 관리함
- 숫자로 파일을 관리하는 함수는 IIFE (즉시 실행 함수)로 관리 됨

```js
(function() {
  /* 0 */
  // 0번파일 : index.js
  /* 1 */
  // 라이브러리 파일
})();
```

**중요**

- 웹팩은 js 뿐만이 아니라, 웹을 구성하는 모든 리소스에 대해 웹팩으로 변환 할 수 있다.

- 웹 테스크 매니저
- minifiers: 배포시 압축과정을 거친다
- lint: 문법 보조 검사 도구
- compile-to-js: es6+ 최신문법을 사용하기 위해 babel로 변환

이전 grunt, gulp, etc의 경우

- 각각 파일 유형별로 하나로 묶는 변환 스크립트를 작성해야한다.

#### gulp 예제

```js
const pug = require('gulp-pug')
const less = require('gulp-less')

function html() {
  return src('client/template/*.pug)
    .pipe(pug())
    .pipe(dest('build/html'))
}

function js() {
  return src('client/template/*.less)
    .pipe(less()
    .pipe(minifyCSS()
    .pipe(dest('build/css'))
}

export.js = js;
export.html = html;
export.css = css;
export.defaul = parallel(html, css, js)
```

- 위처럼 각 파일별로 코딩해줘야한다.
- 그러나! 웹팩을 사용하면, `webpack.config.js` 설정만 다뤄 주면 웹팩이 다 해준다.

#### 웹팩 vs gulp 차이

- 웹팩은 진입점 하나만 주어지면 (module import, export)만 주어지면 나머지는 알아서 해줄께
- gulp 위처럼 다 개발자가 해줘

## 웹팩 4가지 속성

### entry

- 웹 자원을 변환하기 위해 최초 진입점, js 경로

```js
// webpack.config.js

module.exports = {
  entry: {
    login: "./src/login.js"
    index: "./src/index.js"
  },
};
```

- entry에 지정된 js 파일에는 웹 앱의 전반적인 구조가 포함되어야 한다. (진입점)
- entry는 1개 또는 여러개 될 수 있다.

### output

- 웹팩으로 변환하고 난 파일 경로, 파일 이름 정의 (결과물)

```js
// webpack.config.js
var path = require("path");

module.exports = {
  output: {
    // 웹팩으로 빌드한 파일의 이름
    filename: "bundle.js",

    // 웹팩의 각 모듈 내용을 기준으로 생생된 해시 값을 붙이는 옵션
    // filename: '[chunkhash].bundle.js'

    // 해당 파일의 경로 (output: './dist/bundle.js')
    path: path.resolve(__dirname, "./dist")
  }
};
```

### loader

- 웹팩이 웹 자원을 변환하도록 도와주는 속성
- scss -> css, vue -> js, ts -> js 등 읽기 쉬운 언어로 바꿔준다
- 자바스크립트 최신 문법을 자바스크립트 옛날 문법으로 바꾸어 최신 문법이 호환되지 않는 브라우저도 최신 문법을 사용하도록 설정한다 (ex - bable-loader)

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};
```

### plugin

- 웹팩의 동작에 추가적인 기능을 제공하는 속성
- 로더는(module)은 파일을 해석하고 변환한다면, 플러그인은 결과물의 형태를 바꾸는 역할

```js
// webpack.config.js
module.exports = {
  plugins: []
};
```

## soursemap

- 웹 콘솔에 찍힌 콘솔 결과물을 클릭하면 빌드 되기 전 js 파일로 이동된다
- 웹을 볼 수 있다는 것은 우리가 작성한 코드가 웹팩에 의해 빌드 되어 하나의 파일로 뭉쳐졌는데, 빌드되기 전 js 파일로 이동한다는 것이 말이 안된다.
- 이것을 가능하게 하는 옵션이 soursemap 옵션이다.
- soursemap: 개발자 당신이 빌드를 했더라도, 콘솔을 찍었을 때는 원본 파일을 보여줄께 (빌드 결과물과, 빌드 되기 전 결과물을 연결하는 툴)

> `팁!` 콘솔을 클릭하면 Sources 탭으로 이동하는데, 가장 하단에 line값, column값, (sourse mapped from app.js) 값으로 콘솔을 찍은 원본 파일의 위치를 쉽게 알 수 있다.

## 웹팩 결과 로그 분석

1. npm run build 실행시 webpack이 실행된다
2. 특정 빌드마다 고유 Hash 가 생성되고, 웹팩 버전, 빌드 시간이 나온다
3. 빌드 된 결과 파일과 파일 사이즈가 나온다
4. `중요!` - Entrypoint가 웹팩 빌드 순서가 된다 (모듈 해석 순서)
   4.1 - entry에 index.js로 기술이 됬다면 제 1번 번들링은 index.js가 된다
   4.2 - index.js안에 import 된 파일 순으로 웹팩 빌드가 된다

## vue에서의 웹팩

- vue로 생성된 프로젝트는 `webpack.config.js`가 없고, `vue.config.js`에서 웹팩을 설정합니다.
- 프로젝트 루트레벨에 `vue.config.js`을 만드시면 되고, configureWebpack 옵션을 추가하면 됩니다.

```js
module.exports = {
  configureWebpack: {
    devtool: "source-map",
    name: appConfig.title,
    // Set up all the aliases.
    resolve: {
      alias: require("./aliases.config").webpack
    }
  }
};
```

## 웹팩을 통한 번들링 최적화 (lazy-loading)

- 웹팩의 `webpackChunkName`기능을 통해 spa의 단점인 웹 진입시 초기에 모든 리소스를 받는 것을 방지합니다.
- 개발자가 의도하여 리소스를 나누고, 사용자가 해당 컴포넌트 또는 라우터에 진입시 리소스를 다운받습니다.
- 자세한 내용은 [lazy-loading](https://kyounghwan01.github.io/blog/Vue/vue/lazy-loading/) 여기를 참조해주세요.

## 정리

- `entry`는 웹 자원을 변환하기 위한 최초 진입점으로, 이 진입점은 모든 자원을 포함해야 합니다 (vue - main.js, react- App.js)
- `loader`는 `entry`에서 받은 파일들을 기반으로 웹팩이 웹 자원을 하나의 파일로 변환하는 속성입니다. 이때 최신 문법, 라이브러리, css 프로세서가 모든 웹에서 사용가능하도록 최저 사양으로 변환됩니다.
- `output` 위 2가지 과정을 거치고 난 후, 나온 결과값이 저장되는 파일 경로입니다.
- `plugin`은 `output`의 결과물을 변환하는데 쓰이는 속성입니다.

<TagLinks />

<Comment />
