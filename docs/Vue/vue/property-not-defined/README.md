---
title: Property or method "" is not defined
meta:
  - name: description
    content: Property or method "keyword" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
  - property: og:title
    content: Property or method "keyword" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
  - property: og:description
    content: Property or method "keyword" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/property-not-defined/
tags: ["vue"]
---

# Property or method "" is not defined

개발 중, 아래와 같은 에러를 볼 수 있습니다.

```
[Vue warn]: Property or method "keyword" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property. See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.
```

- 프로퍼티나 메소드가 정의되지는 않았는데, 렌더할때 사용되더라 그러니까 컴포넌트 초기실행할때 정의하고 사용해라 이런 뜻입니다.

## 발생 이유

1. 프로퍼티의 경우 `data(){}` 내부에 정의하지 않은 경우
2. 정의는 했는데, 이상한 자리에 넣은 경우

```js
data() {
  return {
    // 이렇게 해야 했는데
    keyword: '',

    // 요렇게 데이터 구조를 착각하고 넣은 경우죠. 제가 그렇드라구요...
    count: {
      keyword: ''
    }
  }
}
```

## 해결

제자리에 잘 넣어주면 이상 없이 실행됩니다.

<TagLinks />

<Comment />
