import Pusher from "pusher-js";
window.Pusher = Pusher;
import Echo from "laravel-echo";
import store from "@/store";
import Vue from "vue";

export default {
  echo: null,
  initialized: false,
  init() {
    this.echo = new Echo({
      broadcaster: "pusher",
      key: "c7e515cbecdbb1ce06ab",
      forceTLS: true,
      authEndpoint: "https://bumz.space/broadcasting/auth",
      cluster: "eu",
      auth: {
        headers: {
          Authorization: `Bearer ${store.getters["User/getToken"]}`
        }
      }
    });
    this.initialized = true;
  },
  subscribePublic() {
    if (!this.initialized) this.init();
    //const channel = this.echo.channel("posts");
    this.echo.listen("posts", "PostUpdated", () => {
      console.log("PostUpdated");
      Vue.prototype.$eventBus.$emit("posts.update");
    });
  },
  subscribeAll(userId) {
    if (!this.initialized) this.init();
    const channel = this.echo.private(`user.${userId}`);
    channel.listen("UserBalanceChanged", p => {
      Vue.prototype.$electron.ipcRenderer.send("notify", {
        text: "Ваш счет изменен",
        desc: `Ваш баланс состовляет: ${p.user.balance} руб.`
      });
      store.dispatch("User/updateInfo");
    });
  }
};
