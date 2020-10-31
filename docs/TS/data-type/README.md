---
title: ts 기본 문법
meta:
  - name: description
    content: ts 기본 문법
  - property: og:title
    content: ts 기본 문법
  - property: og:description
    content: ts 기본 문법, typeScript, ts, ts 기본 문법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/data-type/
tags: ["TS"]
---

# ts 기본 문법

> 간단하게 TS내에서 원시값들이 어떻게 사용되는지 살펴보고, `vue.js`에서는 어떻게 사용하는지 알아봅니다.

## 기본 타입

**1. boolean**

```ts
const bol: boolean = true;
```

**2. number**

```ts
const naturalNumber: number = 100;
const integer: number = 0.1;
```

**3. string**

```ts
const hangle: string = "한글";
```

**4. null / undified**

```ts
const a: null = null;
const b: undefined = undefined;
```

## 참조 타입

**1. object**

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

**2. array**

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

**3. function**

```ts
//인자로 strin, number 받아 object 리턴할 때
function stringOrNumber(str: string, num: number): object {
  return { str, num };
}
stringOrNumber("nkh", 999);

//인자로 객체 받을 때
function functionType(labelObj: { label: string }): object {
  return labelObject;
}
functionalType({ label: "asd" });
```

## 특별한 타입

**1. any**

> 모든 타입이 사용 가능하다. 사실상 자바스크립트와 다를 바 없음<br>
> 코드 작성 시점에서 이 값이 뭘 받을 지 모를 때, 알 수 없는 값으로 표기<br> > `vue.js`에서는 `ts-lint`가 `any`값을 `unknown`으로 바꾸라 가이드 함

```ts
const anything: any = 123;
const anything: unknown = 123;
```

**2. void**

> null 혹 undified 값만을 가지며, 다른 값을 가지면 오류를 도출 한다.<br>
> return 값이 없는 함수에 사용한다.<br> > `vue.js`내에서는 라이프사이클 `create` 함수에서 사용한다.

```ts
function noting(): void {}
```

**3. never**

> 절대로 발생하지 않는 값으로 에러 핸들링 함수에서 사용한다.<br>
> 주로 함수의 리턴 타입으로 에러가 발생할 경우 에러를 무시하고 계속 진행시키는 역할을 합니다.<br>
> 또는 대체 불가한 값을 만들 때 사용한다. **재할당 불가**

```ts
function errorThrow(): never {
  //에러 발생한 경우 중지하지 않고 throw 함수 실행
  throw new Error("error");
}
```

## type

```ts
//많이 쓰일 타입을 사전에 정의
type UUID = number
test():UUID { return : 1}
```

## union 타입

- union 타입은 하나의 변수에 여러 타입을 지정할 수 있습니다. 여러 타입을 지정하고 싶은 경우 `|`를 사용합니다.

```ts
let value: string | number = "foo";
value = 100; //ok
value = "bar"; //ok
value = true; //error
```

### union 인터셉션

- `|`는 또는 이라면 `&`는 and 입니다.

```ts
interface Test {
  name: string;
  skill: string;
}
interface Test2 {
  name: string;
  age: string;
}

function ask(someone: Test | Test2) {
  console.log(someone.name); // interface의 공통 속성으로 접근 가능
  // someone.skill, age는 공통속성이 아니므로 접근 불가능

  // 접근하고 싶다면 타입 가드로, 하나의 타입만 필터링 한 경우만 활용 가능
}

// &를 이용하면 3개의 속성 활용 가능 (인터섹션)
function ask(someone: Test & Test2) {
  // Test와 Test2 두개의 interface를 포함하게 타입 정의
  console.log(someone.name);
  console.log(someone.skill);
  console.log(someone.age);
}
```

- |를 쓰면 함수 호출시 두개의 인터페이스 중 1개만 보장해주면 되나, &를 쓰면 함수 호출시 두개의 인터페이스 타입을 다 보장해줘야하므로 |를 좀 더 많이 쓴다.

### union 타입 가드

- 여러 타입을 사용하면 해당 값의 타입에 따라 분기 처리할 때가 있습니다. 이럴 경우 각 타입에 따라 조건문을 만들어 주시면 됩니다.

```ts
function unionIter(value: string | number): number {
  if (typeof value === "string") {
    return value.length;
  }
  return value;
}
```

## interface

> 인터페이스는 **여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입**을 정의하는 것<br>
> api를 통해 받아올 객체 또는 **배열의 속성 타입 값을 미리 정의**하여 사전 에러 차단<br>
> interface 값이 너무 많아지면 `@module`로 interface 값만 따로 관리<br>
> 변수 선언과 동일하게 선택 속성, 읽기전용(readOnly) 사용가능<br>
> interface에 없는 값 쓰고 싶을때 `as interface이름` 추가<br>
> interface로 union type으로 타입 정의 가능

