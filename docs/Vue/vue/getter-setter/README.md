---
title: vue computed getter, setter 예제
meta:
  - name: description
    content: vue computed getter, setter 예제
  - property: og:title
    content: vue computed getter, setter 예제
  - property: og:description
    content: vue computed getter, setter 예제
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/getter-setter/
tags: ["vue"]
---

# getter와 setter 예제

`computed`는 어떠한 값(props, this.data)을 변화하여 손쉽게 사용하기 위한 메소드 이며, `computed`를 통해 나온 값을 바꾸고 싶을 때도 있습니다.<br>
이럴 때는 getter, setter를 이용하여, 값을 다루는데 그 예제를 다뤄보겠습니다.

회사가 element-ui를 쓰고 있기에, 예제 코드도 element-ui 위주로 쓰겠습니다.

```vue
<template>
  <!-- 시간 값 정하는 ui, 예약 제한 시간을 가진다 -->
  <el-time-select
    format="HH:mm"
    value-format="HH:mm"
    v-model="bookingLimitTime"
  />
</template>
<script lang="ts">
export default {
  data() {
    return {
      time: "2020-01-23 10:00" as string
    };
  },
  computed: {
    bookingLimitTime: {
      get(): string {
        //this.moment(this.time).format("HH:mm") === '10:00'
        return this.moment(this.time).format("HH:mm");
      },
      set(value: string) {
        //value === '12:11'
        this.time = `${this.time.slice(0, -6)} ${value}`;
      }
    }
  }
};
</script>
```

위 처럼 날짜 전체 값이 들어오지만 핸들링 할 값은 시, 분 만 가질때, `computed`로 시, 분만 가져오고, setter로 바뀐 시, 분을 `computed`에 쓰인 데이터로 바꾸어주면 된다.

<TagLinks />

<Comment />
