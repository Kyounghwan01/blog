# 2020.04월

## 4월 이슈 요약

- 깃 커밋 컨벤션 정의
- 웹 프로젝트 코드 컨벤션 정의
  - `.prettierrc` 도입 함으로 강제 코드 포멧팅
- FCM 알림 실시간 새로고침
- 통계 - 불필요 api 제거 및 로직 개선 - 초기로딩 3초 단축
- 자주 쓰는 api 호출 및 데이터 가공 utils 함수로 분리
- 그 외, 시설 cs 사항 유지보수 일체

## 4.2

**SM**

- 기존 : 수업 - 코스 추가 및 삭제 불가
- 개선 : 수업 - 코스 추가 및 삭제
- 과제
  1. 시간을 추가하는 경우 이전 시간 다음 시간 나와야됨 (마지막 시간이 11:00~12:00이라면 다음 클릭시간은 12:00~13:00)
  - 다음 시간 계산하는 utils 함수 제작
  2. 23:00~24:00인 경우 다음 시간은 00:00~00:00
  3. 시간을 추가한 후 사용자가 취소하면 이전 저장되어있던 시간 불러와야됨.
  - 수정 url 진입시 이전에 있던 시간 새로운 배열에 넣어 임시 저장

## 4.3

**SM**

- 기존 : 알림 - 종류 필터 없이 한곳에 다 나옴
- 개선 : 수업 - 예약, ,수업, 수강권, 공지 필터 추가
- 과제
  1. el-select, el-option 사용하여 드롭다운 형식으로 필터 선택 ui 추가
  2. 필터 선택시 req param에 type 추가해서 api 호출
  3. 무한 스크롤 호출시 필터 선택에 맞게 api 호출
- 회원 이미지 픽셀변경 (보여주는 화면의 이미지 크기와 픽셀 크기를 동일하게 맞춰야 해상도 유지됨)

## 4.9

- 매출 비밀번호 동일 시, 오류 메세지 수정 (서버단에서 오는 정보 별개로 클라이언트에서 자체 오류 처리)
- FCM을 통해 알림 기능 자동 새로고침
  - 기존 : 알림 계속 수신하지 않고, 다른 페이지 이동시 알림 목록 새로고침
  - 개선 : fcm 수신하며, 실시간 새로고침
  - 과제
    알림 목록을 완전 새로고침하면, 서버 부하가 너무 걸리므로, fcm을 수신하되, 전체 새로고침이 아닌 현재 알림 목록에 가장 최신 목록을 추가하는 방식으로 코딩
    `firebase.messaging().onMessage(payload => { this.handleNewMessage(payload.data); -- 새로고침 추가 });`

**TOY**

- 로그인 유저별 주문, 회사 추가
- 최상단 뷰 - 유저 메뉴 추가 (유저 수정, 유저 삭제, 로그아웃 드롭다운)

## 4.10

- 기본 문법

```js
const test = {};
console.log(!!test) // true
console.log(!!test.value) // false
const t;
console.log(!!test) // false
```

- 수강권 수정
  - 기간제로 선택 후, 취소가능여부 true후 횟수제로 바꾸면 기간제 취소가능 여부 flag는 true
  - 수정 결과가 기간제 아닌 횟수제일때는 기간제 취소가능 여부를 false로 바꾼다.

## 4.13

- 수업일 -> 수업일시 로 단어 수정 요청합니다. - 완
- 수업일시 오름/내림차순 기능 (수업목록 페이지와 동일한 기능입니다) - 완
- 수업시간에서 수업시작 시간만 입력하고 검색할 경우 검색되지 않습니다.(수업목록 에서는 수업 시작시간 또는 종료시간만 입력해도 검색 가능합니다.) - 됨, 범위로 검색 클릭, css만져야할듯 - 완
- 엑셀 다운로드 -> 기간제 수강권에 전체/잔여 횟수가 표시되고 있습니다(회원페이지 엑셀 -> 기간제 수강권은 횟수 정보를 별도로 표시하지 않습니다) - 완
- 회원명 검색이 되지 않습니다. → 완
- 소리 바꾸기 - 완

## 4.14

**SM**

- 매출 → 수강권 매출 - 컬럼클릭시 멤버 디테일페이지 이동
  - usetTicketId 부재로 아직 미완료
- 푸시메세지 → sms api 변경 작업 시작 (데이터 구조 작업 완료)
- 그룹 스케쥴 코스 변경 → 스케쥴 추가시 이전 스케쥴에 중복있으면 중복 알림 모달
- 수강권 수정 → 자동차감 설정시 주간이용횟수 설정 여부 모달

**TOY**

- 현황 → 필터 완성 (기간 → 오늘 ~ 오늘 에서 이전 3개월 ~ 오늘 변경 할 것)
- 필터 → 이름으로 검색 → 회사 리스트 가져오면 그 데이터에서 검색 및 get api 트리거 할것
- 회원 디테일 → history → 현황과 같은 ui (필터, 리스트)

## 4.17

**SM**

