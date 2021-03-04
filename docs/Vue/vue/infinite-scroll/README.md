---
title: vue 무한 스크롤
meta:
  - name: description
    content: vue 무한 스크롤
  - property: og:title
    content: vue 무한 스크롤
  - property: og:description
    content: vue 무한 스크롤
  - property: og:url
    content: https://kyounghwan01.github.io/blog/Vue/vue/infinite-scroll/
tags: ["vue"]
---

# 무한 스크롤

- 이번에는 제가 구현한 뷰에서 사용하는 무한 스크롤 예시입니다

```vue
<template>
  <ul
    ref="notification-list"
    class="list"
    @scroll="handleNotificationListScroll"
  >
    <li
      v-for="(notification, index) in notifications"
      :key="`${notification.id}${index}`"
    >
      ...
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    notifications() {
      return this.$store.getters["notification/notifications"];
    }
  },

  methods: {
    // 무한 스크롤 정의
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      // 일정 한도 밑으로 내려오면 함수 실행
      if (isAtTheBottom) this.handleLoadMore();
    },

    // 내려오면 api 호출하여 아래에 더 추가, total값 최대이면 호출 안함
    handleLoadMore() {
      if (this.notifications.length < this.total) {
        const params = {
          limit: this.params.limit,
          page: this.params.page + 1
        };
        this.$store.commit(
          "notification/SET_PARAMS",
          this.filterValue ? { ...params, type: this.filterValue } : params
        );
        this.dispatchGetNotifications(false);
      }
    },

    // 스크롤을 맨위로 올리고 싶을 때
    handleClickTitle() {
      this.$refs["notification-list"].scroll({ top: 0, behavior: "smooth" });
    },

    // 새로고침
    handleClickRefresh() {
      this.$refs["notification-list"].scroll({ top: 0 });
      this.dispatchGetNotifications(true);
    },

    // 처음 렌더링시 이전 알림 불러오기 or reset=true시 새로고침, false시 이전 목록에 추가
    dispatchGetNotifications(reset) {
      this.$store.dispatch("notification/getNotifications", reset);
    }
  }
};
</script>
<style>
.list {
  height: calc(100vh - 70px);
  overflow: auto;
}
</style>
```

- 가본적인 사용법은 위와 같습니다.
- 추가 api 호출할 지점을 `isAtTheBottom`로 잡고 스크롤이 내려오면 api를 새로 호출해 이전에 있던 배열에 추가합니다.
- 새로고침 클릭시 ref 잡았던 지점의 top으로 스크롤을 옮깁니다.
- store 부분은 api 호출받아서 데이터 넣고 삭제하는 기본적인 부분이라 첨부하지 않았습니다.

<TagLinks />

<Comment />
