import {createApp} from "vue";
import {createPinia} from "pinia";
import {Tooltip} from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean index change path to @/index/index.ts.
 */
import router from "@/core/router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
import APIService from "@/core/services/APIService";
import {initApexCharts} from "@/core/plugins/apexcharts";
import {initInlineSvg} from "@/core/plugins/inline-svg";
import {initVeeValidate} from "@/core/plugins/vee-validate";
import {initKtIcon} from "@/core/plugins/keenthemes";

import "@/core/plugins/prismjs";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

APIService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);

app.directive("tooltip", (el) => new Tooltip(el));

app.mount("#app");
