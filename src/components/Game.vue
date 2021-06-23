<template>
  <v-container fluid class="d-flex align-stretch">
    <v-row class="ma-0 pa-0">
      <v-col
        class="fill-height d-flex align-center justify-center row ma-0 pa-0"
        ref="GameParentOfParent"
      >
        <v-layout
          justify-center
          row
          v-if="isDataLoaded"
          class="overflow-hidden ma-0"
          ref="GameParent"
        >
          <object
            id="7road-ddt-game"
            ref="GameWindow"
            name="Main"
            :width="width"
            :height="height"
            class="rounded"
            style="max-width: 100%; max-height: 100%"
          >
            <param name="allowScriptAccess" value="always" />
            <param
              name="movie"
              :value="
                `${flash}/Loading.swf?user=${name}&key=${token}&config=${config}`
              "
            />
            <param name="quality" value="high" />
            <param name="menu" value="false" />
            <param name="bgcolor" value="#000000" />
            <param
              name="FlashVars"
              value="site=bb.mail.ru&sitename=&rid=&enterCode=&ua=4"
            />
            <param name="wmode" value="window" />
          </object>
          <div
            :style="`max-width: ${this.width}px; height: 30px`"
            class="sector-meter rounded"
          >
            <div class="rectangle" />
            <div class="rectangle even" />
            <div class="rectangle" />
            <div class="rectangle even" />
            <div class="rectangle" />
            <div class="rectangle even" />
            <div class="rectangle" />
            <div class="rectangle even" />
            <div class="rectangle" />
            <div class="rectangle even" />
          </div>
        </v-layout>
        <v-skeleton-loader
          width="100%"
          height="100%"
          type="image"
          v-else
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Game",
  data() {
    return {
      isDataLoaded: false,
      token: "",
      width: 1000,
      height: 600
    };
  },
  created() {
    this.appServices.Api.get("game", "create").then(res => {
      this.initialize(res.data);
      this.resize();
    });
    this.$eventBus.$on("external.exit", this.exitToHome);
    this.$eventBus.$on("resize", this.resize);
  },
  methods: {
    async initialize(data) {
      this.token = data.server.token;
      if (data.code === 200 && data.status === 0) this.isDataLoaded = true;
    },
    exitToHome() {
      this.$router.push({ name: "home" });
    },
    resize() {
      if (!this.$refs.GameWindow) return;
      if (this.$store.state.Settings.fixedSize) return;

      let newH = 600 * (this.$refs.GameParent.clientWidth / 1000);
      if (this.$refs.GameParentOfParent.clientHeight < newH) {
        this.height = this.$refs.GameParentOfParent.clientHeight;
        this.width = 1000 * (this.$refs.GameParent.clientHeight / 600);
        return;
      }
      this.height = newH;
      this.width = this.$refs.GameParent.clientWidth;
    }
  },
  beforeDestroy() {
    this.$eventBus.$off("external.exit");
    this.$eventBus.$off("sidebar.max");
  },
  computed: {
    config() {
      return this.appConfig.Game.configUrl;
    },
    flash() {
      return this.appConfig.Game.flashUrl;
    },
    ...mapState("User", {
      name: state => state.name
    }),
    gameHeight() {
      return this.height;
    }
  }
};
</script>

<style lang="scss">
::v-deep .v-skeleton-loader.v-skeleton-loader--is-loading {
  .v-skeleton-loader__image {
    height: 100%;
  }
}
.rectangle {
  width: 10%;
  height: 30px;
  background: red;
}
.sector-meter {
  display: none;
  flex-direction: row;
  width: 100%;
}
.even {
  background: aqua;
}
</style>
