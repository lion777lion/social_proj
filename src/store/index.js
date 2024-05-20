import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    loggedInUser: null,
  },
  mutations: {
    registerUser(state, user) {
      state.users.push(user);
    },
    loginUser(state, user) {
      state.loggedInUser = user;
    },
    logoutUser(state) {
        state.loggedInUser = null;
    },
  },
  actions: {
    registerUser({ commit }, user) {
      commit('registerUser', user);
    },
    loginUser({ commit, state }, credentials) {
      const user = state.users.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      if (user) {
        commit('loginUser', user);
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logoutUser({ commit }) {
        commit('logoutUser');
    },
  },
  getters: {
    isAuthenticated: state => !!state.loggedInUser, 
    loggedInUserEmail(state) {
      return state.loggedInUser ? state.loggedInUser.email : null; 
    },
  },
});
