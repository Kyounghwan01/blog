---
title: mobx 알아보기
meta:
  - name: description
    content: mobx 알아보기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:title
    content: mobx 알아보기
  - property: og:description
    content: mobx 알아보기, react, mobx, state management, mobx, react, async, runInAction, observable, computed, action, autorun
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/mobx/basic/
tags: ["react", "mobx"]
---

# mobx 알아보기

mobx에 대해 이론 위주로 알아봅니다

## 사용하는 이유

MobX는 전역 상태 라이브러리입니다. 모든 상태변화롤 일어나는 부분으로 자동으로 추적해주는 역할을 합니다.

상태관리는 왜 필요할까요? 첫번째로 유지보수가 쉬워지도록 상태 로직을 분리하여 모듈화 할 수 있고 두번째로 상태관리의 단계를 간결하게 해 줍니다.

MobX는 간단하고 확장 가능한 상태 관리 라이브러리를 철학으로 하고 있습니다.

## mobX Overview

MobX는 다음과 같은 특징을 가지고 있습니다.

1. React에 종속적인 라이브러리가 아님
2. 아키텍처나 상태 컨테이너가 아닌 라이브러리
3. redux와 다르게 store에 제한이 없음
4. 또한 redux에서 해줘야했던 action 선언, connect, mapStateToProps, mapDispatchToProps등 번거로운 작업들은 데코레이터로 간단하게 대체
5. observable을 기본적으로 사용하고 있음
6. Mobx는 절대적으로 필요한 경우에만 state 변경
7. Typescript를 기반으로 만들어짐

## mobx 주요 요소

### State(Observable State) - 관찰 받고 있는 상태

- 모델을 채우는 객체, 비객체, 원시, 참조의 그래프
- 어플리케이션의 데이터 셀
- 특정 부분이 바뀌면, MobX에서는 정확히 어떤 부분이 바뀌었는지 알 수 있음
- 이 state의 변화는 reaction과 computations를 일으킴

### Derivation(Computed values) - 파생 값(연산된 값, vue의 computed와 유사)

- Observable State의 변화에 따른 값
- 기존의 상태값과 다른 연산된 값에 기반하여 만들어질 수 있는 값
- 특정값을 연산할 때에만 처리됨
- 어플리케이션으로부터 자동으로 계산될 수 있는 모든 값
- observable로부터 도출할 수 있음 값이 변경되면 자동으로 업데이트
- 성능최적화를 위해 사용

### Reactions - 반응

- Observable State의 변화에 따른 부가적인 변화
- 값이 바뀜에 따라 해야 할 일을 정하는 것을 의미
- 파생 값과 비슷하지만 값을 생성하지 않는 함수
- 대체로 I/O 와 관련된 작업
- 적당할 때 자동으로 DOM이 업데이트 되거나 네트워크 요청을 하도록 만듬
- when, autorun, reaction

### Actions : 액션 (vue의 action과 유사)

- Observable State가 사용자가 지정한 것을 포함한 모든 변경사항
- 상태를 변경시키는 모든 것
- MobX는 모든 사용자의 모든 사용자의 액션으로 발생하는 상태 변화들이 전부 자동으로 파생값(Derivation)과 리엑션(Reactions)으로 처리되도록 함

## redux와 mobx 차이

### redux

- 리엑트스러움 - 불변성 유지가 중요
- flux(먼저 보낸 택배가 먼저 배송지에 도착해야 한다는 규제) 아키텍처를 따름
- 단일 스토어, 함수형 프로그래밍, 미들웨어
- 비동기를 위해 redux-thunk, redux-saga 등의 미들웨어가 필수
- action, reducer, dispatch…

### mobX

- 객체지향적
- 단일스토어를 강제하지 않음
- 불변성 신경안써도 내부적으로 처리해줌
- 몇가지 규칙인 데코레이터 사용
- 리스트를 렌더링 할 땐 리스트 내용 외의 값이 props 로 들어가는것을 방지하기

## MobX 함수와 데코레이터

### Function

#### observable

