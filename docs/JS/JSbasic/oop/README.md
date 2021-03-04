---
title: JavaScript - 예시로 배우는 객체지향프로그래밍 (oop)
meta:
  - name: description
    content: JavaScript - 예시로 배우는 객체지향프로그래밍 (oop), prototype, constructor
  - property: og:title
    content: JavaScript - 예시로 배우는 객체지향프로그래밍 (oop)
  - property: og:description
    content: JavaScript - 예시로 배우는 객체지향프로그래밍 (oop)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/JS/JSbasic/oop/
tags: ["JS"]
---

# JavaScript - 예시로 배우는 객체지향프로그래밍

- 객체를 위주로 코드를 정리한다

## 1. 램프만들기

- 너무 어두워서 램프를 만들어야 할 것 같아요

```js
var lamp = {
  brightness: 0,
  turnOn: function() {
    return (this.brightness = 100);
  },
  turnOff: function() {
    return (this.brightness = 0);
  }
};

console.log(lamp.turnOn());
console.log(lamp.turnOff());
```

위 코드는 `lamp.brightness = 5000;` 만으로 lamp에 접근할 수 있습니다 그래서!

- 캡슐화
  - 외부인이 접근 하지 못하게, brightness 속성을 내부에만 접근하도록 함
  - 내부 정보 보호
  - 데이터를 숨기는 것과 비슷하다.

```js
//클로저를 만들어 스코프를 감싼 방법
var lamp = (function() {
  //캡슐화
  //외부 접근 불가
  var brightness = 0;

  return {
    turnOn: function() {
      brightness = 100;
    },
    turnOff: function() {
      brightness = 0;
    }
  };
})();
//lamp는 객체가 담김
lamp.turnOn();
lamp.turnOff();
```

보니까,,, 전등이 5초만 켰다가 꺼진다
그래서 5초동안 켜졌다가 자동으로 꺼지는 기능이 있으면 좋을듯
brightness에 대한 0, 100인것은 사용자가 굳이 알 필요다 없어, 켜지고 꺼지는 것만 알면됨

복잡한 원리, 구동방식을 사용자로부터 추상화 작업도 중요하다.

- 추상화

```js
//클로저를 만들어 스코프를 감싼 방법
var lamp = (function() {
  //캡슐화
  //외부 접근 불가
  var brightness = 0;

  return {
    turnOn: function() {
      brightness = 100;
    },
    turnOff: function() {
      brightness = 0;
    },
    autoOnAndOff: function() {
      brightness = 100;
      setTimeout(function() {
        brightness = 0;
      }, 5000);
    }
  };
})();
//lamp는 객체가 담김
//lamp.turnOn();
//lamp.turnOff();
lamp.autoOnAndOff(); //사용자는 이 함수만 실행하면 되도록
```

그 다음으로, 램프가 **몇 개 더 필요**합니다. 앞으로도 계속 램프가 필요합니다.

- new Lamp()를 통해 램프가 사용되도록
- 램프 클래스를 조작할때 brightness를 만지지 말라 통보 (재사용성을 강조)

```js
function Lamp() {
  this.brightness = 0;
}
Lamp.prototype.turnOn = function() {
  this.brightness = 100;
};
Lamp.prototype.turnOff = function() {
  this.brightness = 0;
};
Lamp.prototype.autoOnAndOff = function() {
  var that = this;
  that.brightness = 100;
  setTimeout(function() {
    that.brightness = 0;
  }, 5000);
};
var lamp1 = new Lamp();
var lamp2 = new Lamp();
console.log(lamp1);
```

그래도 나는 `brightness` 를 노출시키고 싶지 않아

- factory를 통해
- 생성자 함수가 아닌 함수가 객체를 리턴한다. 그 함수를 보통 factory함수라 말한다.

```js
var lampPrototype = {
  turnOn: function() {
    this.brightness = 100;
  },
  turnOff: function() {
    this.brightness = 0;
  },
  autoOnAndOff: function() {
    this.brightness = 100;
    setTimeout(() => {
      this.brightness = 0;
    }, 5000);
  }
};
//factory function
function createLamp() {
  return Object.create(lampPrototype);
}
var lamp1 = createLamp();
lamp1.turnOn();
```

constructor

