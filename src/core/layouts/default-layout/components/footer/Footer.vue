<template>
  <div v-if="footerDisplay" id="kt_app_footer" class="app-footer">
    <div
      class="app-container d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
      :class="{
        'container-fluid': footerWidthFluid,
        'container-xxl': !footerWidthFluid,
      }"
    >
      <div class="text-gray-900 order-2 order-md-1">
        <span class="text-muted fw-semibold me-1">2022©</span>
        <a
          href="https://keenthemes.com"
          target="_blank"
          class="text-gray-800 text-hover-primary"
        >Keenthemes</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { footerDisplay, footerWidthFluid } from "@/core/layouts/default-layout/config/helper";

export default defineComponent({
  name: "theme-footer",
  components: {},
  setup() {
    return {
      footerWidthFluid,
      footerDisplay
    };
  }
});
</script>