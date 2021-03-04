---
title: typescript - 타입 별칭 (type-aliases)
meta:
  - name: description
    content: typescript - 타입 별칭 (type-aliases), 타입스크립트, ts
  - property: og:title
    content: typescript - 타입 별칭 (type-aliases)
  - property: og:description
    content: typescript - 타입 별칭 (type-aliases), 타입스크립트, ts
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/type-aliases/
tags: ["TS"]
---

# 타입 별칭

타입 별칭은 인터페이스와 거의 비슷한 기능을 합니다. 객체 또는 함수에 대한 타입 정의를 하는 일을 합니다. 또한 인터페이스를 참조 가능합니다. <br>
사용법은 아래와 같습니다.

```ts
type Developer = {
  name: string;
  skill: string;
};
```

타입 별칭에도 제네릭 사용 가능합니다.

```ts
type typeGeneric<T> = {
  name: T;
};
```

## 특징

타입 별칭은 새로운 타입 값을 하나 생성하는 것이 아니라 정의한 타입에 대해 개발자가 쉽게 관찰하도록 이름을 부여하는 것과 같습니다. <br> 그래서 interface를 정의하고 커서를 hover하면 `interface xx` 이렇게 나오지만 type은 `type xx = {xx: xx}` 이렇게 상세하게 나오게 됩니다.

## 인터섹션에 의한 확장

타입 별칭은 extends라는 명령어가 없고 인터섹션(&)를 이용해 확장 합니다. 사용방법은 아래와 같습니다.

```ts
type test1 = { name: string };

type test2 = test1 & { age: number };

const test3: test2 = { name: "d", age: 33 };
```

위 방법은 엄밀히 따지면 인터섹션을 이용하여 `test1` 타입과 추가된 타입을 합하여 새로운 타입을 정의한 것이지 `test1` 타입을 extends로 상속 받아 확장하는 개념이 아닙니다. 그러므로 type은 extend가 안되기 때문에 왠만하면 interface를 쓰도록 합니다.

## 타입 별칭에서 특정 속성만 제외

```ts
type XYZ = {
  x: number;
  y: number;
  z: number;
};
// y, z 속성을 제외하여 아래처럼 만들고 싶다
type X = { x: number };
```

- ts 버전 3.5이상에서는 `Omit`을 사용하면 됩니다.

```ts
type X = Omit<XYZ, "x" | "y">;
// type X = { x: number };
```

<TagLinks />

<Comment />
