<template>
  <div class="signup page" id="">
    <v-container class="l-hero d-flex align-center justify-center mt-9">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <div v-if="isActivateMode">HELLO</div>
    <v-row>
      <v-col cols="12" sm="12">
        <v-dialog
          v-model="isActivateMode"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card class="pt-12">
            <!-- <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar> -->
            <v-container
              class="l-hero d-flex align-center justify-center mb-10"
            >
              <router-link to="/">
                <img width="420" alt="Legalbox logo" src="@/assets/logo.svg" />
              </router-link>
            </v-container>

            <h2 class="py-7 text-center display-2 secondary--text">
              Check your Email
            </h2>
            <div class="width50-center text-center body-1 accent--text">
              <p>
                To get started with your account, please check your email for a
                validation request. Within the email you will find a link which
                you must click in order to activate your account.
              </p>
              <p>
                <b>
                  If the email doesn't appear shortly, please be sure to check
                  your spam / junk mail folder. Some anti-spam filters modify
                  the email, so first copy any spam message to your inbox before
                  clicking the link.
                </b>
              </p>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <div class="bodyWrapper" v-if="!isActivateMode">
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
                  :loading="loading"
                  :disabled="disable"
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

        <div class="text-center">
          <br />
          <p>
            Already have an Account?
            <router-link to="/login">Login</router-link>
          </p>
          <p>
            By clicking on ‘Log In’, you have agreed to our
            <router-link to="/terms-of-service">terms of service </router-link>
            and
            <router-link to="/privacy-policy">privacy policy</router-link>
          </p>
        </div>
      </v-container>
      <v-snackbar
        class="snackbar"
        :color="signUpSnackbar.color"
        top
        right
        v-model="signUpSnackbar.active"
        :multi-line="signUpSnackbar.multiLine"
        :timeout="signUpSnackbar.timeout"
      >
        {{ signUpSnackbar.text }}
        <v-btn color="secondary" text @click="signUpSnackbar.active = false">
          <b>x</b>
        </v-btn>
      </v-snackbar>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import General_Footer from "@/components/footer";
import { mapState } from "vuex";

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
      loading: false,
      disable: false,
      isActivateMode: false,
      signUpSnackbar: {
        active: false,
        text: "",
        color: "",
        multiLine: "",
        timeout: null
      },
      isSignUpSuccessful: false,
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

    };
  },
  methods: {
    signUp() {
      if (this.$refs.signUpPass.validate()) {
        this.loading = true;
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
        // this.$router.push("/login");
      } else {
        this.signUpSnackbar.active = true;
        this.signUpSnackbar.text = "Oops! Please fill the form approriately ";
        this.signUpSnackbar.color = "error";
        this.signUpSnackbar.multiLine = true;
        this.signUpSnackbar.timeout = this.$store.state.snackBarDuration;
        this.loading = false;
      }
    }
  },
  watch: {
    signUpSuccessStatus(val) {
      if (val == true) {
        this.signUpSnackbar.active = true;
        this.signUpSnackbar.text = "Account Successfully created";
        this.signUpSnackbar.color = "success";
        this.signUpSnackbar.timeout = this.$store.state.snackBarDuration;

        setTimeout(() => {
          this.isActivateMode = true;
        }, this.$store.state.snackBarDuration);

        this.loading = false;
        this.disable = true;
      } else if (val == false) {
        this.signUpSnackbar.active = true;
        this.signUpSnackbar.text = "Oops! " + this.$store.state.signUpMesssage;
        this.signUpSnackbar.color = "error";
        this.signUpSnackbar.multiLine = true;
        this.signUpSnackbar.timeout = this.$store.state.snackBarDuration;
        this.loading = false;
        this.$store.state.signUpSuccessStatus = "";
      }
    }
  },
  computed: {
    ...mapState(["signUpSuccessStatus"])
  },
  mounted() {
    // this.$store.dispatch("getAllUsers");
  }
};
</script>
