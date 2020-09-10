# 70

## 행렬 곱하기

행렬 2개가 주어졌을 때 곱할 수 있는 행렬인지 확인하고 곱할 수 있다면 그 결과를 출력하고,
곱할 수 없다면 -1을 출력하는 프로그램을 만들어주세요.

```jsx
**입력**
a = [[1, 2],
		[2, 4]]

b = [[1, 0],
		[0, 3]]

**출력
[**[1, 6], [2, 12]]
```

```jsx
function solution(a, b) {
  let c = [];
  const len = a.length;

  if (len === b[0].length) {
    for (let i = 0; i < len; i++) {
      let row = [];
      for (let j = 0; j < len; j++) {
        let x = 0;
        for (let k = 0; k < len; k++) {
          x += a[i][k] * b[k][j];
        }
        row.push(x);
      }
      c.push(row);
    }
    return c;
  } else {
    return -1;
  }
}

const a = [
  [1, 2],
  [2, 4]
];
const b = [
  [1, 0],
  [0, 3]
];

console.log(solution(a, b));
```

## 깊이 우선 탐색

다음과 같이 리스트 형태로 노드들의 연결 관계가 주어진다고 할 때 깊이 우선 탐색으로 이 노드들을 탐색했을 때의 순서를 공백으로 구분하여 출력하세요.

```jsx
**데이터**
graph = {'E': ['D', 'A'],
         'F': ['D'],
         'A': ['E', 'C', 'B'],
         'B': ['A'],
         'C': ['A'],
         'D': ['E','F']}

**출력**
E D F A C B
```

```jsx
const graph = {
  A: ["E", "C", "B"],
  B: ["A"],
  C: ["A"],
  D: ["E", "F"],
  E: ["D", "A"],
  F: ["D"]
};

function dfs(graph, start) {
  let visited = [];
  let stack = [start];

  while (stack.length !== 0) {
    let n = stack.pop();
    if (!visited.includes(n)) {
      visited.push(n);
      // E와 연결된 노드 중 visited에 없는거
      let sub = graph[n].filter(x => !visited.includes(x));
      for (let i of sub) {
        stack.push(i);
      }
    }
  }
  return visited;
}

console.log(dfs(graph, "E"));
```

## 너비우선탐색

다음과 같이 입력이 주어질 때 **너비 우선 탐색을 한 순서대로 노드의 인덱스를 공백 구분으로 출력하세요.**

```jsx
**데이터**
graph = {'E': ['D', 'A'],
         'F': ['D'],
         'A': ['E', 'C', 'B'],
         'B': ['A'],
         'C': ['A'],
         'D': ['E','F']}

**출력**
E D A F C B
```

```jsx
const graph = {
  A: ["E", "C", "B"],
  B: ["A"],
  C: ["A"],
  D: ["E", "F"],
  E: ["D", "A"],
  F: ["D"]
};

function bfs(graph, start) {
  let visited = [];
  let queue = [start];

  while (queue.length !== 0) {
    let n = queue.shift();
    if (!visited.includes(n)) {
      visited.push(n);
      let sub = graph[n].filter(x => !visited.includes(x));
      for (let i of sub) {
        queue.push(i);
      }
    }
  }
  return visited;
}

console.log(bfs(graph, "E"));
```

## 최단 경로 찾기 - 너비우선탐색

다음과 같이 노드의 연결 관계가 리스트 형태로 주어집니다. 그다음 경로를 구할 두 정점이 공백으로 구분되어 주어질 것입니다.

두 정점 사이를 이동할 수 있는 최단 거리를 출력하는 프로그램을 작성해 주세요.

이때 최단 거리란, 정점의 중복 없이 한 정점에서 다른 정점까지 갈 수 있는 가장 적은 간선의 수를 의미합니다.

```jsx
**데이터**
graph = {'A': ['B', 'C'],
         'B': ['A', 'D', 'E'],
         'C': ['A', 'F'],
         'D': ['B'],
         'E': ['B', 'F'],
         'F': ['C', 'E']}

**입력**
A F

**출력**
2
```

```jsx
const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

const user_input = prompt("입력해주세요").split(" ");
const start = user_input[0];
const end = user_input[1];

let queue = [start];
let visited = [start];

function solution() {
  let count = -1;

  while (queue.length !== 0) {
    count += 1;

    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let node = queue.splice(0, 1);
      if (node == end) {
        return count;
      }

      for (let next_node in graph[node]) {
        if (!visited.includes(graph[node][next_node])) {
          visited.push(graph[node][next_node]);
          queue.push(graph[node][next_node]);
        }
      }
    }
  }
}
console.log(solution());
```

## 최장 경로 찾기 - 너비우선 (start, end 거리 구하기)

