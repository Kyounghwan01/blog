<template>
  <ParentLayout>
    <!-- <Disqus slot="page-bottom" class="content" /> -->
  </ParentLayout>
</template>

<style scoped>
.content {
  width: 750px;
  margin: 0 auto;
}
</style>

<script>
import ParentLayout from "@parent-theme/layouts/Layout.vue";
import Disqus from "../components/Disqus";
export default {
  components: {
    ParentLayout,
    Disqus
  }
  // beforeMount() {
  //   const location = window.location.href.split("blog")[1];
  //   window.location.href = `https://kyounghwan01.github.io/blog${location}`;
  // }
};
</script>
