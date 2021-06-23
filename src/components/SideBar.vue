<template>
  <v-card class="mx-auto hi" height="100%" color="white" rounded>
    <v-card-text class="pa-2 d-flex flex-column fill-height">
      <v-flex class="grow-shrink-0">
        <side-button type="home" href="home">mdi-home</side-button>
        <v-divider></v-divider>
        <side-button type="play" href="game">mdi-play</side-button>
        <side-button type="cash" href="payment">mdi-cash</side-button>
        <side-button type="events" disabled>mdi-sack</side-button>
        <side-button type="tasks" disabled>mdi-script</side-button>
      </v-flex>
      <v-spacer />
      <v-flex class="grow-shrink-0" v-if="isAuth()">
        <v-divider></v-divider>
        <side-button type="settings" href="settings">mdi-settings</side-button>
        <side-button type="logout">mdi-logout</side-button>
      </v-flex>
      <v-flex class="grow-shrink-0" v-else>
        <v-divider></v-divider>
        <side-button type="registration" href="registration"
          >mdi-account-plus</side-button
        >
        <side-button type="login" href="login">mdi-login</side-button>
      </v-flex>
    </v-card-text>
  </v-card>
</template>

<script>
import SideButton from "@/components/Buttons/SideButton";
export default {
  name: "SideBar",
  components: { SideButton },
  created() {
    this.$eventBus.$on("side-button.logout", this.appServices.Auth.logout);
  },

  beforeDestroy() {
    this.$eventBus.$off("side-button.logout");
  }
};
</script>
