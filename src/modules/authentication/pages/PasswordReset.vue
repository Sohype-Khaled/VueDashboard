<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { PasswordMeterComponent } from "@/assets/ts/components";

import { storeToRefs } from "pinia";

const store = usePasswordResetStore();
const { errors } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
const tokenValid = ref(store.tokenValid);
const token = ref("");
const form = ref<Object>({
  password: "",
  token: token.value
});

const submitButton = ref<HTMLButtonElement | null>(null);


const schema = Yup.object().shape({
  password: Yup.string().required().label("Password"),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .label("Password Confirmation")
});

const onSubmit = async (values: any) => {
  delete values.password_confirmation;
  values.token = token.value;
  values = values as PasswordResetBody;

  if (submitButton.value) {
    // eslint-disable-next-line
    submitButton.value!.disabled = true;
    // Activate indicator
    submitButton.value.setAttribute("data-kt-indicator", "on");
  }

  await store.resetPassword(values);

  if (Object.keys(errors.value).length) {
    form.value?.setErrors(errors.value);
  } else {
    router.push({ name: "sign-in" });
  }
};

onMounted(async () => {
  token.value = route.query.token as string;
  if (token.value) {
    await store.validateToken(token.value);
    tokenValid.value = store.tokenValid;
    await router.replace({ query: { ...route.query, token: undefined } });
  }

  await nextTick(() => {
    PasswordMeterComponent.bootstrap();
  });
});


</script>


<template>
  <div class="w-lg-500px p-10">
    <VForm
      class="form w-100"
      id="kt_login_signin_form"
      ref="form"
      @submit="onSubmit"
      :validation-schema="schema"
      v-if="tokenValid"
    >
      <div class="text-center mb-10">
        <h1 class="text-gray-900 mb-3">Reset Password</h1>
      </div>

      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <div class="mb-1">
          <label class="form-label fw-bold text-gray-900 fs-6 "> Password </label>
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid mb-3"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            />
            <div
              class="d-flex align-items-center mb-3"
              data-kt-password-meter-control="highlight"
            >
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
              ></div>
              <div
                class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
              ></div>
            </div>
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6"
        >Confirm Password</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->


      <div class="text-center">
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> Submit </span>

          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
    </VForm>
    <div class="d-flex flex-column" v-else>
      <div class="alert alert-dismissible bg-light-danger d-flex flex-column flex-sm-row p-5 mb-10">
        <i class="ki-duotone ki-notification-bing fs-2hx text-danger me-4 mb-5 mb-sm-0"><span class="path1"></span><span
          class="path2"></span><span class="path3"></span></i>
        <div class="d-flex flex-column pe-0 pe-sm-10">
          <h4 class="fw-semibold">Request Expired</h4>
          <span>
          The request Token is expired or invalid, please try again
        </span>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <router-link to="/sign-in" class="btn btn-primary  fs-6 fw-bold">
          Sign In
        </router-link>
        <router-link to="/forget-password" class="btn btn-text-primary fs-6 fw-bold">
          Forget password
        </router-link>
      </div>
    </div>
  </div>
</template>
