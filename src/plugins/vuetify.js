import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import en from "../locales/en";
import ru_extend from "../locales/ru";
Vue.use(Vuetify);

const ru = { ...en, ...ru_extend };
const locales = { en, ru };
const currentLang = Object.prototype.hasOwnProperty.call(
  locales,
  navigator.language
)
  ? navigator.language
  : "en";

export default new Vuetify({
  lang: {
    locales,
    current: currentLang
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#1867c0",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        main: "#fff",
        background: "#edeef0"
      }
    }
  }
});