다음과 같이 노드의 연결 관계가 주어집니다.
입력으로는 경로를 구할 두 정점의 번호가 공백으로 구분되어 주어집니다.
우리는 **이 두 정점으로 가기 위한 최대 거리**를 구하고자 합니다.

최대 거리란, 정점의 중복 없이 한 정점에서 다른 정점까지 경유할 수 있는 가장 많은 간선의 수를 뜻합니다.

```jsx
**데이터**
graph = {1: [2, 3, 4],
				 2: [1, 3, 4, 5, 6],
				 3: [1, 2, 7],
				 4: [1, 2, 5, 6],
				 5: [2, 4, 6, 7],
				 6: [2, 4, 5, 7],
				 7: [3, 5, 6]}

**입력**
1 7

**출력**
6
```

```jsx
const graph = {
  1: [2, 3, 4],
  2: [1, 3, 4, 5, 6],
  3: [1, 2, 7],
  4: [1, 2, 5, 6],
  5: [2, 4, 6, 7],
  6: [2, 4, 5, 7],
  7: [3, 5, 6]
};

const user_input = prompt("입력해주세요").split(" ");
const start = parseInt(user_input[0], 10);
const end = parseInt(user_input[1], 10);

let queue = [start];
let visited = [];

function sol(n, visited) {
  let node = n[n.length - 1];
  let length = 0;

  if (node == end) {
    return visited.length;
  }

  if (visited.includes(node)) {
    return visited.length;
  } else {
    visited.push(node);
  }
  let max = [];

  for (let next_node in graph[node]) {
    n.push(graph[node][next_node]);

    max.push(length, sol(n, visited));
    length = Math.max.apply(null, max);

    queue.pop();
  }
  return length;
}

console.log(sol(queue, visited));
```

## 3, 6에만 카운트 올리기

369 게임을 하는데 조금 이상한 규칙이 있습니다. 3이나 6, 9 일 때만 박수를 쳐야합니다. 예를 들어 13, 16과 같이 3과 6, 9 만으로 된 숫자가 아닐 경우엔 박수를 치지 않습니다.
수현이는 박수를 몇 번 쳤는지 확인하고 싶습니다. 36일 때 박수를 쳤다면 박수를 친 횟수는 5번입니다.

n을 입력하면 박수를 몇 번 쳤는지 그 숫자를 출력해주세요.

### 해석

1의 자리일때 3, 6, 9에 1번씩 출력
2의 자리일때 33 -> 1*3 +1, 36 -> 1*3 +2, 39 -> 1*3+3 63 -> 2*3+1
3의 자리 333 -> 1*9 + 1*3 +1 336 -> 1*9 + 1*3 + 1

```jsx
// 999라는 숫자가오면 split으로 자리수 나누로 뒷자리부터 계산
function sol(n) {
  let answer = 0;
  let count = 1;
  // 숫자가 9이면 3추가
  const d = { 3: 1, 6: 2, 9: 3 };

  while (n.length !== 0) {
    answer += d[parseInt(n.pop(), 10)] * count;
    // 자릿수올라갈때마다 3승 추가
    count *= 3;
  }

  return answer;
}

const user_input = new String(prompt("입력해주세요")).split("");

console.log(sol(user_input));
```

## 지뢰찾기

76
수색반은 도시를 격자무늬로 나눠놓고 자신들이 수색할 수 있는 범위 내에 가장 많은 지뢰가 매립된 지역을 가장 먼저 작업하고 싶다.

가장 먼저 테스트 케이스의 수를 나타내는 1이상 100 이하의 자연수가 주어진다.
각 테스트 케이스의 첫 줄에는 수색할 도시의 크기 a와 수색반이 한 번에 수색 가능한 범위 b가 주어진다. (a와 b 모두 정사각형의 가로 또는 세로를 나타낸다. 예를 들어 10이 주어지면 10x10칸의 크기를 나타낸다.)

그 후 a 줄에 걸쳐 도시 내 지뢰가 있는지의 여부가 나타난다.
0은 지뢰가 없음 1은 지뢰가 있음을 뜻한다.

각 테스트 케이스에 대해 수색 가능한 범위 bxb 내에서 찾아낼 수 있는 가장 큰 지뢰의 개수를 구하라.

```jsx
// 5*5크기이고, 3*3 수색 가능

**입력**
1
5 3
1 0 0 1 0
0 1 0 0 1
0 0 0 1 0
0 0 0 0 0
0 0 1 0 0

**출력**
3
```

