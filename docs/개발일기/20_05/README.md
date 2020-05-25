# 2020.05월

## 5월 이슈 요약

- [토이 프로젝트](https://sales-statistics.netlify.com/) 종료
- 파이썬 크롤링 공부 시작
- SMS 2차 완료
- 공지사항 구현
- 매출 차트 요소 (체험권, 미수금) 추가

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
