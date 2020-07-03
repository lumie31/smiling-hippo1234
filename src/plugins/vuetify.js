// import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/assets/css/custom.css";

Vue.use(Vuetify);
// new Vue({ Vuetify, el: "#app", render: H => H(App) });

export default new Vuetify({
  icons: {
    iconfont: "md"
  },
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#19647E",
        accent: "#1CA092",
        error: "#b71c1c"
      }
    }
  }
});
