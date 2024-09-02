import {auth} from "@/core/router/middleware";

export default [
    {
        name: "applications",
        path: "applications/",
        meta: {

        },
        children: [
            {
                name: "list",
                "path": "",
                component: () => import("@/modules/applications/pages/ApplicationsList.vue"),
                meta: {


                }
            }
        ]
    }
]