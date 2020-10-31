---
title: 인터페이스
meta:
  - name: description
    content: 타입스크립트 - 인터페이스, interface
  - property: og:title
    content: 타입스크립트 - 인터페이스, interface
  - property: og:description
    content: 타입스크립트 - 인터페이스, interface, typeScript, ts, ts 기본 문법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/interface/
tags: ["TS"]
---

# 인터페이스

타입 스크립트의 기본 타입에 대해 알아봅니다.

## boolean

```ts
const bol: boolean = true;
```

## number

```ts
const naturalNumber: number = 100;
const integer: number = 0.1;
```

## string

```ts
const hangle: string = "한글";
```

**4. null / undified**

```ts
const a: null = null;
const b: undefined = undefined;
```

## object

- 필수 속성 : 해당 속성이 없으면 에러 도출

```ts
const required: { name: string; age: number } = { name: "nkh", age: 999 };
```

- 선택 속성 : 꼭 없어도 되는 속성 하지만 있다면 타입을 맞춰야함, `?`를 붙인다

```ts
const selection: { name: string; age?: number } = { name: "nkh" };
```

- 읽기 전용 속성 : 읽기만 가능하고 재할당 금지, cons와 비슷한 기능

```ts
const readOnly: {readOnly name: string} = {name: "nkh"}
//readOnly.name = 'error' - 재할당 불가
```

## array

```ts
// string만 받는 배열
const onlyString: string[] = ["a", "b"];
// 제네릭
const onlyString: Array<string> = ["a", "b"];

// number만 받는 배열
const onlyNumber: number[] = [1, 2];
// 제네릭
const onlyNumber: Array<number> = [1, 2];

//여러가지 오면 any 타입으로 정의
```

## tuple

튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되이 있는 배열 형식입니다.

```ts
const arr: [string, number] = ["string", 10]; // 배열의 길이 및 타입이 고정됩니다. 정의 되지 않은 타입, 인덱스로 접근시 오류가 납니다.
```

## Enum

상수의 집합입니다. html의 option 태그 같이 어떠한 종류에 대한 지정된 타입이 들어오는 경우 틀린 상수 값이 들어오는 것을 막기 위해 Enum으로 상수의 집합을 만들고, 그 이외의 값은 받지 않습니다.

```ts
enum PhoneType {
  Home = "home",
  Office = "office",
  Studio = "studio"
}
const str: PhoneType = PhoneType.Home;
```

## any

말 그대로 모든 타입을 허용한다는 의미입니다. 자바스크립트로 된 파일을 타입스크립트로 바꿀 경우 한번에 데이터를 정적인 타입으로 바꾸는 것이 어렵기에 천천히 타입을 적용하기 위해 일단 모든 데이터에 대해 `any`로 적용하고, 점진적으로 정적 타입으로 값을 적용합니다.

```ts
const anyType: any = ["ddd", 2, true];
```

## void

변수에는 `undefined`, `null`만 할당이 가능하고, 함수에는 return 값이 없을 때, 설정하는 타입입니다.

```ts
const unuseData: void = undefined;

function notReturnValue(): void {
  console.log(1);
}
```

## Never

해당 함수의 맨 마지막까지 도달하지 않는다는 타입

```ts
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {
    ...
  }
  // 여기는 도달하지 않아요
}
```

<TagLinks />

<Disqus />
