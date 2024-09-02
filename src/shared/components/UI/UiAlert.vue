<script setup lang="ts">
import KTIcon from "@/shared/components/UI/kt-icon/KTIcon.vue";
import { computed } from "vue";

const props = defineProps({
  title: String,
  content: String,
  extraClass: String,
  solid: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  borderDashed: { type: Boolean, default: false },
  icon: { type: String, default: "shield-tick" },
  borderSize: {
    type: String,
    default: "0",
    validator(value, props): boolean {
      value = Number(value);
      return value >= 0 && value <= 5;
    }
  },
  severity: {
    type: String,
    default: "light",
    validator(value, props): boolean {
      return ["info", "primary", "success", "warning", "danger", "light", "dark"].includes(value);
    }
  }
});

const alertClass = computed(() => {
  const names = ["alert", "d-flex", "align-items-center", "p-5", "mb-10"];
  if (props.solid) {

    names.push(`bg-${props.severity}`);
  } else {
    names.push(`alert-${props.severity}`);
  }
  if (props.border) {
    names.push("border");
    names.push(`border-${props.severity}`);
    if (props.borderSize)
      names.push(`border-${props.borderSize}`);
    if (props.borderDashed)
      names.push("border-dashed");
  }
  return names;
});

const contentClass = computed(() => {
  let severity = `text-${props.severity}`;
  if ((props.severity === "dark" && props.solid) || props.solid)
    severity = `text-inverse-${props.severity}`;
  return severity;
});

</script>

<template>
  <div :class="alertClass">
    <KTIcon :icon-name="icon" :icon-class="`fs-2hx ${contentClass} me-4`" />
    <div class="d-flex flex-column text">
      <h4 :class="['mb-1', contentClass]">{{ title }}</h4>
      <span :class="contentClass">{{ content }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>