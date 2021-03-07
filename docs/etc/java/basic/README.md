---
title: java 기본 개념
meta:
  - name: description
    content: java 기본 개념, package, class, property, method, constructor, private, 생성자, static, getter, setter, extends, 상속, interface, 인터페이스, 추상화, 다형성, override, 오버라이드, super, abstract, lambda, try catch finally, 에러핸들링, ArrayList, HashMap
  - property: og:title
    content: java 기본 개념, package, class, property, method, constructor, private, 생성자, static, getter, setter, extends, 상속, interface, 인터페이스, 추상화, 다형성, override, 오버라이드, super, abstract, lambda, try catch finally, 에러핸들링, ArrayList, HashMap
  - property: og:description
    content: java 기본 개념, package, class, property, method, constructor, private, 생성자, static, getter, setter, extends, 상속, interface, 인터페이스, 추상화, 다형성, override, 오버라이드, super, abstract, lambda, try catch finally, 에러핸들링, ArrayList, HashMap
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/java/basic/
tags: ["java"]
---

# java 기본

자바는 패키지 -> 클래스 -> 메소드 형태로 객체지향 언어이다

같은 패키지내에서는 다른 클래스를 import 없이 자유롭게 공유 가능하다

다른 패키지 클래스는 import 하여 사용 가능하다

## 클래스

클래스는 property, method, constructor로 구성된다

```java
package src;

public class CarClass {
  // 변수
  public String color;
  public String gear;
  public int price;

  public CarClass() {
    // 생성자
    // 클래스 이름과 생성자 이름은 동일하며 void를 붙이지 않는다
    // 클래스에서 가장 먼저 호출됨 (메모리에 객체 올라감)
  }

  public void run(){
    // 메소드
    // return값이 없다면 void, 있다면 void자리에 String, Int 들어감
    // params를 받을 수 있음
  }
}
```

클래스 내의 생성자는 변수를 어떻게 받냐에 따라 여러개의 생성자를 만들 수 있다

```java
package src;

public class CarClass {
  // 변수
  public String color;
  public String gear;
  public int price;

  public CarClass() {
  }

  public CarClass(String c, int p) {
    this.color = c;
    this.price = p;
  }

  public void run(){
    // 메소드
    // return값이 없다면 void, 있다면 void자리에 String, Int 들어감
    // params를 받을 수 있음
  }
}
```

### private method

- 클래스 메소드 내부에서 호출하여 사용가능
- 생성자로 생성된 객체에서 호출 불가능

## this

클래스 내 변수를 가리킴

```java
public class CarClass {
  // 변수
  public String color;
  public String gear;
  public int price;

  public CarClass(String c, int p) {
    this.color = c; // public String color를 가리킴
    this.price = p;
  }
}
```

## package

많은 class를 폴터 형식으로 파일 관리

패키지 이름은 도메인을 거꾸로 이용 - (kyounghwan.github.io -> io.github.kyounghwan) - 회사 컨벤션 따름

패키지 이름은 패키지에 속한 클래스가 다른 클래스와 중복되지 않도록 관리

클래스 안에서는 포함되고있는 패키지를 최상단에 기재한다

```java
package example;
public class Test {}
```

## import

같은 패키지에 있는 경우 import 안해도 되지만 다른 패키지에 있는 경우 패키지와 클래스를 import 하여 사용

```java
package example;

// 패키지 example1에 있는 Example1.java 클래스
import example1.Example1;
import example1.Example2;
// 위와 동일한 한번에 import 방법
import example1.*;

public class TestClass {
  Example1 ex = new Example1();
  Example2 ex2 = new Example2();

  // import 하기 싫으면 아래와 같이 그러나 추천 안함
  example1.Example1 ex = new example1.Example1();
}
```

## static

동일한 클래스로 만든 객체 간 속성, 기능 공유

```java
package com.java.packages;

public class CarClass {
  static int totalAmount;

  public CarClass() {
    System.out.println("생성자");
  }

  public int changeAmount(int amount) {
    CarClass.totalAmount += amount;
    return totalAmount;
  }
}

```

## 데이터 은닉

객체가 가지는 데이터를 외부로부터 바뀌지 않도록 은닉하는 방법

### 변수 private

클래스 내부 변수는 대부분 private하게 설정하여 바뀌지 못하게 한다

### getter setter

