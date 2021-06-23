<template>
  <v-container fluid>
    <Page>
      <template v-slot:title>
        {{ $vuetify.lang.t("$vuetify.home.title") }}
      </template>
      <v-row class="mh-100">
        <v-col cols="6">
          <v-row>
            <v-col>
              <discord></discord>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <server-online />
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mh-100">
          <posts></posts>
        </v-col>
      </v-row>
    </Page>
  </v-container>
</template>

<script>
import Page from "@/components/Base/Page";
import ServerOnline from "@/components/Widgets/ServerOnline";
import Discord from "@/components/Widgets/Discord";
import Posts from "@/components/Posts";
export default {
  name: "Home",
  components: { Posts, Discord, ServerOnline, Page }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
