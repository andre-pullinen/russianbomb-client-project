<template>
  <div>
    <v-sheet rounded>
      <v-layout d-block class="pos-relative">
        <v-img
          class="rounded"
          src="https://sun9-59.userapi.com/impf/WK5UFay3tQWFVuLT8eJJSD8PjshhK-G-dXJvOQ/j5AAoH48xbk.jpg?size=795x200&quality=95&crop=0,0,1590,400&sign=f56e85e6fa98fd482e78dc2b4b5f7c3d&type=cover_group"
        ></v-img>
      </v-layout>
      <v-layout justify-start class="mt-1 flex-column">
        <v-row>
          <v-col>
            <v-layout class="ma-2" justify-space-around>
              <v-btn
                :href="discordData.instant_invite"
                target="_blank"
                large
                color="primary"
                ><v-icon left>mdi-discord</v-icon> Discord</v-btn
              >
              <v-btn
                href="https://vk.com/r_bomb"
                target="_blank"
                large
                dark
                color="blue"
                ><v-icon left>mdi-alpha-b-box</v-icon> ВКонтакте</v-btn
              >
            </v-layout>
          </v-col>
        </v-row>
      </v-layout>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Discord",
  data: function() {
    return {
      discordData: {}
    };
  },
  mounted() {
    this.axios
      .get("https://discord.com/api/guilds/717482877079650445/widget.json")
      .then(response => {
        this.discordData = response.data;
      });
  }
};
</script>

<style>
.pos-absolute {
  position: absolute;
}
.pos-relative {
  position: relative;
}
.join-btn .v-skeleton-loader__button {
  width: 100%;
}
.join-btn {
  top: 50%;
  transform: translateY(-50%);
  right: 7%;
}
</style>