- 푸시메세지 api → sms api로 변경
- 일괄예약 - 프라이빗 정지기간 있어도 회원권 도출 및 수업일정 정지기간 통합 ( master )
- sms - 회원 - 문자보내기 - sms / push 분리
- 일정 - 캘린더 - 마감시 백그라운드 변경
- sms 2차 회의
  1. 성공적 - 회의할 때는 미리 할말을 정하고 주도적으로 말하는 것이 개발에 좀더 수훨함
  2. 모달 푸시메세지 컴포넌트 분리 - 여러 view에서 공용으로 사용

Uncaught TypeError: Right-hand side of 'instanceof'?

- 에러 : props type 형식을 안맞췄기 떄문
- ex)

```jsx
props: {
	exampleObject: {type: object, default: () => {}}
	//위처럼 하면 에러가 뜬다 object가 아니라 Object이기 때문, array (x) -> Array string(x) -> String
}
```

**TOY**

- 회원 디테일 - 필터 및 리스트 추가
- 회원 디테일 - 주문 수정 및 삭제 해야됨

## 4.20

**SM**

- 회원 - 메세지보내기 - sms/push 분리 완성
- 일정 - 인원초과, 인원 마감시 - 배경색 강사색으로 변경
- 회원 - 앱링크 - 전화번호있으면 앱링크보내기 문자
  - 전화번호 없으면 버튼 삭제
  - 전화번호 + 앱링크 - 이메일 주소 복사

**TOY**

- 기입 - 중복된 단어사용된 회사의 경우 전체 선택되는 버그 수정
  - 이름, 전화번호가 동일한 문자 사용했을 경우 위 버그 나옴 - 이름에 숫자를 못넣게 하여 해결
- chart.js, `vue-chartjs` - 프로젝트 도입 (기본 예시 출력 성공)

## 4.22

**SM**

- 회원 - 10/15/30/50 인원 설정 추가
- 전체회원 sms/push 메세지 모달 추가

**TOY**

- chart.js 타입스크립트 에러 해결

  - 에러 : chart.js모듈을 읽을 수 없다는 에러창 (로컬 실행은 되나 배포시 에러로 인하여 빌드 실패)
  - 해결 : `vue-global.d.ts` 에 아래 추가

  ```jsx
  ...
  declare module 'chart.js';
  declare module 'vue-chartjs';
  ```

  - `tsconfig.json` 에 아래 추가

  ```jsx
  ...
  "include": [
      ...
      "types/vue-global.d.ts",
    ],
  ```

- computed , watch, data, methods 옵션 설정 완료된 이후 → created 실행됨
- 랜더링 될때 돔 업뎃하고 싶으면 Mount → data만 업뎃되면 된다면 created 사용해라

```jsx
mounted() {
	// $el 을 사용할 수 있습니다.
	console.log('mounted', this.$el);
	this.$nextTick(() => {
	// 모든 화면이 렌더링된 후 호출됩니다.
	});
}
```

중요: 자식 컴포넌트의 `mount`가 부모 컴포넌트의 `mount`보다 먼저 실행됨

created는 부모 → 자식순, mounted는 자식 → 부모 순

즉, 부모컴포넌트는 자식컴포넌트 돔이 모두 추가된 후 mounted가 실행된다.

- pie chart, bar chart 추가

## 4.24

**TOY**

- z-index로 영역이 겹쳐질때 뒤에있는 이벤트 실행

상위로 올라간 요소의 css에 아래 css 첨부

```css
upBox {
	z-index: 1;
	pointer-events: none; 
/* z-index를 무시하고 겹쳐있는 영역을 클릭했을때 뒤에 있는 click 이벤트 반응하게 하기 */
/* HTML 요소에 정의된 이벤트( click, hover, drag, active...등 )를 비활성화한다. */
}
```

- 매출 - 필터별 기간 산정 추가

## 4.27

**SM**

- sms 회원 - 선택된 회원 메세지보내기 작업 시작
- el-table에서 checkbox를 쓸때 checked, indeterminate를 실시간으로 변동하고 싶다면
  el-table 프로퍼티에 :key="`${isSelectedAll}${isIndeterminate}`" 를 꼭 넣어야한다.

## 4.28

**TOY**

- 매출/매입 별 상품별 구분 파이차트
  - 로직 개선 필요

**SM**

- 통계 - 불필요 api 호출 제거 - 초기로딩 3초 단축
  - 불필요한 api 호출을 제거하고, 한번 부르고 나면 데이터를 기억하고 재활용

## 4.29

**SM**

`.prettierrc` 프리티어 설정파일 - 프로젝트 루트에 생성

```css
// 내가 사용하는 기본 세팅값
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "arrowParens": "avoid",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "auto"
}
```

- 깃 커밋 컨벤션 정의
- 웹 프로젝트 코드 컨벤션 정의
- vue-cookies 도입

```jsx
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.$cookies.config("7d");

//다른 컴포넌트
//set
this.$cookies.set("keyName", { value: values });
//get
this.$cookies.get("keyName");
//remove
this.$cookies.remove("keyName");
```

<Comment />
