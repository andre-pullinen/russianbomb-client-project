<template>
  <v-app-bar app color="main" dark id="toolbar">
    <div class="d-flex align-center">
      <v-img
        alt="RussianBomb"
        class="shrink d-none d-sm-flex d-md-none"
        contain
        :src="require('../assets/russianbomb_black_mini.png')"
        height="20"
        width="70"
      />
      <v-img
        alt="RussianBomb"
        class="shrink d-sm-none d-md-flex"
        contain
        :src="require('../assets/russianbomb_black.png')"
        height="20"
        width="200"
      />
    </div>

    <v-spacer></v-spacer>

    <div v-if="isElectron">
      <ToolButton type="min">mdi-window-minimize</ToolButton>
      <ToolButton type="max">mdi-window-maximize</ToolButton>
      <ToolButton type="close">mdi-window-close</ToolButton>
    </div>
  </v-app-bar>
</template>

<script>
import isElectron from "is-electron";
import ToolButton from "@/components/Buttons/ToolButton";
export default {
  name: "NavBar",
  components: { ToolButton },
  data() {
    return {
      isElectron: isElectron()
    };
  }
};
</script>

<style lang="scss">
#toolbar {
  -webkit-app-region: drag;
}
</style>
