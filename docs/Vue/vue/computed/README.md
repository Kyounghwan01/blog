---
title: computed와 watch
meta:
  - name: description
    content: computed와 watch, vue, vuex
  - property: og:title
    content: computed와 watch, vue, vuex
  - property: og:description
    content: computed와 watch, vue, vuex
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/computed/
tags: ["vue"]
---

# computed와 watch

## computed 속성

템플릿 내에 들어가는 값이 변환이 되어야 하는 경우 [filter](https://kyounghwan01.github.io/blog/Vue/vue/filter/)를 사용하면 원하는 방향으로 변환 할 수 있습니다.<br>
그런데 많은 연산을 해야 할 경우 위와 같이 할 경우 템플릿이 간단하지 않고, 함수도 매번 정의해야 하기에 절대 좋은 방향이 아닙니다.<br>
또한 `store`의 값을 `getters`로 가져와 템플릿 내에 보여줘야 할때도 어떻게 해야 할지 막막합니다.<br>
이럴때 사용하는 것이 `computed`입니다.

`computed`는 아래와 같이 사용합니다.

```vue
<template>
  <div>
    <p>{{ ticketList }}</p>
    <p>{{ increse }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: 1
    };
  },
  computed: {
    increse() {
      return score + 1;
      //data에 직접 접근하여 계산한 결과를 템플릿에 보일 수 있습니다.
    },
    ticketList() {
      return this.$store.getters["ticket/ticket"];
      // ticket.js라는 store에 접근해 ticket state를 가져온 후 템플릿에 보입니다.
    }
  }
};
</script>
```

위와 같이 `computed`속성은 데이터 바인딩이 가능하여 `data`에 접근 가능하고 `data`가 바뀜에 따라 `computed`값도 자동으로 바뀌어 렌더 됩니다.<br>
또한 `computed`속성의 `getter`함수는 사이드 이팩트가 없어 코드를 테스트하기 쉽습니다.

## computed 메소드 호출

위처럼 `computed`에 선언 가능하고 지금 보여드릴 것과 같이 `methods`에도 선언 가능합니다.

```vue
<template>
  <div>
    <p>{{ increse() }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: 1
    };
  },
  methods: {
    increse() {
      return this.score++;
    }
  }
};
</script>
```

두 방법의 접근 방식은 서로 동일힙니다 <br>
둘의 **차이점**은 `computed`는 의존하는 값이 변하는 경우 계속 실행하고 (위의 예제에서는 `score`), `methods`는 랜더링 될 때만 함수가 실행되는 점입니다.<br>
즉, 만약 나는 이 값이 랜더링 된 값으로 유지 한다면 `methods`에 정의를 하고. 계속 캐싱하여 값을 바꾸어 보여주고 싶을 때는 `computed`를 사용하면 됩니다.

## computed getter / setter

getter는 위에서 이미 보았습니다.

```vue
<script>
export default {
  computed() {
    return this.$store.getters["ticket/ticket"];
  }
};
</script>
```

이게 getter를 사용 한다는 의미죠. 그렇다면 setter는 뭘까요?

```vue
<template>
  <div id="demo">{{ fullName }}</div>
</template>
<script>
export default {
  computed: {
    fullName: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
  }
};
</script>
```

위 처럼 fullName이 임의의 값으로 바뀌게 되면 set이 실행되고 firstName과 lastName이 동시에 바뀌게 됩니다.

## watch 속성

`watch`는 현업에서 `computed`와 같이 매우 많이 사용하는 속성입니다. 꼭 인지하셔야합니다.<br>
`watch`는 캐싱한 값이 바뀜에 따라 **어떤 행동을 할지** 정하는 속성입니다. 바로 예제로 보겠습니다.

```vue
<script>
export default {
  watch: {
    $route: {
      handler() {
        this.changeData();
      },
      immediate: true
    }
  }
};
</script>
```

굉장히 많이 쓰이는 구문입니다. 쉽게 말해 라우트 값(홈페이지 주소)가 바뀜에 따라 `handler()`에 있는 함수(changeData)가 실행된다는 것입니다. (`immediate`는 렌더된 직후 바로 실행 된다는 뜻입니다.)

위 예제 말고도 `data`에 선언된 값을 추적하여 그 값이 변할 때 마다 함수를 실행 할 수도 있습니다.

```vue
<template>
  <div>
    <input v-model="question" />
  </div>
  <p>{{ answer }}</p>
</template>
<script>
export default {
  data(){
    return {
      question: '',
      answer: '선 질문 후 대답'
    }
  }
  watch: {
    question: function(newQuestion){
      this.getAnswer();
    }
  }
}
</script>
```

위 처럼 `question`이라는 데이터 값이 바뀌면 `this.getAnswer()`함수가 실행되게 할 수 있습니다. <br>
간단히 말하면 **지정된 값이 바뀌면 정해진 콜백 함수가 실행된다**

## computed vs watch

그러면 어떨 때 `computed`를 어떨 때 `watch`를 쓰냐??

`computed`는 템플릿 내의 값이 data와 종속되었을 경우 사용하는게 유리합니다.왜냐하면 같은 경우에 `watch`를 사용하면 중복 호출하거나, 코드가 복잡해주기 때문입니다. 또한 computed의 값은 캐싱되기 때문에, 리렌더링 됬을 때, 같은 값이 들어왔다면 연산하지 않습니다. 그에 반해 watch는 같은 값이여도 연산을 다시 합니다. 컴포넌트가 리렌더링이 많이 되나, 값이 바뀔일이 없다면 computed를 필히 써야합니다.

`watch`는 지정한 값이 변경된 시점에서 내가 원하는 액션(`api call`, `route.push()`)을 하기 원할 때 사용합니다.

<TagLinks />

<Comment />
