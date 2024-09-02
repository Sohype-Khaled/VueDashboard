<script setup lang="ts">
import {computed, onMounted} from "vue";
import {getIllustrationsPath} from "@/core/helpers/assets";
import {useItems} from "@/shared/components/DynamicListing/useItems";
import Grid from "@/shared/components/DynamicListing/Grid.vue";

const props = defineProps({
  url: String,
  listingType: {type: String, default: "table"},
  options: {type: Object}
})
const {results, count, loading, error, getItems} = useItems(props.url);

const components = {
  grid: Grid,
};

const currentComponent = computed(() => components[props.listingType]);

onMounted(() => {
  getItems();
})
</script>

<template>

  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <template v-else>
    <div v-if="results.length">
      <component
          :is="currentComponent"
          :items="results"
          v-bind="options"
      >
      <template #default="{item}">
        <slot name="item" :item="item">
        </slot>
      </template>
      </component>
    </div>
    <div v-else>
      <div class="d-flex flex-column flex-center h-100">
        <img :src="getIllustrationsPath('5.png')"
             alt="No item found"
             class="mw-400px">
        <div class="fs-1 fw-bolder text-dark mb-4">No items found.</div>
        <slot name="add-new">
          <div class="fs-6">Start creating new items!</div>
        </slot>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">

</style>