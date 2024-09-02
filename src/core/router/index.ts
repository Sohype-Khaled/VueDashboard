import { createRouter, createWebHistory } from "vue-router";
import { applyMiddleware } from "@/core/router/middleware";
import { routes } from "@/core/router/routes";
import { useConfigStore } from "@/core/stores/config";
import { useAuthStore } from "@/modules/authentication/store/auth";


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: "smooth" };
    } else {
      return { top: 0, left: 0, behavior: "smooth" };
    }
  }
});

router.beforeEach((to, from, next) => {
  const configStore = useConfigStore();
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
  configStore.resetLayoutConfig();
  if (!["sign-in", "reset-password", "forget-password"].includes(to.name)) {
    const authStore = useAuthStore();
    authStore.verifyAuth();
  }

  const middlewares = [];
  if (to.meta.middleware) {
    middlewares.push(...to.meta.middleware);
  }
  applyMiddleware(middlewares, to, from, next);
});

export default router;
