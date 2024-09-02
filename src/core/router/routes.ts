import type { RouteRecordRaw } from "vue-router";
import AuthenticationRoutes from "@/modules/authentication/routes";
import ApplicationsRoutes from "@/modules/applications/routes"
import { auth } from "@/core/router/middleware";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/core/layouts/default-layout/DefaultLayout.vue"),
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/modules/home/views/Home.vue"),
        meta: {
          pageTitle: "Home",
          breadcrumbs: ["Home"],
          middleware: [auth]
        }
      },
        ...ApplicationsRoutes
    ]
  },
  ...AuthenticationRoutes,
  {
    path: "/",
    component: () => import("@/core/layouts/SystemLayout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/core/views/errors/Error404.vue"),
        meta: {
          pageTitle: "Error 404"
        }
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/core/views/errors/Error500.vue"),
        meta: {
          pageTitle: "Error 500"
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404"
  }
];