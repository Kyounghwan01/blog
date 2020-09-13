# 연속되는 수

은주는 놀이공원 아르바이트를 하고 있다. 은주가 일하는 놀이공원에서는 현재 놀이공원 곳곳에 숨겨진 숫자 스탬프를 모아 오면 선물을 주는 이벤트를 하고 있다. 숫자 스탬프는 매일 그 수와 스탬프에 적힌 숫자가 바뀌지만 그 숫자는 항상 연속된다.
그런데 요즘 다른 날에 찍은 스탬프를 가지고 와 선물을 달라고 하는 손님이 늘었다.

스탬프에 적힌 숫자가 공백으로 구분되어 주어지면 이 숫자가 연속수인지 아닌지 "YES"와 "NO"로 판별하는 프로그램을 작성하시오

```
입력1
1 2 3 4 5

출력1
YES


입력2
1 4 2 6 3

출력2
NO
```

```js
function sol(l) {
  l.sort((a, b) => {
    return a - b;
  });

  for (let i = 0; i <= l.length - 1; i++) {
    if (l[i] + 1 !== l[i + 1]) {
      return "NO";
    } else {
      return "YES";
    }
  }
}

console.log(sol("1 2 3 4 5"));
```

## 객체의 함수 응용

다음의 객체가 주어졌을 때 한국의 면적과 가장 비슷한 국가와 그 차이를 출력하세요.

```
데이터
nationWidth = {
     'korea': 220877,
     'Rusia': 17098242,
     'China': 9596961,
     'France': 543965,
     'Japan': 377915,
     'England' : 242900,
}

출력
England 22023
```

```js
const nationWidth = {
  korea: 220877,
  Rusia: 17098242,
  China: 9596961,
  France: 543965,
  Japan: 377915,
  England: 242900
};

const w = nationWidth["korea"];

delete nationWidth["korea"];

const entry = Object.entries(nationWidth);
const values = Object.values(nationWidth);

//gap에 최댓값 저장
let gap = Math.max.apply(null, values);
let item = [];

for (let i in entry) {
  // 최소값 알고리즘 - 차이가 가장 적다
  // gap < Math.abs(entry[i][1] - w) -> 최대값 알고리즘
  if (gap > Math.abs(entry[i][1] - w)) {
    gap = Math.abs(entry[i][1] - w);
    item = entry[i];
  }
}

console.log(item[0], item[1] - 220877);
```

## 1의 개수

0부터 1000까지 1의 개수를 세는 프로그램을 만들려고 합니다. 예를 들어 0부터 20까지 1의 개수를 세어본다면 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19에 각각 1이 들어가므로 12개의 1이 있게 됩니다. 11은 1이 2번 들어간 셈이죠.

그렇다면 0부터 1000까지 수에서 1은 몇 번이나 들어갔을까요? 출력해 주세요.

```jsx
//1번 답안
const obj = {};

for (let i = 0; i <= 1000; i++) {
  let tmp = i;
  while (tmp > 0) {
    let num = tmp % 10;
    if (obj[num]) {
      obj[num]++;
    } else {
      obj[num] = 1;
    }
    tmp = parseInt(tmp / 10, 10);
  }
}

console.log(obj[1]);

//2번 답안
let s = "";
for (let i = 0; i < 1000; i++) {
  s += i;
}
console.log(s.match(/1/g).length);

//3번 답안
let s = "";
for (let i = 0; i < 1000; i++) {
  s += i;
}
let count = 0;
for (let j in s) {
  if (s[j] == 1) {
    count++;
  }
}

for (let j of s) {
  if (j == 1) {
    count++;
  }
}
```

## 콤마찍기

```jsx
const n = prompt("숫자를 입력해주세요.");
parseInt(n, 10);

console.log(n.toLocaleString());

//함수를 사용해서도 풀어보세요!
function comma(s) {
  if (s.length <= 3) return s;
  else return comma(s.slice(0, s.length - 3)) + "," + s.slice(s.length - 3);
}
```

## 빈칸 채우기

총 문자열의 길이는 50으로 제한하고 사용자가 문자열을 입력하면 그 문자열을 가운데 정렬을 해주고, 나머지 빈 부분에는 '='을 채워 넣어주세요.

```jsx
**입력**
hi

**출력**
========================hi========================
```

