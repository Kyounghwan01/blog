# 90

##

한 반에 30명인 학생, 총 7개의 반 점수가 '국어, 영어, 수학, 사회, 과학' 순서로 있는 다중 리스트를 랜덤 한 값으로 만들어주시고 아래 값을 모두 출력하세요.

1. 반 점수 모두가 담긴 전교 점수 다중 리스트를 만들어주세요.
2. 반 평균을 구하세요.
3. 반 1등 점수를 구하세요.
4. 전교 평균을 구하세요.

```jsx
let student_score = [];
let class_score = [];
let total_score = [];

for (let k = 0; k < 7; k++) {
  class_score = [];
  for (let j = 0; j < 30; j++) {
    student_score = [];
    for (let i = 0; i < 5; i++) {
      student_score.push(Math.floor(Math.random() * 100) + 1);
    }
    class_score.push(student_score);
  }
  total_score.push(class_score);
}

console.log(total_score);

let total_average = [];
let c_average = [];
let s_average = 0;
let s_sum = 0;
let c_sum = 0;
let student_one = 0;
let 일등 = 0;

for (let c of total_score) {
  for (let s of c) {
    s_sum = s.reduce((a, b) => a + b);
    s_average = s_sum / 5;
    c_average.push(s_average);
    if (일등 < s_average) {
      일등 = s_average;
    }
  }
  일등 = 0;
  total_average.push(c_average.reduce((a, b) => a + b) / 30);
  c_average = [];
}
console.log(total_average);
console.log(total_average.reduce((a, b) => a + b) / 7);
```

## 선입선출 알고리즘

93
메모리의 크기가 i로 주어지고 들어올 페이지들이 n으로 주어졌을 때, 전체 실행시간을 구해주세요.

만약 스택 안에 같은 스케줄이 있다면 **hit** 이라고 하며 실행시간은 **1초** 입니다. 스택 안에 스케줄이 없다면 **miss** 라고 하며 실행시간은 **6초** 입니다.

BCBAEBCE

- 예제 1번을 보면 페이지 프레임의 개수는 3개이고 스케줄은 'BCBAEBCE' 입니다. 6번의 miss를 기록하므로 **6번 \* 6초 = 36초**가 되고 2번의 hit을 기록하므로 **2번 \* 1초 = 2초**입니다. 2개를 합한 값이 실행시간이므로, 38초가 됩니다.

페이지 = [B] (B, 6초) 페이지 = [B, C] 6s페이지 = [B, C] 1s 페이지 = [B, C, A] 6c 페이지 = [C, A, E] 6s 페이지 = [A, E, B] 6s 페이지 = [E, B, C] 6s 페이지 [E, B, C] 1s

```js
function fnfo() {
  const frame = 4;
  const page = "ABCDABEABCDE".split("");
  let runTime = 0;
  let temp = [];

  if (frame === 0) return page.length * 6;

  for (let i of page) {
    if (temp.length > frame - 1) {
      if (temp.includes(i)) {
        runTime += 1;
      } else {
        runTime += 6;
        temp.push(i);
        temp.shift();
      }
    } else {
      if (temp.includes(i)) {
        runTime += 1;
      } else {
        runTime += 6;
        temp.push(i);
      }
    }
  }
}

fnfo();
```

## LRU (가장 사용되지 않은 순 버려)

94

```js
function lru() {
  const frame = 3;
  const page = "BCBAEBCE".split("");
  let runTime = 0;
  let temp = [];

  if (frame === 0) return page.length * 6;

  for (let i of page) {
    if (temp.length > frame - 1) {
      if (temp.includes(i)) {
        runTime += 1;
        let t1 = temp.splice(temp.indexOf(i), 1);
        temp.push(t1[0]);
      } else {
        runTime += 6;
        temp.push(i);
        temp.shift();
      }
    } else {
      if (temp.includes(i)) {
        runTime += 1;
        let t1 = temp.splice(temp.indexOf(i), 1);
        temp.push(t1[0]);
      } else {
        runTime += 6;
        temp.push(i);
      }
    }
  }
}

lru();
```

## 특정 문자 못쓸때 치환

96
숫자 3, 4, 6이 도통 눌리지 않습니다.

이에 눌리지 않는 키보드를 누르지 않고 월급 입금을 두 번에 나눠주고 싶습니다.

