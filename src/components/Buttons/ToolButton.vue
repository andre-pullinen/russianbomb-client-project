<template>
  <v-btn text @click.native="click" class="tool-button">
    <v-icon color="black"><slot /></v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ToolButton",
  props: ["type"],
  methods: {
    click: function() {
      require("electron").ipcRenderer.send(this.type);
      this.$eventBus.$emit(`sidebar.${this.type}`);
    }
  }
};
</script>

<style lang="scss">
.tool-button {
  -webkit-app-region: no-drag;
}
</style>
