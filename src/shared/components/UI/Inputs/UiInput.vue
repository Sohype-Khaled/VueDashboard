<script setup lang="ts">
import { computed } from "vue";

import { ErrorMessage, Field } from "vee-validate";

const props = defineProps({
  label: String,
  modelValue: String,
  containerClass: String,
  id:String,
  type: { type: String, default: "text" },
  name: { type: String, required: true },
  solid: { type: Boolean, default: false },
  transparent: { type: Boolean, default: false },
  required: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
});

const classes = computed(() => {
  const names = ["form-control"];
  if (props.solid)
    names.push("form-control-solid");
  if (props.transparent)
    names.push("form-control-transparent");

  return names;
});
const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);

const labelClass = computed(() => {
  const classes = ["form-label", "fs-6", "fw-bold", "text-gray-900"];
  if (props.required)
    classes.push("required");
  return classes;
});
</script>

<template>
  <div :class="containerClass">
    <slot name="label" :class="labelClass" :for="inputId" :label="label">
      <label :class="labelClass" :for="inputId" v-if="label" v-text="label" />
    </slot>
    <Field
      :id="inputId"
      :type="type"
      :name="name"
      v-bind="$attrs"
      v-model="innerValue"
      :class="classes"
    />
    <div class="fv-plugins-message-container">
      <div class="fv-help-block">
        <ErrorMessage :name="name" />
      </div>
    </div>
  </div>
</template>


