---
title: JavaScript - 불변성, Immutability 패턴
meta:
  - name: description
    content: JavaScript - 불변성, Immutability 패턴
  - property: og:title
    content: JavaScript - 불변성, Immutability 패턴
  - property: og:description
    content: JavaScript - 불변성, Immutability 패턴
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/Immutability/
tags: ["JS"]
---

# 불변성, Immutability 패턴

> Immutability는 객체가 생성된 후 그 속성을 변경할 수 없는 패턴을 말합니다.
> 즉, 쉽게 말해 데이터의 원본이 훼손 되는 것을 막는 것입니다.

Immutability를 위해서는 먼저 [primitive/reference](https://kyounghwan01.github.io/lala/primitive-reference/) 를 먼저 알아야합니다.
링크 참조하니 보고 오시길 바랍니다.

`primitive` 값을 불변하게 만드는 방법은 매우 간단합니다.

`const` 를 `var`나 `let` 대신에 사용하시면 됩니다.

```js
const p1 = 1;
p1 = 2;
// Uncaught TypeError: Assignment to constant variable.
```

위처럼 `const` 이후 값을 바꾸면 Error가 반환됩니다.

또한 원시타입인 `primitive` 는 **값이 같으면 같은 데이터**를 가리킵니다.

```js
const p1 = 1;
const p2 = 1;
p1 === p2; // true
```

위의 예제 처럼 변수가 달라도 값이 같으면 같다고 인지합니다.

그러나 `reference` 타입인 `Object` 는 `mutable value` 라 부르며 위와 다른 결과를 가집니다.

```js
var o1 = { name: "kim" };
var o2 = { name: "kim" };
o1 === o2; // false
```

객체는 **각자의 고유 데이터 주소**를 가집니다 그 이유는 객체의 경우 속성 값이 바뀔 수 있으므로 같은 값이여도 다른 데이터의 위치를 가지도록 설계되었습니다.

그렇다면 이렇게 다른 주소를 가짐으로 나타나는 차이점을 알아보겠습니다.

## 불변 데이터 패턴

### 1. primitive

```js
var p1 = 1;
var p2 = 1;
var p3 = 1;
// 값이 같으므로 p1,2,3는 동일한 데이터를 가리킴
var p3 = 2;
// p3만 값이 달라지면 p1,2는 동일한 데이터를 가리키고, p3만 새로운 데이터를 만들어 가리킴, 값이 달라지면 다른 값을 가리킴
```

### 2. Reference

- 생성할때마다 새로운 데이터 위치를 만든다.

```js
var o1 = { name: kim };
var o2 = { name: kim };
//값은 같으나 다른 데이터
var o3 = o1;
//o3데이터는 o1 데이터를 가리킴
o3.name = "lee";
//o3에 의해 o1도 바뀌는 상황, 의도 하지 않았다면 버그 우려
```

위 상황은 `o3`가 `o1`의 데이터 주소 값을 복사해와서 `o3.name` 변경시 `o1.name`까지 변경되는 상황입니다.

### 원본 데이터를 바꾸지 않고 o3만 변경 (객체를 immutability하게 다루기)

```js
var o1 = { name: "kim" };
//o1자체를 복사
var o2 = Object.assign({}, o1);
//복사의 결과값은 값은 같으나 다른 데이터 값을 가리킴
o1 === o2; //false
o2.name = "lee";
console.log(o1.name); // 'kim'
```

[`Object.assign()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 를 사용하여 `o1` 에 대한 데이터를 복사하여 사용하면 `o2.name` 을 바꿔서 `o1.name` 이 바뀌지 않습니다.

`Object.assign()` 은 첫번째 인자( target)는 값을 가져오며, return될 객체를 작성하고 두번째 인자(source)는 하나 이상의 출처 객체(복제할 대상)을 넣습니다.

## Nested Object : 중첩된 객체

위와 동일하지만 `o1` 객체안에 `score:[1,2]` 인 배열 값이 들어갔습니다.
`o2` 에 객체를 복사하면 primitiver값인 'kim'은 값이 복사되나 reference 값인 배열은 `o1.score` 의 배열 주소값이 복사됩니다.
그리고 `o2.score.push(3)` 을 실행하면 `o1.score =[1,2,3]`이 된 것을 볼 수 있습니다.

```js
var o1 = { name: "kim", score: [1, 2] };
var o2 = Object.assign({}, o1);
// o1과 o2는 다른 위치데이터를 생성함
// kim은 primitive이므로 복제시 다른 위치에서 값 자체가 복사됨
// score : [1,2]인 배열의 경우 다른 위치에서 생성된 데이터가 원래 o1 값의 데이터 위치를 가리킴
```

| Code                                   | value                    | Value                |
| -------------------------------------- | ------------------------ | -------------------- |
| var o1 = {name : 'kim',score : [1,2]}; | {name : 'kim', score : } | [1,2]                |
| var o2 = Object.assign({},o1);         | {name : 'kim', score : } | 위 [1,2] 데이터 위치 |

### `o2.score`도 다른 데이터 위치를 가리키게 하려면

```js
o2.score = o2.score.concat(); // 원본을 복제함 (인자는 추가할 값)
```

| Code                                   | value                    | Value |
| -------------------------------------- | ------------------------ | ----- |
| var o1 = {name : 'kim',score : [1,2]}; | {name : 'kim', score : } | [1,2] |
| var o2 = Object.assign({},o1);         | {name : 'kim', score : } | [1,2] |

위와 같이 concat 함수를 이용하여 배열을 복사하면 배열도 복사하여 `o1`과 `o2`는 완전히 별개의 데이터 주소 값을 가지게 됩니다.

### 응용

```js
function fn(person) {
  person.name = "lee";
}
var o1 = { name: "kim" };
var o2 = Object.assign({}, o1);
fn(o2);
console.log(o1, o2); // {name: "kim"} {name: "lee"}
```

## Object.freeze

`object.freeze()` 를 사용하여 불변 객체로 만들수 있습니다.

```js
var o1 = { name: "kim", score: [1, 2] };
Object.freeze(o1);
o1.name = "lee";
console.log(o1);
```

`Object.freeze(o1);` 얼리면 푸는 방법 없고, 풀려면 객체를 복제해야합니다.

원시값만 얼려지고, Object 값들은 변경 가능합니다 ( Object는 위치값만 저장됨으로 )

```js
o1.score.push(3);
o1.score; // [1,2,3]
```

Object 값까지 얼리려면 `Object.freeze(o1.score);`

## const vs Object.freeze

```js
const o1 = { name: "kim" };
const o2 = { name: "kim" };

o1 = o2; // error
// const : 변수가 가리키는 값을 변경 못하게 함

o1.name = "lee"; // {name : 'kim'}
// freeze : 속성에 대한 값 자체를 변경 못하게 함
```

<TagLinks />

<Comment />
