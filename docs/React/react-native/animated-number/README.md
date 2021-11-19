---
title: react-native animated numbers 만들기
meta:
  - name: description
    content: react-native animated numbers 만들기, 애니메이션, number, count, react, Animated
  - property: og:title
    content: react-native animated numbers 만들기, 애니메이션, number, count, react, Animated
  - property: og:description
    content: react-native animated numbers 만들기, 애니메이션, number, count, react, Animated
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/animated-number/
tags: ["react-native"]
---

# animated numbers 만들기

![화면-기록-2021-11-16-오전-8 40 57](https://user-images.githubusercontent.com/44187477/141870310-3ae5bc51-277c-412a-a913-2b1de0d14fd2.gif)

위 gif와 같이 count가 올라갈때마다 애니메이션으로 숫자가 바뀌는 ui를 만들어보겠습니다.

`react-native-reanimated`를 사용합니다.

```bash
yarn add react-native-reanimated

cd ios/
pod install
```

## 코드

- 아래 코드를 그대로 복사하여 따로 컴포넌트로 만들어주세요

```js
import React from "react";
import { Text, View } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });

  if (typeof ref.current === "undefined") {
    return 0;
  }

  return ref.current;
};

const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  includeComma,
  easing
}) => {
  const prevNumber = usePrevious(animateToNumber);
  const animateToNumberString = String(Math.abs(animateToNumber));
  const prevNumberString = String(Math.abs(prevNumber));

  const animateToNumbersArr = Array.from(animateToNumberString, Number);
  const prevNumberersArr = Array.from(prevNumberString, Number);

  if (includeComma) {
    const reducedArray = new Array(
      Math.ceil(animateToNumberString.length / 3)
    ).fill(0);

    const startReducedArray = new Array(
      Math.ceil(prevNumberString.length / 3)
    ).fill(0);

    reducedArray.map((__, index) => {
      if (index === 0) {
        return;
      }

      animateToNumbersArr.splice(
        animateToNumberString.length - index * 3,
        0,
        ","
      );
    });

    startReducedArray.map((__, index) => {
      if (index === 0) {
        return;
      }

      prevNumberersArr.splice(prevNumberString.length - index * 3, 0, ",");
    });
  }

  const [numberHeight, setNumberHeight] = React.useState(0);
  const animations = animateToNumbersArr.map((__, index) => {
    if (typeof prevNumberersArr[index] !== "number") {
      return new Animated.Value(0);
    }

    const animationHeight = -1 * (numberHeight * prevNumberersArr[index]);
    return new Animated.Value(animationHeight);
  });

  const setButtonLayout = e => {
    setNumberHeight(e.nativeEvent.layout.height);
  };

  React.useEffect(() => {
    animations.map((animation, index) => {
      if (typeof animateToNumbersArr[index] !== "number") {
        return;
      }

      Animated.timing(animation, {
        toValue: -1 * (numberHeight * animateToNumbersArr[index]),
        duration: animationDuration || 500,
        useNativeDriver: true,
        easing: easing || EasingNode.elastic(2)
      }).start();
    });
  }, [animateToNumber, numberHeight]);

  const getTranslateY = index => {
    return animations[index];
  };

  return (
    <>
      {numberHeight !== 0 && (
        <View style={{ flexDirection: "row" }}>
          {animateToNumber < 0 && (
            <Text style={[fontStyle, { height: numberHeight }]}>{"-"}</Text>
          )}
          {animateToNumbersArr.map((n, index) => {
            if (typeof n === "string") {
              return (
                <Text key={index} style={[fontStyle, { height: numberHeight }]}>
                  {n}
                </Text>
              );
            }

            return (
              <View
                key={index}
                style={{ height: numberHeight, overflow: "hidden" }}
              >
                <Animated.View
                  style={[
                    {
                      transform: [
                        {
                          translateY: getTranslateY(index)
                        }
                      ]
                    }
                  ]}
                >
                  {NUMBERS.map((number, i) => (
                    <View style={{ flexDirection: "row" }} key={i}>
                      <Text style={[fontStyle, { height: numberHeight }]}>
                        {number}
                      </Text>
                    </View>
                  ))}
                </Animated.View>
              </View>
            );
          })}
        </View>
      )}
      <Text
        style={[fontStyle, { position: "absolute", top: -999999 }]}
        onLayout={setButtonLayout}
      >
        {0}
      </Text>
    </>
  );
};

export default AnimatedNumber;
```

- 그리고 다른 컴포넌트에서 `AnimatedNumber`를 불러와서 사용합니다.

```js
// App.js
import React from "react";
import { SafeAreaView, Button } from "react-native";
import AnimatedNumber from "./AnimatedNumber";

const App = () => {
  const [animateToNumber, setAnimateToNumber] = React.useState(7979);

  const increase = () => {
    setAnimateToNumber(animateToNumber + 1999);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <AnimatedNumbers
        includeComma
        animateToNumber={animateToNumber}
        // animationDuration - 애니메이션 속도를 지정합니다.
        fontStyle={{
          color: "#F05014",
          fontSize: 50,
          fontWeight: "bold",
          animationDuration: 800
        }}
      />
      <Button title="increase" onPress={increase} />
    </SafeAreaView>
  );
};
```

<TagLinks />

<Comment />
