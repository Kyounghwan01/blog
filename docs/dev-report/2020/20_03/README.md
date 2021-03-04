# 2020.03월

## 3월 이슈 요약

- github 내에서 컨플릭 해결할시 base 브랜치 내용이 compare 브랜치내로 들어감
- AWS lambda, api gateway로 토이프로젝트 백엔드 구축
- scss mixin사용법
- validate 사용법 (`this.$v`)
- firebase cloud message , serviceWorker 구현

## 3.2

**SM**

- 기존 sms 회원 목록 불러오는 방법 : 전체 다 불러오기
- 개선 : 페이지네이션으로 100명씩 불러오기
- 과제
  1. 이전 페이지에서 클릭한 사람 다음 페이지로 넘어가도 유지되어야 함
  2. 선택 완료 후, 다시 목록에 들어가도 이전 클릭한 사람은 목록에 체크 되어야 함. => 체크 한 사람은 store 배열 내 저장 후 목록을 불러올 때, 그 사람의 id와 store에 저장된 배열 내 id가 같은 정보가 있으면 checked 한다.
  3. 전체 선택시 현재 가진정보는 100명인데, 나는 전체 인원의 데이터를 가지고 목록을 채워야함 => 전체 선택 버튼 클릭 후, 선택 완료 버튼 클릭시 전체 회원 부르는 api 호출

**TOY**

- vue + typeScript 환경 구축 중...

## 3.3

**SM**

- SMS 개선 작업 완료

**TOY**

- 이전 js에서 쓰던 aliase를 반영하지 못함. `vue.config.js`가 타입스크립트에서는 반영이 안된다.
- `tsconfig.js`에서 모두 해결해야함. path를 이용하여 aliase 사용 할 수 있다.

## 3.4

**SM**

