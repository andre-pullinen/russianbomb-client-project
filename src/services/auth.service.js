import store from "@/store";
import api from "@/services/api.service";
import router from "@/router";

export default {
  init() {},

  async login(res) {
    await store.dispatch("User/login", res.data);
    await store.dispatch("User/updateInfo");
  },

  async logout() {
    await api.get("users/logout");
    await store.dispatch("User/logout");
    await router.push({ name: "login" });
  }
};