```jsx
const str = prompt("문자열을 입력해주세요.");

const n = 25 + parseInt(str.length / 2, 10);

//왼쪽부터 채우기
const a = str.padStart(n, "=");

//오른쪽까지 채워서 출력
console.log(a.padEnd(50, "="));

//padStart(길이, 채울 문자열) : 주어진 길이만큼 원래 문자열의 왼쪽부터 주어진 문자열로 채움
//padEnd(길이, 채울 문자열) : 주어진 길이만큼 원래 문자열의 오른쪽부터 주어진 문자열로 채움
```

## 번호매기기

60
새 학기가 되어 **이름을 가나다 순서대로 배정하고 번호를 매기려고 합니다**.
데이터에 입력된 이름을 아래와 같이 출력해 주세요.

```jsx
**데이터**
students = ['강은지','김유정','박현서','최성훈','홍유진','박지호','권윤일','김채리','한지호','김진이','김민호','강채연']

**출력**
번호: 1, 이름: 강은지
번호: 2, 이름: 강채연
번호: 3, 이름: 권윤일
번호: 4, 이름: 김민호
번호: 5, 이름: 김유정
번호: 6, 이름: 김진이
번호: 7, 이름: 김채리
번호: 8, 이름: 박지호
번호: 9, 이름: 박현서
번호: 10, 이름: 최성훈
번호: 11, 이름: 한지호
번호: 12, 이름: 홍유진
```

```jsx
const students = [
  "강은지",
  "김유정",
  "박현서",
  "최성훈",
  "홍유진",
  "박지호",
  "권윤일",
  "김채리",
  "한지호",
  "김진이",
  "김민호",
  "강채연"
];

students.sort();

for (let key in students) {
  console.log(`번호: ${parseInt(key, 10) + 1}, 이름: ${students[key]}`);
}
```

## 문자열 압축하기

61
문자열을 입력받고 연속되는 문자열을 압축해서 표현하고 싶습니다.

```jsx
**입력**
aaabbbbcdddd

**출력**
a3b4c1d4
```

```jsx
const user_input = new String(prompt("문자열을 입력하세요"));
let s = "";
let storeString = user_input[0];
let count = 0;

for (let i of user_input) {
  if (i === storeString) {
    count += 1;
  } else {
    s += storeString + String(count);
    storeString = i;
    count = 1;
  }
}

s += storeString + String(count);
console.log(s);
```

## 특정 문자 출력

`20190923`을 출력합니다. 아래 기준만 만족하면 됩니다.

1. 코드 내에 숫자가 없어야 합니다.
   - 예) console.log(20190923)이라고 하시면 안됩니다.
2. 파일 이름이나 경로를 사용해서는 안됩니다.
3. 시간, 날짜 함수를 사용해서는 안됩니다.
4. 에러 번호 출력을 이용해서는 안됩니다.
5. input을 이용해서는 안됩니다.

```jsx
//abcdefgh
//20190923
const user_s = "aacdddddddddfffffffffgghhh";
let result_s = "";
console.log(
  `${user_s.match(/a/g).length}${Number(user_s.match(/b/g))}${
    user_s.match(/c/g).length
  }${user_s.match(/d/g).length}${Number(user_s.match(/e/g))}${
    user_s.match(/f/g).length
  }${user_s.match(/g/g).length}${user_s.match(/h/g).length}`
);
```

## 1, 3, 7kg있을때 정량 정확히 맞추기 (가장 적은횟수)

64
정량 N에 정확히 맞춰야만 움직이는 화물용 엘리베이터가 있습니다.
화물은 7kg, 3kg 두 가지이며 팔이 아픈 은후는 가장 적게 화물을 옮기고 싶습니다.

예를 들어 정량이 24kg이라면 3kg 8개를 옮기는 것보다는
7kg 3개, 3kg 1개 즉 4개로 더 적게 옮길 수 있습니다.

**입력**
정량 N이 입력됩니다.

**출력**
가장 적게 옮길 수 있는 횟수를 출력합니다.
만약 어떻게 해도 정량이 N이 되지 않는다면 -1을 출력합니다.

```jsx
let N = parseInt(prompt("정량을 입력하세요"), 10);
let result = 0;

while (true) {
  if (N % 7 === 0) {
    result += parseInt(N / 7, 10);
    console.log(result);
    break;
  }
  N -= 3;
  result += 1;
  if (N < 0) {
    console.log(-1);
    break;
  }
}
```