변수를 메서드를 통해 접근하도록한다

```java
package com.java.packages;

public class CarClass {
  static int totalAmount;

  public CarClass(String c, int p) {
    this.color = c;
    this.price = p;
  }

  public int setAmount(int amount) {
    CarClass.totalAmount += amount;
    return totalAmount;
  }

  public int getTotalAmount() {
    return CarClass.totalAmount;
  }
}

```

## 상속

extends로 상속 받음

자식 클래스는 부모 클래스의 모든 자원을 사용 할 수 있지만, private 속성과 메소드는 사용 불가능

```java
package javaStudy;

public class ChildClass extends ParentClass {
  public ChildClass() {
    System.out.println("child class const");
  }

  public void ChildFunc() {
    System.out.println("child func");
  }
}
```

## 상속 특징

### 메서드 오버라이드

부모 클래스의 기능을 자식 클래스에서 재정의하여 사용

```java
@Override
  public void parentOverrideTestFunc() {
    System.out.println("child override tet");
  }
```

### object class

모든 클래스의 최상위 클래스는 Object 클래스

### super class

상위 클래스 호출할 때 super 사용함

- `super()` 실행시 부모 constructor 함수가 실행됨

```java
package javaStudy;

public class ChildClass extends ParentClass {
  int parentInt = 300000;

  public void childFunc() {
    System.out.println("child func" + this.parentInt + super.parentInt);
  }
}

```

## 익명 클래스

이름이 없는 클래스, 사용하고 싶은 클래스에서 한번만 사용하는 경우 선언 후 사용하고 버린다

```java
new AnonymousClass() {
  @Override
  public void mothod() {
    System.out.println("anonymous");
  }
}.method();
```

## 인터페이스

객체 생성 못하는 클래스와 비슷한 것

객체가 다양한 데이터 타입을 가지도록 다형성을 위함

class에서 interface 구현 (선언만 된 기능을 클래스에서 구현)

정의부 없이 선언만하고 해당 인터페이스를 가진 클래스에서 구현한다

```java
// InterfaceA.java
package javaStudy;

public interface InterfaceA {
  // 인터페이스는 정의 없이 선언만
  public void funcA();
}
```

```java
// InterfaceB.java
package javaStudy;

public interface InterfaceB {
  public void funcA();
}
```

```java
// InterfaceClass.java
package javaStudy;

// 여러개 인터페이스 implement 가능 (다형성)
public class InterfaceClass implements InterfaceA, InterfaceB {

  public InterfaceClass() {
    System.out.println("InterfaceClass cons");
  }

  @Override
  public void funcA() {
    System.out.println("interfaceA func");
  }

  @Override
  public void funcB() {
    System.out.println("interfaceB func");
  }
}
```

```java
public class MainClass {
  public static void main(String[] arg) {
    InterfaceA ia = new InterfaceClass();
    InterfaceB ib = new InterfaceClass();
    ia.funcA(); // interfaceA func
    ib.funcB(); // interfaceB func
  }
}
```

## 추상클래스

인터페이스와 비슷한 형태로 구체화되지 않은 멤버를 이용해 클래스를 만드는 방법

클래스의 공통된 부분을 뽑아 추상클래스를 만들고 그것을 상속하여 사용 (extends)

선언된 메소드 그룹은 extends 하고 받은 클래스에서 구현

### 추상 클래스

```java
// abstractClass/AbstractClassEx.java
package abstractClass;

public abstract class AbstractClassEx {
  // 일반적인 변수, 메소드 모두 구현 가능, 추상된 함수도 가지며 추상된 함수는 extend 클래스에서 사용한다
  private int num;
  private String str;

  public AbstractClassEx() {
    System.out.println("constructor");
  }

  public AbstractClassEx(int i, String s) {
    this.num = i;
    this.str = s;
    System.out.println("constructor" + num + str);
  }

  public void fun1() {
    System.out.println("func1");
  }

  public abstract void func2();
}
```

### 추상클래스 상속 클래스

```java
// abstractClass/ClassEx.java
package abstractClass;

public class ClassEx extends AbstractClassEx {
  public ClassEx(int i, String s) {
    // 부모 생성자 실행할때 super()
    super(i, s);
    System.out.println(11111);
  }

  @Override
  public void func2() {
    System.out.println("func2");
  }
}
```

### main

