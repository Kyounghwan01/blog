# 80

## 순열과 조합

**조합**이란 원소들을 조합하여 만들 수 있는 경우의 수이며 원소의 순서는 신경 쓰지 않습니다.
**순열**이란 원소의 값이 같더라도 순서가 다르면 서로 다른 원소로 취급하는 선택법입니다.

한글의 자모 24자 중 자음은 총 14개입니다.
이 중 입력받은 자음을 n 개를 선택하여 나올 수 있는 모든 조합과, 조합의 수를 출력하고 싶습니다.

‘한글 맞춤법’의 제2장 제4항에서는 한글의 기본 자모 24자 “ㄱ(기역), ㄴ(니은), ㄷ(디귿), ㄹ(리을), ㅁ(미음), ㅂ(비읍), ㅅ(시옷), ㅇ(이응), ㅈ(지읒), ㅊ(치읓), ㅋ(키읔), ㅌ(티읕), ㅍ(피읖), ㅎ(히읗), ㅏ(아), ㅑ(야), ㅓ(어), ㅕ(여), ㅗ(오), ㅛ(요), ㅜ(우), ㅠ(유), ㅡ(으), ㅣ(이)”를 제시

나올 수 있는 모든 조합을 아래와 같이 출력해 주세요.

**<--요구 조건-->**

1. 첫 번째 입력으로 선택할 한글 자음이 주어집니다.
2. 두 번째 입력으로 조합의 수가 주어집니다.
3. 주어진 조합의 수에 따라 조합과 조합의 수를 출력해 주세요.

```jsx
**입력**
ㄱ,ㄴ,ㄷ,ㄹ
3

**출력**
['ㄱㄴㄷ', 'ㄱㄴㄹ', 'ㄱㄷㄹ', 'ㄴㄷㄹ']
4
```

```jsx
function combination(chars) {
  let combi = [];

  const f = (prefix, chars) => {
    v;
    for (let i = 0; i < chars.length; i++) {
      combi.push(prefix + chars[i]);

      f(prefix + chars[i], chars.slice(i + 1));
    }
  };

  f("", chars);

  //조합의 수에 맞는 것만 추출!
  const result = combi.filter(x => x.length === n);
  console.log(result);

  return result.length;
}

const arr = prompt("입력해주세요").split(",");
const n = parseInt(prompt("조합의 수를 입력해주세요"), 10);

console.log(combination(arr));
```

## 지뢰찾기

```jsx
**데이터**
let ****flag = []; //지뢰 없이 깃발만 있는 리스트
let minesweeper = []; //지뢰를 찾은 리스트
let count = 0;

console.log(flag);
console.log(minesweeper);

**입력**
0 1 0 0 0
0 0 0 0 0
0 0 0 1 0
0 0 1 0 0
0 0 0 0 0
//"0 1 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 0 1 0 0\n0 0 0 0 0"

**출력**
* f * 0 0
0 * 0 * 0
0 0 * f *
0 * f * 0
0 0 * 0 0
```

```jsx
//첫번째 풀이
let value = "0 1 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 0 1 0 0\n0 0 0 0 0";
let sp = value.split("\n");
let count = 0;

for (let i of sp) {
  sp[count] = i.replace("1", "f").split(" ");
  count += 1;
}

count = 0;
let search = 0;

for (let s of sp) {
  for (let i of s) {
    if (i === "f") {
      search = s.indexOf(i);
      if (search > 0) {
        s[search - 1] = "*";
      }
      if (search < 4) {
        s[search + 1] = "*";
      }
      if (count > 0) {
        sp[count - 1][search] = "*";
      }
      if (count < 4) {
        sp[count + 1][search] = "*";
      }
    }
  }
  count += 1;
}

for (let i of sp) {
  console.log(i);
}

// 2. flatten을 이용해 1차원 배열로 만든후, 지뢰의 -1, +1 번 요소에 깃발, 지뢰의 -5, +5 (5*5일경우 5)번 요소에 깃발 추가
```

