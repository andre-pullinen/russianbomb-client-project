<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="d-flex mh-100 pa-0 h-100" fluid>
        <v-row class="mh-100 ma-0 h-100">
          <v-col cols="auto" class="">
            <SideBar></SideBar>
          </v-col>
          <v-col class="mh-100 pa-0 overflow-hidden">
            <vue-custom-scrollbar class="scroll-area">
              <router-view />
            </vue-custom-scrollbar>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import vueCustomScrollbar from "vue-custom-scrollbar";
import SideBar from "@/components/SideBar";
import debounce from "debounce";

export default {
  name: "App",

  components: { SideBar, NavBar, vueCustomScrollbar },

  data: () => ({
    channel: null
  }),
  methods: {
    resize: debounce(function() {
      this.$eventBus.$emit("resize");
    }, 400)
  },
  mounted() {
    this.$electron.ipcRenderer.on("resize", () => {
      this.$eventBus.$emit("resize");
    });
    this.$electron.ipcRenderer.on("max-btn", () => {
      console.log("max-btn");
      this.resize();
    });
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}
.scroll-area {
  min-height: 100%;
  max-height: 100%;
  flex: 1 0 0;
  display: flex;
  align-items: stretch;
  position: relative;
  overflow: hidden;
}
.v-main {
  max-height: 100vh;
}
</style>
