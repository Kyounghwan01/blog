(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{576:function(t,s,a){"use strict";a.r(s);var n=a(21),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"react-redux-사용법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react-redux-사용법"}},[t._v("#")]),t._v(" react-redux 사용법")]),t._v(" "),a("h2",{attrs:{id:"사용하는-이유"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#사용하는-이유"}},[t._v("#")]),t._v(" 사용하는 이유")]),t._v(" "),a("h3",{attrs:{id:"state-종속성-탈피"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state-종속성-탈피"}},[t._v("#")]),t._v(" state 종속성 탈피")]),t._v(" "),a("p",[t._v("우리는 "),a("code",[t._v("useState")]),t._v("를 사용 할 경우 컴포넌트 내부에 state를 만들고, 함수로 state를 바꿉니다. "),a("br"),t._v("그렇기 때문에 state는 컴포넌트에 종속되는 것은 당연한 결과 입니다. "),a("br"),a("strong",[t._v("redux")]),t._v("는 컴포넌트에 종속되지 않고, 상태관리를 컴포넌트 바깥에서 합니다. "),a("br"),t._v(" 프로젝트 루트레벨에서 "),a("code",[t._v("store")]),t._v("라는 곳에 state를 저장하고, 모든 컴포넌트는 store에 "),a("code",[t._v("구독")]),t._v("을 하면서 "),a("code",[t._v("state")]),t._v("와 그 state를 "),a("code",[t._v("바꾸는 함수")]),t._v("를 전달 받게 되죠. 함수를 바꿈으로 state가 바뀌면 해당 state를 바라보고 있는 컴포넌트는 모두 리렌더링 됩니다.")]),t._v(" "),a("h3",{attrs:{id:"props-props-props-지옥-탈출"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#props-props-props-지옥-탈출"}},[t._v("#")]),t._v(" props -> props -> props 지옥 탈출")]),t._v(" "),a("p",[t._v("우리가 원하는 state가 자식의 자식의 자식에서 사용한다면 props을 내리고 또 내리고 또 내리죠. 또 그 state를 바꾸기 위한 함수를 또 내리고 ..내리고....내립니다.\n"),a("br"),t._v("이렇게 되면 내가 잘 하고 있는지 의문이 들게 되고, 코딩을 실수 하게 됩니다."),a("br"),t._v(" 위에서 본 대로, redux의 store는 프로젝트 루트레벨에 위치하고, 해당 store를 구독하는 컴포넌트는 모두 state와 state를 바꾸는 함수를 받을 수 있습니다. "),a("br"),a("strong",[t._v("어느 위치에 있든 상관 없이 단 한번에 상태를 받을 수 있게 됩니다!")])]),t._v(" "),a("h2",{attrs:{id:"redux-기본-원리"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redux-기본-원리"}},[t._v("#")]),t._v(" redux 기본 원리")]),t._v(" "),a("p",[t._v("redux는 기본적으로 "),a("code",[t._v("flux 패턴")]),t._v("을 따릅니다")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Action -> Dispatch -> Store -> View\n")])])]),a("p",[t._v("redux의 데이터 흐름은 동일하게 단방향으로 "),a("code",[t._v("view(컴포넌트)")]),t._v("에서 "),a("code",[t._v("Dispatch(store에서 주는 state를 바꾸는 함수)")]),t._v("라는 함수를 동해 "),a("code",[t._v("action(디스 패치 함수 이름)")]),t._v("이 발동되고 "),a("code",[t._v("reducer")]),t._v("에 정의된 로직에 따라 "),a("code",[t._v("store의 state")]),t._v("가 변화하고 그 "),a("code",[t._v("state")]),t._v("를 쓰는 "),a("code",[t._v("view(컴포넌트)")]),t._v("가 변하는 흐름을 따릅니다.")]),t._v(" "),a("h2",{attrs:{id:"react에서-redux-사용하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#react에서-redux-사용하기"}},[t._v("#")]),t._v(" react에서 redux 사용하기")]),t._v(" "),a("h2",{attrs:{id:"패키지-설치"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#패키지-설치"}},[t._v("#")]),t._v(" 패키지 설치")]),t._v(" "),a("ul",[a("li",[t._v("사용 할 패키지를 설치합니다.")]),t._v(" "),a("li",[a("code",[t._v("redux-devtools-extension")]),t._v("은 크롬 확장 프로그램에서 "),a("code",[t._v("redux dev tools")]),t._v("를 통해 설치 할 수 있고, redux의 데이터 흐름을 알아보기 쉽게 하기 위해 사용합니다.")]),t._v(" "),a("li",[a("code",[t._v("redux-logger")]),t._v("는 redux를 통해 바뀔 이전 state, dispatch 실행으로 인해 바뀐 state가 콘솔에 찍혀 디버깅 쉽게 해주는 라이브러리입니다.")])]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" redux react-redux redux-devtools-extension redux-logger\n")])])]),a("h2",{attrs:{id:"reducer-정의"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reducer-정의"}},[t._v("#")]),t._v(" reducer 정의")]),t._v(" "),a("ul",[a("li",[t._v("reducer는 "),a("code",[t._v("store")]),t._v("에 들어갈 state와 state를 바꿀 함수를 정의하는 곳입니다.")]),t._v(" "),a("li",[t._v("기본적으로 순수함수로 코딩하고, 불변성을 지켜야 합니다.")])]),t._v(" "),a("h3",{attrs:{id:"중요-불변성을-지켜야하는-이유"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#중요-불변성을-지켜야하는-이유"}},[t._v("#")]),t._v(" 중요! - 불변성을 지켜야하는 이유")]),t._v(" "),a("ul",[a("li",[a("strong",[t._v("불변성을 지켜야하는 이유")]),t._v("는 redux는 이전 state와 바뀐 state를 구분하는 방법이 참조값이 바뀌었는지 확인하고, 참조값이 바뀌면, state가 바뀌었다고 redux가 인식하여, 해당 state를 사용하는 컴포넌트에게 리렌더링을 요청하기 때문입니다.\n"),a("ul",[a("li",[t._v("그렇기 때문에, "),a("code",[t._v("state.test = action.test")]),t._v("와 같이 직접적으로 state를 변경하면 참조값이 변하지 않아 redux는 값이 바뀌었다고 인식하지 않고 리렌더링 되지 않습니다.")]),t._v(" "),a("li",[a("code",[t._v("state.test = {...test, action.test}")])]),t._v(" "),a("li",[t._v("또는 "),a("code",[t._v("immer")]),t._v("라는 라이브러리를 사용하여 쉽게 불변성을 유지합니다.")])])])]),t._v(" "),a("p",[t._v("다시 reducer 함수 정의로 돌아와서 "),a("br")]),t._v(" "),a("h3",{attrs:{id:"_1-rootreducer를-정의합니다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-rootreducer를-정의합니다"}},[t._v("#")]),t._v(" 1. rootReducer를 정의합니다.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// reducers/index.js")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/** root reducer */")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" combineReducers "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"redux"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" counter "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./counter"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// store에 저장되는 리듀서는 오직 1개입니다.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" rootReducer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("combineReducers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  counter\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" rootReducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-세부-reducer를-정의합니다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-세부-reducer를-정의합니다"}},[t._v("#")]),t._v(" 2. 세부 reducer를 정의합니다.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// reducers/counter.js")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// reducer가 많아지면 action상수가 중복될 수 있으니")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 액션이름 앞에 파일 이름을 넣습니다.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCRESE")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"COUNT/INCRESE"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("increseCount")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("count")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCRESE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" count "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" initalState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  count"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("counter")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" initalState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("INCRESE")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        count"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("count\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// default를 쓰지 않으면 맨처음 state에 count값이 undefined가 나옵니다 꼭! default문을 넣으세요")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"app에-store-넣고-만든-reducer-반영"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#app에-store-넣고-만든-reducer-반영"}},[t._v("#")]),t._v(" app에 store 넣고, 만든 reducer 반영")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// index.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ReactDOM "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react-dom"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createStore"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" applyMiddleware"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" compose "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"redux"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Provider "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react-redux"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" logger "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"redux-logger"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" composeWithDevTools "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"redux-devtools-extension"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" App "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./App"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" rootReducer "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./reducers"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" enhancer "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n  process"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("env"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("NODE_ENV")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"production"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("compose")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("applyMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("composeWithDevTools")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("applyMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("logger"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 위에서 만든 reducer를 스토어 만들때 넣어줍니다")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" store "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createStore")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rootReducer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" enhancer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nReactDOM"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 만든 store를 앱 상위에 넣어줍니다.")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Provider store"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("store"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("App "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("Provider"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'root'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"컴포넌트에서-redux-사용하기"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#컴포넌트에서-redux-사용하기"}},[t._v("#")]),t._v(" 컴포넌트에서 redux 사용하기")]),t._v(" "),a("div",{staticClass:"language-jsx extra-class"},[a("pre",{pre:!0,attrs:{class:"language-jsx"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" useSelector"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" useDispatch "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"react-redux"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" increseCount "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"reducers/count"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// dispatch를 사용하기 위한 준비")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" dispatch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useDispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// store에 접근하여 state 가져오기")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" count "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("useSelector")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("state")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" state"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("counter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("increse")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// store에 있는 state 바꾸는 함수 실행")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("increseCount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("Counter")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n      ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("count"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n      ")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onClick")]),a("span",{pre:!0,attrs:{class:"token script language-javascript"}},[a("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("increse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("증가")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("\n    ")]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" Counter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ul",[a("li",[t._v("위 처럼 store에서 "),a("code",[t._v("useDispatch")]),t._v(", "),a("code",[t._v("useSelector")]),t._v("로 state와 함수 가져와서 적재적소에 호출해주면됩니다.")])]),t._v(" "),a("h2",{attrs:{id:"보완점"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#보완점"}},[t._v("#")]),t._v(" 보완점")]),t._v(" "),a("p",[t._v("redux의 함수는 "),a("strong",[t._v("무조건")]),t._v(" 동기적으로 데이터가 흘러갑니다."),a("br"),t._v("\n그러나 웹은 언제나 비동기로 사용자 경험을 높이는 것이 중요합니다."),a("br"),t._v("\n그래서 나온것이 "),a("code",[t._v("redux-saga")]),t._v("입니다. "),a("br"),t._v("\nredux을 사용하면서 redux-saga도 동시에 사용함으로 비동기의 유연함도 같이 가져갈 수 있습니다."),a("br"),t._v("\n다음 포스팅에서 "),a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/React/redux/redux-saga",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-saga"),a("OutboundLink")],1),t._v("에 대해 알아보겠습니다.")]),t._v(" "),a("h2",{attrs:{id:"에러"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#에러"}},[t._v("#")]),t._v(" 에러")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Error: Actions must be plain objects. Use custom middleware for async actions.\n")])])]),a("ul",[a("li",[t._v("위와 같은 에러가 나오면 "),a("code",[t._v("dispatch")]),t._v("내 정의된 로직이 함수인데 함수 호출을 안했거나, 객체인데 함수처럼 호출한 경우 나오는 에러입니다. 아래처럼 고치면 해결됩니다.")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// action이 객체면 아래처럼")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("setCount"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// action이 함수면 아래처럼")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setCount")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"typescript-redux"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typescript-redux"}},[t._v("#")]),t._v(" typescript + redux")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/React/redux-ts/",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux + typeScript 사용법"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"typescript-redux-saga"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typescript-redux-saga"}},[t._v("#")]),t._v(" typescript + redux-saga")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/TS/React/redux-saga-ts/",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-saga + typescript"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"typescript-redux-toolkit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#typescript-redux-toolkit"}},[t._v("#")]),t._v(" typescript + redux-toolkit")]),t._v(" "),a("ul",[a("li",[t._v("action 만들고 불변성 유지하고 이런것들 너무 귀찮지만 redux를 사용하고 싶은 사람을 위한 라이브러리")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://kyounghwan01.github.io/blog/React/redux/redux-toolkit",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-toolkit 알아보기"),a("OutboundLink")],1)])]),t._v(" "),a("TagLinks"),t._v(" "),a("Comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);