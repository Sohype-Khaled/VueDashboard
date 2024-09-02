<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="row g-5 g-xl-7">
    <div v-for="item in items" :key="item.id" class="col-md-4 mb-xxl-7">
      <slot :item="item">{{ item.name }}</slot>
    </div>
    <slot name="add-new"></slot>
  </div>
</template>

<style scoped lang="scss">

</style>