<template>
  <v-card>
    <v-card-title>
      {{ $vuetify.lang.t("$vuetify.payment.transfer.title") }}
    </v-card-title>
    <v-card-subtitle>
      {{ $vuetify.lang.t("$vuetify.payment.transfer.text", this.balance) }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col>
          <v-currency-field
            :label="$vuetify.lang.t('$vuetify.payment.transfer.payLabel')"
            v-model="transfer.sum"
            suffix="RUB"
            :max="this.balance"
          ></v-currency-field>
        </v-col>
        <v-col cols="1" align-self="center" class="d-flex justify-center">
          <v-icon>mdi-transfer-right</v-icon>
        </v-col>
        <v-col>
          <v-text-field
            :label="$vuetify.lang.t('$vuetify.payment.transfer.label')"
            :value="this.toGameCurrency"
            suffix="Medals"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn @click.prevent="transferToGame">{{
        $vuetify.lang.t("$vuetify.payment.transfer.pay")
      }}</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TransferForm",
  data: function() {
    return {
      transfer: {
        sum: 100
      }
    };
  },
  methods: {
    transferToGame() {
      this.appServices.Api.post(
        "payment/transfer",
        this.transfer
      ).then(() => {});
    }
  },
  computed: {
    toGameCurrency() {
      return this.transfer.sum * 4;
    },
    balance() {
      return this.$store.state.User.balance;
    }
  }
};
</script>
