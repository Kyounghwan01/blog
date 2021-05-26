---
title: 모바일 웹에서 앱 실행하기 deeplink 사용법
meta:
  - name: description
    content: 모바일 웹에서 앱 실행하기 deeplink 사용법, react, webview, deeplink, app scheme, 앱스킴
  - property: og:title
    content: 모바일 웹에서 앱 실행하기 deeplink 사용법, react, webview, deeplink, app scheme, 앱스킴
  - property: og:description
    content: 모바일 웹에서 앱 실행하기 deeplink 사용법, react, webview, deeplink, app scheme, 앱스킴
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/deeplink/
tags: ["react"]
---

# 모바일 웹에서 앱 실행하기 deeplink 사용법

앱의 dau를 늘려 파생상품을 판매하거나 홍보를 위하는 등 다양한 이유로 모바일 웹애서 특정 앱 또는 자사 앱을 실행하고 싶을 때가 있습니다.

이때 모바일 앱 딥링크는 앱으로 전환율과 유지율을 크게 높일 수 있습니다.

모바일 앱 딥링크는 현재 앱이 설치된 경우 사용자가 링크를 클릭하면 앱이 열리고 개발자가 원하는 화면으로 이동할 수 있습니다. 앱이 설치되지 않은 경우는 playstore 또는 appstore로 redirect시켜 앱을 다운받도록 권고 할 수 있습니다.

서론은 여기까지 하고 제가 구현한 딥링크에 대해 알아보겠습니다

저는 모바일 웹과 앱의 웹뷰를 담당하였고, 앱 스킴을 이용해서 앱을 실행하는 작업을 하였습니다. 즉, 이 포스팅은 안드로이드 또는 ios에서 앱 스킴을 만드는 방법은 포함하지 않습니다.

스킴 기반 딥링크는 url을 앱과 연결한다는 아이디어로 만들게 됩니다. (스킴 기반 딥링크: youapp://, universal link: https://yourdomain.com/) 사용자가 URL을 클릭하면 시스템이 설치된 앱을 실행합니다.

## 전제조건

앱이 실행되려면 앱이 깔려있어야하겠죠?? 그렇기 때문에 유저가 앱을 깔지 않은 경우 앱스킴을 몇번을 실행해도 사용자는 오류 메시지를 보게 되거나 아무 일도 일어나지 않을 것입니다. 웹 상에서 기기에 앱이 설치되어 있는지를 직접 확인할 수 있는 방법은 없지만, 앱이 설치되어 있다면 이를 불러오거나, 설치되어 있지 않다면 사용자를 App Store나 playstore 또는 다른 장소로 연결할 수 방법은 여러가지가 있습니다

저는 이번 예시에서 앱이 설치되지 않은 경우 앱을 다운받을 수 있는 alert를 제공하는 방법으로 구현하겠습니다

## 딥링크

먼저 앱이 있다고 가정하고 딥링크를 실행합니다

딥링크 URL은 yourapp://path/이라고 가정합니다

```js
const exeDeepLink = () => {
  url = "yourapp://path/";
  location.href = url;
};
```

위의 경우 앱이 설치된 경우 앱이 실행되고, 앱이 설치되지 않았다면 exeDeepLink함수는 아무 작업도 수행하지 않습니다

## 설치 유도

앱이 설치되지 않아 exeDeepLink에서 아무 실행이 없었다면 timeout기능을 통해 app을 다운받도록 유도합니다

아래코드는 checkInstallApp 가 실행되면 0.5초 후에 앱 다운로드 하겠냐는 팝업을 띄우는 코드입니다. 0.2초 마다 브라우저가 닫히는 것을 체크하여 다운로드 팝업을 띄우지 않습니다.

```js
const checkInstallApp = () => {
  const clearTimers = () => {
    clearInterval(check);
    clearTimeout(timer);
  };

  const isHideWeb = () => {
    if (document.webkitHidden || document.hidden) {
      clearTimers();
    }
  };
  const check = setInterval(isHideWeb, 200);

  const timer = setTimeout(function() {
    redirectStore();
  }, 500);
};

const redirectStore = () => {
  const ua = navigator.userAgent.toLowerCase();

  if (window.confirm("스토어로 이동하시겠습니까?")) {
    location.href =
      ua.indexOf("android") > -1
        ? "https://play.google.com/store/apps/details?id=xxxxxx"
        : "https://apps.apple.com/kr/app/xxxxxx";
  }
};
```

## 종합 코드

위에 앱 딥링크 코드와 앱다운로드 코드를 종합하면 아래와 같습니다 react로 구현하였습니다

버튼 클릭시 앱 딥링크가 실행되어 앱이 깔린 경우 앱이 실행되고, 그렇지 않은 경우 다운로드 팝업이 띄워집니다

```jsx
import { useState } from "react";
import styled from "styled-components";

const Index = () => {
  const [isOpenModal, setIsModalOpen] = useState(true);
  const redireactApp = () => {
    exeDeepLink();
    checkInstallApp();
  };

  function checkInstallApp() {
    function clearTimers() {
      clearInterval(check);
      clearTimeout(timer);
    }

    function isHideWeb() {
      if (document.webkitHidden || document.hidden) {
        clearTimers();
      }
    }
    const check = setInterval(isHideWeb, 200);

    const timer = setTimeout(function() {
      redirectStore();
    }, 500);
  }

  const redirectStore = () => {
    const ua = navigator.userAgent.toLowerCase();

    if (window.confirm("스토어로 이동하시겠습니까?")) {
      location.href =
        ua.indexOf("android") > -1
          ? "https://play.google.com/store/apps/details?id=xxx"
          : "https://apps.apple.com/kr/app/xxx";
    }
  };

  function exeDeepLink() {
    url = "yourapp://path/";
    location.href = url;
  }

  return (
    <DeepLinkBlock>
      <div className="modal">
        <p className="title">앱을 여시겠습니까?</p>
        <div className="button-group">
          <button className="open btn" onClick={redireactApp}>
            네 열래요
          </button>
        </div>
      </div>
    </DeepLinkBlock>
  );
};

const DeepLinkBlock = styled.div`
  background: #d1d1d1;
  position: fixed;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    width: 278px;
    height: 171px;
    padding: 26px 14px 14px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(192, 192, 192, 0.25);
    border-radius: 8px;
    position: relative;
    bottom: 50px;
    .title {
      font-weight: bold;
      font-size: 17px;
      margin-bottom: 12px;
    }
    .desc {
      font-size: 12px;
      color: #777777;
    }
    .button-group {
      display: flex;
      justify-content: space-around;
      margin-top: 38px;
      .btn {
        height: 40px;
        width: 120px;
        background: #eeeeee;
        color: #555555;
        font-size: 14px;
        letter-spacing: -1px;
        border-radius: 6px;
      }
      .open {
        background: orange;
        color: #ffffff;
      }
    }
  }
`;

export default Index;
```

<TagLinks />

<Comment />
