process.env.NODE_ENV === "development" ? null : (console.log = () => {});

import Vue from "vue";
import App from "./App.vue";
import UUID from "vue-uuid";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
window.$ = window.jQuery = require("jquery"); //import JQuery
import VImageInput from "vuetify-image-input/a-la-carte";
import ImageUploader from "./plugins/ImageUploader";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import Cloudinary from "./plugins/cloudinary";

import axios from "axios";

Vue.config.productionTip = false;
Vue.component("VImageInput", VImageInput);
Vue.directive("stripspaces", {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding, vnode) {
    if (binding.value == "cardNumber") {
      binding.value.replace(/./g, "*");
    }
  }
});

router.beforeEach((to, from, next) => {
  // use from to catch where route is coming from
  // console.log(from);
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
        // console.log(error);
        // console.log(error.response);
        // console.log(error.response.data.message);
        // console.log(error.response.data);
        // console.log(error.response.status);

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
  UUID,
  router,
  store,
  vuetify,
  VImageInput,
  ImageUploader,
  Cloudinary,
  render: h => h(App)
}).$mount("#app");
