<template>
  <v-card>
    <v-card-title>
      {{ $vuetify.lang.t("$vuetify.payment.purchase.title") }}
    </v-card-title>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <v-form>
          <validation-provider
            v-slot="{ errors }"
            :rules="{
              required: true
            }"
          >
            <v-currency-field
              :label="$vuetify.lang.t('$vuetify.payment.purchase.label')"
              :error-messages="errors"
              suffix="RUB"
              v-model="refill.value"
            />
          </validation-provider>
          <p>
            {{ $vuetify.lang.t("$vuetify.payment.purchase.method") }}
          </p>
          <v-radio-group v-model="refill.method" mandatory>
            <v-radio
              :label="
                $vuetify.lang.t('$vuetify.payment.purchase.methods.yandex')
              "
              value="yandex"
            ></v-radio>
            <v-radio
              :label="
                $vuetify.lang.t('$vuetify.payment.purchase.methods.payeer')
              "
              value="payeer"
              disabled
            ></v-radio>
          </v-radio-group>
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
            @click.prevent="processPayment"
          >
            {{ $vuetify.lang.t("$vuetify.payment.purchase.pay") }}
          </v-btn>
        </v-form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import { required } from "vee-validate/dist/rules";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});
export default {
  name: "RefillForm",
  data: () => ({
    refill: {
      value: "100,00",
      method: ""
    },
    options: {
      locale: "ru-RU",
      prefix: "",
      suffix: "₽",
      length: 11,
      precision: 2
    }
  }),
  methods: {
    processPayment: function() {
      this.redirect("https://bumz.online/api/payment/process", {
        method: this.refill.method,
        sum: this.refill.value,
        userId: this.$store.state.User.id,
        username: this.$store.state.User.name
      });
    },
    redirect: function(url, data) {
      var str = "";
      for (var key in data) {
        if (str !== "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(data[key]);
      }
      window.open(`${url}?${str}`, "_blank");
    }
  },
  components: { ValidationObserver, ValidationProvider }
};
</script>
