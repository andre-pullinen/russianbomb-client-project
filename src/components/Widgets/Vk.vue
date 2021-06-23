<template>
  <div><div id="vk_groups"></div></div>
</template>

<script>
import { injectVKOpenApi, initVK } from "@/plugins/vknt";

export default {
  name: "vk",
  props: {},
  mounted() {
    injectVKOpenApi()
      .then(initVK(true))
      .then(() => {
        //window.VK.Widgets.Comments("vk_comments", { limit: 5, attach: "*" });
        window.VK.Widgets.Group(
          "vk_groups",
          { mode: 3, width: "auto" },
          203046311
        );
      });
  }
};
</script>

<style>
#vk_widget,
#vk_groups {
  width: 100% !important;
}
</style>
