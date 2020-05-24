<template>
  <div class="login page" id="">
    <v-container class="l-hero d-flex align-center justify-center">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <div class="bodyWrapper">
      <v-container class="login-form d-flex justify-center align-center flex-column">
        <h2 class="display-2 text-center my-8">
          Welcome back.
          <br />Kindly login
        </h2>
        <h2 class="display-2 text-center my-8" v-if="!signedout">
          You just successfully <br />
          logged out
        </h2>
        <v-form action="#" ref="userLogin" @submit.prevent="login">
          <v-text-field
            class="login-input"
            :rules="[rules.required, rules.email]"
            v-model="email"
            label="Email Address"
            height="80"
            outlined
          ></v-text-field>
          <v-text-field
            class="login-input"
            outlined
            height="80"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            small
            large
            color="accent"
            height="80"
            style="padding: 10px 100px; border-radius: 10px;"
            type="submit"
            @click="login"
          >
            <span class="headline text-capitalize">Login</span>
          </v-btn>
        </v-form>

        <div>
          <br />
          <p>
            <router-link to="#">Forgot your password? Reset it</router-link>
          </p>
          <p>
            <router-link to="/signup">Don't have an account? Sign Up</router-link>
          </p>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import General_Footer from "@/components/footer";

export default {
  components: {
    "general-footer": General_Footer
  },
  data() {
    return {
      show1: false,
      loginSuccessful: false,
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min8: value => value.length >= 8 || "Min 8 characters",
        password: value => {
          const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
        email: value =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail"
      }
    };
  },
  methods: {
    login() {
      if (this.$refs.userLogin.validate()) {
        // console.log(this.email, this.password);

        this.$store
          .dispatch("retrieveLoginCredentials", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.loginSuccessful = true;
            // this.$router.push("/dashboard");
            this.$router.push("/dashboard").catch(error => {
              if (error.name != "NavigationDuplicated") {
                throw error;
              }
            });
          });
      }
    }
  }
};
</script>
