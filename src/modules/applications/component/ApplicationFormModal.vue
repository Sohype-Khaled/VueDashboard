<script setup lang="ts">
import * as Yup from "yup";
import {Form as VForm} from "vee-validate";
import {ref, toRef} from "vue";
import UiInput from "@/shared/components/UI/Inputs/UiInput.vue";
import {useApplicationStore} from "@/modules/applications/stores/applicationStore";
import Dialog from "@/shared/components/UI/Dialog.vue";

const props = defineProps(['item'])
const emit = defineEmits(['formSubmitted'])

const visible = defineModel({default: false})
const item = toRef(props.item)

const applicationStore = useApplicationStore()

const data = ref({name: "", description: ""})

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().required().label("Description")
})

const form = ref(null)


const onSubmit = async (values, actions) => {
  try {

    const request = item.value ? applicationStore.updateApplication : applicationStore.createApplication
    const args = item.value ? [item.value, data.value] : [data.value]
    const response = await request(...args);
    console.log(response.data)
    emit("formSubmitted")
    visible.value = false
  } catch (e) {
    console.log(e)
    const response = e.response
    if (response.status === 422) {
      for (const item in response.data) {
        if (response.data.hasOwnProperty(item))
          actions.setFieldError(item, response.data[item])
      }
    }
  }
}

defineExpose({
  submit() {
    onSubmit()
  }
})
</script>

<template>
  <Dialog title="Create New Application" v-model="visible">
    <VForm :validationSchema="validationSchema" v-slot="{ handleSubmit }" as="div">
      <form ref="form" @submit.prevent="handleSubmit($event, onSubmit)">
        <div class="modal-body">
          <UiInput
              label="Name"
              container-class="fv-row mb-10"
              type="text"
              name="name"
              placeholder="Application name here..."
              solid
              v-model="data.name"
          />
          <UiInput
              label="Description"
              container-class="fv-row"
              type="textarea"
              name="description"
              placeholder="Application description here..."
              solid
              v-model="data.description"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </form>
    </VForm>
  </Dialog>
</template>

