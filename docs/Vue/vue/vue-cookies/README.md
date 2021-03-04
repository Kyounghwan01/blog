---
title: vue-cookies 사용법
meta:
  - name: description
    content: vue-cookies 사용법
  - property: og:title
    content: vue-cookies 사용법
  - property: og:description
    content: vue-cookies 사용법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/vue-cookies/
tags: ["vue"]
---

# vue-cookies 사용법

웹 개발자라면 필수로 알아야 하는 가장 기본 `쿠키` 사용법 입니다.
쿠키는 잘 아시다시피 사용자의 브라우저에 저장되고 서버에는 저장되지 않습니다. 그렇기 때문에 **보안에 관련된 정보는 절대 넣으시면 안됩니다.(ex - 비밀번호)**

저의 경우 브라우저에 뜨는 공지에 일주일간 안보기 선택한 경우 브라우저에서 쿠키를 만료일 7일 짜리로 설정하고 쿠키 만료시 다시 공지를 띄우는 형식으로 쿠키를 활용하였습니다.

자, 그렇다면 `vue`에서는 쿠키를 어떻게 사용하는지 알아보겠습니다.

1. npm install vue-cookies
   `vue-cooke`랑 `vue-cookies`가 있는데, 후자가 더 다운로드 수가 더 높고 readme가 더 잘 작성되어서 후자를 쓰기로 하였습니다.

2. 글로벌 사용 명시
   vue 프로젝트에서 가장 메인이 되는 곳에 쿠키를 사용한다 명시해 줍니다.
   `main.js` or `main.ts`

```js
import VueCookies from "vue-cookies";
//쿠키를 사용한다.
Vue.use(VueCookies);

//쿠키의 만료일은 7일이다. (글로벌 세팅)
Vue.$cookies.config("7d");
```

3. 만료일 시간 기준

```
1 : 1초
60 * 60 * 12 : 12시간
60 * 60 * 25 * 30 : 1달
1d : 1일
new Date(2019,03,13).toUTCString(): 특정 시간
```

3. set
   쿠키는 `key`, `value` 쌍으로 저장됩니다.

```js
//2번처럼 글로벌로 쿠키를 사용한다 명시하면 this로 쿠키를 불러올 수 있습니다.
this.$cookies.set("키", "값", "만료일");

//만약 만료일이 명시되지 않는다면 2번 과정에서 세팅한 글로벌 만료일이 저장됩니다.
```

4. get
   get은 저장된 쿠키의 `key` 값으로 불러옵니다.

```js
this.$cookies.set(test, "testValue");

const cookie = this.$cookies.get(test);
console.log(cookie); //testValue
```

5. remove
   remove는 저장된 쿠키의 `key` 값을 받아 있으면 삭제합니다.

```js
this.$cookies.remove("test");
```

6. 기타

```js
//특정 쿠키가 있는지 확인
this.$cookies.isKey("test");

//모든 쿠키 키 가져오기
this.$cookies.keys().join("\n");

//모든 쿠키 다 지우기
this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
```

<TagLinks />

<Comment />
