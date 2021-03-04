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


// set 자료형 응용
unction test47(members) {
  return new Set(Object.keys(members)).size;
}

console.log(
  test47({
    이호준: "01050442903",
    이호상: "01051442904",
    이준호: "01050342904",
    이호준: "01050442903",
    이준: "01050412904",
    이호: "01050443904",
    이호준: "01050442903"
  })
);
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

## 배열 줄세우기

- 줄 세우는 알고리즘은 먼저 소팅을 한다.

```js
function test(member) {
  let memberList = member.split(" ");
  let count = 3;

  memberList = memberList.sort((a, b) => b - a);
  for (let i = 0; i < memberList.length; i++) {
    if (memberList[i] !== memberList[i + 1]) {
      count--;
    }
    if (!count) return i + 1;
  }
}

console.log(test("97 86 75 66 55 97 85 97 97 95"));
```

## 문자 찾아서 바꾸기

```js
function test39(str) {
  // split, join으로 바꾸기
  return str.split("q").join("e");
  // 정규식으로 바꾸기
  return str.replace(/q/gi, "e");
}

console.log(test39("hqllo my namq is hyqwon"));
```

## 소수 판별

- 본인과 1을 제외한 숫자로 나누어떨어지지 않는 것

```js
function test41(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
    if (n === 1) {
      return false;
    }
    return true;
  }
}
```

## #년#월#일 요일 찾기

- Date 생성자 활용

```js
function test42(a, b, c) {
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const x = new Date(`${a}-${b}-${c}`);

  return day[x.getDay()];
}
```

## 10진수를 2진수로

```js
function test43(num) {
  let answer = [];
  while (num) {
    const count = num % 2;
    answer.push(count);
    num = Math.floor(num / 2);
  }
  return answer.reverse().join("");

  // 또는
  return num.toString(10);
}
```

## 배열내 요소 더하기, 비교

- 배열내 더하기, 비교하는 것은 reduce로 해결

```js
function test46() {
  let nums = "";
  for (let i = 1; i < 21; i++) {
    nums += i;
  }
  return nums.split("").reduce((prev, next) => prev + Number(next), 0);
}

console.log(test46());

// 최댓값 반환
function test49(str) {
  return str
    .split(" ")
    .reduce(
      (prev, next) => (prev <= next ? (prev = Number(next)) : (prev = prev)),
      0
    );
}

console.log(test49("10 9 8 7 6 5 4 3 2 1"));
```

## 버블정렬

```js
function test50() {
  let arr = [10, 8, 9, 2, 3, 5];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j]; // 두 수를 서로 바꿔준다
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

console.log(test50());
```

## comma

```js
const nums = 1000000000;
console.log(nums.toLocaleString()); // "1,000,000,000"
```

## 연속된 문자 숫자로 표현하기

```js
// aaaabbcccddd -> a4b2c3d3

function continusNum() {
  const problem = "aaaabbcccddd";
  let count = 1;
  let answer = "";
  let store = problem[0];
  for (let i of problem) {
    if (i === store) {
      count++;
    } else {
      answer += store;
      answer += count;
      count = 1;
      store = i;
    }
  }
  answer += store;
  answer += count;

  return answer;
}
```

## 가장 적게 옮기는 횟수 출력

```js
let n = 24;
let result = 0; -> 가장 적게올리는 횟수 (어떻게든 안되면 -1)
while(true){
	if (n%7 === 0) {
		result += parseInt(n/7, 10);
		console.log(result);
		break;
	}
	n -= 3
	result += 1;
	if (n < 0){
		console.log(-1);
		break;
	}
}
```

## map응용

```js
a = [1, 2, 3, 4];
b = ["a", "b", "c", "d"];
// 위문자를 응용해 [[1,a],[b,2],[3,c],[d,4]] 출력하라

const c = a.map((el, index) => {
  if (index % 2 === 0) {
    return [el, b[index]];
  } else {
    return [b[index], el];
  }
});
```

<TagLinks />

<Comment />

## 지정된 문자열의 모든 경우의 수

```js
// 'ABCDEF'가 있으면 가능한 모든 문자 조합 구하기, 두번째문자열과 중복 가장 많이된 length 찾기
function sol(string) {
  let result = [];
  for (let i = 1; i < string.length + 1; i++) {
    for (let j = 0; j < i; j++) {
      result.push(string.slice(j, j + string.length + 1 - i));
    }
  }
  return result;
}
let inputOne = "ABCDEF";
let inputTwo = "BCDFH";

const ArrayOne = sol(inputOne);
// [ 'ABCDEF', 'ABCDE', 'BCDEF', 'ABCD', 'BCDE', 'CDEF', 'ABC'..'F']
const ArrayTwo = sol(inputTwo);

const c = ArrayOne.filter(x => ArrayTwo.includes(x)).map(el => el.length); // [3,2,1,1,1..]
console.log(Math.max(...c)); // 3
```
