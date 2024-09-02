<template xmlns="http://www.w3.org/1999/html">
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-3 p-md-10">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/core/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);
      store.addBodyAttribute({
        qualifiedName: "style",
        value: `background-image: url('${getAssetPath("media/auth/bg10.jpeg")}');`
      });
    });

    return {
      getAssetPath
    };
  }
});
</script>
