---
title: React.js - 중복으로 쓰이는 공통 컴포넌트 만들기
meta:
  - name: description
    content: React.js - 중복으로 쓰이는 공통 컴포넌트 만들기, 매번 불러오지 않기, common component, redux, javascript
  - property: og:title
    content: React.js - 중복으로 쓰이는 공통 컴포넌트 만들기
  - property: og:description
    content: React.js - 중복으로 쓰이는 공통 컴포넌트 만들기, 매번 불러오지 않기, common component, redux, javascript
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/common-component/
tags: ["react"]
---

# 공통 컴포넌트 만들기

header나 footer, loading 같은 모든 컴포넌트에 쓰이는 컴포넌트는 굳이 페이지 마다 `import`하면서 쓰면 너무 중복이 심해지겠죠?
그래서 `children`속성을 이용하여, 공통으로 쓰이는 컴포넌트를 `MainLayout.jsx`라는 파일에 넣어서 공통 컴포넌트 import하는 중복을 제거하는 방법을 알아보겠습니다.

## 공통 컴포넌트 리스트

1. `src/components/header`
2. `src/components/footer`
3. `src/components/MainLayout` - 헤더와 푸터가 들어가는 컴포넌트입니다.
4. `src/components/UseExampleComponent` - MainLayout이 들어가는 컴포넌트입니다.

## header

```jsx
import React from "react";
import { useHistory } from "react-router-dom";

import NavBar from "antd-mobile/lib/nav-bar";
import Icon from "antd-mobile/lib/icon";

function Header({ title, backFunc, params, noBackBtn }) {
  const history = useHistory();

  return (
    <NavBar
      icon={!noBackBtn && <Icon type="left" />}
      onLeftClick={backFunc ? () => backFunc(params) : () => history.goBack(2)}
    >
      <div>{title}</div>
    </NavBar>
  );
}

export default Header;
```

## 공통 컴포넌트 import

```jsx
// src/components/MainLayout

import React, { useEffect } from "react";

import Toast from "antd-mobile/lib/toast";
import Header from "components/Header";
import Footer from "components/Footer";

// 넘겨주는 컴포넌트에 header, footer 값이 있으면 header, footer를 렌더합니다.
const MainLayout = ({ header, footer, children, loading }) => {
  useEffect(() => (loading ? Toast.loading("Loading", 50000) : Toast.hide()), [
    loading
  ]);

  return (
    <div>
      {header && (
        <Header
          title={header.title}
          backFunc={header.backFunc}
          params={header.params}
          noBackBtn={header.noBackBtn}
        />
      )}
      {/** children 이라는 값은 react에서 넘겨주는 값으로 vue의 slot과 비슷한 기능을 합니다. */}
      {children}
      {footer && <Footer />}
    </div>
  );
};

export default MainLayout;
```

## 사용 예제

```jsx
// src/components/UseExampleComponent
import React, { useState } from "react";
import MainLayout from "components/MainLayout";

const UseExampleComponent = () => {
  const [loading, setLoading] = useState(false);
  return (
    <MainLayout header={{ title: "사용예제", noBackBtn: true }} footer loading>
      <div>여기 jsx값들이 MainLayout의 children에 들어갑니다.</div>
    </MainLayout>
  );
};
```

- 위 처럼 사용하면 매번 header, footer 등등 공통 컴포넌트를 import하지 않고 편리하게 원하는 컴포넌트만 가져다 쓸 수 있습니다.

## 공통 css

app.jsx에 공통으로 사용할 css를 import합니다

```jsx
import "./App.css";
```

<TagLinks />

<Comment />
