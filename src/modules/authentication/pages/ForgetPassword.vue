<script setup lang="ts">
import { Form as VForm } from "vee-validate";
import { useAuthStore } from "@/modules/authentication/store/auth";
import * as Yup from "yup";
import { useRoute, useRouter } from "vue-router";
import UiButton from "@/shared/components/UI/UiButton.vue";
import { reactive, ref } from "vue";
import UiInput from "@/shared/components/UI/Inputs/UiInput.vue";


const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const data = reactive({ email: "" });

//Create form validation object
const forgotPassword = Yup.object().shape({
  email: Yup.string().email().required().label("Email")
});

//Form submit function
const onSubmitForgotPassword = async (values: any) => {
  values = values as string;

  await store.forgotPassword(values);


};


</script>


<template>
  <div class="w-lg-500px p-10">
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPassword"
    >
      <div class="text-center mb-10">
        <h1 class="text-gray-900 mb-3">Forgot Password ?</h1>

        <div class="text-gray-500 fw-semibold fs-4">
          Enter your email to reset your password.
        </div>
      </div>

      <UiInput
        label="Email"
        container-class="fv-row mb-10"
        tabindex="1"
        type="email"
        name="email"
        placeholder="Email"
        autocomplete="off"
        solid
        v-model="data.email"
      />


      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <UiButton indicator
                  type="submit"
                  severity="primary"
                  tabindex="3"
                  extra-class="btn-lg me-3"
                  :disabled="loading"
                  :loading="loading">
          Send Reset Password
        </UiButton>

        <UiButton indicator
                  element="router-link"
                  severity="primary"
                  light
                  tabindex="4"
                  :to="{name: 'sign-in'}"
                  extra-class="btn-lg me-3"
                  :disabled="loading"
                  :loading="loading">
          Cancel
        </UiButton>
      </div>
    </VForm>
  </div>
</template>