# 자바스크립트 기본

## 배열 삭제

```js
var num = [100, 200, 300, 400, 500];
// 400, 500 삭제하기
const newNum = num.filter((el) => el !== 500 && el !== 400);
```

## splice 사용법

```js
var arr = [200, 100, 300];
// [200, 100, 10000, 300] 만들기

const target = arr.indexOf(300);
arr.splice(target, 0, 10000);
```

- `splice`는 1번 파람에 데이터를 추가, 삭제, 수정할 타겟 인덱스
- 2번 파람에 삭제한다면 지울 갯수
- 3번 파람에 추가 or 수정 할 값을 넣는다.

## falsy 값 종류

- falsy: `0`, `''`, `NaN`, `false`, `null`, `undefined`

## 변수명 짓기 규칙

- 특수기호 : `_`, `$` 만 사용가능
- 문자열 - 예약어는 불가능 (var, let, const, function, for 등등)
- 숫자: 첫번째 숫자만 불가능

## 객체 접근 방법 차이 (점접근, 곽괄호)

```js
var d = {
  test: 120,
  test: 1000,
};

// 점 접근
d.test; // 1000

// 곽괄호 접근
d["test"]; // 1000
```

- 곽괄호는 string값을 넣어줘야한다.
- 객체의 키이름이 중복될경우 밑에 정의한 키, 값으로 할당된다.

## concat 사용법

- conscat은 배열과 문자열에 사용 가능하다.

```js
var test = "안";
var test2 = "하";
console.log(test.concat("녕", test2, "세요")); // 안녕하세요
```

## class 사용법

다음 소스코드에서 클래스를 작성하여 게임 캐릭터의 능력치와 '파이어볼'이 출력되게 만드시오.
주어진 소스 코드를 수정해선 안됩니다.

```js
// 데이터
// <여기에 class를 작성하세요.>

const x = new Wizard(545, 210, 10);
console.log(x.health, x.mana, x.armor);
x.attack();

// 출력
// 545 210 10
// 파이어볼
```

```js
// 클래스 만들기
class Wizard {
  // 객체에서 인스턴스가 생성될때 반드시 생성되어 변수 초기화함
  constructor(health, mana, armor) {
    // wizard의 health는 this을 가진 변수
    this.health = health;
    this.mana = mana;
    this.armor = armor;
  }
  attack = function() {
    console.log("파이어볼");
  };
}

const x = new Wizard(545, 210, 10);
console.log(x.health, x.mana, x.armor);
x.attack();
```

- class는 constructor를 가진다 (react class component 와 유사)
- constructor의 내부에 init value를 세팅한다
- class의 내부의 변수는 `this`로 접근 가능하다.
- react의 class component와 비슷하게 메소드는 constructor의 바깥에 정의한다.
- 만든 클래스 사용은 `new className`으로 사용한다

## set 사용법

- set: 중복되지 않는 데이터를 저장하는 데이터 구조
- set 객체안의 데이터는 중복을 허용하지 않는다. (객체, 배열은 주소값)

```js
const list = [1, 2, 2, 3, 4, 5, 6, 6, 6, 6];

// Set 생성
let setVal = new Set(list);

setVal.add({ id: 1 });

setVal.delete(7);

console.log(setVal.has(8));
```

## 시간복잡도

- 문제 해결 시간이 일정할 때 o(1) - array의 개수가 커져도 메소드의 작동시간이 일정하면 o(1)
- arr[i] -> arr의 개수가 아무리 커도 index에 접근방법은 1개이므로 o(1)
- arr.push(5) -> 배열의 가장 끝에 푸시의 매개변수를 넣는 것이므로, 그던, 작던 끝에만 추가하는 행동만 함으로 o(1)
- arr.slice() -> slice의 매개변수만큼 잘라서 새로운 배열을 만드는 메소드 -> 시간복잡도는 가장 최악을 대상으로 함으로 o(n)
- arr.pop() -> 배열의 가장 끝 원소를 제거 o(1)
- arr.includes(5) -> 배열의 매개변수 값을 찾아서 true,false -> 배열의 원소만큼 찾아서 매개변수를 비교함으로 o(n)

## Factory 함수

- 함수가 함수를 리턴하는 함수를 Factory 함수라 부른다

```js
function one(n) {
  function two(x) {
    console.log(x);
    return Math.pow(x, n);
  }
  return two;
}

const a = function(x) {
  return Math.pow(x, 2);
};
const b = one(3);
const c = one(4);

console.log(a(10));
```

## 중복되는 요소 카운팅 후 가장 많은 요소 찾기

```js
function test(str) {
  let newStr = str.split(" ");
  let result = {};
  for (let i = 0; i < newStr.length; i++) {
    let val = newStr[i];
    result[val] = result[val] === undefined ? 1 : result[val] + 1;
  }
  const key = Object.keys(result).reduce(function(a, b) {
    return result[a] > result[b] ? a : b;
  });

  return `${key} ${result[key]}`;
}

console.log(test("원범 원범 혜원 혜원 혜원 혜원 유진 유진 유진 유진 유진"));
```

<TagLinks />

<Disqus />
