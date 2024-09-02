<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {Modal} from "bootstrap";

const props = defineProps({
  title: String,
  modelValue: {type: Boolean, default: false},
})

const emit = defineEmits(["update:modelValue"]);


const modalEl = ref(null)
let modalObj = null;

onMounted(() => {
  modalObj = new Modal(modalEl.value);
  if (props.modelValue) {
    modalObj.show();
  }
  modalEl.value.addEventListener("hidden.bs.modal", () => {
    emit("update:modelValue", false);
  });

  modalEl.value.addEventListener("shown.bs.modal", () => {
    emit("update:modelValue", true);
  });
});

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    modalObj?.show();
  } else {
    modalObj?.hide();
  }
});

defineExpose({
  show() {
    modalObj?.show();
  },
  hide() {
    modalObj?.hide();
  },
})

</script>

<template>
  <div class="modal fade"
       tabindex="-1"
       ref="modalEl"
       aria-labelledby=""
       aria-hidden="true"
       data-bs-backdrop="static"
       data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" v-text="title"/>
          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
          </div>
        </div>
        <slot>
          <div class="modal-body">
            <slot name="body"/>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
            </slot>
          </div>
        </slot>

      </div>
    </div>
  </div>
</template>