## 이차원배열

65
a = [1, 2, 3, 4]
b = [a, b, c, d]
이런 리스트가 있을 때 **[[1, a], [b, 2], [3, c], [d, 4]]** 이런 식으로 a, b 리스트가 번갈아가면서 출력되게 해주세요.

```jsx
const a = prompt("입력하세요").split(" ");
const b = prompt("입력하세요").split(" ");
let c = [];
let count = 0;

a.forEach(function(e, i) {
  if (count % 2 === 0) {
    c.push([e, b[i]]);
  } else {
    c.push([b[i], e]);
  }
  count++;
});
//[[1,'a'],['b',2],[3,'c'],['d',4]]
```

## 시간 연산

학교가 끝난 지원이는 집에 가려고 합니다. 학교 앞에 있는 버스 시간표는 너무 복잡해서 버스 도착시간이 몇 분 남았는지 알려주는 프로그램을 만들고 싶습니다.

**버스 시간표와 현재 시간이 주어졌을 때 버스 도착 시간이 얼마나 남았는지 알려주는 프로그램**을 만들어주세요.

- 버스 시간표와 현재 시간이 입력으로 주어집니다.
- 출력 포맷은 "00시 00분"입니다.
  만약 1시간 3분이 남았다면 **"01시간 03분"**으로 출력해야 합니다.
- 버스 시간표에 현재 시간보다 이전인 버스가 있다면 **"지나갔습니다."**라고 출력합니다.

```jsx
**입력**
["12:30", "13:20", "14:13"]
"12:40"

**출력**
['지나갔습니다', '00시간 40분', '01시간 33분']
```

```jsx
function sol(tb, rt) {
  let answer = [];
  rt = rt.split(":").map(n => parseInt(n, 10));

  for (let i = 0; i < tb.length; i++) {
    let time = tb[i].split(":").map(n => parseInt(n, 10));
    let time_to_min = time[0] * 60 + time[1] - (rt[0] * 60 + rt[1]);

    if (time_to_min < 0) {
      answer.push("지나갔습니다");
    } else {
      let a = parseInt(time_to_min / 60, 10);
      let b = time_to_min % 60;
      answer.push(
        String(a).padStart(2, 0) + "시간 " + String(b).padStart(2, 0) + "분"
      );
    }
  }
  return answer;
}

console.log(sol(["12:30", "13:20", "14:13"], "12:40"));
```

## 소수만 출력

```js
let sosu = [];
let isSosu = true;

for (let i = 2; i < 100; i++) {
  for (let j = 2; j < i; j++) {
    if (i % j === 0) {
      isSosu = false;
    }
  }
  if (isSosu) {
    sosu.push(i);
  }
  isSosu = true;
}

const count = 100;
let circle = 0;
let gold = [];
for (let n of sosu) {
  if (sosu.includes(count - n)) {
    gold.push([n, count - n]);
  }
  if (circle > parseInt(sosu.length / 2, 10)) {
    break;
  }
  circle++;
}

let decrese = gold.map(a => a[1] - a[0]);
let decreseIndex = decrese.indexOf(Math.min(...decrese));

// 가장 작은 차의 인덱스
console.log(gold[decreseIndex]);
```

## 두 소수의 합

골드바흐의 추측(Goldbach's conjecture)은 오래전부터 알려진 정수론의 미해결 문제로, 2보다 큰 모든 짝수는 두 개의 소수(Prime number)의 합으로 표시할 수 있다는 것이다. 이때 하나의 소수를 두 번 사용하는 것은 허용한다. - 위키백과

위 설명에서 2보다 큰 모든 짝수를 두 소수의 합으로 나타낸 것을 골드바흐 파티션이라고 합니다.

예)
100 == 47 + 53
56 == 19 + 37

**2보다 큰 짝수 n이 주어졌을 때, 골드바흐 파티션을 출력하는 코드를** 작성하세요.

- 해당 문제의 출력 형식은 자유롭습니다. 가능하시다면 골드바흐 파티션 모두를 출력하거나, 그 차가 작은 것을 출력하거나 그 차가 큰 것 모두 출력해보세요.

