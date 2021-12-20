<template>
  <div class="theme-container">
    <div class="content">
      <h1>404</h1>

      <blockquote>
        페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
      </blockquote>

      <button class="route-button" @click="goMain">
        홈으로 이동
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goMain() {
      return window.location.replace("https://kyounghwan01.github.io/blog");
    }
  }
};
</script>
<style scoped>
.route-button {
  color: #fff;
  background-color: #3eaf7c;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border: none;
}
.route-button:hover {
  cursor: pointer;
}
</style>
