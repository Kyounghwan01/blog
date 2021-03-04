---
title: react hook 정리
meta:
  - name: description
    content: react hook 정리, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback
  - property: og:title
    content: react hook 정리
  - property: og:description
    content: react hook 정리, react, react16, hook, useState, useRef, useMemo, useEffect, useReducer, useCallback
  - property: og:url
    content: https://kyounghwan01.github.io/blog/React/react-hook/
tags: ["react"]
---

# react hook

## useState

- useState에 여러개 값넣는 예시

```jsx
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: ""
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: ""
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```

## useRef

- js에서 특정 돔을 선택할때 getelementbyid, queryselecor 사용하는데
- 리엑트에서도 ref를 잡아야 할때가 있다
- 이럴때 `useRef` 를 사용 class형은 `React.createRef` 를 사용한다

```jsx
function refEx() {
  const nameInput = useRef();

  const onReset = () => {
    nameInput.current.focus();
  };

  return (
    <input
      name="name"
      placeholder="이름"
      onChange={onChange}
      value={name}
      ref={nameInput}
    />
  );
}
```

ref 객체의 .current 값은 우리가 원하는 돔을 가리키고
input을 포커싱하는 focue 메소드를 호출

### useRef 2번째 기능

- 컴포넌트 안에서 조회 및 수정하는 변수를 관리
- 스크롤위치, window 함수(settimeout, setinterval) 값은 컴포넌트 변수로 관리 불가능 하고, useRef를 통해 잡은 값으로 관리 가능하다
- **이 값을 바꾼다고 컴포넌트가 리렌더링 되지 않음**
- react의 state는 상태변경 함수를 호출 -> 렌더링 이후 업데이트 된 상태 조회 방식인데, useRef로 관리하는 state는 상태 변경 이후 **렌더링 없이 바로 상태 조회**
- 위 설명대로 값 변경에 따라 렌더될 필요 없는 state에 적절

```jsx
const scrollHeight = useRef(100);

const scrollHeightReset = () => {
  scrollHeight.current = 0;
};
```

- 위처럼 useRef 내부에 정의한 값이 해당 값의 `.current` 에 위치하고, 우리는 ref값의 `.current` 값을 수정하면 핸들링 가능

## 컴포넌트 배열 호출

- map 메소드를 사용해 루프를 돌고 컴포넌트 호출합니다

```jsx
import React from "react";

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 2,
      username: "tester",
      email: "tester@example.com"
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com"
    }
  ];

  return (
    <div>
      {users.map((user, index) => (
        <User user={user} key={index} />
      ))}
    </div>
  );
}

export default UserList;
```

## 배열인 state 요소 추가

- state가 배열인경우 해당 배열을 추가, 삭제할 경우

```jsx
const newArray = state.array.push();
setArray(newArray);
```

위처럼 추가하면 react의 불변성이 없어지므로 하면 안된다.

```jsx
setArray([...state.array, newArray]);
```

위처럼 새로운 배열을 만들어 할당해야한다

또다른 방법은 `concat` 함수를 이용하여 새로운 배열을 만든 후, 재할당하는 방법이 있다.

```jsx
setUsers(state.array.concat(user));
```

## 배열인 state 제거

- 불변성을 지키면서, 특정 원하는 배열 요소를 제거하기에는 `filter` 가 가장 편하다

```jsx
const onRemove = id => {
  // user.id 가 id 인 것을 제거
  setUsers(users.filter(user => user.id !== id));
};
```

## 배열인 state 수정

- 불변성을 지키면서, 원하는 요소를 수정할때는 `map` 함수를 사용한다
- 전체 값을 돌면서 원하는 값이 나오면 바꾸고 지나가는 형식

```jsx
const onToggle = id => {
  setUsers(
    users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    )
  );
};
```

## 삭제/수정/추가

```jsx
//app.js
<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
```

```jsx
// userList
function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
```

```jsx
// user
function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black"
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}
```

## useEffect - 마운트/언마운트/업데이트시 로직

```jsx
useEffect(() => {
  console.log("컴포넌트가 화면에 나타남");
  console.log("마운트");
  return () => {
    console.log("컴포넌트가 화면에서 사라짐");
    console.log("언 마운트");
  };
}, []);
// 마지막 배열 없으면 처음 시작할때만 호출 (componentdidmount)
// 마지막 배열 없으면 컴포넌트 사라질때 cleanup 함수 호출됨
```

주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있습니다.

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

그리고 언마운트 시에 하는 작업들은 다음과 같은 사항이 있습니다.

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

- 배열 없으면 부모컴포넌트 리렌더시 자식도 다 리렌더

  - 실제 돔의 변화는 바뀐 내용이 있는 것만 반영됨
  - 굉장한 리소스 낭비

- 배열에 값 넣기

  - 값이 있으면 컴포넌트가 처음 마운트, 지정값 바뀔때, 언마운트시에도 호출, 갑이 바뀌기 직전에도 호출
  - `규칙` useEffect안에 state, props가 있다면 배열안에 값을 넣어주는게 규칙이다
    - 만약 값을 안넣으면 useEffect에 등록한 함수가 실행될때 최신 state/props를 가리키지 않게 된다
  - 부모컴포넌트가 리렌더 되면 자식도 무조건 리렌더되니까, useEffect가 불필요한 호출이 없게 하려면, dep에 props, state를 꼭 넣도록

  - dep없으면 처음, 부모리렌더, 마지막 호출됨

