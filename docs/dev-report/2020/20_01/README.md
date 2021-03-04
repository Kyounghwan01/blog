# 2020.01월

## Vuex-persistedstate

- Vuex-persistedstate : 모든 module의 store에 저장되던 이슈 지정한 paths store만 저장되도록 수정
  :::tip TIP posting
  **[vuex 새로고침시 상태 초기화 방지](https://kyounghwan01.github.io/blog/Vue/vuex/vuex-persistedstate/)**
  :::

## gyp 다운로드 안되는 이슈

- yarn으로 설치시 gyp 다운로드 안되는 이슈 - 1. 먼저 package.json에 패키지 적고 인스톨할때 waiting하면 취소

## vue 파일 전역 관리

- vue 프로젝트시 자주 쓰는 파일 전역으로 관리하기
  :::tip TIP posting
  **[vue 파일 전역으로 관리하기](https://kyounghwan01.github.io/blog/Vue/vue/dir/)**
  :::

## emit

- Emit 사용법
  - 자식이 부모한테 영향 주는 방법
  - 부모컴포넌트에서 먼저 함수를 정의한다
    - <자식 @자식으로보낼함수명=“함수명”/>
    - 자식은 “\$emit(부모가보낸함수명, 인자)” 로 호출가능
- 부모 -> 자식 props 넘기기 - <부모 :propname=“propValue”/> - 자식 - Props : {propname : Number} - this.propname으로 호출, templete는 propname으로 호출<br>
  :::tip TIP posting
  **[vue props 전달 및 event 상속](https://kyounghwan01.github.io/blog/Vue/vue/propsEvent/)**
  :::

## watch

- watch 개념 사용

```vue
<template>
  <el-radio-group v-model="smsType">
    <el-radio
      v-for="option in smsTypeOptions"
      :key="option.label"
      :label="option.value"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

// 위와 같이 라디오는 v-model은 smsType을 따른 다고 할 때,

<script>
export default {
  data() {
    return {
      smsType: "ALL",
      smsTypeOptions: [
        { value: "ALL", label: "전체" },
        { value: "SMS", label: "SMS" },
        { value: "LMS", label: "LMS" }
      ]
    };
  },
  watch: {
    smsType() {
      this.getMessages();
    }
  }
  //watch로 smsType변경을 감지하고 있으니 라디오가 변경 될 때마다
  //this.getMessages 함수가 실행된다.
};
</script>
```

## queryString

```js
export default {
  get: (id, type, filter) =>
    axios.get(`${BASE_URL}/${id}`, {
      params: {
        type: type,
        filter: filter
      }
    })
};
//위와 같이 get안에서 params를 포함한다.
//network에는 https://urlname?type="type"&filter="filter"로 찍힌다.
```

<Comment />
