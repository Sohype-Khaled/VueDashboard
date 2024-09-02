import { guest } from "@/core/router/middleware";

export default [
  {
    name: "auth",
    component: () => import("@/modules/authentication/layouts/AuthLayout.vue"),
    meta: {
      middleware: [guest]
    },
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/modules/authentication/pages/SignIn.vue"),
        meta: {
          pageTitle: "Sign In"
        }
      },
      {
        path: "/forget-password",
        name: "forget-password",
        component: () =>
          import("@/modules/authentication/pages/ForgetPassword.vue"),
        meta: {
          pageTitle: "Password reset"
        }
      },
      {
        path: "/reset-password",
        name: "reset-password",
        component: () =>
          import("@/modules/authentication/pages/PasswordReset.vue"),
        meta: {
          pageTitle: "Reset Password"
        }
      }
    ]
  }
];