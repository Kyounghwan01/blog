---
title: JavaScript - JSON 객체 Key값 동적 할당하기
meta:
  - name: description
    content: JavaScript - JSON 객체 Key값 동적 할당하기
  - property: og:title
    content: JavaScript - JSON 객체 Key값 동적 할당하기
  - property: og:description
    content: JavaScript - JSON 객체 Key값 동적 할당하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/jsonDynamicAllocation/
tags: ["JS"]
---

# JSON 객체 Key값 동적 할당하기

JSON 일반적으로 아래와 같이 사용합니다.

```js
var example = {
  name: nkh,
  age: 27
};
```

위와 같이 key와 value가 쌍으로 이루어져 있습니다.

이때 value의 경우 function, string을 추가하여 동적으로 할당 할 수 있으나 Key의 경우는 그것이 불가합니다..

```js
var new = age;
var example = {
  new: 27
};
```

위와 같이 key 값에 변수를 불러오려해도 희망하는 값인 {age : 27}이 아닌 {new : 27}이 나오게 되죠

```js
var keyname = 'my';
var postfix = 'Age'
var something = {
   keyname + 'postfix' : 'value'
}
```

물론 위와 같은 동적으로 보이는 key값 할당도 에러로 판단합니다.

그래서 결론은!!

객체로 만들 부분을 빈 배열로 만들고 **[]방식으로 프로퍼티를 설정하는 방법**을 이용하면 키 값을 동적으로 설정 할 수 있습니다.

```js
var keyname = "my";
var postfix = "Age";
var value = 27;
var something = {};
something[keyname + postfix] = value;
//console.log : {myAge : 27}
```

### 추가 방법

추가로 es2019에 의하면 아주 간단하게 동적으로 키를 할당 가능합니다

```js
const name = "who";
const person = { [name]: "nkh" }; // {who: 'nkh'}
```

<TagLinks />

<Comment />
