---
title: JavaScript - scope / hoisting 알아보기
meta:
  - name: description
    content: JavaScript - scope / hoisting 알아보기
  - property: og:title
    content: JavaScript - scope / hoisting 알아보기
  - property: og:description
    content: JavaScript - scope / hoisting 알아보기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/scope-hosting/
tags: ["JS"]
---

# scope / hoisting 알아보기

## Scope

#### 의미

- 볌위 ( 내가 해야할 일의 범위는 뭔가?? 할때의 범위 )
- 변수들의 범위 결정하는 것

#### 종류

1. 변수를 함수 내부에서 만들게되면 본인이 속한 함수 내에만 사용가능하다 -> 함수의 범위

- 내부->외부(o) 외부->내부(x)

```js
var a = 1; //변수 선언 및 할당
//선언은 함수의 외부
function foo() {
  //함수 선언
  var b = 2;
  console.log(a);
  //선언은 함수내, a에 접근, 함수내부에서는 외부에 선언된 변수에 접근할 수 있다.
  console.log(b); //b라는 변수 는 함수 내에 선언했으므로 접근 가능.
}
foo(); //함수 실행
console.log(b);
//함수 내부에 정의 된 b 이므로 외부인 이곳은 접근 불가하다.
```

```js
function foo() {
  function bar() {
    var b = 1;
  }
  console.log(b); //bar 내부에 정의된 b는 외부에 있는 이곳에 접근 불가
}
```

```js
var a = 1;
function foo() {
  var a = 2;
  console.log(a); //2
}
foo();
console.log(a); //1 외부에있는 a는 함수 내부에 있는 a=1을 찾을 수 없다.
```

2. 즉시실행함수 : 외부(다른 함수, 사용자, 파일)에서 함수 및 변수를 못 바꾸도록 보호한다.

   ```js
   (function() {})(); //함수 선언 및 실행 (function(){}) : 함수 () : 실행

   (function() {
     var a = 1;
     function foo() {
       var b = 2;
       console.log(a);
       console.log(b);
     }
     foo();
   })();

   //고의적으로 함수를 만들어서 범위를 지정한다.
   //즉시실행함수를 생성함으로 외부에서 함수를 못보도록 보호한다.
   ```

3. Global scope , Global variable, Global object

   - hoisting으로 인한 전역변수 설정 예시

   ```js
   /* 
   	global scope 구간
   */
   var a = 1; //global variable 구간

   function foo() {
     //foo function scope 구간
     b = 1; //var가 빠지면 전역변수로 바뀜

     console.log(a); //1
   }

   function bar() {
     //bar function scope
     console.log(b); //1 - b는 foo 함수로 인해 전역변수로 지정됨으로 bar 함수가 사용 가능.
   }
   ```

   ```js
   // global scope
   var a = 1; //global variable

   function foo() {
     b = 1;
     function bar() {
       var b = 2;
       console.log(b); //2
       //상위로 올라가면서 b가 있으면 글로벌로 만들지 않고 상위에 있는 변수로 할당
     }
     bar();
   }
   foo();
   console.log(b); //b=1
   ```

   - 전역변수 중복 사용으로 인한 폐해 (되도록 전역변수는 안쓰도록 합니다.)

   ```html
   <!--글로벌 스코프는 하나만 생성, 기존에 있는 글로벌 변수 덮어쓴다.-->
   <script>
     var a = aa;
     console.log("we are" + a);
     setTimeout(function() {
       console.log("we are" + a);
     }, 1000);
   </script>
   <script>
     var a = aaaaa;
     console.log("we are" + a);
     setTimeout(function() {
       console.log("we are" + a);
     }, 1000);
   </script>
   <!--a, aaa, aaa, aaa return됨-->
   ```

   - 전역변수 사용시 **즉시실행 함수**로 변수를 **보호**하여 덮어쓰지 않도록 조치

   ```html
   <!--
   보호하고 싶은 전역변수는 위와 같이 함수를 만들어서 위험을 방지한다. 
   글로벌스코프는 최대한 안넣는게 이득 
   즉시실행으로 이 함수의 이름도 모르며, 누군가가 실행하지 못하게 만든다. 
   -->
   <script>
     (function(){
         var a = aa;
       console.log('we are' +a);
       setTimeout(function(){
         console.log('we are' +a);
       },1000);
       })();
     <script/>
     <script>
       var a = aaaaa;
       console.log('we are' +a);
       setTimeout(function(){
         console.log('we are' +a);
       },1000);
   </script>
   ```

   - 전역 객체

```
   - 글로벌 객체 : 최상단 항상존재하는 객체 : Window 객체
   - Window.a  // 글로벌로 변수를 만들면 글로벌 객체에 왼쪽과 같이 붙는다.
```

결론

```
앞으로 코드를 짤때 스코프의 존재를 생각해서 짜야함
Event Loop 공부할 것!
```

## Hoisting

#### 의미

- 변수의 범위를 본인이 속한 스코프의 최상단으로 끌어올린다.

  ```js
  //var a; 와 같이 실행된다.
  console.log(a); //undefined
  var a = 1; //본인이 속한 스코프 내의 최상단으로 호이스팅된다.
  console.log(a); //1
  ```

#### 종류

- 변수 호이스팅

```js
//본인이 속한 스코프 내의 최상단으로 호이스팅된다.
console.log(a); //error
(function() {
  console.log(a); //undefined - 전처리 과정의 예
  var a = 1;
  console.log(a); //1
})();
console.log(a); //error -외부에 있는 변수는 함수 내부 접근 불가
```

```js
console.log(a);
foo();
var a = 1;
console.log(a); //1
function foo() {
  console.log(a); //undefined
}
```

- 함수 정의 방법

  1. 함수 표현식 : 함수에 대한 변수를 정의

```js
//1. 함수 표현식

//호이스팅된 값은 d가 글로벌 변수로 지정되고
//d 값은 undefined임으로
d(); //error

var d = function() {
  console.log("awdawd");
};

d(); //awdawd
```

2.  함수 선언식 : 함수 자체가 호이스팅

````js
      //2. 함수 선언식

      j(); //함수 존재 자체가 호이스팅 된다. (j)
      function j() {
        console.log("j");
      }
      j(); //j

      //둘중 하나만 쓰세요
      ```
````

<TagLinks />

<Comment />
