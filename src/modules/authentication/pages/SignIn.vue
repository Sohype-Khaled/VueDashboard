<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/modules/authentication/store/auth";
import { useRoute, useRouter } from "vue-router";
import * as Yup from "yup";
import { Form as VForm } from "vee-validate";

import UiInput from "@/shared/components/UI/Inputs/UiInput.vue";
import UiButton from "@/shared/components/UI/UiButton.vue";

const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const data = reactive({ identifier: "", password: "" });

const next = computed(() => route.query.next || "/");
//Create form validation object
const login = Yup.object().shape({
  identifier: Yup.string().required().label("Email, Username, ID or Phone"),
  password: Yup.string().required().label("Password")
});

interface LoginData {
  identifier: string;
  password: string;
}

//Form submit function
const onSubmitLogin = async (values: LoginData) => {
  try {
    loading.value = true;
    const response = await store.login(values);
    store.setAuth(response.data);
    loading.value = false;
    router.push({ path: next.value });
  } catch (e) {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-lg-500px p-3 p-md-10">
    <VForm
      class="form w-100"
      @submit="onSubmitLogin"
      :validation-schema="login"

    >
      <div class="text-center mb-10">
        <h1 class="text-gray-900 mb-3">Sign In</h1>
      </div>
      <UiInput
        label="Email, Username, ID or Phone"
        container-class="fv-row mb-10"
        tabindex="1"
        type="text"
        name="identifier"
        placeholder="Email, Username, ID or Phone"
        autocomplete="off"
        solid
        v-model="data.identifier"
      />

      <UiInput
        container-class="fv-row mb-10"
        tabindex="2"
        type="password"
        name="password"
        autocomplete="off"
        placeholder="Password"
        solid
        v-model="data.password"
      >
        <template #label="slotProps">
          <div class="d-flex flex-stack mb-2">
            <label v-bind="slotProps"> Password </label>

            <router-link :to="{name:'forget-password'}"
                         class="link-primary fs-6 fw-bold">
              Forgot Password ?
            </router-link>
          </div>
        </template>
      </UiInput>

      <UiButton indicator
                type="submit"
                severity="primary"
                tabindex="3"
                block
                extra-class="mb-5 btn-lg"
                :disabled="loading"
                :loading="loading">
        Login
      </UiButton>

    </VForm>
  </div>
</template>

