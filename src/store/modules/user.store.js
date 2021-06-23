/* user.store.js */
import api from "../../services/api.service";

const initialState = () => ({
  id: -1,
  name: "",
  email: "",
  token: "",
  balance: 0,
  isAuth: false,
  permissions: [],
  roles: []
});

// State object
const state = initialState();

// Getter functions
const getters = {
  getId(state) {
    return state.id;
  },
  getUsername(state) {
    return state.name;
  },
  getToken(state) {
    return state.token;
  },
  getIsAuth(state) {
    return state.isAuth;
  },
  getPermissions(state) {
    return state.permissions;
  },
  getHighestRole(state) {
    if (state.roles.length > 0)
      return state.roles.reduce((prev, current) =>
        prev.level > current.level ? prev : current
      );

    return null;
  }
};

// Actions
const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  async init({ state, commit, dispatch }) {
    dispatch("Ui/lock", null, { root: true });
    if (state.isAuth) {
      api
        .get("users", "validate")
        .then(() => {
          dispatch("Pusher/subscribeAll", null, { root: true });
        })
        .catch(() => {
          commit("RESET");
        });
    }
    dispatch("Ui/unlock", null, { root: true });
  },
  async login({ commit }, payload) {
    commit("LOGIN", payload);
  },
  async updateInfo({ commit }) {
    api
      .get("users", "info")
      .then(response => {
        commit("UPDATE", response.data);
      })
      .catch(() => {
        commit("RESET");
      });
  },
  async logout({ commit, dispatch }) {
    dispatch("Ui/disableUi", null, { root: true });
    commit("LOGOUT");
  }
};
// Mutations
const mutations = {
  async RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  async LOGIN(state, payload) {
    state.isAuth = payload.code === 200;
    state.token = payload.token;
    state.id = payload.user_id;
  },
  async UPDATE(state, payload) {
    state.name = payload.name;
    state.email = payload.email;
    state.balance = payload.balance;
    state.permissions = payload.permissions;
    state.roles = payload.roles;
  },
  async LOGOUT(state) {
    state.isAuth = false;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
