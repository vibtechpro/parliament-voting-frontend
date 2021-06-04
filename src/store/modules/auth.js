import http from "../http";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    refresh: localStorage.getItem("refresh") || null,
    authUser: localStorage.getItem("user") || JSON.stringify({}),
    responseText: null,
    voting: localStorage.getItem("voting") || false
  },
  getters: {
    getTesponseText: state => {
      return state.responseText;
    },
    isLoggedIn: state => {
      return state.token !== null;
    },
    getAuthUser: state => {
      return JSON.parse(state.authUser);
    },
    isVoting: state => {
      return state.voting !== false;
    }
  },
  mutations: {
    SET_RESPONSETEXT: (state, payload) => {
      state.responseText = payload;
    },
    SET_TOKEN: (state, payload) => {
      state.token = payload.access;
      state.refresh = payload.refresh;
    },
    SET_USER(state, payload) {
      state.authUser = payload;
    },
    SET_VOTE(state, payload) {
      state.voting = payload;
    }
  },
  actions: {
    loginUser: async ({ commit }, credentials) => {
      try {
        let response = await http.post("accounts/token/", credentials);
        localStorage.setItem("token", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        commit("SET_TOKEN", response.data);
        commit("SET_USER", response.data.user);
        http.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return response;
      } catch (error) {
        if (error.response.data.detail) {
          commit("SET_RESPONSETEXT", {
            error: "Invalid credentials were given."
          });
        }
        if (error.response.data.phone || error.response.data.password) {
            commit("SET_RESPONSETEXT", {
              error: "Input fields are required."
            });
        }
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        commit("SET_TOKEN", { access: null, refresh: null });
        commit("SET_USER", null);
        return error;
      }
    },

    logoutUser: async ({ commit }) => {
      let refresh = localStorage.getItem("refresh");
      try {
        let response = await http.post("accounts/logout/", {
          refresh: refresh
        });
        commit("SET_TOKEN", { access: null, refresh: null });
        commit("SET_USER", null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        delete http.defaults.headers.common["Authorization"];
        return response;
      } catch (error) {
        return error;
      }
    },

    clearLogin: async ({ commit }) => {
      commit("SET_TOKEN", { access: null, refresh: null });
      commit("SET_USER", null);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      delete http.defaults.headers.common["Authorization"];
    },
    
    sendOTP: async ({ commit }, payload) => {
      try {
        let response = await http.post("accounts/otp/send", payload);
        commit("SET_RESPONSETEXT", {
          success: 'OTP sent successful'
        });
        return response;
      } catch (error) {
        if (error.response.data.phone) {
          commit("SET_RESPONSETEXT", {
            error: "Phone number was not sent."
          });
        }
        return error;
      }
    },
    
    verifyOTP: async ({ commit }, payload) => {
      try {
        let response = await http.post("accounts/otp/verify", payload);
        commit("SET_VOTE", true);
        localStorage.setItem('voting', true);
        return response;
      } catch (error) {
        if (error.response.data.phone || error.response.data.code) {
          commit("SET_RESPONSETEXT", {
            error: "Something went wrong with your fields."
          });
        }
        if(!error.response.data.success){
          commit("SET_RESPONSETEXT", {
            error: error.response.data.message
          });
        }
        localStorage.removeItem('voting');
        return error;
      }
    }
  }
};