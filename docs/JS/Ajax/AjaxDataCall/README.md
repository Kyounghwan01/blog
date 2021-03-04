---
title: Ajax 이용 데이터 불러오기
meta:
  - name: description
    content: Ajax 이용 데이터 불러오기, javascript, XMLHttpRequest, axios, promise, async await
  - property: og:title
    content: Ajax 이용 데이터 불러오기, javascript, XMLHttpRequest, axios, promise, async await
  - property: og:description
    content: Ajax 이용 데이터 불러오기, javascript, XMLHttpRequest, axios, promise, async await
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/Ajax/AjaxDataCall/
tags: ["JS"]
---

# Ajax 이용 데이터 불러오기

`https://learnwebcode.github.io/json-example/animals-1.json`요기에 있는 데이터들을 Ajax를 통해 html상에 불러오는 예시입니다.

> html과 css는 아래 예시 참조하시기 바랍니다.

## Ajax로 정보 불러오기

```js
var ourRequest = new XMLHttpRequest();
ourRequest.open(
  "GET",
  `https://learnwebcode.github.io/json-example/animals-${count}.json`
);
ourRequest.onload = function() {
  var ourData = JSON.parse(ourRequest.responseText);
  console.log(ourData);
};
ourRequest.send();
```

위와 같은 방식으로 먼저 `new XMLHttpRequest();`을 사용합니다
이 객체는 클라이언트와 서버 간의 데이터 요청 및 응답 처리를 담당합니다. 가장 먼저 생성해야 하는 객체이며 Ajax 의 핵심입니다.

`open`메소드를 사용하여 첫번째 인자로 불러올려면 `GET`, 내보내려면 `POST`를 입력, 두번째 인자로 불러올 url 주소를 입력합니다.
요청 매개변수를 초기화하는 메서드로써 URL 에 지정한 서버의 페이지에 어떤 내용을 요청하는데 데이터는 GET/POST 방식으로 보낼 것이고 응답은 동기/비동기로 받을 것이기에 여기에 맞게 XMLHttpRequest 객체를 준비하라는 것과 같습니다.

`onload`메소드를 사용하여 불러온 데이터를 어떻게 처리할지 작성합니다.
이때, 불려오는 정보가 JSON 값임을 감안하여, 우리가 정보를 활용하려면 `JSON.parse(정보)`를 통해 `object`형태로 가공해줍니다

`send`메소드는 HTTP 요청을 실제로 실행하는 메서드입니다. 이 메서드가 실행돼야 비로소 요청이 서버에 전달되기 시작합니다.

이후 자바스크립트 코드는 기초적인 것이므로 생략합니다.

## 예시 코드

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>JSON and AJAX</title>
    <style>
      header {
        overflow: hidden;
      }
      h1 {
        float: left;
        margin-right: 20px;
      }
      button {
        margin-top: 20px;
        font-size: 20px;
        height: 30px;
      }
      .dis {
        display: none;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>JSON and AJAX</h1>
      <button id="btn">Fetch info for 3 new animals</button>
    </header>
    <div id="animal-info"></div>
    <script>
      var animalContainer = document.getElementById("animal-info");
      var btn = document.querySelector("#btn");
      var count = 1;

      btn.addEventListener("click", function() {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open(
          "GET",
          `https://learnwebcode.github.io/json-example/animals-${count}.json`
        );
        ourRequest.onload = function() {
          var ourData = JSON.parse(ourRequest.responseText);
          renderHTML(ourData);
        };
        ourRequest.send();
        count++;
        if (count === 4) {
          btn.classList.add("dis");
        }
      });
      function renderHTML(data) {
        var htmlString = "";
        for (let i = 0; i < data.length; i++) {
          htmlString += `<p>${data[i].name} is a ${data[i].species} and likes`;
          for (let j = 0; j < data[i].foods.likes.length; j++) {
            if (j === 0) {
              htmlString += ` ${data[i].foods.likes[j]}`;
            } else {
              htmlString += ` and ${data[i].foods.likes[j]}`;
            }
          }
          for (let j = 0; j < data[i].foods.dislikes.length; j++) {
            if (j === 0) {
              htmlString += ` and dislikes ${data[i].foods.dislikes[j]}`;
            } else {
              htmlString += ` and ${data[i].foods.dislikes[j]}`;
            }
          }
          htmlString += `</p>`;
        }
        animalContainer.insertAdjacentHTML("beforeend", htmlString);
      }
    </script>
  </body>
</html>
```

<TagLinks />

<Comment />
