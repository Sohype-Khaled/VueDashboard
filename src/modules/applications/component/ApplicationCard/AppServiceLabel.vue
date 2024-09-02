<script setup lang="ts">

import KTIcon from "@/shared/components/UI/kt-icon/KTIcon.vue";

const props = defineProps(['iconName', 'count', 'label'])
</script>

<template>
  <div class="label"
       v-tooltip
       :title="label">
    <KTIcon :icon-name="iconName" icon-class="text-black fs-1 "/>
    <span class="label__counter" v-text="count"/>
  </div>
</template>

<style scoped lang="scss">
.label {
  position: relative;

  &__counter {
    font-size: 8px;
    font-weight: bold;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    top: -0.9rem;
    right: -0.7rem;
    background-color: var(--bs-gray-300);
    border: 2px solid var(--bs-white);
  }
}
</style>