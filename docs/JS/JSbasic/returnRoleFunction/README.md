---
title: JavaScript - 함수에서 return 역할
meta:
  - name: description
    content: JavaScript - 함수에서 return 역할
  - property: og:title
    content: JavaScript - 함수에서 return 역할
  - property: og:description
    content: JavaScript - 함수에서 return 역할
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/returnRoleFunction/
tags: ["JS"]
---

# 함수에서 return 역할

> return 문은 함수에서 결괏값을 반환할 때 사용합니다.
> <br>또한 함수에서 return 문이 실행되면 반복문의 break문과 비슷하게 코드가 강제 종료됩니다.

**즉, 함수 정의문에 return 문이 사용되면 함수를 호출했을 때 결과값(data)를 반환합니다.**

### 데이터를 반환하고 강제 종료하는 return 문

> 함수에서 return은 함수의 실행을 강제종료합니다. 그러므로 reture문 아래의 로직은 작동하지 않습니다.

```js
function 함수명() {
  var js_code = 1;
  return js_code;

  //return이 이미 실행되어 이 코드는 의미 없다.
  var js_code_2 = 2;
}
```

```js
function sum(num1, num2) {
  return num1 + num2;
}
var result = sum(10, 20);
console.log(result); //30
```

### 재귀 함수 호출

함수 정의문 내에서 작성한 코드로 함수를 다시 호출하는 것을 재귀 함수 호출이라고 합니다.

재귀 함수 호출은 함수를 반복문처럼 여러 번 호출하기 위해 사용합니다.

```js
function fun() {
  var a = 0;
  fun();
}
fun();
```

재귀 함수를 적용해 1부터 10까지 출력하는 예제

```js
var num = 0;
function fun() {
  num++;
  document.write(num, "<br>");
  if (num == 10) return;
  fun();
}
fun();
```

<TagLinks />

<Comment />