- this, new 사용
- 성능
- myFoo = new Foo() : 쉽다
- 단점
  - new가 필요
  - 프로토타입 체인 설계
  - 갈아엎으려면 손볼게 많아 (new 키워드, 프로토타입 체인 루트)

## 2. 자동차를 만들어 봅시다

```js
function Car(owner) {
  this.owner = owner;
}
Car.prototype.soldTo = function(owner) {
  this.owner = owner;
};
var car = new Car("nkh");
car.soldTo("ki");
console.log(car);
```

같은 차인데 전기차 , 수소차 같이 **하위 구조**를 가진 차를 만들어 봅시다

수소차도 **soldTo함수를 동시에** 가져야 합니다. 그렇기에 기존의 Car의 함수를 위임받도록 합시다

- 상속

```js
function ElectricCar(owner) {
  //상위 constructor가져오기
  Car.call(this, owner);
  this.power = 0;
}

//Car의 프로토타입들을 강제로 전기차에 넣음
ElectricCar.prototype = Object.create(Car.prototype);
//위 상황까지만 보면 ElectricCar.prototype은 Car를 가리키므로 아래와 같이 정의함으로
//1:1 대응 시켜준다.
ElectricCar.prototype.constructor = ElectricCar;
ElectricCar.prototype.recharge = function(time) {
  var that = this; // ec reference
  setTimeout(function() {
    that.power = Math.min(time / 100, 100);
  }, time);
};

var myCar = new ElectricCar("nkh");
myCar.soldTo("ki");
console.log(myCar);

//하위 구조가 아닌 형제 구조를 봅시다.
//형제는 위와 동일하게 상속받으면 형제를 독립적으로 활용할 수 있습니다.

function VW(owner) {
  Car.call(this, owner);
  this.condition = "so so";
}

VW.prototype = Object.create(Car.prototype);
VW.prototype.constructor = VW;

VW.prototype.manipulate = function() {
  this.condition = "GOOD";
};

myVW = new VW("nkh");
console.log(myVW);
```

일반차, 전기차가 가진 중첩되는 기능이 많아질때, 어떻게 효율적으로 바꿀 것인가?

차가 더 상위, 전기차가 하위일때!

- 상속
  - call 함수 사용
  - Car.call(this,owner)
    - this는 프토로타입으,ㅣ 객체
    - 상위 클래스의 생성자를 실행한다.
    - 하위 클래스에서 상위 클래스 호출
  - ec는 car의 프로토타입을 가져오고 ec만의 constructor를 재 설정 해야한다.
  - setTimeout을 사용하면 this는 글로벌 가리킴 (그 안의 함수는 콜백큐로 들어감)

그런데, ec말고 폭스바겐 같은 형제 레벨의 차를 만든다

ec와 같은 방법으로 폭스바겐에 상속시킨다

## 그 외, Solid principle, kiss, grasp

solid가 무슨뜻인지 정도는

s : 단일책임원칙 : 한 클래스는 하나의 책임만 진다

자동차는 자동차만 (정비사 정보까지 아는건 아니다)

o : 개발 - 폐쇄 : 확장에는 열려있으나 변경에는 닫친다

D : 추상화에의존해야지 구체화에 의존하면 안된다

## es6 class활용법

class안에 constructor를 넣고 그 안에는 car에 대한 기본 정보가 담긴다.

Prototype의 메소드는

상속 : class E extends Car

- super() : 상위 클래스의 생성자 함수 (인자)
- 생성자 함수에서 반드시 먼저 super를 호출하여 상위클래스를 받아오고, 현재 필요한 인스턴스 장착

주의!

- 다른 언어의 class와 완전 다르다 js는 프로토타입체인 타는 것이다

```js
class Car {
  constructor(owner) {
    this.owner = owner;
  }

  soldTo(newOwner) {
    this.owner = newOwner;
  }
}
//constructor 를 실행함
var car = new Car("nkh");

//하위 차
class ElectricCar extends Car {
  constructor(owner) {
    //상위 생성자 함수
    super(owner);
    this.power = 0;
  }

  recharge(time) {
    var that = this;

    setTimeout(function() {
      that.power = Math.min(time / 100, 100);
    }, time);
  }
}
var ec = new ElectricCar("ki");
```

<TagLinks />

<Comment />
