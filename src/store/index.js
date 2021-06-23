import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

import modules from "./modules";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules,
  actions: {
    reset({ commit }) {
      for (const moduleName of Object.keys(modules)) {
        if (modules[moduleName].mutations.RESET) {
          commit(`${moduleName}/RESET`);
        }
      }
    },
    async init({ dispatch }) {
      for (const moduleName of Object.keys(modules)) {
        if (modules[moduleName].actions.init) {
          await dispatch(`${moduleName}/init`);
        }
      }
    }
  },
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin] // set logger only for development
});