## 수학 공식 확인

83 - stack

```
데이터 입력(1), 프로그램 종료(2) : 1
데이터를 입력하세요: 5 + 7 * {(3 * 5)}
True

데이터 입력(1), 프로그램 종료(2) : 1
데이터를 입력하세요: 5 + 7){ * (3 * 5)
False

데이터 입력(1), 프로그램 종료(2) : 2
```

```jsx
function math(e) {
  const m = {
    ")": "(",
    "}": "{"
  };
  let stack = [];

  for (let i = 0; i < e.length; i++) {
    if (e[i].includes("(") || e[i].includes("{")) {
      stack.push(e[i]);
    } else if (m[e[i]]) {
      if (stack.length === 0) {
        return false;
      } else {
        let t = m[e[i]];
        if (t != stack.pop()) {
          return false;
        }
      }
    }
  }
  return stack.length === 0;
}
match("5 + 7){ * (3 * 5)"); // false
```

## 연속 문자열 조합 - 순열 + 조합

소정이는 어떤 숫자에서 k개의 수를 뽑았을 때 가장 큰 수를 찾는 놀이를 하고 있습니다.
예를 들어, 숫자 1723에서 두 개의 수를 뽑으면 [17, 12, 13, 72, 73, 23] 을 만들 수 있습니다.
이 중 가장 큰 수는 73입니다.

위 예시처럼 **어떤 수 n에서 k개의 수를 선택하여 만들 수 있는 수 중에서 가장 큰 수**를 찾아 주세요.

```jsx
function solution(chars) {
  let permute = [];

  const f = (prefix, chars) => {
    for (let i = 0; i < chars.length; i++) {
      permute.push(prefix + chars[i]);

      // 순열로 만들기
      if (permute.indexOf(chars[i] + prefix) === -1) {
        permute.push(chars[i] + prefix);
      }

      f(prefix + chars[i], chars.slice(i + 1));
    }
  };

  f("", chars);

  let result = permute.filter(x => x.length === len);
  result.sort((a, b) => {
    return b - a;
  });

  return result[0];
}

const num = prompt("숫자를 입력하세요").split("");
const len = parseInt(prompt("몇 개의 수를 선택하시겠습니까?"), 10);
console.log(solution(num));
```

## 숫자 놀이 - 1의 갯수만큼 숫자 출력

이전 숫자에서 각 숫자의 개수를 나타내어 숫자로 만들고 다시 그 숫자를 같은 규칙으로 만들며 나열합니다.
이 놀이는 1부터 시작합니다.
다음 수는 1이 1개이기 때문에 '11'이 되고,
'11'에서 1이 2개이기 때문에 그다음은 '12'가 됩니다.

즉,

1. 1 → (1)
2. 11 → (1이 1개)
3. 12 → (1이 2개)
4. 1121 → (1이 1개 2가 1개)
5. 1321 → (1이 3개 2가 1개)
6. 122131 → (1이 2개 2가 1개 3이 1개)
7. 132231 → (1이 3개 2가 2개 3이 1개)

위와 같이 진행되는 규칙을 통해 진행 횟수 N을 입력받으면 해당되는 수를 출력하세요.

```jsx
**입력**
6

**출력**
122131
```

```jsx
function solution(n) {
  let answer = "1";

  if (n === 1) {
    return 1;
  }

  for (let i = 1; i < n; i++) {
    // n번만큼 계속돌면서 규칙에의해 나온 답을 다시 인수로 넣는 반복
    answer = rule(answer);
  }

  return answer;
}

function rule(answer) {
  let answerMax = Math.max(...answer);
  let result = "";

  for (let i = 1; i < answerMax; i++) {
    let re = new RegExp(i, "g");
    let count = (answer.match(re) || []).length;

    if (count >= 1) {
      result = result + String(i) + String(count);
    }
  }
  return result;
}

const user_input = 7;
console.log(solution(user_input));
```

