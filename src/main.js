import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
window.$ = window.jQuery = require("jquery"); //import JQuery
import VImageInput from "vuetify-image-input";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";

Vue.config.productionTip = false;
Vue.component("VImageInput", VImageInput);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check for valid auth token
    axios
      .get("/api/v1/user/userdash", {
        headers: { Authorization: store.state.token }
      })
      .then(response => {
        if (response.status === 200) {
          // Token is valid, so continue
          next();
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          store.dispatch("destroyToken");
          // There was an error so redirect
          window.location.href = "/login";
        }
      });
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.signedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires visitor, check if logged in
    if (store.getters.signedIn) {
      next({
        path: "/dashboard"
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
  render: h => h(App)
}).$mount("#app");
