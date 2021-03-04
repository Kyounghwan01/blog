---
title: JavaScript - 객체 value로 정렬하기
meta:
  - name: description
    content: JavaScript - 객체 value로 정렬하기, object value sorting, js, JS, object, array, sort
  - property: og:title
    content: JavaScript - 객체 value로 정렬하기, object value sorting, js, JS, object, array, sort
  - property: og:description
    content: JavaScript - 객체 value로 정렬하기, object value sorting, js, JS, object, array, sort
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/object-sort/
tags: ["JS"]
---

# 객체를 value로 정렬하기

js에서 key와 value가 있는 object를 value 값을 기반으로 sorting하는 방법에 대해 알아보겠습니다!

여러 가지 방법으로 구현하고 입맛에 맞는 방법으로 구현하시면 될 것 같습니다

## for in문 활용 array 다시 만들기

for in문을 활용하여 새로운 array를 만들고 그곳에 객체를 push한 이후 만든 배열로 sort 하는 방법입니다.

```js
const champ = {
  Aatrox: 300,
  Zoe: 60,
  Ahri: 200,
  Ashe: 1000,
  Garen: 400
};
var sortable = [];
for (var name in champ) {
  sortable.push([vehicle, champ[name]]);
}

sortable.sort(function(a, b) {
  return a[1] - b[1];
});

// [["Zoe", 60], ["Ahri", 200], ["Aatrox", 300] ...
```

## Object.entries, reduce를 이용한 방법

es8이 지원되는 브라우저에서만 가능합니다

```js
const champ = {
  Aatrox: 300,
  Zoe: 60,
  Ahri: 200,
  Ashe: 1000,
  Garen: 400
};

const sortable = Object.entries(champ)
  .sort(([, a], [, b]) => a - b)
  .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

console.log(sortable); // {Zoe: 60, Ahri: 200, Aatrox: 300, Garen: 400, Asche: 1000}
```

## Object.fromEntries()를 이용한 방법

es10 이상 브라우저에서 가능합니다

```js
const champ = {
  Aatrox: 300,
  Zoe: 60,
  Ahri: 200,
  Ashe: 1000,
  Garen: 400
};

const test = Object.entries(champ).sort(([, a], [, b]) => a - b);
console.log(test) // [["Zoe", 60], ["Ahri", 200], ["Aatrox", 300], ["Garen", 400], ["Ashe", 1000]]

const sortable = Object.fromEntries(Object.entries(champ).sort(([, a], [, b]) => a - b));
console.log(sortable); // {Zoe: 60, Ahri: 200, Aatrox: 300, Garen: 400, Asche: 1000}
];
```

<TagLinks />

<Comment />