```jsx
let 사각형 = 5;
let 탐색가능지역 = 3;
let 지뢰밭 = [
  [1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0]
];
// 지뢰밭을 1차원 배열로 풀어서 규칙을 찾는다.

let iadd = 0;
let jadd = 0;
let value = 0;
let valueArray = [];
for (let iadd = 0; iadd <= 사각형 - 탐색가능지역; iadd++) {
  // 밑으로 순회
  for (let jadd = 0; jadd <= 사각형 - 탐색가능지역; jadd++) {
    // 오른쪽으로 순회
    for (let i = iadd; i <= 탐색가능지역 - 1 + iadd; i++) {
      for (let j = jadd; j <= 탐색가능지역 - 1 + jadd; j++) {
        // console.log(i, j);
        value += 지뢰밭[i][j];
      }
    }
    valueArray.push(value);
    console.log("---------");
    value = 0;
  }
  console.log("!!!!!!!");
}

console.log(valueArray);
console.log(Math.max.apply(null, valueArray));
```

## 가장 긴 공통 부분 문자열 - 연속 문자열 조합

77
**가장 긴 공통 부분 문자열(Longest Common Subsequence)**이란 A, B 두 문자열이 주어졌을 때 두 열에 공통으로 들어 있는 요소로 만들 수 있는 가장 긴 부분열을 말합니다. 여기서 부분열이란 다른 문자열에서 몇몇의 문자가 빠져 있어도 순서가 바뀌지 않은 열을 말합니다.

예를 들어 S1 = ['T', 'H', 'I', 'S', 'I', 'S', 'S', 'T', 'R', 'I', 'N', 'G', 'S'] S2 = ['T', 'H', 'I', 'S', 'I', 'S']라는 두 문자열이 있을 때 둘 사이의 부분 공통 문자열의 길이는 ['T', 'H', 'I', 'S', 'I', 'S']의 6개가 됩니다.

이처럼 **두 문자열이 주어지면 가장 긴 부분 공통 문자열의 길이를 반환하는 프로그램**을 만들어 주세요.

두 개의 문자열이 한 줄에 하나씩 주어집니다. 문자열은 알파벳 대문자로만 구성되며 그 길이는 100글자가 넘어가지 않습니다.

출력은 이 두 문자열의 가장 긴 부분 공통 문자열의 길이를 반환하면 됩니다.

```jsx

**입력**
THISISSTRINGS
THISIS

**출력**
6
-

**입력**
THISISSTRINGS
TATHISISKKQQAEW

**출력**
6

-

**입력**
THISISSTRINGS
KIOTHIKESSISKKQQAEW

**출력**
6

```

```jsx
// 받은 문자열의 문자 조합 (순서 안바뀜)
function sol(strings) {
  let result = [];
  for (let i = 1; i < strings.length + 1; i++) {
    for (let j = 0; j < i; j++) {
      result.push(strings.slice(j, j + strings.length - i + 1));
    }
  }
  return result;
}

const input1 = prompt("첫번째 문자열을 입력해주세요.");
const input2 = prompt("두번째 문자열을 입력해주세요.");
const list1 = sol(input1);
const list2 = sol(input2);

//공통 부분 문자열 찾기- 교집합
let intersection = list1.filter(x => list2.includes(x));

//문자열 길이로 내림차순 정렬
intersection.sort((a, b) => {
  return b.length - a.length;
});

console.log(intersection[0].length);
```

## 뒤로 밀리는 array

다음의 값이 주어졌을 때

```
l = [10, 20, 25, 27, 34, 35, 39]
```

n번 순회를 결정합니다. 예를 들어 2번 순회면

```
l = [35, 39, 10, 20, 25, 27, 34]
```

여기서 변하기 전 원소와 변한 후 원소의 값의 차가 가장 작은 값을 출력하는 프로그램을 작성하세요.

예를 들어 2번 순회했을 때 변하기 전의 리스트와 변한 후의 리스트의 값은 아래와 같습니다.

**순회전*리스트 = [10, 20, 25, 27, 34, 35, 39]
순회후*리스트 = [35, 39, 10, 20, 25, 27, 34]
리스트의차 = [25, 19, 15, 7, 9, 8, 5]**

39와 변한 후의 34 값의 차가 5이므로 리스트의 차 중 최솟값입니다. 따라서 39와 34의 인덱스인 6과 39와 34를 출력하는 프로그램을 만들어주세요.

```jsx
**입력**
순회횟수는 : 2

**출력**
index : 6
value : 39, 34
```

```jsx
function rotate(a, t) {
  let b = a.slice();
  let c = [];
  for (let i = 0; i < t; i++) {
    // 뒤에서 빼서 앞으로 넣기
    b.unshift(b.pop());
  }

  for (let i = 0; i < a.length; i++) {
    c.push(Math.abs(a[i] - b[i]));
  }

  //최솟값
  const d = Math.min.apply(null, c);

  //최솟값의 인덱스 구하기
  let index = c.indexOf(d);

  console.log("index :", index);
  console.log("value :", a[index], b[index]);
}

const l = [10, 20, 25, 27, 34, 35, 39]; //기존 입력 값

rotate(l, 2);
```