```vue
<script lang="ts">
export interface Todo {
  id: number;
  name: string;
  things?: object;
  readonly password: number;
}
export default Vue.extend({
  data() {
    return {
      //위에 정의한 Todo 인터페이스 타입을 져온다.
      toDos: [] as Array<Todo>
    };
  },
  methods: {
    AddData(data: Todo): Array {
      //Todo 인터페이스에 없는 'wantToAdd' 속성을 넣으려면 뒤에 'as Todo'를 넣는다.
      this.toDos.push({
        id: 1,
        name: nkh,
        password: 1234,
        wantToAdd: "add"
      } as Todo);
      return data;
    }
  }
});
</script>
```

## type vs interface

- Use an interface instead of a type literal.tslint(interface-over-type-literal)
- type은 리터럴, interface는 object 형태에 사용하라 가이드 한다.

```ts
export type TSomeMemberTier = "Basic" | "Premium" | "Admin";

export interface SomeMember {
  name: string;
  age: number;
  address: string;
  tier: TSomeMemberTier;
}
```

## type의 특정 property만 제외

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

## class에서 ts 사용 예제

```tsx
class Person {
  // 이 클래스안에서만 사용한다면 private
  private name: string;
  public age: number;
  // 값 읽기만 가능, set 불가
  readonly log: string;

  constructor(name: string, age: numnber) {
    this.name = name;
    this.age = age;
  }
}
```

## 제네릭

- 한가지 타입보다 여러 타입에서 동작하는 컴포넌트를 생성하는데 사용
- 함수의 파라미터로 받아 내부로직을 돌리는 것

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

const login = logText<boolean>(true); // type: boolean
```

### 제네릭과 유니온의 공통점

제네릭과 유니온 타입이 둘다 여러 타입을 동시에 다룬다는 점에서 공통점이 있다

### 유니온의 단점

유니온 타입의 경우 두 타입의 공통된 메소드만 타입 추적을 해준다는 단점이 있고, 받은 값을 그대로 리턴시, 리턴 받은 값고 하나의 타입이 아닌 유니온 타입으로 지점되는 문제가 있다

```tsx
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

### 제네릭 타입 제한

- 제네릭으로 들어온 타입에 임의로 지정한 inteface를 확장한다

```ts
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
```

- 제네릭으로 들어온 타입에 임의로 지정한 interface만 사용하도록 제한

```ts
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

### 제네릭이 가장 많이 쓰이는 부분

api를 호출해서 오는 res 값의 규칙에 제네릭을 쓴다

프로미스는 제네릭 타입으로 정의됨

```tsx
function fetchItems(): Promise<string[]> {
  let items: string[] = ["a", "b", "c"];
  return new Promise(res => res(items));
}
```

### 특정 객체에 키 값를 정의하지 않았을때 타입

```tsx
interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}
const contacts: PhoneNumberDictionary[] = [
  {
    home: {
      num: 11122223333
    },
    office: {
      num: 44455556666
    }
  }
];
```

### enum

```tsx
interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

enum PhoneType {
  Home = "home",
  Office = "office",
  Studio = "studio"
}

const contacts: Contact[] = [
    {
      name: "Tony",
      address: "Malibu",
      phones: {
        home: {
          num: 11122223333
        },
        office: {
          num: 44455556666
        }
      }
    }
]

// home, office, studio
  // phoneType이 정해진 타입으로 들어올때 -> enum으로 타입 정의 -> string으로도 가능하지만 객체 key 값의 오타를 방지하기 위해 enum을 사용
  findContactByPhone(phoneNumber: number, phoneType: PhoneType): Contact[] {
    return this.contacts.filter(
      contact => contact.phones[phoneType].num === phoneNumber
    );
  }

findContactByPhone(1, PhoneType.Home);
```

### interface에 제네릭을 넣는 법

```ts
interface Dropdown<T, G> {
  value: T;
  selected: G;
}

const obj2: Dropdown<string, boolean> = { value: "abc", selected: false };
```

### interface 종합 예제

```ts
interface DropDownItem<T> {
  value: T;
  selected: boolean;
}

const emails: DropDownItem<string>[] = [
  { value: "naver.com", selected: true },
  { value: "gmail.com", selected: false },
  { value: "hanmail.com", selected: false }
];

const numberOfProducts: DropDownItem<number>[] = [
  { value: 1, selected: true },
  { value: 2, selected: false },
  { value: 3, selected: false }
];

