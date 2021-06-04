import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth';
import poll from './modules/poll';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    poll
  },
});