## 특정 숫자 갯수 구하기

1~만까지중 8 숫자 몇개인지 구하기

```js
function asc(num) {
  result = '';
  for (let i = 0 i < num; i++) {
    result += i;
  }
  let re = new RegExp(8, 'g');
  result.match(re).length
}
```

## 회전초밥 - 중국집이랑 비슷

각 초밥에 점수를 매기고 낮은 점수의 순서로 초밥을 먹으려 합니다.
이때 n위치에 놓여진 초밥을 먹고자 할 때 접시가 몇 번 지나가고 먹을 수 있을지 출력하세요.

1. 초밥은 놓여진 위치에서 옮겨지지 않습니다.
2. 지나간 초밥은 나머지 초밥이 지나간 후에 다시 돌아옵니다.
3. 초밥은 1개 이상 존재합니다.

예)
A, B, C, D, E 초밥이 있고 각 점수가 1, 1, 3, 2, 5 일 때 3번째(C초밥)을 먹게 되는 순서는
점수가 1인 초밥 A와 B를 먹고 다음으로 점수가 2인 D 초밥을 먹어야 .
A B C D E 의 순서로 접시가 도착하지만 C가 도착했을때 먹지 못하는 상황이 옵니다.
2점을 주었던 D를 먼저 먹어야 C를 먹을 수 있습니다.
즉, A B C D E **C** 의 순서로, 접시가 5번 지나가고 먹게 된다.

```jsx

**입력**
point = [1,1,3,2,5]
dish = 3

**출력**
5

**입력**
point = [5,2,3,1,2,5]
dish = 1

**출력**
10

//point 각 접시별 점수가 들어있는 배열
//dish 먹고자하는 접시의 위치
```

```js
// point 각 접시별 점수가 들어있는 배열
// dish 먹고자하는 접시의 위치
function solution(point, dish) {
  // 배열 순서는 0부터 시작, 입력은 1부터 시작이기 때문에 -1 해준다.
  dish -= 1;
  let answer = 0;
  //오름차순으로 정렬
  let s = point.slice();
  s.sort((a, b) => {
    return a - b;
  });
  console.log("s", s);

  while (true) {
    // point 제일 앞의 점수를 추출하여  p에 넣는다. 즉, 앞에 도착한 접시의 점수!
    // shift와 push를 활용해 회전하도록 구현할 예정 !
    let p = point.shift();

    // 현재 s[0]은 point 배열에서 가장 작은 값을 가지고 있음!
    // 현재 가장 낮은 점수를 가지고 있는 접시가 앞에 도착했다면 먹도록 할것!
    if (s[0] === p) {
      //앞에 도착한 접시가 선택한 접시라면 먹고 반복문 종료
      if (dish === 0) {
        break;
      }
      // 선택한 접시 움직임.
      dish -= 1;
      //한 접시를 먹었음으로 하나 줄어듬
      s.shift();
    } else {
      // 접시 위 초밥을 먹을 수 있는 조건이 충족되지 않아 그대로 둔다
      // shift 했던 것을 다시 push.
      point.push(p);
      // 접시의 움직임 만약 선택한 접시가 앞에 도착했다면 맨 뒤로 보내고,
      // 그렇지 않다면 한 칸 당긴다.
      if (dish === 0) {
        dish = point.length - 1;
      } else {
        dish = dish - 1;
      }
      // 반복 한번당 접시 한번 지나감을 나타냄.
    }
    answer += 1;
  }
  return answer;
}
console.log(solution([1,1,3,2,5], 3);
```

## 객체 값 큰 수로 키 정렬

천하제일 먹기 대회가 개최되었습니다.
이 대회는 정해진 시간이 끝난 후 음식을 먹은 그릇 개수를 파악한 후 각 선수들의 등수를 매깁니다.

1. 같은 이름의 선수는 없습니다.
2. 접시의 수가 같은 경우는 없습니다.

**입력 예1)**

