---
title: vue3 composition api 사용법
meta:
  - name: description
    content: vue3 composition api 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:title
    content: vue3 composition api 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:description
    content: vue3 composition api 사용법, vue, computed, reactive, ref, watch, watchEffect, props, vuex, composable
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue3/composition-api/
tags: ["vue", "vuex"]
---

# vue3 composition api 사용법

우선적으로 알아두실 사항은 composition api은 옵션이라는 것입니다. 기존 vue2에서 사용하는 옵션 api를 사용하셔도 되고, 본인의 취향, 각 api의 장단점을 비교하여 composition api를 사용하여도 됩니다.

## composition api가 나오게 된 배경

옵션 api에서 데이터를 다룰 때는 아래 예시 코드처럼 다룹니다

```js {4,8-10,13-15}
export default {
  data() {
    return {
      books: []
    };
  },
  methods: {
    addBook(title, author) {
      this.books.push({ title, author });
    }
  },
  computed: {
    formattedBooks() {
      return this.books.map(book => `${book.title}은 ${book.author}가 썻다`);
    }
  }
};
```

현재는 하나의 data만 있기에 간단해보이지만 위 컴포넌트에 수많은 데이터가 공존했다면 methods, computed도 그만큼 많아지고, books가 어디서 어떤 함수에 의해 변하는지 분산되어 추적이 어려워 집니다. 즉, 하나의 데이터(books)가 어떻게 변화하고 사용되는지 그룹핑 하는 것이 어렵습니다. 그에 따라 유지보수가 어려워집니다.

컴포지션 api를 사용함으로 **setup 함수에 데이터가 그룹핑** 되어 보다 용이하게 데이터의 흐름을 파악하고 유지보수가 용이해집니다.

또한 **함수를 재사용**하기가 용이합니다. 반복되는 코드 (필터링 등등)를 import하여 컴포지션 api 내부에서 사용함으로 유틸함수 재사용에 용이합니다.

## composition api 사용하기

## setup

기존과는 다른 방식으로 setup 훅을 사용하고 그 내부를 이루는 요소는 아래와 같습니다. 개인적으로 react와 유사한 형식을 가졌다고 생각합니다.

setup 훅 내부에 data와 function을 구성합니다.

이때 구성되는 **data는 아직 반응형이 아닙니다**

```vue {12,13}
<template>
  <div class="home">
    <p>{{ name }} {{ age }}</p>
    <button @click="handleClick">click</button>
  </div>
</template>
<script>
export default {
  name: "HOME",
  setup() {
    // 반응형 아님
    let name = "nkh";
    let age = 29;

    const handleClick = () => {
      console.log(1);
    };
    return { name, age, handleClick };
  }
};
</script>
```

## 반응형 data 만들기

반응형 data를 만들 때는 `ref`와 `reactive`를 사용합니다.

둘의 차이는 코드에서 설명하겠습니다.

```vue {3,14-15,17-23,25}
<template>
  <div class="home">
    <p>{{ person1.name }} {{ person1.value }}</p>
    <button @click="handleClick">click</button>
  </div>
</template>
<script>
import { ref, reactive } from "vue";

export default {
  name: "HOME",
  setup() {
    // 데이터를 ref, reactive로 감싸면 반응형으로 바뀝니다.
    const person1 = ref({ name: "nkh", age: 29 });
    const person2 = reactive({ name: "nki", age: 26 });

    const handleClick = () => {
      // ref로 감싼 값을 변경할 때는 value로 한번 들어가주고 값을 바꿉니다.
      person1.value.age = 30;

      // reactive는 바로 값을 바꿉니다.
      person2.age = 30;
    };

    // ref값은 return을 거치게되면 person1.value.age는 person1.age로 바뀝니다. (template에서는 person1.age로 사용합니다)
    return { person1, handleClick };
  }
};
</script>
```

## ref, reactive 차이

