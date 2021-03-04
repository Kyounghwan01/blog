---
title: Object is possibly 'null'
meta:
  - name: description
    content: Object is possibly 'null' 해결법, ts, typescript, type assertion, optional channing, null check
  - property: og:title
    content: Object is possibly 'null'
  - property: og:description
    content: Object is possibly 'null'
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/object-null/
tags: ["TS"]
---

# Object is possibly 'null'

`Object is possibly 'null'` 이 나오는 이유와 예시 그리고 해결법에 대해 알아보겠습니다!

## 에러가 나오는 이유

객체가 비어 있을 수도 있는데 해당 객체의 내부 메소드를 사용하거나 내부 객체 키에 값을 넣어주려고 할 때 입니다.

아래에서 예시와 어떻게 해결하면 되는지 알아봅시다!

## 예시

- 아래와 같이 `deaths-list`라는 class를 가진 div를 잡았다고 예시를 들어봅니다. 그리고 div안에 `innerHTML` 메소드를 이용해 값을 넣어봅니다.

```ts
function $(selector: string) {
  return document.querySelector(selector);
}

const deathsList = $(".deaths-list");
deathsList.innerHTML = ""; // Object is possibly 'null'.ts(2531)
```

저런 에러가 나오는 이유는 간단합니다. 개발자가 볼때는 `deathsList`는 무조건 dom이 들어간다고 보지만, ts 입장에서는 dom이 있을수도있고, 없을 수도 있기 때문입니다.

해결책은 여러 방법이 있습니다.

## 옵셔널체이닝 사용

첫번째 방법은 옵셔널체이닝 (`?`)을 사용하는 방법입니다.

```ts {2}
const deathsList = $(".deaths-list");
deathsList?.appendChild(li);
```

위처럼 `deathsList`뒤에 `?`를 붙여서 사용합니다. 이 코드는 아래 코드와 동일합니다.

```ts
deathsList?.appendChild(li) = "";

// 위와 동일한 코드
deathsList ? deathsList.appendChild(li) : null;
```

`deathsList`값이 있다면 `deathsList.appendChild(li)`를 실행하고 아니면 무시하라는 것으로 이해하시면 될 것 같습니다.

## 타입 단언 사용 (type assertion)

두번째는 타입 단언을 사용하는 방법입니다.

!를 사용하거나 as 키워드를 사용합니다. (둘다 효과는 동일합니다.)

```ts {2,6}
const deathsList = $(".deaths-list");
deathsList!.innerHTML = null; // 타입 단언 ! 사용

// 또는 as를 이용해 강제로 타입을 주입하여 null이 아니라는 것을 ts에게 알려줍니다.
const deathsList = $(".deaths-list") as HTMLDivElement;
deathsList.innerHTML = null; // 타입 단언 ! 사용
```

## 타입 단언 사용시 주의사항

타입 단언을 사용하면 개발자의 의도대로 타입을 주입하는 장점이 있지만, 남발해서는 안됩니다.

아래 예시를 보면서 왜 그런지 알아보겠습니다.

```ts {7,9}
interface Hero {
  name: string;
  skill: string;
}

// 타입 단언을 쓰지 않은 상황 -> 빈객체를 넣으면 name, skill 없다는 에러를 뜨는 아주 정상적인 상황입니다.
const hero: Hero = {}; // Type '{}' is missing the following properties from type 'Hero': name, skill ts(2739)

const a = {} as Hero; // 타입 단언 쓰면 name, skill이 없어도 에러 안뜸
a.name = "ss"; // 타입 추적 정상 작동
```

위 예시를 돌려보시면 알겠지만, 타입 단언을 쓰는 당시에는 타입에 대한 속성을 정의하지 않아도 에러가 뜨지 않습니다.

즉, 타입 단언은 꼭 필요한 상황에서만 쓰셔야 타입 추적이 제대로 될 수 있습니다.

## if문으로 null 걸러냄

마지막 방법은 가장 쉽고 흔한 방법입니다.

if문으로 null을 날리고 남은 타입을 활용하는 방법입니다.

하지만 매번 if문을 사용할 수 없으니 위에 있는 두가지 방법 중 하나를 사용하는 것이 좋을 것 같습니다.

```ts {3}
const deathsList = $(".deaths-list");

if (!deathsList) return;

deathsList.innerHTML = null;
```

## 정리

위 예시를 통해 null 타입이 들어올 때 어떤 방식으로 핸들링하면 되는지 알아 보았습니다.

if문을 사용하면 같은 케이스에 계속 if문을 써야하니 당연히 가장 좋지 않은 방법이고,

타입 단언을 사용할 때도 타입 추적을 받지 않는 순간이 있기 때문에 많이 쓰지 않는 편이 좋습니다.

그래서 저는 옵셔널 체이닝으로 `null`을 핸들링하는 방식을 추천드립니다!

<TagLinks />

<Comment />
