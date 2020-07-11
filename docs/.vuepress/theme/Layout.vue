<template>
  <ParentLayout>
    <Disqus slot="page-bottom" class="content" />
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
};
</script>
