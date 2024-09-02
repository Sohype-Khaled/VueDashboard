<template>
 <div class="">
   <slot :toggle="toggle"></slot>
 </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import {MenuComponent} from "@/assets/ts/components";

const props = defineProps({
  menuSelector: {type: String, required: true},
})
const toggle = ref(null)
onMounted(() => {
  nextTick(() => {
    MenuComponent.createInsance('[data-kt-menu="true"]');
  });
});
</script>
