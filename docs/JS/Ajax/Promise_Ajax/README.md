---
title: Ajax + Promise
meta:
  - name: description
    content: Ajax + Promise, javascript, callback, async await, axios
  - property: og:title
    content: Ajax + Promise, javascript, callback, async await, axios
  - property: og:description
    content: Ajax + Promise, javascript, callback, async await, axios
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/Ajax/Promise_Ajax/
tags: ["JS"]
---

# Ajax + Promise

## 1. 해커뉴스 api를 통해 id(key값) 받아오기

> promise를 사용하여 순차적으로 과정이 이루어지게 합니다.
> 그 첫번째로 id가 필요하므로 id를 가져오고 맨 하단의 구문으로 data가 비동기로 잘 가져오는지 확인합니다.

- 아래는 id를 가져오는 코드입니다.

```js
const hackerIdURL = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

let newsId;
let newsData = [];

Promise.request1 = () => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", hackerIdURL, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        newsId = JSON.parse(xhr.responseText);
        resolve(newsId);
      } else {
        reject("request1 Error: " + xhr.status);
      }
    };
    xhr.send(null);
  });
};

Promise.request1().then(data => console.log(data));
```

## 2. id를 통해 render될 자료를 비동기로 받아와서 console에 id에 해당하는 정보 가져오기

> 1번 과정에서 가져온 id를 requset2함수의 인자로 넣어서 해당 id에 맞게 자료를 가져와서 `newsData`에 넣습니다. 비동기적으로 이루어져야 하니 함수를 이용하여 스코프를 만들고 배열이 완성되기 전까지 `resolve` 가 되지 않도록 합니다.

```js
Promise.request2 = param => {
  return new Promise((resolve, reject) => {
    var i = 0;

    function cb() {
      if (i < 30) {
        var xhr = new XMLHttpRequest();

        xhr.open(
          "GET",
          `https://hacker-news.firebaseio.com/v0/item/${param[i]}.json?print=pretty`,
          true
        );

        xhr.onload = function() {
          if (xhr.status === 200) {
            newsData.push(JSON.parse(xhr.responseText));
            i++;
            cb();
          } else {
            reject("request2 Error: " + xhr.status);
          }
        };
        xhr.send(null);
      } else {
        resolve(newsData);
      }
    }
    cb();
  });
};
```

> 완성됬다면 promise pending 후에 `userData` 가 console에 찍히게 됩니다.

```js
Promise.request1().then(data => {
  Promise.request2(data)
    .then(function(userData) {
      console.log(userData);
    })
    .catch(err => console.log(err));
});
```

<TagLinks />

<Comment />
