(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{531:function(v,t,e){"use strict";e.r(t);var _=e(21),a=Object(_.a)({},(function(){var v=this,t=v.$createElement,e=v._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"mobx-알아보기"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobx-알아보기"}},[v._v("#")]),v._v(" mobx 알아보기")]),v._v(" "),e("p",[v._v("mobx에 대해 이론 위주로 알아봅니다")]),v._v(" "),e("h2",{attrs:{id:"사용하는-이유"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#사용하는-이유"}},[v._v("#")]),v._v(" 사용하는 이유")]),v._v(" "),e("p",[v._v("MobX는 전역 상태 라이브러리입니다. 모든 상태변화롤 일어나는 부분으로 자동으로 추적해주는 역할을 합니다.")]),v._v(" "),e("p",[v._v("상태관리는 왜 필요할까요? 첫번째로 유지보수가 쉬워지도록 상태 로직을 분리하여 모듈화 할 수 있고 두번째로 상태관리의 단계를 간결하게 해 줍니다.")]),v._v(" "),e("p",[v._v("MobX는 간단하고 확장 가능한 상태 관리 라이브러리를 철학으로 하고 있습니다.")]),v._v(" "),e("h2",{attrs:{id:"mobx-overview"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobx-overview"}},[v._v("#")]),v._v(" mobX Overview")]),v._v(" "),e("p",[v._v("MobX는 다음과 같은 특징을 가지고 있습니다.")]),v._v(" "),e("ol",[e("li",[v._v("React에 종속적인 라이브러리가 아님")]),v._v(" "),e("li",[v._v("아키텍처나 상태 컨테이너가 아닌 라이브러리")]),v._v(" "),e("li",[v._v("redux와 다르게 store에 제한이 없음")]),v._v(" "),e("li",[v._v("또한 redux에서 해줘야했던 action 선언, connect, mapStateToProps, mapDispatchToProps등 번거로운 작업들은 데코레이터로 간단하게 대체")]),v._v(" "),e("li",[v._v("observable을 기본적으로 사용하고 있음")]),v._v(" "),e("li",[v._v("Mobx는 절대적으로 필요한 경우에만 state 변경")]),v._v(" "),e("li",[v._v("Typescript를 기반으로 만들어짐")])]),v._v(" "),e("h2",{attrs:{id:"mobx-주요-요소"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobx-주요-요소"}},[v._v("#")]),v._v(" mobx 주요 요소")]),v._v(" "),e("h3",{attrs:{id:"state-observable-state-관찰-받고-있는-상태"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#state-observable-state-관찰-받고-있는-상태"}},[v._v("#")]),v._v(" State(Observable State) - 관찰 받고 있는 상태")]),v._v(" "),e("ul",[e("li",[v._v("모델을 채우는 객체, 비객체, 원시, 참조의 그래프")]),v._v(" "),e("li",[v._v("어플리케이션의 데이터 셀")]),v._v(" "),e("li",[v._v("특정 부분이 바뀌면, MobX에서는 정확히 어떤 부분이 바뀌었는지 알 수 있음")]),v._v(" "),e("li",[v._v("이 state의 변화는 reaction과 computations를 일으킴")])]),v._v(" "),e("h3",{attrs:{id:"derivation-computed-values-파생-값-연산된-값-vue의-computed와-유사"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#derivation-computed-values-파생-값-연산된-값-vue의-computed와-유사"}},[v._v("#")]),v._v(" Derivation(Computed values) - 파생 값(연산된 값, vue의 computed와 유사)")]),v._v(" "),e("ul",[e("li",[v._v("Observable State의 변화에 따른 값")]),v._v(" "),e("li",[v._v("기존의 상태값과 다른 연산된 값에 기반하여 만들어질 수 있는 값")]),v._v(" "),e("li",[v._v("특정값을 연산할 때에만 처리됨")]),v._v(" "),e("li",[v._v("어플리케이션으로부터 자동으로 계산될 수 있는 모든 값")]),v._v(" "),e("li",[v._v("observable로부터 도출할 수 있음 값이 변경되면 자동으로 업데이트")]),v._v(" "),e("li",[v._v("성능최적화를 위해 사용")])]),v._v(" "),e("h3",{attrs:{id:"reactions-반응"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reactions-반응"}},[v._v("#")]),v._v(" Reactions - 반응")]),v._v(" "),e("ul",[e("li",[v._v("Observable State의 변화에 따른 부가적인 변화")]),v._v(" "),e("li",[v._v("값이 바뀜에 따라 해야 할 일을 정하는 것을 의미")]),v._v(" "),e("li",[v._v("파생 값과 비슷하지만 값을 생성하지 않는 함수")]),v._v(" "),e("li",[v._v("대체로 I/O 와 관련된 작업")]),v._v(" "),e("li",[v._v("적당할 때 자동으로 DOM이 업데이트 되거나 네트워크 요청을 하도록 만듬")]),v._v(" "),e("li",[v._v("when, autorun, reaction")])]),v._v(" "),e("h3",{attrs:{id:"actions-액션-vue의-action과-유사"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#actions-액션-vue의-action과-유사"}},[v._v("#")]),v._v(" Actions : 액션 (vue의 action과 유사)")]),v._v(" "),e("ul",[e("li",[v._v("Observable State가 사용자가 지정한 것을 포함한 모든 변경사항")]),v._v(" "),e("li",[v._v("상태를 변경시키는 모든 것")]),v._v(" "),e("li",[v._v("MobX는 모든 사용자의 모든 사용자의 액션으로 발생하는 상태 변화들이 전부 자동으로 파생값(Derivation)과 리엑션(Reactions)으로 처리되도록 함")])]),v._v(" "),e("h2",{attrs:{id:"redux와-mobx-차이"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redux와-mobx-차이"}},[v._v("#")]),v._v(" redux와 mobx 차이")]),v._v(" "),e("h3",{attrs:{id:"redux"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#redux"}},[v._v("#")]),v._v(" redux")]),v._v(" "),e("ul",[e("li",[v._v("리엑트스러움 - 불변성 유지가 중요")]),v._v(" "),e("li",[v._v("flux(먼저 보낸 택배가 먼저 배송지에 도착해야 한다는 규제) 아키텍처를 따름")]),v._v(" "),e("li",[v._v("단일 스토어, 함수형 프로그래밍, 미들웨어")]),v._v(" "),e("li",[v._v("비동기를 위해 redux-thunk, redux-saga 등의 미들웨어가 필수")]),v._v(" "),e("li",[v._v("action, reducer, dispatch…")])]),v._v(" "),e("h3",{attrs:{id:"mobx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobx"}},[v._v("#")]),v._v(" mobX")]),v._v(" "),e("ul",[e("li",[v._v("객체지향적")]),v._v(" "),e("li",[v._v("단일스토어를 강제하지 않음")]),v._v(" "),e("li",[v._v("불변성 신경안써도 내부적으로 처리해줌")]),v._v(" "),e("li",[v._v("몇가지 규칙인 데코레이터 사용")]),v._v(" "),e("li",[v._v("리스트를 렌더링 할 땐 리스트 내용 외의 값이 props 로 들어가는것을 방지하기")])]),v._v(" "),e("h2",{attrs:{id:"mobx-함수와-데코레이터"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mobx-함수와-데코레이터"}},[v._v("#")]),v._v(" MobX 함수와 데코레이터")]),v._v(" "),e("h3",{attrs:{id:"function"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#function"}},[v._v("#")]),v._v(" Function")]),v._v(" "),e("h4",{attrs:{id:"observable"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#observable"}},[v._v("#")]),v._v(" observable")]),v._v(" "),e("ul",[e("li",[v._v("Observable State를 만듬\n"),e("ul",[e("li",[v._v("우리가 관찰하려는 state")]),v._v(" "),e("li",[v._v("state의 변화는 reaction과 computations를 일으킴")]),v._v(" "),e("li",[v._v("관찰할 수 있는 변화가 일어나면 탐지함")])])]),v._v(" "),e("li",[v._v("시간에 따라 변할 수 있는 값들을 MobX에게 알려주기 위해")])]),v._v(" "),e("h4",{attrs:{id:"computed"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#computed"}},[v._v("#")]),v._v(" computed")]),v._v(" "),e("ul",[e("li",[v._v("연산된 값을 사용해야 할 때")]),v._v(" "),e("li",[v._v("특정 작업을 처리하는 것이 아닌 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회할 때는 캐싱된 데이터 사용")]),v._v(" "),e("li",[v._v("상태로부터 파생될 수 있는 것들을 확인하기 위해")])]),v._v(" "),e("h4",{attrs:{id:"reactions"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reactions"}},[v._v("#")]),v._v(" Reactions")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("when")]),v._v(" "),e("ul",[e("li",[v._v("observes가 true를 반환할 때 까지 실행하고 폐기")])])]),v._v(" "),e("li",[e("code",[v._v("autorun")]),v._v(" "),e("ul",[e("li",[v._v("reaction이나 computed의 observer 대신에 사용 가능")]),v._v(" "),e("li",[v._v("autorun 으로 전달해주는 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시하여 그 값이 바뀔 때 마다 함수가 주시되도록 해줌\n"),e("ul",[e("li",[v._v("하나하나 observe 해주지 않아도 됨")])])]),v._v(" "),e("li",[v._v("관찰 가능한 상태에 의존하는 함수들을 자동으로 실행할 때 사용\n"),e("ul",[e("li",[v._v("로깅이나 네트워크 요청에 유용")])])]),v._v(" "),e("li",[v._v("한 번 동작되는 리엑션을 만들고 함수 안에서 사용되는 관찰 가능한 모든 데이터들이 변경될 때마다 자동으로 다시 실행")]),v._v(" "),e("li",[v._v("observers 자체를 가지지 않는 리액션 함수를 만들고자 할 경우에 사용\n"),e("ul",[e("li",[v._v("로깅, 지속성 또는 UI 업데이트 코드와 같이 반응적인 코드에서 명령형 코드로 연결해야 하는 경우")])])]),v._v(" "),e("li",[v._v("computed와 비슷해보이지만 완전히 다르게 동작\n"),e("ul",[e("li",[v._v("computed는 상황에 따라 트리거 됨")]),v._v(" "),e("li",[v._v("autorun을 사용하면, 종속성 중 하나가 변경 될 때마다 무조건 다시 트리거 (useEffect 같은 느낌)")])])]),v._v(" "),e("li",[v._v("자동으로 실행되어야 하지만 새로운 값을 내놓지 않는 함수는 autorun을 사용")])])]),v._v(" "),e("li",[e("code",[v._v("reaction")]),v._v(" "),e("ul",[e("li",[v._v("특정 값이 바뀔 때 어떤 작업을 하고싶을 때 사용")]),v._v(" "),e("li",[v._v("autorun과 비슷, data-function과 side-effect-function을 accept함")])])])]),v._v(" "),e("h4",{attrs:{id:"action"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#action"}},[v._v("#")]),v._v(" Action")]),v._v(" "),e("ul",[e("li",[v._v("상태에 변화를 일으키는 것")]),v._v(" "),e("li",[v._v("나중에 개발자도구에서 변화의 세부 정보를 볼 수 있음")]),v._v(" "),e("li",[v._v("모든 액션이 끝난 다음에 reaction이 나타남")]),v._v(" "),e("li",[e("code",[v._v("transaction")]),v._v(" "),e("ul",[e("li",[v._v("액션을 한꺼번에 일으키는 것")])])]),v._v(" "),e("li",[e("code",[v._v("untracked")]),v._v(" "),e("ul",[e("li",[v._v("establishing observers없이 코드 실행이 가능하도록 함\n"),e("ul",[e("li",[v._v("reaction과 같지만 computed와는 다름")])])])])]),v._v(" "),e("li",[e("code",[v._v("allowStateChanges")]),v._v(" "),e("ul",[e("li",[v._v("allow / disallow 상태를 변화함")]),v._v(" "),e("li",[v._v("By default allows action to make changes (and disallows for computed and observer)")])])]),v._v(" "),e("li",[e("code",[v._v("observer")]),v._v(" "),e("ul",[e("li",[v._v("mobx-react 패키지 내부에 존재(mobx core의 일부가 아님)")]),v._v(" "),e("li",[v._v("관찰 가능하게 만들어줌")])])]),v._v(" "),e("li",[v._v("decorator 문법\n"),e("ul",[e("li",[v._v("바벨 세팅 필요함 "),e("a",{attrs:{href:"https://jeffgukang.github.io/react-native-tutorial/docs/state-tutorial/mobx-tutorial/01-getting-started/getting-started-kr.html",target:"_blank",rel:"noopener noreferrer"}},[v._v("decorator 설정 방법"),e("OutboundLink")],1)])])]),v._v(" "),e("li",[e("code",[v._v("@autobind")]),v._v(" "),e("ul",[e("li",[v._v("arrow function을 사용하지 않고도 javascript this bind를 자동으로 해주는 데코레이터")])])]),v._v(" "),e("li",[e("code",[v._v("@observable")]),v._v(" "),e("ul",[e("li",[v._v("MobX가 객체들을 관찰할 수 있도록 함")])])]),v._v(" "),e("li",[e("code",[v._v("@observer")]),v._v(" "),e("ul",[e("li",[v._v("React 컴포넌트 render 함수를 autorun으로 감싸 자동으로 상태에 따라 컴포넌트가 동기되도록 만듬")]),v._v(" "),e("li",[v._v("mobx observable state 를 rerendring 하기위에 선언해준다")]),v._v(" "),e("li",[v._v("mobx-react 패키지에 존재")]),v._v(" "),e("li",[v._v("자동으로 효율적으로 업데이트함")])])]),v._v(" "),e("li",[e("code",[v._v("@computed")]),v._v(" "),e("ul",[e("li",[v._v("상태로부터 자동으로 파생되는 함수를 만들기 위해 사용")])])]),v._v(" "),e("li",[e("code",[v._v("@action")]),v._v(" "),e("ul",[e("li",[v._v("디버깅 할 때 액션에 대한 정보를 확인 할 수 있게 해줌")]),v._v(" "),e("li",[v._v("transaction 과 함께 사용시 여러 액션을 한꺼번에 발생시켜서 여러개의 업데이트를 한번의 작업으로 합쳐줄 수 있음")])])]),v._v(" "),e("li",[e("code",[v._v("@asyncAction")]),v._v(" "),e("ul",[e("li",[v._v("비동기인 경우")])])]),v._v(" "),e("li",[e("code",[v._v("@inject")]),v._v(" "),e("ul",[e("li",[v._v("Redux에서 쓰던 Provider와 똑같이 사용")]),v._v(" "),e("li",[v._v("MobX Store와 React Component 연결")])])])]),v._v(" "),e("TagLinks"),v._v(" "),e("Comment")],1)}),[],!1,null,null,null);t.default=a.exports}}]);