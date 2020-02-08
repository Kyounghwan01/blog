# local,session Storage 저장방법

`localStorage`속성은 사용자 로컬의 [`Storage`](https://developer.mozilla.org/ko/docs/Web/API/Storage)객체에 접근하게 해줍니다.`localStorage`는`sessionStorage`와 비슷합니다. 유일한 차이점은 `localStorage`에 저장된 데이터는 만료 기간이 없지만, `sessionStorage`에 저장된 데이터는 세션이 끝나면(브라우저가 종료되면) 지워진다는 것입니다.

## localStorage 문법

```js
myStorage = window.localStorage;
```

### 데이터 저장 `setItem()`

- `localStorage`에 데이터를 저장하는 방법으로 두가지 방법이 있습니다.
  - 메소드 사용
  - 리터럴
- 아래 예제는 test라는 이름의 key 값을 정하고 value로 123을 저장하는 예제입니다.

```js
localStorage.setItem("test", "123");
localStorage.test = "123";
```

### 데이터 불러오기 `getItem()`

- localStorage에서 데이터를 불러오는 방법으로 두가지 방법이 있습니다.
  - 메소드 사용
  - 직접 키 입력

```js
localStorage.getItem("test");
localStorage.test;
localStorage.getItem(); //전체 값 받아오기
```

### 데이터 지우기 `removeItem()`

- 특정 key에 저장된 값만 지우기

```js
localStorage.removeItem("test");
```

- 전체 값 다 지우기

```js
localStorage.clear();
```

## `sessionStorage` 문법

- sessionStorage은 세션을 기준으로 데이터가 저장, 유지되어 이 객체에 저장된 값은 일시적 수명을 가지게 됩니다. 세션이 종료되거나 브라우저를 닫거나 일정시간 동작을 하지 않으면 값은 삭제됩니다.
- 보안 및 중요한 데이터 같이 무방비로 노출되는 경우를 피하기 위해 사용합니다.
- 데이터가 삭제되지 않길 원하면 localStorage를 사용하기 바랍니다.

```js
sessionStorage.setItem("domain", "webisfree.com");
sessionStorage.getItem("domain");
sessionStorage.removeItem("domain");
sessionStorage.clear();
//localStorage와 사용 방법 동일합니다.
```
