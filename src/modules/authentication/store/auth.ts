import { ref } from "vue";
import { defineStore } from "pinia";
import APIService from "@/core/services/APIService";
import JwtService from "@/core/services/JwtService";
import type { Tokens } from "@/modules/authentication/types";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const router = useRouter();
  const isAuthenticated = ref(!!JwtService.getToken("access"));

  function setAuth(authTokens: Tokens) {
    isAuthenticated.value = true;
    JwtService.saveToken("access", authTokens.access);
    JwtService.saveToken("refresh", authTokens.refresh);
  }


  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyTokens();
    router.push({ name: "sign-in" });
  }

  const login = (credentials: User) => APIService.post("token/", credentials);

  const logout = async () => {
    try {
      APIService.setHeader();
      await APIService.post("token/blacklist/", { refresh: JwtService.getToken("refresh") });
    } catch (e) {
    }
    purgeAuth();
  };


  const forgotPassword = (email: string) => APIService.post("password-reset/", email);

  const refreshToken = () => {
    APIService.post("token/refresh/", { refresh: JwtService.getToken("refresh") })
      .then(({ data }) => setAuth(data))
      .catch(() => purgeAuth());
  };

  const verifyAuth = () => {
    if (!JwtService.getToken("access")) {
      purgeAuth();
      return;
    }
    APIService.post("token/verify/", { token: JwtService.getToken("access") })
      .catch(({ response }) => response.status === 401 ? refreshToken() : purgeAuth());
  };


  return {
    errors,
    user,
    isAuthenticated,
    setAuth,
    login,
    logout,
    forgotPassword,
    verifyAuth
  };
});