```java
// abstractClass/MainClass.java
package abstractClass;

public class MainClass {
  public static void main(String[] arg) {

    // ClassEx를 자료형으로 써도되지만 가독성을 위해 최상위 클래스를 사용
    AbstractClassEx ex = new ClassEx(10, "java");
    ex.fun1();
    ex.func2();
  }
}
```

### 인터페이스 vs 추상클래스

차이점을 인지하고 구현하는 프로그램에 맞게 선택하는 것이 중요

#### 공통점

- 추상 메소드를 가진다
- 객체 생성이 불가하며 자료형으로 사용된다 (Cannot instantiate the type AbstractClassEx)

#### 차이점

##### interface

- 상수, 추상 메서드**만** 가진다
- 추상메서드를 구현만 하도록 한다
- 다형성 지원 (implement 여러개)

##### 추상클래스

- 클래스가 가지는 속성, 자체 메소드 사용가능
- 추상 메소드 구현 및 상속기능 가징
- 단일 상속만 지원

## 람다식

객체지향이 아닌 함수지향으로 사용

기존에는 인터페이스 선언 -> 클래스에서 인터페이스 임플리먼트해서 선언한 메소드 정의 -> 호출하여 사용

람다식은 인터페이스 선언 -> 호출하는 곳에서 정의하고 바로 사용 (클래스에서 임플리먼트 과정 생략)

```java
public interface LamdaInterface {
  public void method(String s1, String s2, String s3);
}
```

```java
public static void main(String[] args) {
  LamdaInterface li1 = (String s1, String s2, String s3) -> {System.out.println(s1 + s2 + s3);}

  li1.method("hello", "he", "java");
}
```

- 매개변수가 1개이거나 타입이 같을 때 타입 생략 가능
- 실행문 한개이면 실행문 {}생략가능 생략가능
- 매개변수 한개, 실행문 한개이면 매개변수 ()생략가능 실행문 {}생략가능
- 변수에 함수 담고 실행후 해당 변수를 다른 함수로 치환 가능

```java
LamdaInterface li = s1 -> System.out.println(s1)

public interface LamdaInterface2 {
  public int method(int x, int y);
}

LamdaInterface2 li = (x, y) -> {
  int result = x + y;
  return result;
}
li2.method(10, 20);

li2 = (x, y) -> {
  // 곱으로 바꿈 가능
  int result = x * y;
  return result;
}
li2.method(1, 2);
```

## 문자열 클래스

String에 문제를 인지하고 StringBuffer, StringBuilder를 알아봄

string은 데이터가 변화하면 메모리 변화가 많아 속도가 느림

변화시 새로운 공간에 메모리 복사하고 바뀐것 반영 (기존 객체는 gc에 의해 메모리 회수 이루어짐, 회수 전까지 메모리 효율성 떨어짐)

데이터가 변경되면 메모리에서 기존 객체를 재활용한다
속도는 Builder가 더 빠르고 안정성은 Buffer가 더 좋다

```java
StringBuffer sf = new StringBuffer("JAVA");

// 맨뒤에 추가
sf.append("_8");

// 어디에 추가할 건지 (index로 구분)
sf.insert(sf.length, "_insert");

// 어디부터 어디까지 삭제
sf.delete(4, 8);
```

## collections

- 배열 데이터 효율적으로 관리 방법 (배열 관리 인터페이스)

### list

- 인덱스 이용
- 중복 가능
- vector, arraylist, linkedlist

```java
import java.util.ArrayList;
ArrayList<String> list = new ArrayList<String>();

list.add("hello");
list.add("java");

list.add(2, "test");
// 변경
list.set(1, "c"); // java -> c

// get
String str = list.get(2); // test
str = list.remove(2);
list.clear();
boolean b = list.isEmpty(); // true
```

### map

- key 이용
- key 중복불가, 데이터 중복 가능

```java
// 앞에 키(Integer), 뒤가 데이터
HashMap<Integer, String> map = new HashMap<Integer, String>();

// 추가, 교체
map.put(5, "t");

// get
str = map.get(5);
// 제거
map.remove(5);
// 포함유무
b = map.containsKey(5);
v = map.containsValue("t");

map.clear();
boolean b = map.isEmpty(); // true
```

## 에러처리

javascript와 마찬가지로 try catch finally를 사용한다

<TagLinks />

<Comment />
