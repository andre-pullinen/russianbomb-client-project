/* settings.store.js */

const initialState = () => ({
  notification: true,
  fixedSize: false,
  sectorMeter: true
});

// State object
const state = initialState();

// Getter functions
const getters = {
  isNotificationEnabled(state) {
    return state.notification;
  }
};

// Actions
const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  setNotification({ commit }, payload) {
    commit("SET_NOTIFICATION", payload);
  },
  setSize({ commit }, payload) {
    commit("SET_SIZE", payload);
  },
  setMeterEnabled({ commit }, payload) {
    commit("SET_METER", payload);
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
  SET_NOTIFICATION(state, payload) {
    state.notification = payload;
  },
  SET_SIZE(state, payload) {
    state.fixedSize = payload;
  },
  SET_METER(state, payload) {
    state.sectorMeter = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
