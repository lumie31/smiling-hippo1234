<template>
  <div class="signup page" id="">
    <v-container class="l-hero d-flex align-center justify-center">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <div class="bodyWrapper">
      <v-container
        class="login-form d-flex justify-center align-center flex-column"
      >
        <h2 class="display-2 text-center my-8">Create an Account</h2>
        <div class="signup-form-parent">
          <v-form action="#" ref="signUpPass" @submit.prevent="signUp">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  :rules="[rules.required, rules.min2, rules.alphabet]"
                  height="80"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  :rules="[rules.required, rules.min2, rules.alphabet]"
                  height="80"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  :rules="[rules.required, rules.email]"
                  height="80"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  class="login-input"
                  outlined
                  height="80"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.password]"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  class="login-input"
                  outlined
                  height="80"
                  :rules="[rules.required, rules.password, rules.passwordMatch]"
                  :type="show1 ? 'text' : 'password'"
                  label="Confirm Password"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-btn
                  small
                  large
                  color="accent"
                  height="80"
                  width="100%"
                  style="padding: 10px auto; border-radius: 10px;"
                  type="submit"
                  @click="signUp"
                >
                  <span class="headline text-capitalize">Continue</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
        <div v-if="formSubmitted">
          Account successfully created
        </div>

        <div class="text-center">
          <br />
          <p>
            Already have an Account?
            <router-link to="/login">Login</router-link>
          </p>
          <p>
            By clicking on ‘Log In’, you have agreed to our
            <router-link to="/terms-of-service">terms of service </router-link>and
            <router-link to="/privacy-policy">privacy policy</router-link>
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
      show2: true,
      show3: false,
      show4: false,
      rules: {
        required: value => !!value || "Required.",
        min2: value => value.length >= 2 || "Min 2 characters",
        min8: value => value.length >= 8 || "Min 8 characters",
        alphabet: value =>
          !value || /^[a-zA-Z]+$/.test(value) || "Only alpabets are allowed",
        passwordMatch: value =>
          value === this.password || "Password must match",
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
      },
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",

      formSubmitted: false
    };
  },
  methods: {
    signUp() {
      if (this.$refs.signUpPass.validate()) {
        // console.log(
        //   this.firstName,
        //   this.lastName,
        //   this.email,
        //   this.password,
        //   this.confirmPassword
        // );
        this.$store.dispatch("processSignUp", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
        this.formSubmitted = true;
        this.$router.push("/login");
      }
    }
  },
  mounted() {
    // this.$store.dispatch("getAllUsers");
  }
};
</script>
