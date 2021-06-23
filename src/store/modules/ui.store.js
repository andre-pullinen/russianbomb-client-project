/* user.store.js */

const initialState = () => ({
  uiLockedCount: 0
});

// State object
const state = initialState();

// Getter functions
const getters = {
  isUiEnabled(state) {
    return state.uiLockedCount === 0;
  }
};

// Actions
const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  lock({ commit }) {
    commit("LOCK");
  },
  unlock({ commit }) {
    commit("UNLOCK");
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
  LOCK(state) {
    state.uiLockedCount++;
  },
  UNLOCK(state) {
    state.uiLockedCount--;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
