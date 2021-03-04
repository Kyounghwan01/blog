---
title: typescript - 인터페이스 (interface)
meta:
  - name: description
    content: 타입스크립트 - 인터페이스, interface
  - property: og:title
    content: 타입스크립트 - 인터페이스, interface
  - property: og:description
    content: 타입스크립트 - 인터페이스, interface, typeScript, ts
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Fundamentals/interface/
tags: ["TS"]
---

# 인터페이스

타입 체크에 있어서 ts의 지향점은 타입 체크는 값의 형태에 기반하여 이루어져야 한다는 점입니다. 이것을 duck typing이라고 합니다.

## duck typing

만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거린다면 그 새를 오리라고 부를 것이다.
덕 타이핑에서는 객체의 타입보다 객체가 사용되는 양상이 중요하다. 즉, 객체의 변수, 메소드의 집합으로 객체의 타입이 결정되는 것이다.

결국 하고자 하는 말은 타입 스크립트는 현재 가지고 있는 메소드 및 값에 의해 타입 체크가 이루어져야 한다는 것이다.

## 인터페이스의 장점 및 사용법

```ts
let person = { name: "Capt", age: 28 };

function logAge(obj: { age: number }) {
  console.log(obj.age); // 28
}
logAge(person); // 28
```

위 처럼 함수의 param에 객체의 속성 타입을 정의 할 수 있습니다.

```ts
interface personAge {
  age: number;
}

function logAge(obj: personAge) {
  console.log(obj.age);
}
let person = { name: "Capt", age: 28 };
logAge(person);
```

그러나 인터페이스를 사용하면 함수의 인자가 좀 더 명시적으로 바뀝니다. 또한 같은 타입을 사용할 경우 재사용이 가능합니다.<br>
인터페이스를 사용할 때는, 함수내에 사용할 속성에 대해서만 인터페이스를 지정해줘도됩니다. <br>또한 인터페이스 내의 속성 순서를 지키지 않아도 됩니다.

## Optional 프로퍼티

인터페이스를 사용할 떄 인터페이스 내에 정의한 속성 전부를 사용하지 않아도 됩니다. 이를 옵션 속성이라고 합니다. `?`를 이용하여 사용합니다.

```ts
interface TestType {
  test: string;
  test2?: number;
}

let testProp = {
  test: "tttt"
  // test2는 옵션 값임으로 있어도 되고, 없어도 됩니다.
};
function testFunc(param: TestType) {
  console.log(param.test); // tttt
}
testFunc(testProp);
```

## 읽기 전용 속성

읽기 전용 속성은 객체를 처음 생성할 때만 값을 할당하며, 그 이후로는 값이 바꿀수 없는 속성을 의미 합니다. `readonly` 속성을 앞에 붙입니다.

```ts
interface ReadOnly {
  readonly test: string;
}
```

readonly로 선언하고 수정한다면 오류가 납니다.

```ts
let params: ReadOnly = {
  test: "test3"
};
params.test = "test4"; // error!
```

## 읽기 전용 배열

배열을 선언할 때 `ReadonlyArray<T>` 타입을 이용하면 읽기 전용 배열을 생성할 수 있습니다. 배열을 아래와 같이 선언하면 배열 내부의 값들을 변경할 수 없습니다. 선언 하는 시점에서만 값을 핸들링 가능합니다.

```ts
let arr: ReadonlyArray<number> = [1, 2, 3];
arr.splice(0, 1); // error
arr.push(4); // error
arr[0] = 100; // error
arr = [10, 20, 30]; // error
```

## 인터페이스에 정의되지 않은 속성 사용

만약 객체의 값으로 어떤 값이 들어올지 예상이 안되는 경우 interface를 정의할 수 없습니다. 그럴땐 지정한 타입으로 되있는 값은 무조건 받아주는 방법이 있습니다. 아래와 같이 사용합니다.

```ts
interface test {
  [key: string]: number;
}
const test: test = { anyone: 33, ddd: 22 };
```

## 함수 타입

인터페이스는 값 정의 말고도 함수 정의시에도 사용됩니다.<br>
인자에 대한 타입 정의 그리고 리턴값에 대한 타입을 정의합니다.

```ts
interface test {
  (test1: string, test2: number): boolean;
}

const test3: test = (a, b) => {
  console.log(a, b);
  // a -> string type 'a', b -> number type 2
  return true;
};
test3("a", 2);
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

## 인터페이스 확장

인터페이스의 재활용성을 높이기 위해 확장 기능을 사용합니다. <br>
확장시 대상이 된 인터페이스의 속성을 모두 사용할 수 있습니다. 또한 상속받은 값을 또 상속 가능합니다.

```ts
interface Person {
  name: string;
}
interface Drinker extends Person {
  drink: string;
}
interface Developer extends Drinker {
  skill: string;
}
let fe = {} as Developer;
fe.name = "josh";
fe.skill = "TypeScript";
fe.drink = "Beer";
```

## 하이브리드 타입

인터페이스에는 객체에 대한 정의 뿐만 아니라 함수에 대한 정의가 동시에 들어갈 수 있습니다.

```ts
interface CraftBeer {
  (beer: string): string;
  brand: string;
  brew(): void;
}

function myBeer(): CraftBeer {
  let my = function(beer: string) {} as CraftBeer;
  my.brand = "Beer Kitchen";
  my.brew = function() {};
  return my;
}

let brewedBeer = myBeer();
brewedBeer("My First Beer");
brewedBeer.brand = "Pangyo Craft";
brewedBeer.brew();
```

## enum

enum 타입을 쓸때 interface 사용법입니다.

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

## interface에 제네릭을 넣는 법

인터페이스에 제네릭 타입 넣는 법입니다.

```ts
interface Dropdown<T, G> {
  value: T;
  selected: G;
}

const obj2: Dropdown<string, boolean> = { value: "abc", selected: false };
```

## interface 종합 예제

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

<TagLinks />

<Comment />
