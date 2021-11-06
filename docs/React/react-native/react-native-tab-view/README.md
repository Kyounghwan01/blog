---
title: react-native 상단 탭, 스와이프로 화면 이동
meta:
  - name: description
    content: react-native 상단 탭, 스와이프로 화면 이동 react, redux, ios, android, safari, chrome, google, apple, react-native-tab-view label lowercase
  - property: og:title
    content: react-native 상단 탭, 스와이프로 화면 이동, react-native-tab-view
  - property: og:description
    content: react-native 상단 탭, 스와이프로 화면 이동 react, redux, ios, android, safari, chrome, google, apple, react-native-tab-view label lowercase
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/video/
tags: ["react-native", "react"]
---

# 상단 탭, 스와이프로 화면 이동

react-native에서 상단 탭, 스와이프로 화면 이동하는 방법에 대해 알아보겠습니다.

우리는 `react-native-tab-view`라는 라이브러리를 사용해보겠습니다.

## 설치

```bash
yarn add react-native-tab-view

yarn add react-native-pager-view

yarn add react-native-gesture-handler


cd ios/

pod install
```

최상단 `index.js`에 코드를 추가합니다.

```js
import "react-native-gesture-handler";
```

## 기본적인 사용

- 아래 기본적인 사용 예시는 [react-native-tab-view](https://github.com/satya164/react-native-tab-view) 예시입니다.

```js
import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
```

## tab view 커스텀 스타일링

- tab bar의 container를 스타일링 할때는 `<TabBar>`내부에 style태그를 사용하여 스타일링합니다.
- tab bar 내부를 스타일링 할때는 `indicatorStyle`을 사용합니다.

```js
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

const MainScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" }
  ]);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: "rgb(240, 80, 20)",
            border: "none"
          }}
          style={{
            backgroundColor: "white",
            fontWeight: "bold",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent"
          }}
          pressColor={"transparent"}
        />
      )}
    />
  );
};

export default MainScreen;
```

## label 소문자 사용하기

```js
import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import styled from "styled-components/native";

const MainScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" }
  ]);

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{
            backgroundColor: "rgb(240, 80, 20)",
            border: "none"
          }}
          style={{
            backgroundColor: "white",
            fontWeight: "bold",
            shadowOffset: { height: 0, width: 0 },
            shadowColor: "transparent"
          }}
          pressColor={"transparent"}
          // 원래는 renderLabel를 넣지 않아도 tabview에 자동으로 label값이 들어갑니다 그러나 버그인지 모르겠으나 영문이 무조건 대문자로 들어 가게 되어있습니다. 소문자를 사용하려면 아래와 같이 renderLabel에 컴포넌트로 label값을 넣어 줘야 합니다.
          renderLabel={({ route, focused }) => (
            <TabLabel focused={focused}>{route.title}</TabLabel>
          )}
        />
      )}
    />
  );
};

const TabLabel = styled.Text`
  color: ${props => (props.focused ? "#f05014" : "#777777")};
  font-size: 14px;
  font-weight: bold;
`;

export default MainScreen;
```

## tabview 내부 컴포넌트에 props 넣기

- react-native-tab-view에서는 아래와 같이 SceneMap 내부 컴포넌트에 다이렉트로 prop을 전달하지 말라고합니다.

```js
// 이렇게 하지 마세요!!
SceneMap({
  first: () => <FirstRoute foo={this.props.foo} />,
  second: SecondRoute
});
```

대신 아래와 같이 switch case로 컴포넌트를 분리하라고 합니다.

```js
const renderScene = ({ route }) => {
  switch (route.key) {
    case "first":
      return <FirstRoute foo={this.props.foo} />;
    case "second":
      return <SecondRoute />;
    default:
      return null;
  }
};
```

<TagLinks />

<Comment />
