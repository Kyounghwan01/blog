---
title: JavaScript - prototype, 프로토타입 원리 이해하기
meta:
  - name: description
    content: JavaScript - prototype, 프로토타입 원리 이해하기
  - property: og:title
    content: JavaScript - prototype, 프로토타입 원리 이해하기
  - property: og:description
    content: JavaScript - prototype, 프로토타입 원리 이해하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/prototype/
tags: ["JS"]
---

# prototype

> 한국어로는 객체의 원형이라고 할 수 있다.
>
> prototype은 new function을 사용하여 새로 만든 객체에 만들어 집니다.
>
> 또한 **prototype에 저장된 속성**들은 생성자를 통해 객체가 만들어질 때 그 **객체에 연결**됩니다. (prototype chain)
>
> 생성자 함수 및 객체에 대해 3단 논법에 의해 아래 원리가 증명됩니다.
>
> A : `생성자 함수`는 `함수`이다.
>
> B : 모든 `함수`는 객체이다.
>
> C : `생성자 함수`는 `객체`이다.
>
> 이것이 의미하는 바는 `생성자 함수`로 인해 만들어진 `객체` 또한 `함수`가 된다는 것입니다.
>
> 아래에서 각각 단어에 대한 의미와 예시로 좀 더 접근해보겠습니다.

## constructor / prototype

- 생성자 함수 (첫 글자 대문자)
  - `new` 키워드와 함께 쓰이는 함수 (new fn();)
  - new Array(); new Object(); new Function();

```js
function con(name) {
  this.name = name;
}
var who = new con(me);
//con은 생성자함수.
```

- 모든 js 객체는 생성자 함수를 이용해 만들어진다.

  - 객체란 : key,value(속성/값)

- 위와 동일하게 생성자 함수에서도 객체를 생성합니다.

  - Object.prototype.(key) = (value)
    - 생성자에서 생성된 키 값은 자식인 객체도 사용 가능합니다.

  ```js
  function con(name) {
    this.name = name;
  }
  var who = new con("me");
  //con으로 who에게 객체 생성

  con.prototype.age = 12;
  who.age; //생성자에서 생성한 age이지만 자식인 who도 접근 가능해서 12 출력
  who.constructor === con; // true
  ```

- 모든 함수에는 `prototype`이 있습니다.

  - 이 속성이 가리키는 value에는 객체 `{contructor : f}`가 있습니다.

```js
function con(name) {
  this.name = name;
}
con.prototype;
// {constructor : f con(name)}
// 이렇게 정의하는 모든 함수에는 prototype이 있습니다.
```

- 그렇게 만들어진 `prototype`에는 반드시 `constructor`가 있습니다. 그 `constructor` 는 원래의 `Object`를 가리킵니다.
  - `Object.prototype.constructor = Object(){}`

```js
function con(name) {
  this.name = name;
}
con.prototype.constructor;
// ƒ con(name){this.name = name}  //원래의 con과 동일
// 증명
con === con.prototype.constructor; // true
```

- 즉, `Object`와 `prototype`은 **각 1개씩** 꼭 있습니다.

## Instance

> Instance는 라는 용어는 객체와 유사합니다. 다만 의미상 객체는 좀더 일반적인 의미라면, Instance는 **현재 생성된 바로 그 객체**를 의미합니다.
>
> 예를 들면,
>
> 함수 Function도 객체입니다.
> 그렇기에 "Function 객체"라 하면 "Function 자체를 의미하는지", "Function에 의해 생성된 함수 객체"를 의미하는지 모호합니다.
> 이럴 경우 "Function 인스턴스"라고 하면 일반적으로 후자를 지칭합니다.
>
> 동일하게 "Object 인스턴스"라하면 "Object 생성자로 생성된 객체"를 의미합니다.

```js
var add = new Function("x", "y", "return x+y;");
```

위 코드는 add라는 함수 인스턴스를 생성하는 표현입니다. 즉, 함수에 의해 생성된 객체가 add임을 알수있습니다.

​ 동일하게,

```js
var obj = new Object();
```

또한 obj라는 객체 인스턴스를 생성하는 표현입니다. 여기에 대해 정리해보면

- new 키워드로 정의하면, 내부적으로 this가 리턴되어 무조건 객체를 리턴한다.
- obj에 담기는 객체를 인스턴스라 부른다.
- obj 인스턴스 = 생성자 함수의 이름을 가진 인스턴스

한 가지 유의할 점은 같은 함수로 두 개의 인스턴스를 정의하면, 비록 보이는 값은 같지만 두 인스턴스는 다른 인스턴스라는 것입니다.

```js
var a = new Array();
var b = new Array();
a === b; //false;
```

## prototype Chain (위임)

위에서 배운 것들을 종합하여 prototype Chain (위임)에 대해 살펴 보겠습니다.

먼저, 아래와 같이 객체를 정의하고

```js
var obj = new Object();
```

여기에서 `Object`를 **남편**, `Object.prototype`을 **아내**, `var obj`를 **자식**으로 정의하겠습니다.

위에서 배운 것과 같이 남편과 아내는 각 **1쌍**으로 상호작용 가능 합니다.

```js
Object.prototype.constructor === Object; // true
```

여기에서 **자식** 은 아내인 엄마가 가진 것들에 마음대로 접근할 수 있습니다.

아래와 같은 방법을 **prototype Chain (위임)** 이라 부릅니다.

```js
Object.prototype.haha = 123;
obj.haha; //123
```

위와 같은 코드로 자식은 엄마의 속성에 접근하여 값을 사용할 수 있습니다.

만약에 자식이 부르고자하는 속성을 가지고 있다면, 엄마에게서 가져오지 않고 자신의 속성을 씁니다.

강제적으로 어머니의 속성에 접근해 값을 가져오려면 아래와 같이 접근합니다.

```js
obj.__proto__ === Object.prototype; //true;
```

위의 코드는 `obj.__proto__` 가 엄마와 동일하다는 것을 알려주고 있습니다. 그렇기에 `obj.__proto__` 뒤에 key값을 넣고 value를 넣으면 엄마의 속성을 수정할 수 있습니다.

```js
obj.__proto__.hoho = 123;
Object.prototype.hoho; //123;
```

<TagLinks />

<Comment />
