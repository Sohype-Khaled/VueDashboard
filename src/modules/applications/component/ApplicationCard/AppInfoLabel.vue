<script setup lang="ts">
const props = defineProps(['label'])
</script>

<template>
  <div class="label ">
    {{ label }}
  </div>
</template>

<style scoped lang="scss">
.label {
  color: var(--bs-text-gray-800);
  border-radius: 8px;
  --bs-bg-rgb-color: var(--bs-white-bg-rgb);
  background-color: var(--bs-white);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.25rem 0.5rem;
}
</style>