1. ref는 function에서 값을 변경할 때 ref.value를 넣어주고 값을 바꾸나 reactive는 바로 값을 바꿀 수 있습니다.
2. **reactive는 원시값에 대해서는 반응형을 가지지 않습니다.** (string, number 값은 값을 바꾸어도 reactive하게 리렌더링 되지 않는다) 그래서 객체나 배열을 사용하는 경우에만 reactive를 사용할 수 있습니다, 그러나 ref는 원시값도 반응형 값으로 취급되어 리렌더링 됩니다.
3. reactive나 ref나 둘 중 하나만 사용하는 것이 옳다고 생각합니다. 그런데 reactive는 원시값을 반응형으로 사용되지 않기 때문에 ref를 처음부터 끝까지 사용하는 것이 좋다고 생각합니다.

## computed & watch

vue2의 computed, watch와 사용법이 동일합니다.

모르시는 분은 [vue computed, watch 사용법](https://kyounghwan01.github.io/blog/Vue/vue/computed/) 링크 참조 부탁드립니다!

## watchEffect

react의 useEffect와 사용법이 매우 유사합니다.

watchEffect 내부에 사용된 변수가 바뀌면 watchEffect가 실행됩니다.

아래 코드는 텍스트가 있을 때 타이핑된 값을 포함하는 텍스트를 filter 하는 예시 입니다.

watchEffect는 처음 컴포넌트가 랜더될 때 최초 1회 실행됩니다. 그 이후 watchEffect 내부에 있는 변수가 바뀔 때마다 재실행됩니다.

```vue {27-32}
<template>
  <div class="home">
    <input type="text" v-model="search" />
    <p>{{ search }}</p>
    <div v-for="name in matchingNames" :key="name">
      {{ name }}
    </div>
  </div>
</template>
<script>
import { computed, ref, watch, watchEffect } from "vue";

export default {
  name: "HOME",
  setup() {
    const search = ref("");
    const names = ref(["qq", "aa", "zz", "dd"]);

    const matchingNames = computed(() => {
      return names.valie.filter(name => name.includes(search.value));
    });

    watch(search, () => {
      "search 값이 바뀔 때 마다 실행되는 함수";
    });

    watchEffect(() => {
      console.log(
        "search value가 정의됬기에 search가 바뀔때마다 실행된다",
        search.value
      );
    });

    return { names, search, matchingNames };
  }
};
</script>
```

## watch, watchEffect 중지

watch, watchEffect가 변수에 변화함에 따라 계속 호출되는 것을 막을 수 있습니다. watch, watchEffect 함수를 변수로 지정하고 해당 변수를 실행하면 watch, watchEffect는 중지됩니다.

```vue {8,28-33}
<template>
  <div class="home">
    <input type="text" v-model="search" />
    <p>{{ search }}</p>
    <div v-for="name in matchingNames" :key="name">
      {{ name }}
    </div>
    <button @click="handleClick">watchEffect 중지하기</button>
  </div>
</template>
<script>
import { computed, ref, watch, watchEffect } from "vue";

export default {
  name: "HOME",
  setup() {
    const search = ref("");
    const names = ref(["qq", "aa", "zz", "dd"]);

    const matchingNames = computed(() => {
      return names.valie.filter(name => name.includes(search.value));
    });

    const stopWatch = watch(search, () => {
      "search 값이 바뀔 때 마다 실행되는 함수";
    });

    const stopWatchEffect = watchEffect(() => {
      console.log(
        "search value가 정의됬기에 search가 바뀔때마다 실행된다",
        search.value
      );
    });

    const handleClick = () => {
      stopWatch();
      stopWatchEffect();
    };

    return { names, search, handleClick, matchingNames };
  }
};
</script>
```

## props

부모 컴포넌트에서 props를 내릴 경우 사용하는 방법에 대해 알아보겠습니다!

props는 상위에서 어떤 props를 받을 것인지 알려준 후, setup에서 `props.xxx`로 접근합니다.

아래는 home -> postList로 props를 내리고 postList에서 props를 받아 사용하는 법, 그리고 home에서 postList 컴포넌트를 사용하는 방법에 대한 예시입니다!

### Home (parent component)

```vue {4,9,15}
<template>
  <dlv class="home">
    <!-- child 컴포넌트에게 props 내림 -->
    <PostList :posts="posts" />
  </div>
</template>
<script>
  // 사용할 컴포넌트 import
  import PostList from '../components/PostList.vue'
  import { ref } from 'vue';

  export default {
    name: 'Home',
    // 사용할 컴포넌트를 넣어줍니다.
    components: { PostList },

    setup() {
      const posts = ref([
        { title: '1번 타이틀', body: '1번 제목', id: 1 },
        { title: '2번 타이틀', body: '2번 제목', id: 2 },
      ]);

      return { posts }
    }
  }
</script>
```

### Posts (child components)

```vue {9-13}
<template>
  <div>
    {{ post.title }}
    {{ post.body }}
  </div>
</template>
<script>
export default {
  // 사용할 props를 배열내에 정의합니다.
  props: ["posts"],
  setup(props) {
    console.log(props.posts); // 받은 prop 사용가능
  }
};
</script>
```

## life-cycle

setup 함수 내에서도 라이플사이클 훅을 사용할 수 있습니다. 옵션 api 라이플사이클 명칭에서 on을 앞에 붙이면 됩니다.

```
mounted -> onMounted
unmounted -> onUnmounted
updated -> onUpdated
```

```vue {12-14}
<template>
  <div>
    {{ post.title }}
    {{ post.body }}
  </div>
</template>
<script>
export default {
  // 사용할 props를 배열내에 정의합니다.
  props: ["posts"],
  setup(props) {
    onMounted(() => console.log("component mounted"));
    onUnmounted(() => console.log("component onUnmounted"));
    onUpdated(() => console.log("component onUpdated"));
    console.log(props.posts); // 받은 prop 사용가능
  }
};
</script>
```

composition api 밑에 옵션 api 라이플사이클 훅을 동시에 사용 하면 두 동일한 함수가 2번 호출됩니다.

```vue {12,18-20}
<template>
  <div>
    {{ post.title }}
    {{ post.body }}
  </div>
</template>
<script>
export default {
  // 사용할 props를 배열내에 정의합니다.
  props: ["posts"],
  setup(props) {
    onMounted(() => console.log("component mounted"));
    onUnmounted(() => console.log("component onUnmounted"));
    onUpdated(() => console.log("component onUpdated"));
    console.log(props.posts); // 받은 prop 사용가능
  }

  mounted() {
    console.log("component mounted in option api")
  }
};
</script>
```

## utils 함수 재사용 (composable)

기존 vue2에서는 재사용을 위한 함수를 mixins에 포함시켜 사용하였습니다. mixins에 함수가 추가될 때마다 더욱 데이터 추적이 어려웠기에 확장성이 매우 불리하였습니다.

composition api를 사용함으로 재사용하는 util 함수를 import export 가능하게 되었고 좀 더 데이터 추적 및 사용하기 쉽게 변경되었습니다.

아래는 getPosts라는 utils 함수를 만들고 사용할 컴포넌트에서 사용하는 예시입니다

vue3에서는 composable이라고 부릅니다

### src/composables/getPosts.js

이 함수는 여러 컴포넌트에서 재사용 가능합니다

만약 ref가 아닌 reactive를 사용한다면 return 부분에서 toRefs로 감싸줘야 반응성이 유지됩니다.

```js
import { ref } from "vue";
const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      // 예시 api
      let res = await fetch("http://localhost:3000/posts");
      if (!res.isSuccess) {
        throw Error("fail");
      }
      posts.value = await res.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, err, load };
};

export default getPosts;
```

### Home (composables 함수 사용하는 컴포넌트)

```vue
<template>
  <dlv class="home">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length">
      <PostList :posts="posts" />
    </div>
    <div v-else>loading...</div>
  </div>
</template>
<script>
// 사용할 컴포넌트 import
import PostList from '../components/PostList.vue';
import getPosts from '../composables/getPosts';

export default {
  name: 'Home',
  components: { PostList },

  setup() {
    const { posts, error, load } = getPosts();

    load();

    return { posts, error };
  };
}
</script>
```

## vuex

vuex에 대한 포스팅은 따로 분리합니다 [composition api에서 vuex 사용하기](https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/)

<TagLinks />

<Comment />
