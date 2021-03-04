---
title: typescript - 타입 호환 (type-compatiability)
meta:
  - name: description
    content: typescript - 타입 호환 (type-compatiability), 타입스크립트, ts
  - property: og:title
    content: typescript - 타입 호환 (type-compatiability)
  - property: og:description
    content: typescript - 타입 호환 (type-compatiability), 타입스크립트, ts
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/type-compatiability/
tags: ["TS"]
---

# 타입 호환

타입 호환은 ts 코드에서 특정 타입이 다른 타입과 잘 맞는지를 의미합니다.
타입에 정의된 속성의 타입을 가지고 타입이 호환되는지를 확인합니다.

구조적 타이핑이라고도 부릅니다.

## 인터페이스에서 타입 호환

```tsx
interface Dev {
  name: string;
  skill: string;
}

interface Person {
  name: string;
}
let developer: Dev;
let person: Person;
developer = person; // Property 'skill' is missing in type '{ name: string; age: number; }' but required in type 'Dev'.ts(2741)
```

기본적으로 타입 호환은 오른쪽에 있는 타입이 더 많은 속성 및 구조적으로 더 크면 왼쪽과 호환이 됩니다. (부분집합이어야 가능)

```tsx
person = developer; // developer는 person 타입을 포함함으로 ok
```

## 클래스에서 타입 호환

클래스를 썻을 때도 동일하게 오른쪽에 있는 타입이 왼쪽을 포함하여야 합니다.

```ts
interface Dev {
  name: string;
  skill: string;
}

class Person {
  name: string = "name";
}
let developer: Dev;
developer = new Person(); // Property 'skill' is missing in type 'Person' but required in type 'Dev'.ts(2741)
```

타입이 맞지 않다록 말하는 것이 `구조적`이다 라고 부름
interface, class 이름에 의해 `구조`를 판단하는 것이 아니라, 내부의 속성값과 속성값에 대한 타입에 대한 정의에 의해 `구조`를 판단합니다.

## 함수에서 타입 호환

```ts
const add = function(a: number) {};

const sum = function(a: number, b: number) {};
// 1번과 2번의 차이는 sum 함수 구조 > add 함수 구조
add = sum; // Type '(a: number, b: number) => number' is not assignable to type '(a: number) => void'.ts(2322)
sum = add; // ok
```

## 제네릭에서 타입 호환

위와 동일하게 정의된 타입이 더 큰곳이 할당 받을 수 있습니다.<br>
두 타입이 다를 경우, 포함하지 않을 경우 할당 불가능합니다.

```ts
interface Empty<T> {}

var empty1: Empty<string>;
var empty2: Empty<number>;
empty2 = empty1;
empty1 = empty2;
interface NotEmpty<T> {
  data: T;
}
var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;
notempty2 = notempty1; // Type 'NotEmpty<string>' is not assignable to type 'NotEmpty<number>'. Type 'string' is not assignable to type 'number'.
```

<TagLinks />

<Comment />
