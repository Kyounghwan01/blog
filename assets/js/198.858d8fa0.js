(window.webpackJsonp=window.webpackJsonp||[]).push([[198],{681:function(v,e,t){"use strict";t.r(e);var _=t(21),a=Object(_.a)({},(function(){var v=this,e=v.$createElement,t=v._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"vuex-란"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vuex-란"}},[v._v("#")]),v._v(" vuex 란?")]),v._v(" "),t("p",[v._v("vuex는 vue.js 내에 "),t("strong",[v._v("상태 관리")]),v._v(" 라이브러리 입니다."),t("br")]),v._v(" "),t("h2",{attrs:{id:"vuex가-생기게-된-이유"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vuex가-생기게-된-이유"}},[v._v("#")]),v._v(" vuex가 생기게 된 이유")]),v._v(" "),t("p",[v._v("부모와 자식 컴포넌트간 props로 data를 이동하는 데에는 한계가 있었습니다. 부모의 부모의 부모까지 값을 내려주거나, 함수를 내리는 경우가 다분했기 때문이죠. "),t("br"),t("br"),v._v("이벤트 버스로 값을 내리고 올리는 것에 한계를 느껴, 앱 내에 하나의 저장소를 놓고 모든 컴포넌트가 그 값에 접근하도록 하자라는 생각에 나온 것이 vuex입니다."),t("br"),t("br"),v._v("\nvuex내 store가 앱 내 모든 컴포넌트에 대하여 전역적으로 관리되는 state 저장 역할을 합니다. 그리하여 어느 컴포넌트든 store내 값에 접근하고, 값을 바꿀 수 있게 되는 것이죠.")]),v._v(" "),t("h2",{attrs:{id:"vuex-패턴"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vuex-패턴"}},[v._v("#")]),v._v(" vuex 패턴")]),v._v(" "),t("p",[v._v("기본적으로 flux 패턴을 따릅니다. flux 패턴은 데이터의 단방향 흐름을 말합니다."),t("br"),v._v(" "),t("code",[v._v("view")]),v._v("에 보이는 "),t("code",[v._v("state")]),v._v("는 "),t("code",[v._v("actions")]),v._v("에 의해 값이 결정되고 그 "),t("code",[v._v("action")]),v._v("은 "),t("code",[v._v("view")]),v._v("에서 사용 가능 하다는 뜻이죠.\n즉, "),t("code",[v._v("view")]),v._v(" -> "),t("code",[v._v("action")]),v._v(" -> "),t("code",[v._v("state")]),v._v(" -> "),t("code",[v._v("view")]),v._v(" 이렇게 단방향으로 데이터가 흐릅니다.")]),v._v(" "),t("p",[v._v("여기서 vuex는 "),t("code",[v._v("mutation")]),v._v("하나가 추가됩니다."),t("br"),v._v("\nvuex의 데이터 흐름은 동일하게 단방향으로 "),t("code",[v._v("view")]),v._v("에서 "),t("code",[v._v("Dispatch")]),v._v("라는 함수를 동해 "),t("code",[v._v("action")]),v._v("이 발동되고 "),t("code",[v._v("action")]),v._v("안에 정의된 "),t("code",[v._v("commit")]),v._v("함수에 의해 "),t("code",[v._v("mutations")]),v._v("이 실행되고 "),t("code",[v._v("mutations")]),v._v("에 정의된 로직에 따라 "),t("code",[v._v("state")]),v._v("가 변화하고 그 "),t("code",[v._v("state")]),v._v("를 쓰는 "),t("code",[v._v("view")]),v._v("가 변하는 흐름을 따릅니다.")]),v._v(" "),t("h2",{attrs:{id:"언제-사용하나요"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#언제-사용하나요"}},[v._v("#")]),v._v(" 언제 사용하나요?")]),v._v(" "),t("p",[v._v("vuex는 여러 컴포넌트에서 공유하는 상태 관리에는 유용하지만 한개의 컴포넌트에서만 사용한다면 vuex보단 간단한 "),t("a",{attrs:{href:"https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/",target:"_blank",rel:"noopener noreferrer"}},[v._v("이벤트버스만"),t("OutboundLink")],1),v._v("으로 데이터 처리하는 것을 추천합니다."),t("br"),t("br"),v._v("\n회사에서 다루는 중대형 어플리케이션의 경우 컴포넌트내 공유하는 state가 많아짐으로 자연스럽게 vuex를 사용하게 될 것입니다. 즉, 필요함을 느끼지 못한다면 굳이 쓰는 것을 추천하지 않습니다.")]),v._v(" "),t("TagLinks"),v._v(" "),t("Comment")],1)}),[],!1,null,null,null);e.default=a.exports}}]);