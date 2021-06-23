/* pusher.store.js */
import pusherService from "@/services/pusher.service";

const initialState = () => ({
  initialized: false
});

// State object
const state = initialState();

// Getter functions
const getters = {};

// Actions
const actions = {
  init() {},
  reset({ commit }) {
    commit("RESET");
  },
  subscribeAll(context) {
    const userId = context.rootGetters["User/getId"];
    pusherService.subscribePublic();
    if (userId === -1) return;

    pusherService.subscribeAll(userId);
    context.commit("SET_INITIALIZED", true);
  }
};

// Mutations
const mutations = {
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  },
  SET_INITIALIZED(state, payload) {
    state.initialized = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
