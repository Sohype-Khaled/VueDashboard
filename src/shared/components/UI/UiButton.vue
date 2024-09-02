<script setup lang="ts">
import {computed, type PropType, useAttrs} from "vue";

const props = defineProps({
  extraClass: String,
  element: {type: String, default: "button"},
  light: {type: Boolean, default: false},
  outlined: {type: Boolean, default: false},
  block: {type: Boolean, default: false},
  icon: {type: Boolean, default: false},
  text: {type: Boolean, default: false},
  size: {type: String, validator: (value) => ['sm', "lg"].includes(value)},
  circle: {type: Boolean, default: false},
  indicator: {type: Boolean, default: false},
  loading: {type: Boolean, default: false},
  indicatorText: {type: String, default: "Please wait..."},
  indicatorLoading: {type: Boolean, default: false},
  to: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    required: false
  },
  severity: {
    type: String,

    validator(value, props): boolean {
      return ["info", "primary", "success", "warning", "danger", "light", "dark"].includes(value);
    }
  }
})

const attrs = useAttrs()
const componentTag = computed(() => (props.element === "router-link" ? "router-link" : props.element));

const classes = computed(() => {
  const names = [
    "btn",
    props.icon ? "btn-icon" : "", props.circle ? "btn-circle" : "",
    props.size ? `btn-${props.size}` : "",
  ];
  if (props.text) {
    names.push('btn-text')
    names.push(`btn-active-${props.severity}`)
  } else
    names.push(`btn${props.light ? "-light" : ""}-${props.severity}`)
  if (props.outlined)
    names.push("btn-outline-dashed");
  if (props.block)
    names.push("w-100");
  if (props.extraClass)
    names.push(props.extraClass);
  return names;
});

const componentProps = computed(() => {
  const baseProps = {...attrs};

  if (componentTag.value === "router-link" && props.to) {
    return {...baseProps, to: props.to};
  }

  return baseProps;
});

</script>

<template>
  <component :is="componentTag"
             :class="classes"
             v-bind="componentProps"
             :data-kt-indicator="indicator && loading ? 'on': 'off'">
    <slot name="icon"/>
    <template v-if="indicator">
      <span class="indicator-label">
        <slot></slot>
      </span>
      <span class="indicator-progress">
        {{ indicatorText }}
        <span class="spinner-border spinner-border-sm align-middle ms-2"/>
      </span>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>

<style scoped lang="scss">

</style>