```jsx
손오공 야모챠 메지터 비콜로
70 10 55 40
```

**출력 예1)**

```jsx
{'손오공': 1, '메지터': 2, '비콜로': 3, '야모챠': 4}
```

```jsx
const name = "손오공 야모챠 메지터 비콜로".split(" ");
const point = "70 10 55 40".split(" ");
const point_int = point.map(a => parseInt(a, 10));

function sol(name, point) {
  let temp = [];
  for (let i of name) {
    let obj = {};
    obj["name"] = i;
    obj["value"] = point[name.indexOf(i)];
    temp.push(obj);
  }

  temp.sort(function(a, b) {
    return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
  });

  console.log(temp);

  let result = {};
  for (let i of temp) {
    result[i["name"]] = temp.indexOf(i) + 1;
  }

  return result;
}

console.log(sol(name, point_int));
```

## 2차원 배열

지식이는 게임을 만드는 것을 좋아합니다. 하지만 매번 다른 크기의 지도와 장애물을 배치하는데 불편함을 겪고 있습니다. 이런 불편함을 해결하기 위해 **지도의 크기와 장애물의 위치, 캐릭터의 위치만 입력하면 게임 지형을 완성해 주는 프로그램**을 만들고 싶습니다. 지식이를 위해 게임 지형을 만드는 프로그램을 작성해 주세요.

- 가로(n), 세로(m)의 크기가 주어집니다.
- 지형의 테두리는 벽으로 이루어져 있습니다.
- 캐릭터가 있는 좌표가 배열 형태로 주어집니다.
- 장애물이 있는 좌표가 2차원 배열 형태로 주어집니다.

지도는 n x m 크기의 배열이며 배열 안의 값은 -움직일 수 있는 공간(0) -캐릭터(1) -벽(2)
3개로 구분되어 있습니다.

```jsx
**입출력예시**

**입력**
가로 = 4
세로 = 5
캐릭터위치 = [0,0]
장애물 = [[0,1],[1,1],[2,3],[1,3]]

make_map(가로, 세로, 캐릭터위치, 장애물)

**출력**
[2, 2, 2, 2, 2, 2]
[2, 1, 2, 0, 0, 2]
[2, 0, 2, 0, 2, 2]
[2, 0, 0, 0, 2, 2]
[2, 0, 0, 0, 0, 2]
[2, 0, 0, 0, 0, 2]
[2, 2, 2, 2, 2, 2]
```

지도 위에서 캐릭터의 위치를 나타내주세요

1. 지도는 88번 문제의 해답을 사용해 주세요
2. 입력값은 지도, 캐릭터의 움직임입니다.
3. 캐릭터의 움직임은 { 상:1, 하:2, 좌:3, 우:4 }로 정수로 이루어진 배열이 들어갑니다.
4. 벽과 장애물은 통과할 수 없습니다.
5. 마지막 캐릭터의 위치를 반영한 지도를 보여주고 위치를 반환하는 함수를 작성해 주세요.

