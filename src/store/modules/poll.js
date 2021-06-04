import http from "../http";

export default {
  namespaced: true,
  state: {
    poll: localStorage.getItem("poll") || JSON.stringify({}),
  },
  getters: {
    getTesponseText: state => {
      return state.responseText;
    },
    getPoll: state => {
      if (typeof state.poll === 'object') return state.poll;
      if (typeof state.poll === 'string') return JSON.parse(state.poll);
    },
  },
  mutations: {
    SET_RESPONSETEXT: (state, payload) => {
      state.responseText = payload;
    },
    SET_POLL(state, payload) {
      state.poll = payload;
    },
  },
  actions: {
    getPoll: async ({ commit }) => {
      try {
        let response = await http.get("polls/");
        localStorage.setItem("poll", JSON.stringify(response.data));
        commit("SET_POLL", response.data);
        return response;
      } catch (error) {
        localStorage.removeItem("poll");
        commit("SET_POLL", null);
        return error;
      }
    }
  }
};