1. 직원은 2000명이며, 3초 이내 수행을 해야합니다.
2. 입력값의 형식은 csv파일형식이며 이과장 '3,000,000', 'S은행', '100-0000-0000-000' 형식으로 주어집니다.
3. 출력값의 형식은 csv파일형식이며 이과장 '1,500,000', '1,500,000', 'S은행', '100-0000-0000-000' 입니다. 또는 '1,000,000', '2,000,000', 'S은행', '100-0000-0000-000' 도 괜찮습니다.

```
이대표,'333,356,766','S은행','100-0000-0000-001'
최차장,'5,000,000','S은행','100-0000-0000-002'
이과장,'3,200,000','S은행','100-0000-0000-003'
홍팀장,'3,300,000','S은행','100-0000-0000-004'
이대리,'5,300,000','S은행','100-0000-0000-005'
```

```jsx
const 입력값 = `이대표,'333,356,766','S은행','100-0000-0000-001'
최차장,'5,000,000','S은행','100-0000-0000-002'
이과장,'3,200,000','S은행','100-0000-0000-003'
홍팀장,'3,300,000','S은행','100-0000-0000-004'
이대리,'5,300,000','S은행','100-0000-0000-005'`;

let 나눠진입력값 = 입력값.split("\n");
let 숫자값 = [];

for (let i of 나눠진입력값) {
  let j = i.split(",");
  let k = j.slice(1, j.length - 2);
  숫자값.push(k.join(""));
}

console.log(숫자값);
let 월급하나 = "";
let 월급둘 = "";
let result = [];
for (let 월급 of 숫자값) {
  console.log(월급);
  for (let 나뉜월급 of 월급) {
    console.log(나뉜월급);
    if (나뉜월급 != "'") {
      if (나뉜월급 == 3) {
        월급하나 += "1";
        월급둘 += "2";
      } else if (나뉜월급 == 4) {
        월급하나 += "2";
        월급둘 += "2";
      } else if (나뉜월급 == 6) {
        월급하나 += "1";
        월급둘 += "5";
      } else {
        월급하나 += 나뉜월급;
        월급둘 += "0";
      }
    }
  }
  console.log(월급하나);
  console.log(월급둘);
  result.push([parseInt(월급하나, 10), parseInt(월급둘, 10)]);
  월급하나 = "";
  월급둘 = "";
}
console.log(result);
```

## 택배 배달 & 시간 기다리기

97
n 명의 택배 배달원은 쌓인 택배를 배달해야 합니다.
각 택배는 접수된 순서로 배달이 되며 택배마다 거리가 주어집니다.
거리1당 1의 시간이 걸린다고 가정하였을 때 모든 택배가 배달 완료될 시간을 구하세요.

1. 모든 택배의 배송 시간 1 이상이며 배달지에 도착하고 돌아오는 왕복 시간입니다.
2. 택배는 물류창고에서 출발합니다.
3. 배달을 완료하면 다시 물류창고로 돌아가 택배를 받습니다.
4. 물류창고로 돌아가 택배를 받으면 배달을 시작합니다.
5. 택배를 상차할 때 시간은 걸리지 않습니다.

입력은 배달원의 수와 택배를 배달하는 배달 시간이 주어집니다.

ex) 배달원이 3명이고 각 거리가 [1,2,1,3,3,3]인 순서로 들어오는 경우

```js
function sol(n, l) {
  let answer = 0;
  let man = new Array(n).fill(0);

  // 상차되면 종료
  while (l.length !== 0) {
    // 상차
    for (let i = 0; i < man.length; i++) {
      if (man[i] === 0 && l) {
        man[i] += l.shift();
      }
    }
    // 배송거리 -1
    man = man.map(x => (x = x - 1));
    console.log(man);

    answer += 1;
  }

  return (answer += Math.max(...man));
}

console.log(sol(3, [1, 2, 1, 3, 3, 3]));
```

## 중복제거

98
청길이는 입장하는 사람들의 패션에서 처음 보는 아이템 만을 기록합니다.
이때 청길이의 기록에서 아래 규칙에 맞게 배열로 출력해 주세요.

    1. 청길이는 각 옷의 종류를 정수로 기록해 놓습니다.
         ex) 입력은 "1번: 3,1 2번: 4 3번: 2,1,3 4번: 2,1,3,4" 형태의 문자열입니다.
    2. 기록은 청길이가 번호 순서로 유니크한 옷의 번호를 적습니다.
    3. 유니크한 옷은 기록된 순서로 추출되고 출력됩니다.
         ex) 출력은 [3,1,4,2]입니다.

