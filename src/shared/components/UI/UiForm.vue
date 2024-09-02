<script setup lang="ts">
import { Form as VForm } from "vee-validate";
import { ref } from "vue";
import UiAlert from "@/shared/components/UI/UiAlert.vue";

const props = defineProps({
  onSubmit: {}
});


const errors = ref({});
</script>

<template>
  <VForm
    v-bind="$attrs"
    @sumbit="onSubmit"
  >
    <slot name="title"></slot>
    <UiAlert severity="danger"
             border
             border-size="1"
             border-dashed
             title="Non Field Errors"
             content="LOL" />
    <slot :errors="errors"></slot>
  </VForm>
</template>

