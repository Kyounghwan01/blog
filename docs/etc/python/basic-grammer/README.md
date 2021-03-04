---
title: python 기초 문법
meta:
  - name: description
    content: python 기초 문법
  - property: og:title
    content: python 기초 문법
  - property: og:description
    content: python 기초 문법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/etc/python/basic-grammer/
tags: ["python"]
---

# python 기초문법

> 크롤링을 위한 가장 기초적인 문법(자료형, 딕셔너리, 리스트, for, while, if 등등)만 정리합니다.

## 변수

- 자바스크립트는 카멜케이스를 쓰는데 파이썬은 스네이크케이스를 쓰는 것 같다

```py
x = 10
y = 20
z = "z"
var_true = True
var_false = False
# 주석
# 뒤에 ; 붙이지 않음
```

## 비교연산

- 비교연산은 js와 동일하게 `>, >=, <, <=, ==, !=`가 존재한다
- 자바스크립트는 비교 연산에서 ===를 통해 타입 차이를 비교하거나 비교하지 않을때는 ==를 쓰는데, 파이썬은 무조건 타입비교를 하고 ==만 사용한다.
- ==는 주소값 비교가 아닌 원시값 비교
- is는 주소값 비교 (포함 유무, not in - 불포함 유무)

```py
x == y # False
x != y # True

tt = [123, 123]
ttt = tt
tttt = [123, 123]

print(tt is ttt) # True
print(tt is tttt) # False

```

## 논리연산자 (and, or)

#### and

```py
True and True # True
True and False # False
False and True # False
False and False #False
```

#### or

```py
True or True # True
True or False # True
False or False # False
```

#### not

```py
 not True # False
```

## 리스트

- 자바스크립트 array와 많이 비슷하다

```py
listEx = [1, 2, 3]
# push
listEx.append(4)
# 리스트 length
length = len(listEx)
```

## 딕셔너리

- 자바스크립트 {}와 많이 비슷하다
- 다른 점은 키값이 string형태라는 점

```py
dictEx = {"a": "we"}
dictEx["b"] = 'are'
```

## 조건문, 반복문

- if, for, while문의 선언문과 로직문은 구분은 네스팅된 것으로 인식된다.

### 조건문

```py
var_true = True
if var_true:
# 띄어쓰기 2칸으로 네스팅 되어야 if문 내부로 인식
  print(1234)
# 여기는 if 문 밖으로 인식
print(567)
```

### 반복문

```py
strArr = 'hello'
for i, val in enumerate(strArr):
    if i != 1:
        print(i)
        print(val)
  # 0 h, 1 e ... 4 o
```

### 조건문, 반복문 결합

```py
for i in level:
  if i != 2:
    for j in level:
      print(i, "*", j, "=", i*j)
```

<TagLinks />

<Comment />