// email과 number 둘다 받아야하는 상황
function createDropdownItem<T extends { toString: Function }>(
  item: DropDownItem<T>
): HTMLOptionElement {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

emails.forEach(function(email) {
  const item = createDropdownItem<string>(email);
  const selectTag = document.querySelector("#email-dropdown");
  selectTag?.appendChild(item);
});

numberOfProducts.forEach(function(products) {
  const item = createDropdownItem<number>(products);
});
```

### 타입 추론

- 타입스크립트가 해당 코드를 어떻게 해석하는지

### 기본

- 변수를 선언하거나, 할당 할때 추론이 일어난다

```ts
let x = 3; // 선언함으로 x는 number라는 추론 일어남
```

- 함수를 선언하고, 파라미터에 기본값을 넣으면 추론 일어남

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

// 인터페이스의 제네릭의 값에 따라 정의된 타입이 추론되는 상황
let shoppingItem: DropDown<string> = { value: "test", title: "test2" };
let detailedItem: DetailedDropDown<string> = {
  value: "test3",
  title: "test4",
  des: "test5",
  tag: "test6"
};
```

### best common type 추론 방식

- 배열 안에 여러 타입이 정의된 경우 유니온 타입으로 정의됨

```ts
const arr = [1, 2, true, "string"]; // (number | boolean | string)[]
```

## 타입 단언 (type assertion)

- ts보다 개발자가 해당 변수의 타입을 더 잘알고있을때, 변수에 타입을 강제 삽입

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

- DOM Api를 조작할 때, 가장 많이 사용한다.
- querySelector, getElementById 등등

```tsx
let div = document.querySelector(".container");

div.innerText = "..."; // error: Object is possibly null.
```

위처럼 정의하면 div는 HTMLDivElement | null 이라는 타입을 보장받는다
**container이라는 class가 없을수도있기 때문이다.**
그래서 null을 타입 가드 시켜주기위해 아래와 같이 코드를 짠다

```tsx
let div = document.querySelector(".container");
if (div) {
  div.innerText = "...";
}
```

만약 container이라는 class가 코드가 실행되는 시점에 무조건 존재한다라고 개발자가 확신한다면 **type assertion**을 이용하여 타입 가드를 제거 할 수 있다.

```tsx
let div = document.querySelector(".container") as HTMLDivElement;

div.innerText = "...";
```

## 타입 가드 (type guard)

함수의 파라미터로 유니온 타입이 지정되는 경우 타입이 2개 이상임으로 공통되는 속성만 사용이 가능하다. 이럴 경우 각 타입을 분기 처리하여 타입별로 로직을 분리 하기 위한 작업

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

## 타입 호환 (type compatibility)

ts 코드에서 특정 타입이 다른 타입에 잘 맞는지 확인 (두 개의 타입이 서로 호환하는지 확인)

```ts
interface Ironman {
  name: string;
}

class Avengers {
  name: string;
}

let i: Ironman;
i = new Avengers(); // OK, js에서는
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

### `vue.js` 종합 예시

```vue
<template>
  <div class="hello">
    <p>{{ changeString }}</p>
    <p>{{ fullName }}</p>
    <p>{{ selection }}</p>
    <p>{{ readOnly }}</p>
    <p>{{ toDos }}</p>
    <p>unnion : {{ test2 }}</p>
    <p>promise : {{ fetchData }}</p>
    <button @click="noting">change changeString</button>
    <button @click="promiseTest">axios</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

//변수 인터페이스
export interface Todo {
  id: number | true;
  name: string;
}

interface SquareConfig {
  color?: string;
  width?: number;
  readonly test: string;
}

type UUID = string;

export default Vue.extend({
  data() {
    return {
      changeString: "test" as string,
      testArray: [123, 234] as unknown[],
      neverType: "never" as never,
      firstName: "noh" as string,
      lastName: "kh" as string,
      toDos: [] as Array<Todo>,

      union: "asdasd" as string | number,
      fetchData: [] as Array<unknown>
    };
  },
  computed: {
    fullName(): string {
      return this.firstName + this.lastName;
    },
    selection(): object {
      const select: { name: string; age?: number } = { name: "nkh" };
      return select;
    },
    readOnly(): object {
      const read: { readonly name: string } = { name: "nkh" };
      return read;
    },

    test(): UUID {
      return "test";
    },

    test2(): number {
      if (typeof this.union === "string") {
        return this.union.length;
      }
      return this.union;
    }
  },

  methods: {
    //unnion 분기처리
    te(union: string | number): string {
      if (typeof union === "number") {
        return String(union);
      }
      return union;
    },
    createSquare(config: SquareConfig): void {
      console.log(config);
    },
    functionalType(labelObj: { label: string }): object {
      //생성자에 없는 값 쓰고 싶을때
      this.createSquare({
        colour: "red",
        width: 100,
        test: "changeString"
      } as SquareConfig);
      return labelObj;
    },
    noting(): void {
      this.changeString = "asd";
      this.union = 123;
      const objectDec: { name: string | boolean; age: number } = {
        name: "name",
        age: 123
      };
      console.log(objectDec);

      //변수형 인터페이스
      this.toDos.push({ id: 123, name: "asd" });

      this.functionalType({ label: "asd" });
    },
    async promiseTest(): Promise<unknown> {
      const api = "http://dummy.restapiexample.com/api/v1/employees";
      const res = await axios.get(api);
      this.fetchData = res.data.data;
      return res.data.data;
    }
  }
});
</script>
```

## 날짜 비교

날짜를 비교할때 `new Date`객체를 이용하여 빼기 연산을 하는데, 이때 date 타입이 number가 아니기 때문에 타입스크립트에서는 에러를 낸다.
그래서 +를 이용하여 날짜객체를 숫자로 바꾸면 연산이 된다.

```ts
(res: bookingType[]) => [...res].sort((a, b) => +new Date(a.start_on) - +new Date(b.start_on)),
```

<TagLinks />

<Disqus />
