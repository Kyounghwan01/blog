---
title: vue에서 typeScript 사용하기
meta:
  - name: description
    content: vue에서 typeScript 사용하기
  - property: og:title
    content: vue에서 typeScript 사용하기
  - property: og:description
    content: vue에서 typeScript 사용하기, typeScript, ts, vue에서 typeScript 사용하기
  - property: og:url
    content: https://kyounghwan01.github.io/blog/TS/vue-use-typescript/
tags: ["TS", "vue"]
---

# vue에서 typeScript 사용하기

## interface 예시

```vue
<script lang="ts">
export interface Todo {
  id: number;
  name: string;
  things?: object;
  readonly password: number;
}
export default Vue.extend({
  data() {
    return {
      //위에 정의한 Todo 인터페이스 타입을 져온다.
      toDos: [] as Array<Todo>
    };
  },
  methods: {
    AddData(data: Todo): Array {
      //Todo 인터페이스에 없는 'wantToAdd' 속성을 넣으려면 뒤에 'as Todo'를 넣는다.
      this.toDos.push({
        id: 1,
        name: nkh,
        password: 1234,
        wantToAdd: "add"
      } as Todo);
      return data;
    }
  }
});
</script>
```

## `vue.js` 종합 예시

```vue
<template>
  <div class="hello">
    <p>{{ changeString }}</p>
    <p>{{ fullName }}</p>
    <p>{{ selection }}</p>
    <p>{{ readOnly }}</p>
    <p>{{ toDos }}</p>
    <p>unnion : {{ test2 }}</p>
    <p>promise : {{ fetchData }}</p>
    <button @click="noting">change changeString</button>
    <button @click="promiseTest">axios</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

//변수 인터페이스
export interface Todo {
  id: number | true;
  name: string;
}

interface SquareConfig {
  color?: string;
  width?: number;
  readonly test: string;
}

type UUID = string;

export default Vue.extend({
  data() {
    return {
      changeString: "test" as string,
      testArray: [123, 234] as unknown[],
      neverType: "never" as never,
      firstName: "noh" as string,
      lastName: "kh" as string,
      toDos: [] as Array<Todo>,

      union: "asdasd" as string | number,
      fetchData: [] as Array<unknown>
    };
  },
  computed: {
    fullName(): string {
      return this.firstName + this.lastName;
    },
    selection(): object {
      const select: { name: string; age?: number } = { name: "nkh" };
      return select;
    },
    readOnly(): object {
      const read: { readonly name: string } = { name: "nkh" };
      return read;
    },

    test(): UUID {
      return "test";
    },

    test2(): number {
      if (typeof this.union === "string") {
        return this.union.length;
      }
      return this.union;
    }
  },

  methods: {
    //unnion 분기처리
    te(union: string | number): string {
      if (typeof union === "number") {
        return String(union);
      }
      return union;
    },
    createSquare(config: SquareConfig): void {
      console.log(config);
    },
    functionalType(labelObj: { label: string }): object {
      //생성자에 없는 값 쓰고 싶을때
      this.createSquare({
        colour: "red",
        width: 100,
        test: "changeString"
      } as SquareConfig);
      return labelObj;
    },
    noting(): void {
      this.changeString = "asd";
      this.union = 123;
      const objectDec: { name: string | boolean; age: number } = {
        name: "name",
        age: 123
      };
      console.log(objectDec);

      //변수형 인터페이스
      this.toDos.push({ id: 123, name: "asd" });

      this.functionalType({ label: "asd" });
    },
    async promiseTest(): Promise<unknown> {
      const api = "http://dummy.restapiexample.com/api/v1/employees";
      const res = await axios.get(api);
      this.fetchData = res.data.data;
      return res.data.data;
    }
  }
});
</script>
```

## 날짜 비교

날짜를 비교할때 `new Date`객체를 이용하여 빼기 연산을 하는데, 이때 date 타입이 number가 아니기 때문에 타입스크립트에서는 에러를 낸다.
그래서 +를 이용하여 날짜객체를 숫자로 바꾸면 연산이 된다.

```ts
(res: bookingType[]) => [...res].sort((a, b) => +new Date(a.start_on) - +new Date(b.start_on)),
```

<TagLinks />

<Comment />
