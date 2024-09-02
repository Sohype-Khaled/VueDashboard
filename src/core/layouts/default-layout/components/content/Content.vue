<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div
      id="kt_app_content_container"
      class="app-container"
      :class="{
        'container-fluid': contentWidthFluid,
        'container-xxl': !contentWidthFluid,
      }"
    >
      <RouterView/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { contentWidthFluid } from "@/core/layouts/default-layout/config/helper";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "default-layout-content",
  components: {
    RouterView,
  },
  setup() {
    return {
      contentWidthFluid,
    };
  },
});
</script>