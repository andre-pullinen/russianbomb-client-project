import axios from "axios";
import store from "../store";
import config from "../config";

export default {
  init() {
    axios.defaults.baseURL = config.Api.url;
    axios.defaults.timeout = config.Api.timeout;
  },

  setHeader() {
    axios.defaults.headers.common = {
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${store.getters["User/getToken"]}`
    };
  },

  get(resource, slug = "", config = null) {
    this.setHeader();
    if (slug === "") return axios.get(`${resource}`, config);
    return axios.get(`${resource}/${slug}`, config);
  },

  post(resource, params) {
    this.setHeader();
    return axios.post(`${resource}`, params);
  }
};
