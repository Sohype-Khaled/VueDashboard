<template>
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <KTHeader />
      <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
        <KTSidebar />
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
          <KTContent></KTContent>

          <KTFooter />
        </div>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted, watch } from "vue";
import KTHeader from "@/core/layouts/default-layout/components/header/Header.vue";
import KTSidebar from "@/core/layouts/default-layout/components/sidebar/Sidebar.vue";
import KTContent from "@/core/layouts/default-layout/components/content/Content.vue";
import KTFooter from "@/core/layouts/default-layout/components/footer/Footer.vue";


import { useRoute } from "vue-router";
import { reinitializeComponents } from "@/core/plugins/keenthemes";
import LayoutService from "@/core/services/LayoutService";

export default defineComponent({
  name: "default-layout",
  components: {
    KTHeader,
    KTSidebar,
    KTContent,
    KTFooter
  },
  setup() {
    const route = useRoute();

    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );
  }
});
</script>
