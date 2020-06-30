<template>
  <div class="activate page" id="">
    <v-container class="l-hero d-flex align-center justify-center ">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <v-container
      class="text-center"
      style="margin: 130px auto 200px auto;"
      v-if="responseNotReady"
    >
      Veryifying.....
      <v-text-field
        style="width: 40%; margin: 0 auto;"
        color="success"
        loading
        disabled
      ></v-text-field>
    </v-container>

    <div class="bodyWrapper" v-if="!responseNotReady">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" sm="12" class="text-center">
            <!-- SUCCESSFUL ACTIVATION -->
            <div v-if="activationSuccessful">
              <h1 class="display-3 mb-4">Reset Password</h1>

              <v-form
                action="#"
                ref="passwordForm"
                @submit.prevent="resendActivationMail"
                class="width50-center"
              >
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
                  :rules="[rules.required, rules.passwordMatch]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  label="Confirm Password"
                  @click:append="show2 = !show2"
                ></v-text-field>
                <v-btn
                  x-large
                  class="accent"
                  @click="changePassword"
                  :loading="passwordSubmitted"
                  :disabled="disableForm"
                >
                  Reset Password
                </v-btn>
              </v-form>
            </div>
            <v-snackbar
                class="snackbar"
                :color="changePasswordSnackbar.color"
                top
                right
                v-model="changePasswordSnackbar.active"
                :multi-line="changePasswordSnackbar.multiLine"
                :timeout="changePasswordSnackbar.timeout"
            >
                {{ changePasswordSnackbar.text }}
            </v-snackbar>

            <!-- FAILED ACTIVATION -->
            <div v-if="activationNotSuccessful == 'failed' && resetSuccesful === false">
              <h1 class="display-3">Oops</h1>
              <h1 class="title py-5">
                <em>{{ responseText }}</em>
              </h1>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import General_Footer from "@/components/footer";
import axios from "axios";

export default {
  data() {
    return {
      resetFromEmail: this.$route.params.resetpassword,
      show1: false,
      show2: false,
      password: "",
      confirmPassword: "",
      email: "",
      token: "",
      responseNotReady: true,
      activationSuccessful: false,
      activationNotSuccessful: false,
      responseText: "",
      resetSuccesful: false,
      resetNotSuccesful: false,
      passwordSubmitted: false,
      disableForm: false,
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
        }
      },
      changePasswordSnackbar: {
        active: null,
        text: this.successMessage,
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
      }
    };
  },
  methods: {
    changePassword() {
      if (this.$refs.passwordForm.validate()) {
        this.passwordSubmitted = true;
        this.disableForm = true;

        axios
          .post("/api/v1/resetpassword/" + this.resetFromEmail, 
          {
            password: this.password,
            confirmPassword: this.confirmPassword
          }
          )
          .then(response => {
            this.resetSuccesful = true;

            console.log(response);
            console.log(response.data);
            console.log(response.status);


            this.changePasswordSnackbar.active = true;
            this.changePasswordSnackbar.text = response.data.message;
            this.changePasswordSnackbar.color = "success";

            this.passwordSubmitted = false;

            setTimeout(() => {
                this.$router.push("/login");
            }, this.$store.state.snackBarDuration + 2000);
          })
          .catch(error => {
            this.resetNotSuccesful = true;

            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
            this.passwordSubmitted = false;
            this.disableForm = false;
          });
      }
    }
  },
  created() {
    axios
      .get("/api/v1/resetpassword/" + this.resetFromEmail)
      .then(response => {
        this.responseNotReady = false;

        this.activationSuccessful = true;

        console.log(response);
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch(error => {
        this.responseNotReady = false;

        this.activationNotSuccessful = "failed";

        if (error.response.data.status !== 200) {
          this.responseText = "Invalid or expired link";
        }
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.data.message);
        console.log(error.response.status);
      });
  },
  mounted() {},
  components: {
    "general-footer": General_Footer
  }
};
</script>