## useMemo - 연산한 값 재사용

- 성능 최적화 위해 연산된 값을 useMemo 훅으로 재사용
- 다른 함수에 의해 리렌더링으로 불필요 호출되는 함수를 useMemo로 감쌈

```jsx
const count = useMemo(() => countActiveUsers(users), [users]);
// users값이 바뀌지 않았다면 한번만 호출됨
const result = useMemo(() => sum(stringList), [stringList, sum]);
```

## useCallback - 함수 재사용

- useMemo는 특정 변수에 대한 결과값을 재사용하면, useCallback은 특정 함수를 새로 만들지 않고 재사용할때 사용
- 컴포넌트 내 함수들은 컴포넌트가 리렌더링될때마다 새로 만들어짐. (리소스낭비)
- 한번 만든 함수를 필요할때만 새로만들고 재사용하는 것 중요함

```jsx
const onRemove = id => {
  setUsers(users.filter(user => user.id !== id));
};

// 위에서 아래처럼사용

const onRemove = useCallback(
  id => {
    setUsers(users.filter(user => user.id !== id));
  },
  [users]
);
```

- 주의! - 함수안에서 사용하는 state, props가 잇다면 `deps` 배열안에 포함수켜야 한다. 포함시키지 않으면, 함수가 재실행될때, 최신 상태값을 불러오지 않는다. props로 받아온 함수가 있다면, 이또한 `deps`에 넣어줘야한다.
- 새로운 값에 의존하는 경우 무조건 dep에 넣어줘야함

예제

```jsx
const UseCallbackExample = () => {
  const [string, setString] = useState("");
  const [stringList, setStringList] = useState([]);

  const change = useCallback(e => {
    setString(e.target.value);
  }, []);

  const insert = useCallback(() => {
    const newList = stringList.slice();
    newList.push(string);
    setStringList(newList);
  }, [string, stringList]);

  const sum = useCallback(list => {
    console.log("문자들을 합치는 중입니다...");
    let stringSum = "";
    for (let value of list) {
      stringSum += value + " ";
    }
    return stringSum;
  }, []);

  const result = useMemo(() => sum(stringList), [stringList, sum]);

  return (
    <div>
      <input type="text" onChange={change} />
      <button onClick={insert}>문자열 추가</button>
      {result}
    </div>
  );
};
```

우선 `change`함수부터 보시면, 해당 함수는 두번째 인자로 빈 배열을 줬기 때문에 최초의 렌더링 시에만 함수가 생성되고 이후에는 생성되지 않습니다. `insert`함수는 `string`과 `stringList`가 변경될 때에만 함수를 재생성합니다. 이러한 차이는 왜 나오는 걸까요? 분명히 `change`함수에서도 `setString`을 사용했는데 말이죠. 이는 `useMeomo`나 `useCallback`이나 동일한 법칙입니다. 해당 함수 안에서 state를 사용할 때(해당 값에 의존할때)는 반드시 두번째 인자인 배열 안에 추가시켜 주어야 합니다. `change`함수는 해당 state를 사용하지는 않고 변경하기만 했으므로 의존성이 없어서 추가시키지 않아도 됐지만, `insert`함수의 경우에는 `stringList`와 `strint`을 사용하고 있기때문에 추가해줘야 했습니다. `sum`함수도 동일한 방식으로 매개변수 이외에는 다른 값을 사용하고 있지 않기 때문에 빈 배열을 두번째 값으로 넘겼습니다.

`useMemo`는 숫자, 문자열, 객체등의 일반적인 값에 사용하고, `useCallback`은 함수에 사용하면 됩니다. 위의 코드로 생각해보면, `useMemo`를 통해서는 문자열을 `result`변수에 넘겨줬지만, `useCallback`를 통해서는 `change`, `insert`, `sum`등의 함수를 넘겨줬습니다. 두가지 기능을 사용하기 전에, 어떻게 하면 효율적인 방식이 될지 고민하는 시간이 필요할 것 같습니다.

## 함수형 업데이트 (useState내 원하는 state가 변경될때만 리렌더링)

```jsx
const onDecrease = () => {
  setNumber(prevNumber - 1);
};

const onDecrease = () => {
  setNumber(prevNumber => prevNumber - 1);
};
```

- 값을 업데이트 하는 함수를 파라미터로 넣어주었습니다.

## React.memo - 컴포넌트 리렌더링 방지

- props가 바뀌지 않으면 리렌더링 방지 (부모가 리렌더링되면 자식도 리렌더링 된다는점 언제나 기억할 것)
- 컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정

## useReducer - 상태 업데이트 분리

- useState는 컴포넌트 내부에 정의하고 state 변동이 이루어 졌다.
- 다른 방법으로 state를 변경할 수 있는데, useReducer이다.
- 이 훅은, 컴포넌트 바깥에서 작성이 가능하고, 다른파일에 작성후 불러와서 사용할 수있다

<TagLinks />

<Comment />
