---
title: vue props 전달 및 event 상속 (2)
meta:
  - name: description
    content: vue props 전달 및 event 상속 (2)
  - property: og:title
    content: vue props 전달 및 event 상속 (2)
  - property: og:description
    content: vue props 전달 및 event 상속 (2)
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/propsEvent2/
tags: ["vue"]
---

# 받은 props 활용하기 <Badge text="KH" />

## 서론

[props전달 및 event 상속](https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/)에서 부모와 자식간 데이터 전송에 대해 알아봤습니다.

개발을 하다보니 받은 props를 자식단에서 처리해야 할 경우가 생겼습니다. 원칙대로라면 부모로부터 handler 함수를 받아 처리하는 것이 맞지만 실제 개발에서 사용하다보니 피치 못할 경우들이 있었습니다.

그래서 자식단에서 props로 받은 부모의 값을 어떻게 핸들링했는지 살펴보도록 하겠습니다.

## props 바꾸는 방법

받은 props를 아래처럼 직접 할당하면

```vue
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed() {
    this.list = this.list.reverse();
  }
};
</script>
```

`Vue Error: Avoid Mutating a Prop Directly` 이런 직접 할당하지 말라는 에러를 내뿜습니다.

그러면 어떻게 바꿔야 옳게 props를 활용하는지 알아봅시다.

**1. 재할당 아닌 props 바꿈**
이 방법도 추천하지는 않습니다. react는 이 방법으로 할당하면 에러를 뿜는데 vue는 그냥 넘어가더군요 예시는 아래와 같습니다.

```vue
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteList(index) {
      //배열의 중간 요소 제거
      this.list.splice(index, 1);
    }
  }
};
</script>
```

위처럼 props를 재할당 하는 것이 아니라 props 내부를 바꾸는 작업은 허용하였습니다. 하지만 불변성이 어긋남으로 추천하지 않습니다.

**2. 값 복사 활용**
props로 받은 데이터를 복사하여 활용하는 방법입니다.

```vue
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    person: {
      type: Object
    }
  },
  created() {
    this.copyData = this.list.slice();
    this.copyPerson = JSON.parse(JSON.stringify(this.person));
  }
  computed: {
    newData() {
      return this.copyData;
    },
    newPerson(){
      return this.copyPerson
    }
  }
}
</script>
```

위처럼 배열로 받은 props의 경우 복사하여 그 값을 마음대로 활용할 수 있습니다. 객체인 경우 `JSON.parse(JSON.stringify(obj));`를 활용하면 복사 가능합니다.

**3. computed 활용**
props로 받은 값을 computed에서 받아 원하는 방향으로 핸들링합니다.

```vue
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    reversedList() {
      return this.list.reverse();
    }
  }
};
</script>
```

**4. 주의사항**
위 방법들을 사용할 때, 주의할 점이 있습니다.

- 할당 하는 값이 props와 같은 이름을 사용하지 않는다.

```vue
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      //중복 이름 사용 금지
      list: JSON.parse(this.list)
    };
  }
};
</script>
```

## 결론

자식단에서 props를 활용하는 방법에 대해 알아보았습니다.<br><br>
유념하실 부분은 **작업량이 많아지고, 많은 컴포넌트**에서 사용할 기미가 보이면 지금껏 작업한것 중지하시고 바로 **store** 작업 들어가시는 것이 마음 편할 것입니다. <br><br>그렇지 않고 몇 줄 안되는 작업이라면 **event 버스활용**하여 handler 함수를 상속받거나, 자식단에서 받은 props를 **값 복사**하여 그 값을 활용하시면 됩니다.

<TagLinks />

<Comment />
