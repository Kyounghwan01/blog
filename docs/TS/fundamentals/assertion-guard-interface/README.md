---
title: typescript - 타입 추론 / 단언 / 가드
meta:
  - name: description
    content: typescript - 타입 추론 / 단언 / 가드, interface, type guard, type assertion, &
  - property: og:title
    content: typescript - 타입 추론 / 단언 / 가드
  - property: og:description
    content: typescript - 타입 추론 / 단언 / 가드, interface, type guard, type assertion, &
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/assertion-guard-interface/
tags: ["TS"]
---

# 타입스크립트 타입 추론 / 단언 / 가드

## 타입 추론

타입스크립트가 해당 코드를 판단하는 기준에 대해 알아봅니다.

### 기본

타입스크립트는 코드에서 변수를 선언하거나, 할당 할때 추론이 일어납니다.

```ts
let x = 3; // 선언함으로 x는 number라는 추론 일어남
```

또는 함수를 선언하고, 파라미터에 기본값을 넣으면 추론 일어납니다.

```ts
// 파라미터에 기본값을 선언함으로 b는 number라는 추론이 일어남
function test(b = 10) {
  return b;
}
```

### 인터페이스 추론

```ts
interface DropDown<T> {
  value: T;
  title: string;
}

interface DetailedDropDown<K> extends DropDown<K> {
  des: string;
  tag: K;
  /** extends에 의해 아래 타입이 추가됨
   *  value: K, title: string
   * */
}

// 인터페이스의 제네릭의 값에 따라 정의된 타입이 론되는 상황
let shoppingItem: DropDown<string> = { value: "test", title: "test2" };
let detailedItem: DetailedDropDown<string> = {
  value: "test3",
  title: "test4",
  des: "test5",
  tag: "test6"
};
```

### best common type 추론 방식

배열 안에 여러 타입이 정의된 경우 추론은 유니온 타입으로 정의됩니다

```ts
const arr = [1, 2, true, "string"]; // (number | boolean | string)[]
```

## 타입 단언 (type assertion)

타입스크립트에서 추론하는 값보다 개발자가 해당 변수의 타입을 더 잘 알고있을때, 변수에 원하는 타입을 강제로 부여합니다.

```tsx
let a;
a = "20";
a = 10;
let b = a;
// ts에서 a는 any로 추론하기 때문에 b도 any라고 ts는 추론한다.
// 그러나 개발자는 b가 10
// 즉, number임을 알기 때문에 b에 number를 강제로 assertion 한다

let b = a as string;
```

DOM Api를 조작할 때, 가장 많이 사용합니다. (querySelector, getElementById 등등)

```tsx
let div = document.querySelector(".container");

div.innerText = "..."; // error: Object is possibly null.
```

위처럼 정의하면 div는 **container이라는 class가 없을 수 있기 때문이다.** `HTMLDivElement | null` 이라는 타입을 보장받습니다. 타입 단언을 모른다면 null을 타입 가드 시켜주기 위해 아래와 같이 코드를 짭니다.

```tsx
let div = document.querySelector(".container");
if (div) {
  div.innerText = "...";
}
```

만약 container이라는 class가 코드가 실행되는 시점에 무조건 존재한다라고 개발자가 확신한다면 **type assertion**을 이용하여 타입 가드를 제거하고 타입 단언으로 null 값을 제거합니다.

```tsx
let div = document.querySelector(".container") as HTMLDivElement;

div.innerText = "...";
```

## 타입 가드 (type guard)

함수의 파라미터로 유니온 타입이 지정되는 경우 타입이 2개 이상임으로 공통되는 속성만 사용이 가능합니다. 이럴 경우 각 타입을 분기 처리하여 타입별로 로직을 분리 하기 위한 작업입니다.

```tsx
interface Dev {
  name: string;
  skill: string;
}
interface Person {
  name: string;
  age: number;
}

function introduce(): Dev | Person {
  return { name: "d", age: 33, skill: "c" };
}
const tony = introduce(); // Dev | Person 으로 공통된 속성만 사용가능. 즉, tony.skill 불가

// skill을 빼고 싶다면? -> type assertion으로 사용 가능
if ((tony as Dev).skill) {
  console.log((tony as Dev).skill);
} else if ((tony as Person).age) {
  console.log((tony as Person).age);
}
// 너무 assertion을 많이 씀으로 타입 가드 함수를 만든다.

// 타입 가드 정의
// target is Dev -> 넘겨 받은 파라미터가 해당 타입인지를 확인
function isDev(target: Dev | Person): target is Dev {
  // skill이 있다면 Dev이다
  return (target as Dev).skill !== undefined;
}
if (isDev(tony)) {
  // name, skill 사용 가능
  console.log(tony.skill);
} else {
  // name, age 사용 가능
  console.log(tony.age);
}
```

<TagLinks />

<Comment />
