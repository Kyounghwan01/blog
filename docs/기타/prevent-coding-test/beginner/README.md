# 자바스크립트 기본

## 배열 삭제

```js
var num = [100, 200, 300, 400, 500];
// 400, 500 삭제하기
const newNum = num.filter(el => el !== 500 && el !== 400);
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
  test: 1000
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
  attack = function () {
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
- 만든 클래스 사용은 `new className`으로 사용한다.