- 락카 할당(assign) 작업 시작
- vue에서 이벤트 버블링 막는 방법 [관련 자료](https://kr.vuejs.org/v2/guide/events.html)

## 3.5

**SM**

- 락카 할당 , 삭제, 정지 (CRUD) 구현
  **TOY**
- vue + typeScript 환경 구축 중...
- firebase 백엔드 버리고 aws lambda, api gateway 공부

## 3.8

**TOY**

- aws lambda, api gateway로 백엔드 구축 완료
- front : user 생성 및 조회 기능 완료
- cors 해결 : 서버에서 클라이언트로 응답보낼때 header에 `Access-Control-Allow-Origin: *` 담아 보냄
- 타입스크립트 프로젝트 내에서 자바스크립트 읽기 포스팅

## 3.9

**SM**

- [validate](https://vuelidate.js.org/#sub-without-v-model): form에 들어가는 필수 항목 체크 라이브러리
- 락커 기능 완성
- 락커 리스크 화면 구성 변경
- mixin에 ellopse, flex 많이 쓰는 방법 미리 구현하면 빠른 개발 가능

**TOY**

- user 생성 layout css 완성

## 3.10

**SM**

- github 내에서 컨플릭 해결할시 base 브랜치 내용이 compare 브랜치로 들어감
  :::danger github내에서 conflict 해결시
  base 브랜치 내용이 compare 브랜치에 들어간다.<br>
  즉, 이번이 base 브랜치에 넣고 다시는 그 브랜치 작업 안한다면 github내에서 해결하고 다시 작업 할 일이 있다면, 해당 브랜치에서 재작업 후, push 할 것!!
  :::
- 서비스워커 개념 숙지, 회사코드에 반영 중

**TOY**

- getter, setter 사용 예제 포스팅

## 3.11

**SM**

- 커스텀 컴포넌트의 경우 이벤트 뒤에 `.native`를 넣으면 이벤트 핸들러 발생 가능

```vue
<template>
  <Custom @click.native.stop="test">
</template>
```

## 3.14

**TOY**

- user 내부에 order_history 배열 추가

## 3.17

**SM**

- vue ref: Ref focus안잡히는 경우 : `this.$refs.lockerNumber.$el.querySelector('input').focus();`
  **Toy**
- 매출/매입 layout
- 오더 히스토리가 유저안에 있으면 매출/매입 현황을 get 하기 너무 힘들고 api 남용이 심할 듯하다. db 재 구성 필요

## 3.18

**TOY**

- slot 포스팅

## 3.19

**SM**

- 서비스 워커 설치 (firebase: 5.6.1)
- 로컬에서 fcm 부르기 성공!!!
- qa 진행중
- 구글 fcm 서버로 토큰값, 브라우저 명을 헤더에 넣고, 바디에 받을 값을 넣으면 (post) 서비스 워커에 등록된 브라우저로 noti를 띄운다.

**TOY**

- order 컬럼 새로 만듬, post, get만 만듬
- get - 날짜별, 고객별 조회 가능
- `orderCreate.vue` 매출/매입 post 구현, layout 완료, validate 안됨
- `orderHistory.vue` get 구현, layout 안됨
  **TODO**
- `orderCreate.vue` data validate
- `orderHistory.vue` layout css 작업

## 3.20

**SM**

- firebase 5.6.1버전에서 토큰 삭제가 정상적으로 작동하지 않아 7.0.1로 올렸더니, noti 호출이 안됨 다운그레이드 실시
- 로컬은 호출되나, qa는 호출되지 않음
- 다운그레이드 버전 배포시 qa도 호출됨
- fcm서버로 1번 ajax를 날리나, 받은 호출은 2번, 5번 (로그아웃, 로그인 횟수 당 \*2배 호출됨) - ~~토큰 삭제와 연관이 있는 듯~~ (페이지 전환 수 만큼 호출)

**TOY**

- `orderCreate.vue` data validate 추가

## 3.21

**SM**

- fcm 여러번 날아오는 이유 -> onMessage 메소드를 여러번 호출해서 1번 호출하면 메소드 호출하는 횟수만큼 noti가 왔다. -> 최초 1회만 호출되게 수정
- fcm 안됬던 이유

1. manifest.json에 `"gcm_sender_id": "103953800507"` -> 이 id를 넣지 않음
2. firebase.messaging `publicKey` 넣지 않음
3. firebase 버전 차이
4. 서비스워커 작성 후, fcm 구글로 post를 날리는 방법 미인지
5. 기존 noti 웹 코드 미숙지

**TODO**

- 토큰 업데이트 작업 필요
- vue로 만드는 pwa 작동 원리 숙지 필요

## 3.22

**SM**

- 회원목록 엑셀다운로드 페이지네이션으로 api 나눠서 호출
- 같은 화면에서 재호출시 page 초기화!

## 3.23

**SM**

- 자바스크립트 내장 객체 `new Audio()` 사용

```js
const sound = new Audio("사운드파일");
sound.play(); //플레이
sound.pause(); //중지
sound.volum = 0.1; //0.1배로 줄인다 (0 ~ 1까지 가능)
```

## 3.24

**SM**

컴퓨터가 사용하는 github 계정 보기

- git config user.email
- git config user.name

컴퓨터가 사용하는 github 계정 변경

- git config --global user.email (바꿀 email)
- git config --global user.name (바꿀 name)

제한사항

- master 브랜치 아닌 다른 브랜치에 push시 잔디밭에 적용되지 않는다. 만약 그 브랜치가 master에 머지될 경우 푸시 올린 날짜가 잔디밭에 기록된다.
- 포크한 리포지토리에 한 푸시는 잔디밭에 적용되지 않는다.
- 리포지토리에 contributors에 등록된 깃헙이메일과 컴퓨터가 사용하는 로컬 이메일이 동일해야한다.

## 3.35

**SM**

- `_` 사용 예시

```js
_.uniq(this.bookings.map({lecture} => lecture.id));
//bookings안에 lecture의 객체에 id가 유일한 존재만 가져온다
_.deepClone(object);
//vue의 경우 prop로 data를 넘기는 경우 양방향으로 바인딩 되는 경우가 있다.
//그럴때 JSON.parse(JSON.stringfy(object))보다는 lodash의 deepClone을 쓴다.

```

**fcm 배포 문제 및 해결**

1. firebase 버전에 따라 fcm이 될수도 안될수도 있다. (사용 버전 : 5.6.1)

- 사파리는 firebase를 지원하지 않는다.....
- ipad, ipod의 경우 모든 브라우저는 사파리를 기반으로 실행된다.
  즉, 사파리가 안되면 크롬이든, 엣지든 지원되는 기능이 안된다는 뜻이다.
- 그래서 ipad에서 웹을 사용해야 할 경우 firebase가 실행되지 않도록 분기처리 해야한다.

```js
firebase.messaging.isSupported();
//위 값이 true이면 firebase 기능 실행 false면 실행 안함
```

## 3.28

**TOY**

- `기입` (order 저장) validate, 기능 구현
- 프로젝트내 공용으로 사용하는 컴포넌트(text, number, phone input) 제작

## 3.31

**SM**

- 수업 - 체크인내역 완료
  - 체크인 기간 필터아닌 요일, 수업시간 같은 필터는 api를 통해 가져온 데이터 기반으로 클라이언트에서 소팅하고 api 재호출 안함
- 수강권 연장 기능
  - 업그레이드 기능에서 동일한 수강권 선택시, 기존 수강권 횟수만큼 추가

<Comment />
