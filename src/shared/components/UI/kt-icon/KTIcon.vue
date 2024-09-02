<script setup lang="ts">
import { computed } from "vue";
import icons from "@/shared/components/UI/kt-icon/icons.json";
import { useConfigStore } from "@/core/stores/config";

const store = useConfigStore();

const props = defineProps({
  iconName: { type: String, default: "", required: true },
  iconType: {
    type: String,
    default: "",
    required: false
  },
  iconClass: { type: String, default: "", required: false }
});

const currentIconType = computed(() => {
  return props.iconType ? props.iconType : store.config.general.iconsType;
});
</script>

<template>
  <i
    :class="`ki-${currentIconType} ki-${props.iconName}${
      props.iconClass ? ' ' + props.iconClass : ''
    }`"
  >
    <template v-if="icons[props.iconName] && currentIconType === 'duotone'">
      <span
        v-for="i in icons[props.iconName]"
        :key="i"
        :class="`path${i}`"
      ></span>
    </template>
  </i>
</template>

