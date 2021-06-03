import http from "../http";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    refresh: localStorage.getItem("refresh") || null,
    authUser: localStorage.getItem("user") || JSON.stringify({}),
    responseText: null
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
        let response = await http.post("auth/logout/", {
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
    //UPDATE USER
    updateUser: async ({ commit }, payload) => {
      try {
        let response = await http.put("auth/user/", payload);
        commit("SET_USER", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response;
      } catch (error) {
        return error;
      }
    }
  }
};