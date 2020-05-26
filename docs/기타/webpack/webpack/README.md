---
meta:
  - name: description
    content: webpack 기초
  - property: og:title
    content: webpack 기초
  - property: og:description
    content: webpack 기초
  - property: og:url
    content: https://kyounghwan01.github.io/blog/기타/webpack/webpack/
---

# webpack 기초 (작업 중)

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
  num: 10,
};
var main = {
  num: 20,
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
    path: path.resolve(__dirname, "dist"),
  },
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
