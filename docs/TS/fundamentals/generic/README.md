---
title: typescript - 제네릭 (generic)
meta:
  - name: description
    content: typescript - 제네릭 (generic)
  - property: og:title
    content: typescript - 제네릭 (generic)
  - property: og:description
    content: typescript - 제네릭, ts, generic
  - property: og:url
    content: https://kyounghwan0generic1.github.io/blog/TS/Fundamentals/generic/
tags: ["TS"]
---

# 타입스크립트 제네릭

타입 스크립트의 제네릭에 대해 알아봅시다.

## 제네릭이란?

재사용성 높은 컴포넌트를 만들 때 사용되며, 한가지 타입보다 여러 타입에서 동작하는 컴포넌트를 생성하는데 사용합니다.

## 제네릭 안쓰고 여러 타입을 받는 법 / 왜 제네릭을 써야하는가

제네릭을 사용하지 않고 `any` 타입을 사용하면 여러 타입을 넣을 수 있습니다.

```tsx {1}
function logText(text: any): any {
  console.log(text);
  return text;
}
logText(10);
logText(true);
logText("hi");
```

그러나 `any`를 사용할 경우 함수의 인자로 어떤 타입이 들어갔으며, 어떤 타입을 반환해야하는지 알 수 없습니다. `any`는 타입 체크를 하지 않기 때문이죠. 타입 체크를 하지 않으면 관련 메소드가 힌트로 나오지 않습니다. 타입 스크립트의 가장 좋은 장점인 컴파일단에서 버그를 걸러주는 역할을 하지 않는 소리입니다.

그렇기 때문에 `any`를 사용하지 않고, 제네릭을 사용함으로 위 문제를 모두 커버할 수 있습니다.

## 사용법

제네릭은 함수의 파라미터를 넣는 것과 같이 사용합니다.

```tsx
// 1. 어떤 타입을 받을 건지 먼저 정의 (logText<T>)
// 2. params 타입으로 정의 (text: T)
function logText<T>(text: T): T {
  console.log(text);
  return text;
}
// 3. 함수를 호출할때 타입 정의
const str = logText<string>("a");
str.split(""); // string으로 정의했기때문에 split 가능

logText<boolean>(true); // type: boolean
logText<string>("hi");
logText<number>(10);
```

위 코드는 text라는 파라미터에 값을 넘겨 text를 리턴합니다. text에 어떤 값을 넣더라도 들어간 값에 대한 타입을 반환합니다.

```tsx
logText<number>(10);
```

logText 함수에는 넘기고자 하는 인자가 들어가고 그 인자에 대한 타입을 지정하면서 호출합니다.

```tsx {1,5}
function logText<number>(text: number): number {
  console.log(text);
  return text; // 10
}
logText<number>(10);
```

제네릭으로 넣어준 T는 인자로 받은 number 타입을 받아 number 타입으로 바뀌게 됩니다.<br> 동일하게 logText함수에 다른 타입을 지정하면 제네릭은 다르게 지정한 타입으로 바뀌게 됩니다.

## 제네릭 타입 가드 / 타입 제한

위 함수를 확장하여 만약 `console.log(text.length)`를 받는 다면 어떻게 할 수 있을까요?

```ts {2}
function logText<number>(text: number): number {
  console.log(text.length); // Property 'length' does not exist on type 'T'.ts(2339)
  return text;
}
logText<string>("dd");
```

`text`에 `.length` 메소드가 있다는 단서가 없기에 ts에서 위와 같은 에러가 뜨게 됩니다. string에 length 메소드가 있으나 ts 입장에서는 number, boolean을 넘기면 length 메소드가 없기 때문에 허용하면 안되는 상황인 것이죠.

### 타입 가드를 이용해 특정 타입만 핸들링 할 수 있습니다.

```ts {2}
function logText<T>(text: T): T {
  if (typeof text === "string") {
    console.log(text.length);
  }
  return text;
}
```

위와 같이 string일 때만 length를 사용하도록 하는 것이죠.

### 인터페이스와 extends를 이용합니다.

