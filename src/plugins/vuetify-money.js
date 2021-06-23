import Vue from "vue";
import VuetifyMoney from "vuetify-money";

Vue.use(VuetifyMoney);

import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib"; //Globally import VTextField

Vue.component("v-text-field", VTextField);
Vue.use(VCurrencyField, {
  locale: "ru-RU",
  decimalLength: 0,
  autoDecimalMode: false,
  min: null,
  max: null,
  defaultValue: 0,
  valueAsInteger: false,
  allowNegative: false
});

export default VuetifyMoney;
