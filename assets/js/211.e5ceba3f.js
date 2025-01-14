(window.webpackJsonp=window.webpackJsonp||[]).push([[211],{686:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_2020-10월"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2020-10월"}},[t._v("#")]),t._v(" 2020.10월")]),t._v(" "),a("h2",{attrs:{id:"_10월-이슈-요약"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_10월-이슈-요약"}},[t._v("#")]),t._v(" 10월 이슈 요약")]),t._v(" "),a("ul",[a("li",[t._v("함수형 프로그래밍 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/JS/functional-programming/map-filter-reduce/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("react 최적화 공부 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/React/optimize-performance/intro/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("aws: route 배포 및 ci/cd 성공 (qa, staging, production) "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/etc/aws-web-hosting/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("aws: cloudfront 이용하여 http redirect https "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/etc/http-redirect-https/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("docker 설치 - 백엔드 코드 로컬 실행")]),t._v(" "),a("li",[t._v("react-native-fcm")]),t._v(" "),a("li",[t._v("typescript 강의 수강")])]),t._v(" "),a("h2",{attrs:{id:"에러-해결-모음"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#에러-해결-모음"}},[t._v("#")]),t._v(" 에러 해결 모음")]),t._v(" "),a("h2",{attrs:{id:"styled-components-createglobalstyle-버그"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#styled-components-createglobalstyle-버그"}},[t._v("#")]),t._v(" styled-components createGlobalStyle 버그")]),t._v(" "),a("p",[t._v("dev에서는")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[t._v("onst GlobalStyle "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" createGlobalStyle"),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap');\n  ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("normalize"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\n")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" GlobalStyle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("위와 같이 커스텀 css를 import 할 수 있으나, styled-components v5 버전 이후 createGlobalStyle의 @import 문제로 위와 같은 코드가 production에 배포시 하위 css가 반영되지 않음")]),t._v(" "),a("h3",{attrs:{id:"fix"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fix"}},[t._v("#")]),t._v(" fix")]),t._v(" "),a("p",[t._v("index.html에 style 태그로 직접 import 시킨다")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/css"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n  "),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string url"}},[t._v('"https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700&display=swap"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")])]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"useselector-property-does-not-exist-on-type-defaultrootstate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#useselector-property-does-not-exist-on-type-defaultrootstate"}},[t._v("#")]),t._v(" useSelector - Property '' does not exist on type 'DefaultRootState'")]),t._v(" "),a("p",[t._v("타입스크립트에서 useSelector을 쓸때는 state type을 정의해야한다. store에 RootState를 정의했을 것이니 그것을 가져오면 된다.")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" isDialogOpen "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useSelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" RootState")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tsReducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isDialogOpen\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"webview내에서-링크-클릭하면-디바이스-새-인터넷-창-띄우기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webview내에서-링크-클릭하면-디바이스-새-인터넷-창-띄우기"}},[t._v("#")]),t._v(" webview내에서 링크 클릭하면 디바이스 새 인터넷 창 띄우기")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" webviewRef "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("handleSetRef")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("_ref")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  webviewRef "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" _ref"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onNavigationStateChange")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("navState")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  webviewRef"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("canGoBack "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" navState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("canGoBack"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// url값을 webview url를 넣으면됨")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("navState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"yourdomain.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    Linking"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("openURL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("navState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onShouldStartLoadWithRequest")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("includes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"yourdomain.com"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    Linking"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("openURL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebView")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("handleSetRef"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("source")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" uri "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onNavigationStateChange")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("onNavigationStateChange"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onShouldStartLoadWithRequest")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("onShouldStartLoadWithRequest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("relesas-note → 이름 들어감")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("build_app")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      workspace"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"studiomate_user_app.xcworkspace"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      scheme"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"studiomate_user_app"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      export_method"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"development"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n이거 빼면 빌드안하고 고고\n")])])]),a("p",[t._v("처음 추가")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[t._v("fastline 추가\nsudo gem install fastlane "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NV")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v(" 처음 비번 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("안유성"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" 로그인은 회사 구글 계정으로 로그인\nfastlane match development "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("readonly")]),t._v("\n\nyarn global add firebase"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("tools\nfirebase login"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("ci 로그인은 회사 구글 계정으로 로그인\nwhich firebase로 나온 값 Fastfile의 firebase_app_distribution"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("firebase_cli_path에 복붙\nyarn beta"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("ios\n\n")])])]),a("p",[t._v("배포후 바로 들어가면 성공, 그러나 다른 디바이스에서 접속하면 안됨")]),t._v(" "),a("p",[t._v("dev, pro키를 분리해야할듯")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("sendTest")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" headers "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-Type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"application/json"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    Authorization"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key=AAAAhDmS-bY:APA91bFjF4dIAkSA-GWSFBgxRmQVwFudM1MII40rlqKSGG9eMWtH7lhQDVCrdv7-Ji7rID6eqOxhPFeHFo5Mb8wBr7SzPv_yUqntcNwATg6MP-vXkZovj7MyB4WPBXhNfW0JzFSU7oBq"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" token"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" axios"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://fcm.googleapis.com/fcm/send"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" to"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" token"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" notification"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" body"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("456")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" headers "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"프로젝트-너무-많이-열리면-나오는-에러"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#프로젝트-너무-많이-열리면-나오는-에러"}},[t._v("#")]),t._v(" 프로젝트 너무 많이 열리면 나오는 에러")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[t._v("Error"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("EMFILE")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" too many open files"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" watch\n    at FSEvent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("FSWatcher"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_handle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("onchange")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("internal"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("fs"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("watchers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("js"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("28")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("Watchman은 문제없이 임의의 많은 파일을 볼 수 있도록 특별히 설계되었으며, 사람들은 일반적으로 Jest가 iirc 어딘가의 문서에서 권장하기 때문에 응용 프로그램이 그렇게 커질 때마다 설치합니다.")]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[t._v("brew update\nbrew install watchman\n")])])]),a("h2",{attrs:{id:"react-native-fcm-ios-수신-에러"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-native-fcm-ios-수신-에러"}},[t._v("#")]),t._v(" react-native-fcm ios 수신 에러")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/React/react-native-firebase-ios-error/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"배운점"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#배운점"}},[t._v("#")]),t._v(" 배운점")]),t._v(" "),a("h2",{attrs:{id:"_1-docker-및-백엔드-로컬-실행"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-docker-및-백엔드-로컬-실행"}},[t._v("#")]),t._v(" 1. docker 및 백엔드 로컬 실행")]),t._v(" "),a("ol",[a("li",[t._v("백엔드 프로젝트 clone")]),t._v(" "),a("li",[t._v("docker파일 정의 된것 확인하고")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("git pull\ndocker-compose up -d // 백엔드 코드 docker 실행 명령어\ndocker-compose run --rm composer install\n\n// env 없으면 복사\n")])])]),a("h2",{attrs:{id:"_2-aws에-사이트-배포-및-ci-cd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-aws에-사이트-배포-및-ci-cd"}},[t._v("#")]),t._v(" 2. aws에 사이트 배포 및 ci/cd")]),t._v(" "),a("p",[t._v("위 목적을 위해 사용할 기능\n"),a("code",[t._v("cloudfront, routes 53, s3, iam, codeBuild, code pipeline")])]),t._v(" "),a("ol",[a("li",[t._v("s3 버켓을 만든다. (코드 푸시되면 들어갈 공간)")])]),t._v(" "),a("div",{staticClass:"language-tsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-tsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 버킷 정책")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Version"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2008-10-17"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PolicyForCloudFrontPrivateContent"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Statement"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Sid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Effect"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Allow"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Principal"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"AWS"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity 임의값"')]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Action"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"s3:GetObject"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Resource"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"arn:aws:s3:::user.staging.studiomate.kr/*"')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[t._v("퍼블릭 권한 풀기")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("iam에 해당 버켓 s3 사용하는 권한 준다")]),t._v(" "),a("li",[t._v("cloudfront - 설정 - oaog에 origin access identity 해쉬값을 s3 정책에 넣어줌")]),t._v(" "),a("li",[t._v("route 53 dns 추가 - 지정한 사이트가 제대로 동작은 안하지만, 열리는지 확인")]),t._v(" "),a("li",[t._v("codeBuild - orign path 나왔는지 확인하고, 깃헙 연결 및 깃헙 프로젝트 등록하고 어떤 브랜치 사용할지 정함")]),t._v(" "),a("li",[t._v("code pipeline - cd 설정\n위 aws 웹서비스에 대한 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/etc/aws-web-hosting/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"_3-typescript"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-typescript"}},[t._v("#")]),t._v(" 3. typescript")]),t._v(" "),a("ul",[a("li",[t._v("기본 타입 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/basic/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("인터페이트 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/interface/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("타입 별칭 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/type-aliases/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("제네릭 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/generic/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("타입 호환 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/type-compatiability/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("타입 추론/단언/가드 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/Fundamentals/assertion-guard-interface/",target:"_blank",rel:"noopener noreferrer"}},[t._v("정리"),a("OutboundLink")],1)])]),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);