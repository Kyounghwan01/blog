# 2020.05월

## 5월 이슈 요약

- [토이 프로젝트](https://sales-statistics.netlify.com/) 종료
- 파이썬 크롤링 공부 시작 (bs4, requests, pandas)
- SMS 2차 완료
- 공지사항 구현
- 매출 차트 요소 (체험권, 잔여 미수금) 추가
- 미수금 결제 일시 추가
- 웹뷰 프로젝트 초기 React Application Architecture 설계
  - 새로운 프로젝트 개발 환경 및 구조를 담당하여 연구하고 설계
  - 웹뷰 파트 리드로 CR 프로세스, QA 프로세스, 일정, 커뮤니케이션 포인트 정리
  - 프로젝트 문서화
  - ### 왜 context api를 선택했는가?
    - 기존 앱를 웹뷰로 만드는 프로젝트에서 state값을 예측할 수 있었고, 그 결과 redux처럼 완전 글로벌한 상태가 많이 필요 없었다
    - redux의 강점인 미들웨어 지원 사항 중 비동기 요소가 많지 않다고 판단
    - react를 처음 접하는 분이 redux까지 연구하기엔 개발 기간이 많지 않음

## 5/4

- react native 설치

```jsx
//프로젝트 생성
npx react-native init project-name

//실행
npx react-native run-ios

//npm 다운로드시 해야하는 설정
npm install react-native-webview
//already link 확인
react-native link react-native-webview

//RNCWebview not found 같이 node_module을 못읽는 에러 발생시
//ios/andriod에 연결을 안했기 때문이다
cd ios
pod install

//위 명령어 실행 후 재시작하면 에러가 안뜬다
npx react-native run-ios

```

## 5/7

1. 수강권 업그레이드 시 전체, 잔여 횟수 표시
2. 변경이력에 횟수정보
3. 입력/수정할 수 있는 횟수는 최대 999회인데 업그레이드로인해 999회를 초과한 횟수가 표시됨
4. 일정-> 수업 팝오버시 기간제 ㅍ수강권에 횟수정보 표시 – 표시안함으로 변경

## 5/8

**TOY**

- 프리티어 형식에 맞게 코드 저장 시(cmd + s) 자동으로 포맷팅
  > vscode 실행 -> ctrl + shift + p -> preference open settings (json)
  > `"editor.formatOnSave": true,` json 파일에 입력 후 저장!
- login user - delepe/put backend, frontend 추가

## 5/10

**TOY**

- 컴포넌트 script js -> ts화 시작
  - `vue-property-decorator`로 클래스 컴포넌트로 리펙토링

## 5/10

**TOY**

- 컴포넌트 script js -> ts화 진행 중

### typeScript error

1. Object is possibly 'undefined'.Vetur(2532)

```tsx
//Object is possibly 'undefined'.Vetur(2532) 에러뜨는
this.$v.data[key.value].required

//this.$v에 빈것이 올경우 예외처리를 안해서 뜨는 현상
--- 해결

if (!this.$v || !this.$v.data) return;

//이후 required 가 없다고 에러가 뜬다
//Property 'required' does not exist on type 'boolean'.

//아래와 같이 아무 값이나 오게 허용하여 required 사용하도록 함
const dataCheck = this.$v.data[key.value] as any;
```

2. module not found

- 해당 모듈을 읽지 못하는 경우 typescript가 모듈을 가져오지 못하는 것이므로
- tsconfig에서 include된 파일 중 `d.ts` 파일 내에 아래와 같이 선언한다.

  ```tsx
  //types/vue-global.d.ts
  declare module "lodash" {}
  ```

2-1. 위와 같이 모듈을 가져와서 lodash내 omit, cloneDeep 같이 모듈내 함수를 사용할 때,

```tsx
//Property 'cloneDeep' does not exist on type 'lodash'.Vetur(2339)
//위 같은 에러는 interface에 해당 함수를 정의하지 않아 발생함

//types/vue-global.d.ts
declare module "lodash" {
  interface ILodash {
    cloneDeep(data?: object): object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: ILodash;

  // 3. 내보내기(CommonJS)
  export = _;
}

//위와 같이 모듈내 사용하는 함수 or 객체를 정의한다.
```

다른 예제

```tsx
import { Fragment } from "vue-fragment";
//위와 같이 정의하고 template에서 사용하려면 Fragement가 정의되지 않아 에러를 뿜는다.

//아래과 같이 vue-fragment를 정의해주면 된다.
//types/vue-global.d.ts
declare module "vue-fragment" {
  interface Fragment {
    Fragment: object;
  }

  // 2. 타입(인터페이스)을 가지는 변수 선언
  const _: Fragment;

  // 3. 내보내기(CommonJS)
  export = _;
}
```

## 5/13

**TOY**

- views script js -> ts화 시작

**SM**

- git stash cmd 명령어

```bash
// 특정 이름으로 스테시 저장
git stash save NAME

// stash list 부르기
git stash list

// 0번 stash 가져오기
git stash apply stash@{0}

// 가장 최근 stash 가져오기
git stash apply

// 0번 stash 지우기
git stash drop stash@{0}

// stash 모두 지우기
git stash clear
```

## 5/17

**TOY**

- 파이썬 기본 문법, http 통신 웹 데이터 크롤링(requests)
  - string, number, list, {} 개념
  - `requests` 라이브러리 사용법
    - json 형식 데이터 크롤링 하는데 많이 쓰이는 라이브러리 (추후 포스팅 예정)
- views script js -> ts화 종료
- README.md 수정
- TOY 프로젝트 종료

## 5.18

**SM**

- sms 2차 완료
  - 푸시 대상, 회원, 상담 고객 목록 `getMembers` utils 함수 개발, 재사용성 확보
  - 페이지 네이션을 위해 1번만 부를 때, 전체 목록 다 부를때, 조건 분리

## 5.21

**SM**

- 공지사항
  - 과제: cookie에 넣어 만료일이 있으면 안보여주는 방식 → localstorage에 넣어 만료일 제거하고 value에 있는 날짜 값을 서버로 넘겨 날짜값이후 공지 내용만 받아옴
  - 공지 리스트
- sms pagenation 버그
  - 처음에 전체 목록 불러오는 버그
  - utils 함수 버그 - 2번째 파람 true면 1번만 실행하여 페이지네이션 값활용 false이면 페이지네이션 형식으로 서버 부하줄이면서 전체 get
- 스튜디오메이트 공지 게시판
  - list, listdetail, prev, next, 제목으로 찾기
  - pagenation, css 작업
  - 기존 있던 공지사항 컴포넌트 재활용 하루만에 작업 완료

## 5.22

**SM**

- push 메세지 회원목록 - 페이지네이션 추가
- 체크시 다음페이지 이동해도 체크 유지
- [pending cancel](https://stackoverflow.com/questions/50516438/cancel-previous-request-using-axios-with-vue-js) 공부할것

## 5.25

**TOY**

- 이전 toy 프로젝트에 [다크모드](https://codepen.io/zidell/pen/dEVaBP) 추가 기획 및 개발 서칭

```scss
$bg-color: #fff;
$box-colord: rgba(0, 0, 0, 0.05);

:root {
  --bg-color: #fff;
  --box-colord: rgba(0, 0, 0, 0.05);
}

html.dartmode:root {
  --bg-color: #000;
  --box-colord: rgba(255, 255, 255, 0.15);
}

.box {
  background-color: $box-colord;
  background-color: var(--box-colord);
}
```

**SM**

- 미수금 결제일시 추가
- 매출페이지 -> 미수금, 체험 차트 반영
- 다크모드 만들기
  - [https://codepen.io/zidell/pen/dEVaBP](https://codepen.io/zidell/pen/dEVaBP)
  - 로컬스토리지에 인식

```scss
$bg-color: #fff;
$box-colord: rgba(0, 0, 0, 0.05);

:root {
  --bg-color: #fff;
  --box-colord: rgba(0, 0, 0, 0.05);
}

html.dartmode:root {
  --bg-color: #000;
  --box-colord: rgba(255, 255, 255, 0.15);
}

.box {
  background-color: $box-colord;
  background-color: var(--box-colord);
}
```

## 5/26

- keep-alive - 컴포넌트 상태 보존 [공부할 것](<[https://velog.io/@kyusung/VUE-keep-alive](https://velog.io/@kyusung/VUE-keep-alive)>)
- lazy loading 성공

  - eslinrc.js

  ```jsx
  module.exports = {
    root: true,
    env: {
      node: true
    },
    parserOptions: {
      sourceType: "module",
      parser: "babel-eslint",
      ecmaVersion: 2017,
      allowImportExportEverywhere: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
    plugins: ["prettier"],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "vue/no-use-v-if-with-v-for": "off"
    },
    globals: {
      _: true
    }
  };
  ```

  Parsing error: Unexpected token `import` #11189

  - 코드스플리팅과 동일

## 5/27

- 웹팩 구성요소
- 웹팩 soursemap 사용 방법

### @decorator 기존 babel에서 사용하려면

```jsx
parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    allowImportExportEverywhere: true,
    ecmaFeatures: { legacyDecorators: true },
  },
```

- 매출 무제한
- 이전 무제한 최대 4달까지 선택가능

### es6 동적 객체 키저장

```jsx
const obj = { [name]: "ahn" };
```

그러나 위처럼 할당 이후에 name값이 변경되어도 obj의 name 값은 변경되지 않는다

- 함수 default 값 설정

```jsx
function useDefaultES6(a = 1, b = 2, c = 3) {
  console.log([a, b, c]);
}
```

### es6 이터레이터 프로토콜

```jsx
// 무한 스크롤에 쓰이면 좋을듯
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    }
  };
}
const iter = makeIterator([1, 2, 3]);
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 2, done: false }
iter.next(); // { value: 3, done: false }
iter.next(); // { done: true }
```

## 5/27

### 켄님 상담 결과

- 토이프로젝트보다 회사코드 리빌딩, 단점찾아서 보완하는게 더 이력서에 남기 좋다
- 알고리즘은 틈틈히
- 일이 많은 것은 내능력이 좋은것, 그러나 일정관리 철저히 하고, 안될것은 말해서 쳐낼것
- 코드리뷰는 철저히 마감기한안에 못하는 건 내잘못아님
- 스택에 대한 부담은 없어도 된다.

## 5/28

- 매출 무제한 작업 완료 (이미 달단위로 잘라서 api 보내고 있어서 기간만 제거로 완료)
- react 세팅 시작 (react로 할지 vue, decorat로 할지 이번주에 정합시다)

## 5/30

### react 프로젝트 세팅

- yarn eject를 하면 cra로 만든 웹팩설정파일을 볼 수 있다. 그냥 cra에서 쓴 웹팩쓰는게 마음 편함
- sourcemap - production에서는 소스맵을 제거하는게 메모리측면, 보안 측면에서 우월하다(보안 - 소스맵을 true로 하면 배포시 사이트에서 .map을 통해 코드 해석이 가능하다)
- 어짜피 build라는 명령어는 .env.production 또는 .env 값만 읽어오므로, development , local 값에는 아래를 추가하지 않아도 된다

```jsx
GENERATE_SOURCEMAP = false;
```

추가 하고 build시 .map 파일이 없다

- NODE_ENV 값은 개발자가 설정할 수 없는값
- .env에서는 변수를 이용하려면 react 사용시 REACT_APP_API_BASE_URL 이런식으로 REACT_APP를 앞에 붙여야한다 물론 vue도 마찬가지로 VUE_APP을 붙여야함

### alias 설정

- 웹팩으로 설정, package.json설정, 바벨로 설정 등 많이 있지만 cra에서 eject를 해서 webpack.config.js를 만지는 방향이 매우 좋지 않다고 하여, eslint를 활용하기로 했다

```jsx
//.eslintrc.js
module.exports = {
	...
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
```

- 위처럼 추가 해주면 되고
- 추가로 .env를 만들어서 아래를 추가하면 된다

```jsx
NODE_PATH = src;
```

- 위 설정 반영 후, 만약 src/components/Test 라는 컴포넌트를 불러온다면 아래와 같은 방법으로 import가능

```jsx
import Test from "componrnts/Test";
```

- eslint, prettier세팅

## 6/1

- react context api 포스팅
- 미수금 결제일시 로직 수정
- 타입스크립트..

<Comment />