- Observable State를 만듬
  - 우리가 관찰하려는 state
  - state의 변화는 reaction과 computations를 일으킴
  - 관찰할 수 있는 변화가 일어나면 탐지함
- 시간에 따라 변할 수 있는 값들을 MobX에게 알려주기 위해

#### computed

- 연산된 값을 사용해야 할 때
- 특정 작업을 처리하는 것이 아닌 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회할 때는 캐싱된 데이터 사용
- 상태로부터 파생될 수 있는 것들을 확인하기 위해

#### Reactions

- `when`
  - observes가 true를 반환할 때 까지 실행하고 폐기
- `autorun`
  - reaction이나 computed의 observer 대신에 사용 가능
  - autorun 으로 전달해주는 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시하여 그 값이 바뀔 때 마다 함수가 주시되도록 해줌
    - 하나하나 observe 해주지 않아도 됨
  - 관찰 가능한 상태에 의존하는 함수들을 자동으로 실행할 때 사용
    - 로깅이나 네트워크 요청에 유용
  - 한 번 동작되는 리엑션을 만들고 함수 안에서 사용되는 관찰 가능한 모든 데이터들이 변경될 때마다 자동으로 다시 실행
  - observers 자체를 가지지 않는 리액션 함수를 만들고자 할 경우에 사용
    - 로깅, 지속성 또는 UI 업데이트 코드와 같이 반응적인 코드에서 명령형 코드로 연결해야 하는 경우
  - computed와 비슷해보이지만 완전히 다르게 동작
    - computed는 상황에 따라 트리거 됨
    - autorun을 사용하면, 종속성 중 하나가 변경 될 때마다 무조건 다시 트리거 (useEffect 같은 느낌)
  - 자동으로 실행되어야 하지만 새로운 값을 내놓지 않는 함수는 autorun을 사용
- `reaction`
  - 특정 값이 바뀔 때 어떤 작업을 하고싶을 때 사용
  - autorun과 비슷, data-function과 side-effect-function을 accept함

#### Action

- 상태에 변화를 일으키는 것
- 나중에 개발자도구에서 변화의 세부 정보를 볼 수 있음
- 모든 액션이 끝난 다음에 reaction이 나타남
- `transaction`
  - 액션을 한꺼번에 일으키는 것
- `untracked`
  - establishing observers없이 코드 실행이 가능하도록 함
    - reaction과 같지만 computed와는 다름
- `allowStateChanges`
  - allow / disallow 상태를 변화함
  - By default allows action to make changes (and disallows for computed and observer)
- `observer`
  - mobx-react 패키지 내부에 존재(mobx core의 일부가 아님)
  - 관찰 가능하게 만들어줌
- decorator 문법
  - 바벨 세팅 필요함 [decorator 설정 방법](https://jeffgukang.github.io/react-native-tutorial/docs/state-tutorial/mobx-tutorial/01-getting-started/getting-started-kr.html)
- `@autobind`
  - arrow function을 사용하지 않고도 javascript this bind를 자동으로 해주는 데코레이터
- `@observable`
  - MobX가 객체들을 관찰할 수 있도록 함
- `@observer`
  - React 컴포넌트 render 함수를 autorun으로 감싸 자동으로 상태에 따라 컴포넌트가 동기되도록 만듬
  - mobx observable state 를 rerendring 하기위에 선언해준다
  - mobx-react 패키지에 존재
  - 자동으로 효율적으로 업데이트함
- `@computed`
  - 상태로부터 자동으로 파생되는 함수를 만들기 위해 사용
- `@action`
  - 디버깅 할 때 액션에 대한 정보를 확인 할 수 있게 해줌
  - transaction 과 함께 사용시 여러 액션을 한꺼번에 발생시켜서 여러개의 업데이트를 한번의 작업으로 합쳐줄 수 있음
- `@asyncAction`
  - 비동기인 경우
- `@inject`
  - Redux에서 쓰던 Provider와 똑같이 사용
  - MobX Store와 React Component 연결

<TagLinks />

<Comment />
