---
title: 함수형 프로그래밍 - iterator (이터레이터) 정의
meta:
  - name: description
    content: 함수형 프로그래밍 - iterator (이터레이터) 정의
  - property: og:title
    content: 함수형 프로그래밍 - iterator (이터레이터) 정의
  - property: og:description
    content: 함수형 프로그래밍 - iterator (이터레이터) 정의
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/functional-programming/iterator/
tags: ["JS", "functional"]
---

# iterator 정의

이터레이터가 뭐인지 알아보기 전에, 이터레이터가 어디에 쓰이고, 왜 쓰이는지 알아봅시다.

## 배열 순회

es5에서 배열 순회는 for문을 통해 아래와 같이 실행했습니다.

```js
const test = [1, 2, 3, 4];

for (var i = 0; i < test; i++) {
  console.log(test[i]);
}
```

es6에서는 for of문으로 좀더 간결하게 만들 수 있게 되었습니다.

```js
const test = [1, 2, 3, 4];

for (const i of test) {
  console.log(i);
}

const Maps = [
  ["a", 1],
  ["b", 2],
  ["c", 3]
];

const map = new Map(Maps);
for (const a of map) console.log(a);

console.log(map[1]); // undefined
```

여기서 중요한 점은 es5의 경우 `test[i]`를 통해 배열의 내부로 접근 할 수 있으나
es6 문법인 Map, Set의 경우 `map[i]`이런 식으로 접근하면 undefined가 뜨는 것을 볼 수 있습니다.
es5에서 다루는 방식과 다른 방법으로 순회를 돈다는 뜻입니다.

es6문법은 이터레이터를 이용하여 순회를 합니다.
이 이터레이터에 대해 알아보겠습니다.

## 이터러블

이터러블은 객체의 값을 반복 순회하도록 하는 객체입니다.
js에서 객체가 이터러블 하기 위해서는 해당 값에 `Symbol.iterator`를 가지고 있어야합니다.
해당 객체는 1개의 `Symbol.iterator`를 가집니다.
또 `Symbol.iterator`의 return 값은 `Symbol.iterator`이죠
그렇기 때문에 아래 코드도 이상없이 작동합니다.

```js
const test = [1, 2, 3, 4];
const testIter = test[Symbol.iterator]();
// testIter도 이터레이터이기 때문에 순회가 가능하다.

for (const a of testIter) {
  console.log(a); // 1,2,3,4
}
```

결론적으로 es6 문법인 Map을 정의하면 그 내부에는 `Symbol.iterator`라는 속성을 가지고 있고, 그 속성이 순회를 돌게합니다.
즉, 이터러블은 **이러테이터를 리턴하는 [Symbol.iterator]()를 가진 값** 으로 정의할 수 있습니다.

## 이터레이터

이터레이터는 객체를 next 메소드로 순회 할 수 있는 객체입니다.
좀더 쉽게 말하면 이터러블에 의해 리턴된 값이라고 볼 수 있습니다.
이 이터레이터는 `{value, done}` 객체를 가지고, `next`메소드로 다음 `{value, done}`값을 찾을 수 있습니다.

### `next`의 특징

1. next 메소드에는 인자(argument)가 없습니다.
2. next 메소드의 return값은 `done: boolean 과 value: any` 를 포함하는 object 를 반환해야 합니다.
3. 반복이 종료될때는 무조건 `{done: true}`를 리턴합니다.

```js
var iterator = "12"[Symbol.iterator]();
iterator.next(); // {value: "1", done: false}
iterator.next(); // {value: "2", done: false}
iterator.next(); // {value: undefined, done: true}
```

## 이터레이터 직접 구현

위 개념들을 이용해 이터러블과 그 반환값인 이터레이터를 직접 구현해 봅시다.

```js
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      // 1. next 메소드에는 인자(argument)가 없습니다.
      next() {
        // 2. next 메소드의 return값은 `done: boolean 과 value: any` 를 포함하는 object 를 반환해야 합니다.
        // 3. 반복이 종료될때는 무조건 `{done: true}`를 리턴합니다.
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      // 4. 이터레이터를 실행한 값은 자기자신 이터레이터를 가져야한다.
      [Symbol.iterator]() {
        return this;
      }
    };
  }
};

let iterator = iterable[Symbol.iterator]();

// for (const a of iterator) log(a);
```

## 이터레이터, 이터러블 구분

이터러블은 이터레이터를 가지고 있습니다. (이터레이터를 가지고있지만 실행은 안했기에 `next`메소드 사용 불가능)

이터레이터는 `next`메소드를 가지고 있고 `{done, value}`객체를 가지고 있습니다.

## 전개연산자

전개연산자도 이터레이터를 이용하여 작동합니다.

```js
let a = [1, 2, 3];
a[Symbol.iterator] = null;
console.log([...a]); // error Uncaught TypeError: a is not iterable

// 즉, 이터레이터를 사용한다는 의미입니다.
```

### 전개 연산자 예시

```js
const a = [1, 2, 3];
const c = [4, 5, 6];
console.log([...b, ...c]); // [1,2,3,4,5,6]
```
