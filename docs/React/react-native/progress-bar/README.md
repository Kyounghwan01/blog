---
title: progress bar 만들기
meta:
  - name: description
    content: react-native progress bar 만들기, 애니메이션, number, count, react, Animated
  - property: og:title
    content: react-native progress bar 만들기, 애니메이션, number, count, react, Animated
  - property: og:description
    content: react-native progress bar 만들기, 애니메이션, number, count, react, Animated
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/animated-number/
tags: ["react-native"]
---

# progress bar 만들기

![화면-기록-2021-11-16-오전-8 52 24](https://user-images.githubusercontent.com/44187477/141871070-9e3b9bc0-b63f-4e46-9f6e-f158f8f9334c.gif)

- 위 gif와 같이 progress bar를 만들어보겠습니다.

- 예시코드에서는 styled-components를 사용했습니다. styled-components를 사용하지 않으시면 styleSheet로 css 스타일링 하시면 됩니다.

## 코드

- 아래 코드를 그대로 복사하여 따로 컴포넌트로 만들어주세요

```js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Animated, useWindowDimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import styled from "styled-components/native";

const ProgressBar = ({ percent = 33 }) => {
  const layout = useWindowDimensions();
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useFocusEffect(
    // 앱 화면이 Progress bar를 비추면 초기 퍼센트로 초기화합니다.
    useCallback(() => {
      setCount(percent);
    }, [])
  );

  useEffect(() => {
    // 0.5초마다 5퍼센트씩 progress bar를 추가합니다.
    countInterval.current = setInterval(() => setCount(old => old + 5), 500);
    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    load(count);
    // 100퍼센트가 되면 0퍼센트로 초기화합니다.
    if (count >= 100) {
      setCount(0);
      clearInterval(countInterval);
    }
  }, [count]);

  const load = count => {
    Animated.timing(counter, {
      toValue: count,
      // 애니메이션 주기 (퍼센트가 추가되는 시간(setInterval 주기)과 동일하게 맞춰주세요)
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <ProgressBarBlock width={layout.width}>
      <Animated.View
        style={{ backgroundColor: "#f05014", borderRadius: count, width }}
      />
    </ProgressBarBlock>
  );
};

export default ProgressBar;

const ProgressBarBlock = styled.View`
  height: 8px;
  flex-direction: row;
  width: ${props => props.width - 50}px;
  background-color: #eeeeee;
  border-radius: 10px;
`;

// 처음 시작할 progress 퍼센트를 지정합니다.
<ProgressBar percent={10} />;
```

<TagLinks />

<Comment />
