import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import titleMixin from "./mixins/titleMixin";
import vuetify from "./plugins/vuetify";

Vue.mixin(titleMixin);

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  let isLoggedIn = store.getters["auth/isLoggedIn"];
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn) {
      next({
        name: "Login"
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn) {
      next({
        name: "Dashboard"
        // query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});



new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
