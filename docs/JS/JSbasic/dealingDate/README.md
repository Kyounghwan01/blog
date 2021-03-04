---
title: JavaScript - new Date 날짜 다루기
meta:
  - name: description
    content: JavaScript - new Date 날짜 다루기
  - property: og:title
    content: JavaScript - new Date 날짜 다루기
  - property: og:description
    content: JavaScript - new Date 날짜 다루기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/dealingDate/
tags: ["JS"]
---

# 날짜 다루기

### 날짜 정보 객체

날짜, 시간 관련 정보를 받고 싶을 때는 날짜 객체(Date Object)를 생성합니다.

```js
var t = new Date();
```

특정 날짜의 정보를 가져올때는 특정 정보 객체를 만듭니다.

```js
var t = new Date(2019, 5, 8);
```

날짜 정보 객체는 날짜의 정보를 가져오는 메소드와 수정하는 메소드로 나눕니다.

### get 메소드

- getFullYear() - 연도정보를 가져옴
- getMonth() - 월 정보를 가져옴 (현재 월 -1)
- getDate() - 일 정보를 가져옴
- getDay() - 요일 정보를 가져옴 (일 : 0 ~ 토 : 6)
- getHours() - 시간 정보를 가져옴
- getMinute() - 분 정보를 가져옴
- getTime() - 1970년 1월 1일부터 경과된 시간을 밀리초로 표기
- toGMTString() - GMT 표준 표기 방식으로 문자형 데이터로 반환함

### Set 메소드

- setFullYear() - 연도 정보만 수정함
- setMonth() - 월 정보를 수정 (현재 월 -1)
- setDate() - 일 정보를 수정 (요일은 자동으로 바뀜)
- setTime() - 1970년 1월 1일부터 경과된 시간을 밀리초로 수정
- toLocaleString() - 운영 시스템 표기 방식으로 문자형 데이터로 반환함

예제로 오늘이 몇월 몇일 무슨 요일인지 리턴하겠습니다.

```js
var today = new Date();
var nowMonth = today.getMonth() + 1,
  nowYear = today.getFullYear(),
  nowDay = today.getDay(),
  nowDate = today.getDate();
console.log(nowDay);
switch (nowDay) {
  case 1:
    nowDay = "월";
    break;
  case 2:
    nowDay = "화";
    break;
  case 3:
    nowDay = "수";
    break;
  case 4:
    nowDay = "목";
    break;
  case 5:
    nowDay = "금";
    break;
  case 6:
    nowDay = "토";
    break;
  case 7:
    nowDay = "일";
    break;
  default:
    "notting";
}
document.write("<h1>오늘 날짜 정보</h1>");
document.write("현재 월 " + nowMonth, "<br>");
document.write("현재 일 " + nowDate, "<br>");
document.write("현재 요일 " + nowDay, "<br>");
```

두 번째 예제로 오늘은 기준으로 연말까지 몇일 남았는지 리턴하겠습니다.

```js
//위 예제 이후로 연속
var theDate = new Date(nowYear, 11, 31);
//getTime : 밀리세컨드 단위로 시간 알려줌
//60*1000*60*24 => 밀리초를 하루 단위로
var diffDate = theDate.getTime() - today.getTime();
console.log(diffDate);
var result = Math.ceil(diffDate / (60 * 1000 * 60 * 24));

document.write("<h1>연말까지 남은 날</h1>");
document.write(result + "일 남았습니다.");
```

<TagLinks />

<Comment />