아래와 같이 length에 대한 메소드를 인터페이스로 지정하고 제네릭에 인터페이스를 extends 시킵니다. <br>그에 따라 강제로 length 함수가 들어가게 되고 length 메소드를 실행할 수 있습니다. <br>
만약 number를 넣는다면 number에는 length 메소드가 없기 때문에 `LengthType` 인터페이스에서 걸러지게 됩니다.

```ts {6,12}
interface LengthType {
  length: number;
}

// 제네릭으로 받은 타입 T는 lengthType의 하위 타입이다. 즉, length: number는 무조건 포함됨
function logTextLength2<T extends LengthType>(text: T): T {
  text.length;
  return text;
}
logTextLength2("dd");
logTextLength2({ length: 3, q: 22 });
logTextLength2(1); // Argument of type 'number' is not assignable to parameter of type 'LengthType'.
```

## 인터페이스 + 제네릭

인터페이스에 제네릭을 더하는 방법에 대해 알아보겠습니다. 아래의 두 코드는 같은 의미입니다.

```tsx
function logText<T>(text: T): T {
  return text;
}
// #1
let str: <T>(text: T) => T = logText;
// #2
let str: { <T>(text: T): T } = logText;
```

위와 같은 변형 방식으로 제네릭 인터페이스 코드를 작성합니다.

```tsx
interface GenericLogTextFn {
  <T>(text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn = logText; // Okay
myString(true);
myString(11);
myString("hi");
```

위 코드에서 만약 인터페이스에 인자 타입을 강조하고 싶다면 아래와 같이 변경할 수 있습니다.

```tsx
interface GenericLogTextFn<T> {
  (text: T): T;
}
function logText<T>(text: T): T {
  return text;
}
let myString: GenericLogTextFn<string> = logText;
myString("hi"); // ok
myString(11); // error
```

## 제네릭과 유니온의 공통점

제네릭과 유니온 타입이 둘다 여러 타입을 동시에 다룬다는 점에서 공통점이 있다

## 유니온의 단점

유니온 타입의 경우 두 타입의 공통된 메소드만 타입 추적을 해준다는 단점이 있고, 받은 값을 그대로 리턴시, 리턴 받은 값고 하나의 타입이 아닌 유니온 타입으로 지점되는 문제가 있다

```tsx {2,6,8}
function logText(text: string | number) {
  // string과 number의 공통된 메소드만 사용 가능
  return text;
}

// a의 타입은 string | number 이다. 그렇기 때문에 split 이용 불가
const a = logText("a");
// error: split does not exist on type string | number
a.split("");
```

위 처럼 유니온은 타입 가드를 한다 해도 return되는 값이 명확하지 않으므로 제네릭을 쓰는 것이 더 좋다

## 제네릭으로 들어온 타입에 임의로 지정한 interface만 사용하도록 제한

```ts {7}
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

// ShoppingItem에 있는 키중 한가지가 T가 된다 -> 함수는 'name' | 'price' | 'stock'만 쓸 수 있다.
function getShoppingItemOption<T extends keyof ShoppingItem>(item: T): T {
  return item;
}

getShoppingItemOption("name");
```

아래 예시는 제네릭을 선언할 때 `<O extends keyof T>` 부분에서 첫 번째 인자로 받는 객체에 없는 속성들은 접근할 수 없게끔 제한하였습니다.

```ts {1,6,7}
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```

## 제네릭이 가장 많이 쓰이는 부분

서버와 통신을 하는 api를 호출할때 제네릭을 가장 효율적으로 사용합니다.<br>
서버로부터 오는 res 값의 규칙에 제네릭을 씁니다. <br>
프로미스는 제네릭 타입으로 정의됩니다.

```tsx
function fetchItems(): Promise<string[]> {
  let items: string[] = ["a", "b", "c"];
  return new Promise(res => res(items));
}
```

## async / await

```ts
interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: string;
}
const fetchEmployees = async (): Promise<Array<Employee> | string> => {
  const api = "http://dummy.restapiexample.com/api/v1/employees";
  try {
    const response = await fetch(api);
    const { data } = await response.json();
    return data;
  } catch (error) {
    if (error) {
      return error.message;
    }
  }
};

const fetchEmployee = async (
  url: string,
  id: number
): Promise<Record<string, string>> => {
  const response = await fetch(`${url}/${id}`);
  const { data } = await response.json();
  return data;
};
```

<TagLinks />

<Comment />
