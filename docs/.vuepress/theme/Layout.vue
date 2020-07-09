<template>
  <ParentLayout>
    test
    <Disqus slot="page-bottom" class="content" />
  </ParentLayout>
</template>

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