```jsx
function prime_list(n) {
  //에라토스테네스의 체 초기화: n개 요소에 True 설정(소수로 간주)
  let sieve = [];
  for (let i = 2; i < n; i++) {
    sieve.push(true);
  }
  // console.log(sieve);

  //n의 최대 약수가 sqrt(n) 이하이므로 i=sqrt(n)까지 검사
  let m = parseInt(n ** 0.5, 10);
  // console.log(m);
  for (let i = 2; i < m + 1; i++) {
    if (sieve[i] == true) {
      // i가 소수인 경우
      for (let j = i + i; j < n; j += i) {
        // i이후 i의 배수들을 False 판정
        sieve[j] = false;
      }
    }
  }
  // 소수 목록 산출
  let 소수목록 = [];
  for (let i = 2; i < n; i++) {
    if (sieve[i] == true) {
      소수목록.push(i);
    }
  }
  return 소수목록;
}
// console.log(prime_list(10000));

// let 소수 = [];
// let 소수판별 = true;

// for(let i=2; i<100; i++){
//   for(let j=2; j<i; j++){
//     if(i%j == 0){
//       소수판별 = false;
//     }
//   }
//   if (소수판별){
//     소수.push(i);
//   }
//   소수판별 = true;
// }

// console.log(소수);
let 입력숫자 = parseInt(prompt("숫자를 입력하세요:"), 10);

const 소수 = prime_list(입력숫자 + 1);
const 숫자 = 입력숫자;
let 순회 = 0;
let 골드바흐파티션 = [];
for (let n of 소수) {
  // console.log(n);
  if (소수.includes(숫자 - n)) {
    골드바흐파티션.push([n, 숫자 - n]);
  }
  if (순회 > parseInt(소수.length / 2, 10)) {
    break;
  }
  순회++;
}
console.log(골드바흐파티션);
let 차 = 골드바흐파티션.map(e => e[1] - e[0]);
console.log(차.indexOf(Math.min.apply(null, 차)));
let 차의인덱스 = 차.indexOf(Math.min.apply(null, 차));
console.log(골드바흐파티션[차의인덱스]);
```

## 탑쌓기

탑을 쌓기 위해 각 크기별로 준비된 블럭들을 정해진 순서에 맞게 쌓아야 합니다.
순서에 맞게 쌓지 않으면 무너질 수 있습니다.

예를 들면 정해진 순서가 BAC 라면 A 다음 C가 쌓아져야 합니다.
선행으로 쌓아야 하는 블럭이 만족된 경우라면 탑이 무너지지 않습니다.

- B를 쌓지 않아도 A와 C를 쌓을 수 있습니다.
- B 다음 블럭이 C가 될 수 있습니다.

쌓아져 있는 블럭 탑이 순서에 맞게 쌓아져 있는지 확인하세요.

1. 블럭은 알파벳 대문자로 표기합니다.
2. 규칙에 없는 블럭이 사용될 수 있습니다.
3. 중복된 블럭은 존재하지 않습니다.

```jsx
**입력**
탑 = ["ABCDEF", "BCAD", "ADEFQRX", "BEDFG", "EFGHZ"]
규칙 = "ABD"
**출력**
["가능", "불가능", "가능", "가능", "가능"]
```

```js
function block() {
  const top = ["ABCDEF", "BCAD", "ADEFQRX", "BEDFG", "EFGHZ"];
  const rule = "ABD";
  const answer = [];

  function test(target, rule) {
    const targets = target.split("");
    let result = [];
    for (let i = 0; i < rule.length; i++) {
      const index = targets.indexOf(rule[i]);
      if (index >= 0) {
        result.push(index);
      }
    }
    const t = JSON.parse(JSON.stringify(result));
    t.sort().join() === result.join()
      ? answer.push("가능")
      : answer.push("불가능");
  }
  for (let i of top) {
    test(i, rule);
  }
  return answer;
}
log(block());

function block() {
  const top = ["ABCDEF", "BCAD", "ADEFQRX", "BEDFG", "EFGHZ"];
  const rule = "ABD";
  const answer = [];

  function test(target, rule) {
    const targets = target.split("");
    let temp = targets.indexOf(rule[0]);
    for (let i of targets) {
      const result = targets.indexOf(i);
      if (temp > result) return "불가능";
      temp = result;
    }
    return "가능";
  }
  for (let i of top) {
    answer.push(test(i, rule));
  }
  return answer;
}
log(block());
```
