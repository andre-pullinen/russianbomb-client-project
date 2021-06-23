import "./scss/main.scss";
import Vue from "vue";
Vue.prototype.$eventBus = new Vue();
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./plugins/vuetify-money.js";
import router from "@/router";
import store from "@/store";
import services from "@/services";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import Vuebar from "vuebar";
import axios from "axios";
import VueAxios from "vue-axios";
import access from "@/mixins/access";
import config from "@/config";
import electron from "electron";

Vue.mixin(access);

Vue.prototype.appConfig = config;
Vue.prototype.appServices = services;

Vue.prototype.$electron = electron;

import "@/external";

Vue.use(Vuebar);
Vue.use(VueAxios, axios);

new Vue({
  channel: "test",
  echo: {
    testEvent: (payload, vm) => {
      console.log("blog post created", payload, vm);
    },
    testFireTwo: (payload, vm) => {
      console.log("blog post deleted", payload, vm);
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
