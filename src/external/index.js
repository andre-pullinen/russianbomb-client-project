import Vue from "vue";
import store from "@/store";

const closeWindow = () => {
  Vue.prototype.$eventBus.$emit("external.exit");
  console.log("Exit to login path");
};

const YourTurnHasBegin = text => {
  if (!store.state.Settings.notification) return;
  Vue.prototype.$electron.ipcRenderer.send("notify", {
    text,
    desc: "Вернись в окно с игрой и побыстрее!"
  });
  console.log("Turn ", text);
};

window.ExitGameToLogin = closeWindow;
window.closeWindow = closeWindow;
window.WindowReturn = closeWindow;
window.YourTurnHasBegin = YourTurnHasBegin;
window.title_effect = {};
window.title_effect.tickerStart = YourTurnHasBegin;
