import { useAuthStore } from "@/modules/authentication/store/auth";

export function auth({ from, next }) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) next({ name: "sign-in", query: { next: from.fullPath } });
  else next();
}

export function guest({ from, next }) {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) next({ name: "home" });
  else next();
}


export function applyMiddleware(middlewares, to, from, next) {
  const context = { to, from, next };

  const nextMiddleware = (index) => {
    if (index < middlewares.length) {
      const middleware = middlewares[index];
      middleware({ next, to, from });
    } else {
      next();
    }
  };

  nextMiddleware(0);
}
