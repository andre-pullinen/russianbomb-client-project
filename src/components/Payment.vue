<template>
  <v-container fluid>
    <page>
      <template v-slot:title>
        {{ $vuetify.lang.t("$vuetify.payment.title") }}
      </template>
      <v-row class="mh-100">
        <v-col>
          <v-row>
            <v-col cols="5">
              <refill-form></refill-form>
            </v-col>
            <v-col cols="7"><transfer-form></transfer-form></v-col>
          </v-row>
        </v-col>
      </v-row>
    </page>
  </v-container>
</template>

<script>
import Page from "@/components/Base/Page";
import RefillForm from "@/components/Widgets/RefillForm";
import TransferForm from "@/components/Widgets/TransferForm";
export default {
  name: "Payment",
  components: { TransferForm, RefillForm, Page }
};
</script>

<style></style>
