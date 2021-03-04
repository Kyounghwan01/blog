---
title: vue-property-decorator 문법
meta:
  - name: description
    content: vue-property-decorator 문법
  - property: og:title
    content: vue-property-decorator 문법
  - property: og:description
    content: vue-property-decorator 문법
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/Vue/grammer/
tags: ["vue", "TS"]
---

# vue-property-decorator 문법

## Data

- vue + js에서 쓰던 방법과 비교하여 기술하겠습니다.
- script만 다르고 **template에서의 사용법은 동일하여 기술하지 않겠습니다.**

### JavaScript

```js
export default {
  data() {
    return {
      example: 'js-example';
    }
  }
}
```

### TypeScript

- class 컴포넌트에서는 심플하게 바로 데이터를 정의합니다.
- 앞에 붙는 public, private를 붙이고 싶지 않다면,
  <br>`tslint.json`에 `"member-access": false`를 추가합니다.

```ts
import { Components, Vue } from 'vue-property-decorator';

@Component
export default class Home extend Vue {
  // ts-lint의 설정값에 따라 data 기술 방법이 다를 수 있습니다.
  // strict(엄격모드)를 true로 하면 undefined를 허용하지 않습니다. 이때 ?와 !가 사용됩니다
  // ?는 옵션값으로 없을 수 있다. !는 undefined를 허용한다는 뜻입니다
  // 사용하기 싫으면 tsconfig.json의 컴파일 옵션에서 strict = false로 바꾸면 됩니다.
  public example!: string = "ts-example";
}
```

## computed

### JavaScript

```js
export default {
  data() {
    return {
      setterExample: null;
    }
  }
  computed: {
    test() {
      return "test";
    },
    getterSetter: {
      get() {
        return 'getter';
      },
      set(value) {
        this.setterExample = value;
      }
    }
  }
};
```

### TypeScript

- class형 컴포넌트에서 쓰던 전형적인 getter, setter 형식을 따릅니다

```ts
import { Components, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Home extend Vue {
  public setterExample!: string | null = null;

  get getterSetter() {
    return 'getter';
  }
  set getterSetter(value) {
    this.setterExample = value;
  }
}
```

## @Watch

- watch는 첫번째 인자로 감시할 값, 두번째 인자는 옵션을 지정합니다.

### JavaScript

```js
export default {
  data() {
    return {
      watchExample: 'example';
    }
  }

  watch: {
    'watchEaxmple': function(value) {
      this.exampleMethod(value);
    }
    // or
    'watchEaxmple': {
      handler: function(value) {
        this.exampleMethod(value);
      },
      immediate: true
    }
  }
};
```

### TypeScript

- watch는 `@Watch`를 import하여 사용합니다.

```ts
import { Components, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Home extend Vue {
  public watchExample!: string = 'example';

  @Watch("watchExample", {immediate: true, deep: true})
  public exampleMethod(value: string, oldValue: string) {
    console.log(value, oldValue)
  }
}
```

## @Prop

- 부모 컴포넌트에서 정의한 데이터를 자식 컴포넌트에서도 사용할 때 `prop`을 사용합니다.

### JavaScript

```js
export default {
  props: {
    parentData: {
      type: String,
      default: "mother"
    }
  }
};
```

### TypeScript

- prop는 `@Prop`를 import하여 사용합니다.

```ts
import { Components, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Home extend Vue {
  @Prop() public paraneData!: { type: String, default: "mother" }
}
```

## method & life cycle

### JavaScript

```js
export default {
  methods: {
    methodTest() {
      // something...
    }
  }
};
```

### TypeScript

- 라이프사이클 훅은 메소드 사용법과 동일합니다.

```ts
import { Components, Vue } from 'vue-property-decorator';

@Component
export default class Home extend Vue {
  created() {
    // created hook
  }

  mount() {
    // mount hook
  }

  methodTest() {
    // something...
  }
}
```

## @Component

- `@Component` 내에서는 components, mixins, filters, validations 등등을 정의합니다.

### JavaScript

```js
export default {
  components: {
    testComponent1,
    testComponent2
  },
  filters: {
    testFilter
  },
  mixins: [testMixins1, testMixins2]
};
```

### TypeScript

```ts
import { Components, Vue } from 'vue-property-decorator';

@Component({
  components: {
    PriceInput,
    BottomActionBar,
  },
  mixins: [validationMixin],

  validations: {
    data: {
      type: { required },
      date: { required },
    },
  },
})
export default class Home extend Vue {}
```

## @Emit

- `@Emit`은 부모에서 전달한 함수를 자식에서 실행하는 방법입니다.

### JavaScript

```vue
// 부모
<template>
  <Children @func="func">
</template>

//자식
<script>
export default {
  // this.func로 실행
}
</script>
```

### TypeScript

```vue
// 부모
<template>
  <Children @func="func">
</template>

// 자식
<script lang="ts">
import { Components, Vue, Emit } from 'vue-property-decorator';

@Component()
export default class Home extend Vue {
  // 1번 방법
  onSubmit() {
    this.$emit('func', this.value);
  }

  // 2번 방법
  @Emit()
  func() {
    return this.value;
  }
}
</script>
```

<TagLinks />

<Comment />