```jsx
function make_map(n, m, char, obj) {
  //지도 초기화하기
  //각 지도 가로/세로 두칸 외벽을 포함한 크기만큼 추가하기(각 끝 한칸씩)
  let world_map = [];
  for (let i = 0; i < m + 2; i++) {
    world_map.push(Array(n + 2).fill(0));
  }

  //지도 외벽 그리기
  for (let i in world_map) {
    for (let j in world_map[0]) {
      if (
        i == 0 ||
        j == world_map[0].length - 1 ||
        j == 0 ||
        i == world_map.length - 1
      ) {
        world_map[i][j] = 2;
      }
    }
  }

  //지도에 캐릭터 추가하기/ 외벽으로 인해 좌표에 +1을 해줍니다.
  world_map[char[0] + 1][char[1] + 1] = 1;
  //지도에 장애물 추가하기
  for (let i of obj) {
    if (world_map[i[0] + 1][i[1] + 1] != 1) {
      world_map[i[0] + 1][i[1] + 1] = 2;
    } else {
      world_map[i[0] + 1][i[1] + 1] = 1;
    }
  }
  //장애물을 추가하려는 자리에 캐릭터가 있을 시 캐릭터는 그대로둔다
  //마찬가지 외벽으로 인한 좌표 조정을 해준다.
  for (let i of world_map) {
    console.log(i);
  }
  return world_map;
}

function move(world_map, moving) {
  let x = 0;
  let y = 0;

  for (let i of world_map) {
    if (i.includes(1)) {
      x = world_map.indexOf(i);
      y = i.indexOf(1);
    }
  }

  world_map[y][x] = 0;

  for (let i of moving) {
    if (i == 1 && world_map[y - 1][x] != 2) {
      y -= 1;
    } else if (i == 2 && world_map[y + 1][x] != 2) {
      y += 1;
    } else if (i == 3 && world_map[y][x - 1] != 2) {
      x -= 1;
    } else if (i == 4 && world_map[y][x + 1] != 2) {
      x += 1;
    }
  }

  world_map[y][x] = 1;

  for (let i of world_map) {
    console.log(i);
  }
  return [x, y];
}

console.log("캐릭터 이동 전 지도");
const world_map = make_map(
  4,
  5,
  [0, 0],
  [
    [0, 1],
    [1, 1],
    [2, 3],
    [1, 3]
  ]
);

const moving = [2, 2, 2, 4, 4, 4];
console.log("캐릭터 이동 후 지도");
console.log("캐릭터위치 :", move(world_map, moving));
```

## 같은 문자열 최대 length

의약품 성분이 총 8개인 약품들이 있습니다. 예를 들어 다음 데이터는 총 8개의 성분을 갖습니다.

판콜비 = 'ABCDEFGH'
넥타이레놀 = 'EFGHIJKL'

특정 약품 A의 성분이 공개되었을 때, 이와 유사한 성분을 가진 데이터들의 출력을 구하는 문제입니다.

입력 : 'ABCDEFGH' 4
데이터 : 'EFGHIJKL', 'EFGHIJKM', 'EFGHIJKZ' 등 1만 개의 데이터
출력 : 'EFGHIJKL', 'EFGHIJKM', 'EFGHIJKZ' 등 4개의 요소가 같은 약품 전부(4개 이상이 아니며 같은 요소가 4개인 것을 출력해야 합니다.)

- 해당 문제는 시간제한이 있습니다.
- 제약 데이터의 성분은 중복이 될 수 없습니다.
  (예를 들어 'AAABBBAB'와 같은 데이터는 없습니다.)

```jsx
//아스키코드
let l = [];

for (let i = 65; i < 91; i++) {
  l.push(String.fromCharCode(i));
}

//l에서 랜덤으로 8개 뽑은 후 리턴
function randomItem(a) {
  let string = [];
  while (string.length !== 8) {
    let b = a[Math.floor(Math.random() * a.length)];
    if (!string.includes(b)) {
      string.push(b);
    }
  }
  let medicine = string.join("");

  return medicine;
}
//100개의 다른 의약성분 배열에 저장
let total_medicine = [];

for (let i = 0; i < 100; i++) {
  let m = randomItem(l);
  if (!total_medicine.includes(m)) {
    total_medicine.push(m);
  }
}
//user_input과 같은 성분이 있는 데이터 result에 저장
const user_input = "ABCDEFGH 4".split(" ");
let result = [];

for (let i of total_medicine) {
  //Set을 이용하여 교집합 구하기
  let setUser = new Set(user_input[0]);
  let setTotal = new Set(i);
  let interSection = new Set([...setUser].filter(x => setTotal.has(x)));
  //Set에서는 includes 또는 indexOf 대신 has()를 사용 - 값이 있는지 확인
  if (interSection.size === parseInt(user_input[1], 10)) {
    result.push(i);
  }
}

console.log("result", result);
console.log(result.length);
```
