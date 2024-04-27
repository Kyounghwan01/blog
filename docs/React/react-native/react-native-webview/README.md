---
title: react-native webview 사용법, webview, rn 데이터 통신
meta:
  - name: description
    content: react-native webview 사용법, webview, rn 데이터 통신, react, redux, ios, android, safari, chrome, google, apple
  - property: og:title
    content: react-native webview 사용법
  - property: og:description
    content: eact-native webview 사용법, webview, rn 데이터 통신, react, redux, ios, android, safari, chrome, google, apple
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-native/react-native-webview/
tags: ["react-native", "react"]
---

# react-native webview

- react-native 버전은 "0.73.2", react-native-webview 버전은 "^13.8.6"입니다.

## rn 프로젝트 및 웹 뷰 라이브러리 설치

```sh
// 프로젝트 생성
npx react-native init project-name

// 실행
npx react-native run-ios

// npm 다운로드시 해야하는 설정
npm install react-native-webview

// RNCWebview not found 같이 node_module을 못읽는 에러 발생시 ios node_module 설치 안했기 때문
cd ios
pod install

//위 명령어 실행 후 재시작하면 에러가 안뜬다
npx react-native run-ios

// pod not found 에러시
sudo gem cocopod

pod install
```

## rn에 webview 추가하기

- 중요한 부분은 useRef를 이용하여 webview를 ref로 잡는 부분입니다.
- ref를 잡은 변수를 이용하여 rn과 webview간 통신을 합니다.

```tsx
import { useRef, useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

const Index = () => {
  const webviewRef = useRef<any>();

  // rn에서 웹뷰로 변수 호출
  const handleEndLoading = (loadingState: string) => {
    if (!webviewRef) return;
    console.log("handleEndLoading");
    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    webviewRef.current.postMessage(
      JSON.stringify({ type: "LOADING", data: loadingState })
    );
  };

  const handleIsApp = () => {
    if (!webviewRef) return;
    webviewRef.current.postMessage(
      JSON.stringify({ type: "IS_APP", data: "true" })
    );
  };

  // 웹뷰에서 rn으로 함수 또는 변수 호출
  const onMessageFromWebView = ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, data } = JSON.parse(nativeEvent.data);
    console.log(type, data);

    if (type === "goBack") {
      navigation.goBack();
    } else if (type === "title") {
      setTitle(data);
    } else if (type === "share") {
      setShare(data);
    }
  };

  return (
    <WebView
      bounces={false}
      // 웹뷰가 앱에 맨 처음 load 시작 되는 함수
      onLoadStart={() => {
        handleEndLoading("start");
      }}
      // 웹뷰가 앱에 맨 처음 load 종료 될때 트리거 되는 함수
      onLoadEnd={() => {
        handleEndLoading("end");
        handleIsApp();
      }}
      onMessage={onMessageFromWebView}
      ref={webviewRef}
      source={{ uri: `웹뷰 url` }}
    />
  );
};
```

## webview 로직

- 아래 로직은 webview가 띄워질때 웹에서 띄워진건지, 앱을 통한건지 구분하는 로직을 포함합니다.
- 중요하게 봐야할 곳은 android, ios에서 들어오는 webview를 불러오는 객체가 달라 구분해야한다는 점입니다.

```tsx
"use client";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ContentNext from "../../../../../public/icons/content-next.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Page = ({ params }: { params: { page: string } }) => {
  const [msg, setMsg] = useState<{ type: string; data: string } | null>(null);
  const [isApp, setIsApp] = useState(false);

  // rn에서 Webview로 보낸 값을 수신하는 함수
  const listener = (event: any) => {
    console.log("webview listener", event.data);
    const appData = JSON.parse(event.data);
    if (appData.type === "LOADING") {
      setMsg(JSON.parse(event.data));
    } else if (appData.type === "IS_APP") {
      setIsApp(true);
    }
  };

  useEffect(() => {
    // android, ios 구분하는 코드
    const receiver = navigator.userAgent.includes("Android")
      ? document
      : window;
    receiver.addEventListener("message", listener);
    postMessage("title", "상단 타이틀에 올 값입니다.");
    postMessage("share", true);
  }, []);

  // webview에서 rn으로 값을 송신하는 함수
  const postMessage = (type: string, data: any) => {
    if (!window.ReactNativeWebView) {
      // 이 값이 없는 경우 모바일이 아니다.
      return;
    }
    window.ReactNativeWebView?.postMessage(JSON.stringify({ type, data }));
  };

  return (
    <Container>
      {isApp ? (
        <>
          {msg && msg.data === "end" && (
            <>앱내에 띄워진 웹뷰가 로딩이 완료되면 실행되는 곳</>
          )}
        </>
      ) : (
        <>모바일 웹에서 띄워지는 웹뷰 영역</>
      )}
    </Container>
  );
};
```

## ios webview console 띄우기

시뮬레이터를 이용하여 rn을 띄울경우 시뮬레이터에서 콘솔 및 네트워크를 보는 방법입니다.

사파리 → 환경설정 → 고급 → 메뉴 막대에서 개발자용 메뉴보기

앱 실행하고 시뮬레이트 띄운 다음 → 탑 메뉴에서 → 개발자용 → 시뮬레이터에서 현재 띄운 앱 이름 클릭 → 웹과 동일하게 디버깅 가능

<TagLinks />

<Comment />
