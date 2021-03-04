---
title: typescript - 기본 타입
meta:
  - name: description
    content: typescript - 기본 타입
  - property: og:title
    content: typescript - 기본 타입
  - property: og:description
    content: typescript - 기본 타입, ts, ts 기본 문법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/basic/
tags: ["TS"]
---

# 타입스크립트 기본 타입

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

## null / undified

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

## never

해당 함수의 맨 마지막까지 도달하지 않는다는 타입
절대로 발생하지 않는 값으로 에러 핸들링 함수에서 사용한다.<br>
주로 함수의 리턴 타입으로 에러가 발생할 경우 에러를 무시하고 계속 진행시키는 역할을 합니다.<br>
또는 대체 불가한 값을 만들 때 사용한다. **재할당 불가**

```ts
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {
    ...
  }
  // 여기는 도달하지 않아요
}

function errorThrow(): never {
  //에러 발생한 경우 중지하지 않고 throw 함수 실행
  throw new Error("error");
}
```

## union

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

### declear

- 전역변수를 만들거나, `d.ts`를 만들 때 사용합니다.

```ts
declare function setupMap(config: MapConfig): void;
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

// 이 함수는 어느 파일에서든지 사용할 수 있습니다.
setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```

### class private 변수

- private 변수 선언은 앞에 private를 붙이거나 앞에 #를 붙인다
- private 변수는 class내부에서만 활용 가능하며 class 밖에서는 부르지 못한다.

```ts
class Animal {
  #name: string;
  constructor(theName: string) { this.#name = theName; }
  bark() {
    return this.#name
  }
}
new Animal("Cat").#name // private 변수임으로 사용 불가
const rt = new Animal("Cat");
rt.bark();
```

### class protected 변수

- protected로 선언된 멤버를 파생된 클래스 내에서 접근할 수 있다는 점만 제외하면 private지정자와 매우 유사하게 동작합니다.

```ts
// private와 protected 차이

// 먼저 같은 코드를 private에서
class WWW {
  #name: string;
  constructor(name: string) { this.#name = name; }
  test() {return this.#name}
}

class Employee extends WWW {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      // 오류 -> 파생된 class에서도 private는 접근 불가
      return `Hello, my name is ${this.#name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
howard.test();
console.log(howard.#name); // 오류

// protected
class WWW {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends WWW {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      // 파생된 class에서는 사용가능
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류
```

### class getter setter

```ts
const fullNameMaxLength = 10;

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

### class 전역 프로퍼티

- 이 예제에서는 모든 grid의 일반적인 값이기 때문에 origin에 static을 사용합니다. 각 인스턴스는 클래스 이름을 앞에 붙여 이 값에 접근할 수 있습니다. 인스턴스 접근 앞에 this.를 붙이는 것과 비슷하게 여기선 전역 접근 앞에 Grid.를 붙입니다.

```ts
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
```

## axios response call interface

- 다음은 api를 받을때 response 값 타입을 정의하는 방법입니다.
- api는 promise로 받으니 Promise로 감싸주고 그 안에 AxiosResponse를 사용합니다.
- 그 안에 이미 정의한 interface를 가져와 완성합니다.

```ts {13}
import axios, { AxiosResponse } from "axios";
interface CovidSummaryResponse {
  Countries: any[];
  // {Country: "Afghanistan", CountryCode: "AF", Slug: "afghanistan", NewConfirmed: 241}
  Date: string;
  Global: any;
  Message: string;
}

// api axios response 정의
function fetchCovidSummary(): Promise<AxiosResponse<CovidSummaryResponse>> {
  const url = "https://api.covid19api.com/summary";

  return axios.get(url);
}

// 위 response interface 정의로 타입 추론
fetchCovidSummary().then(res => res.data.Message);
```

<TagLinks />

<Comment />