```jsx
**입출력예시**

**입력**
"1번: 4,2,3 2번: 3 3번: 2,3,4,1 4번: 2,3"

**출력**
[4, 2, 3, 1]

**입력**
"1번: 3,1 2번: 4 3번: 2,1,3 4번: 2,1,3,4"

**출력**
[3, 1, 4, 2]
```

```js
function close(i) {
  let idx = i.split(/[0-9]번: /g);
  idx.shift();

  for (let i = 0; i < idx.length; i++) {
    idx[i] = idx[i].replace(/ /g, "").split(",");
  }
  let newArr = idx.flat().map(el => Number(el));
  return [...new Set(newArr)];
}

close("1번: 3,1 2번: 4 3번: 2,1,3 4번: 2,1,3,4");
```

## 토끼 행진

99
토끼들이 징검다리를 건너려고 합니다. 하지만 돌이 부실해서 몇 번 건너지 못할 것 같습니다.
대기 중인 토끼들의 통과 여부를 배열에 담아 출력해 주세요.

1. 각 돌들이 얼마나 버틸 수 있는지 배열로 주어집니다.

2. 각 토끼가 착지할 때마다 돌의 내구도는 1씩 줄어듭니다.
   ex) [1,2,1,4] 각 돌마다 1마리 2마리 1마리 4마리의 착지를 버틸 수 있습니다.

3. 토끼들은 점프력이 각자 다릅니다.
   ex) [2,1] 첫 번째 토끼는 2칸씩, 두 번째 토끼는 1칸씩 점프합니다.

4. 각 토끼들은 순서대로 다리를 건넙니다.

```jsx
**입력**
돌의내구도 = [1, 2, 1, 4, 5, 2]
토끼의점프력 = [2, 1, 3, 1]

**출력**
['pass', 'pass', 'fail', 'fail']
```

```js
function doong(rock, jump) {
  let answer = [];
  for (let i = 0; i < jump.length; i++) {
    answer.push("pass");
  }

  for (let i = 0; i < jump.length; i++) {
    let place = 0;
    while (place < rock.length - 1) {
      place += jump[i];
      rock[place - 1] -= 1;

      if (rock[place - 1] === 0) {
        answer[i] = "fail";
      }
    }
  }
  return answer;
}
dong([1, 2, 1, 4, 5, 2], [2, 1, 3, 1]);
```

## 인형뽑기 때서 stack 지우고 포인트 얻기

100
N x M으로 이루어진 아래와 같은 공간에 퍼즐이 쌓여져 있습니다.

퍼즐을 맞추기 위해서는 반드시 맨 오른쪽 줄로 이동시켜 줘야 합니다.
만약 종류가 같은 퍼즐이 연속될 시에 점수가 추가되며 그 퍼즐은 사라집니다.

점수는 다음과 같습니다.

- 파란색 공 : 1점
- 빨간색 공 : 2점
- 노란색 공 : 3점
- 초록색 공 : 4점
- 주황색 공 : 5점
  점수는 공의 개수만큼 추가됩니다
  예를 들어 빨간색 공이 2개 연속되어 없어졌을 경우 2\*2 = 4점입니다.

게임 플레이어는 게임이 시작되면 어떤 퍼즐을 이동할 것인지 모두 작성합니다.
만약 비어있는 곳을 선택하게 된다면 점수가 1점 감소하며 그대로 진행합니다.
위 규칙에 맞는 점수를 리턴하는 함수를 작성하세요.
총 점수는 2점으로 2를 출력해야 합니다.

```jsx
**입력**
퍼즐판 = [[0,0,0,0],[0,1,0,3],[2,5,0,1],[2,4,4,1],[5,1,1,1]]
조작 = [1,1,1,1,3,3,3]

**출력**
2
```

```js
function solution(plate, moves) {
  let stack = 0;
  let point = 0;

  while (moves.length !== 0) {
    let m = moves.shift();
    for (let i = 0; i < plate.length; i++) {
      if (plate[i][m - 1] !== 0) {
        if (stack[stack.length - 1] === plate[i][m - 1]) {
          point += plate[i][m - 2] * 2;
          plate[i][m - 1] = 0;
          stack.pop();
        } else {
          stack.push(plate[i][m - 1]);
        }
      } else {
        // plate의 가장 밑부분 인경우
        if (i === plate.length - 1) {
          point -= 1;
        }
      }
    }
  }
  return point;
}
solution(
  [
    [0, 0, 0, 0],
    [0, 1, 0, 3],
    [2, 5, 0, 1],
    [2, 4, 4, 1],
    [5, 1, 1, 1]
  ],
  [1, 1, 1, 1, 3, 3, 3]
);
```
