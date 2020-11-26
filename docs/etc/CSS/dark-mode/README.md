---
title: react로 다크 모드(dark mode) 만드는 법
meta:
  - name: description
    content: react로 다크 모드(dark mode) 만드는 법
  - property: og:title
    content: react로 다크 모드(dark mode) 만드는 법
  - property: og:description
    content: react로 다크 모드(dark mode) 만드는 법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/CSS/dark-mode/
tags: ["react", "css"]
---

# react로 다크모드 만들기

react, styled-component, scss를 이용하여 다크모드를 만들어봅시다.

가장 root인 app.jsx에 root css를 Import 해줍니다.

```jsx
import React from "react";
import "../App.scss";

function App() {
  return <div className="background">dark mode</div>;
}
```

App.scss에는 흑, 백에 관련된 색을 지정합니다.

```scss
:root {
  --bg: white;
}

.dark-mode {
  --bg: black;
}
```

가장 키포인트는 react의 **html에 class로 dark-mode를 넣는 것**입니다.

방법은 아래와 같습니다. 로컬스토리지에 `bgMode`가 `dark`이면 html 클래스에 `dark-mode`를 넣습니다

```jsx
// app.jsx
import React from "react";
import styled from "styled-components";
import "../App.scss";

function App() {
  useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("dark-mode");
    }
  }, []);

  const darkOnOff = () => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("dark-mode")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("dark-mode");
      window.localStorage.setItem("bgMode", "light");
    } else {
      document.getElementsByTagName("html")[0].classList.add("dark-mode");
      window.localStorage.setItem("bgMode", "dark");
    }
  };

  return (
    <Background>
      <span>dark mode</span>
      <button onClick={darkonOff}>on/off darkMode</button>
    </Background>
  );
}

const Background = styled.div`
  background-color: var(--bg);
`;
```

위와 같이 공통 scss에서 정의한 `bg` 변수를 사용하면 html에 `dark-mode` 클래스가 있을 때는 `bg`에 `black`이 들어가고 클래스가 없을 때는 `bg`에 `white`가 들어갑니다.

이외 다른 요소들에도 root css에서 정의한 변수를 사용하면 버튼 한번에 다른 theme을 구현할 수 있습니다.

<TagLinks />

<Disqus />
