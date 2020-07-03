<template>
  <div class="login page" id="">
    <v-container class="l-hero d-flex align-center justify-center">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <div class="bodyWrapper">
      <v-container
        class="login-form d-flex justify-center align-center flex-column"
      >
        <h2 class="display-3 text-center my-8">
          Reset Your Password
        </h2>
        <v-form action="#" ref="resetPassword" @submit.prevent>
          <v-text-field
            class="login-input"
            :rules="[rules.required, rules.email]"
            v-model="email"
            label="Email Address"
            height="80"
            outlined
          ></v-text-field>
          <v-btn
            small
            large
            color="accent"
            :loading="resetLoader"
            :disabled="resetSubmitted"
            height="80"
            style="padding: 10px 100px; border-radius: 10px;"
            type="submit"
            @click="submitPasswordReset"
          >
            <span class="headline text-capitalize">Reset</span>
          </v-btn>
        </v-form>
        <v-snackbar
          class="snackbar"
          :color="passwordResetSnackbar.color"
          top
          right
          v-model="passwordResetSnackbar.active"
          :multi-line="passwordResetSnackbar.multiLine"
          :timeout="passwordResetSnackbar.timeout"
        >
          {{ passwordResetSnackbar.text }}
        </v-snackbar>

        <div>
          <br />
          <p>
            <router-link to="/signup"
              >Don't have an account? Sign Up</router-link
            >
          </p>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import General_Footer from "@/components/footer";
import axios from "axios";

export default {
  components: {
    "general-footer": General_Footer
  },
  data() {
    return {
      email: "",
      resetLoader: false,
      resetSubmitted: false,
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
      },
      passwordResetSnackbar: {
        active: null,
        text: this.successMessage,
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
        // timeout: 100000
      }
    };
  },
  methods: {
    submitPasswordReset() {
      if (this.$refs.resetPassword.validate()) {
        this.resetLoader = true;
        this.resetSubmitted = true;

        axios
          .post("/api/v1/resetpassword", { email: this.email })
          .then(response => {
            console.log(response);
            console.log(response.data);
            console.log(response.status);

            this.passwordResetSnackbar.active = true;
            this.passwordResetSnackbar.text = response.data.message;
            this.passwordResetSnackbar.color = "success";
            this.resetLoader = false;
          })
          .catch(error => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.data.message);
            console.log(error.response.status);

            this.passwordResetSnackbar.active = true;
            this.passwordResetSnackbar.text = error.response.data.message;
            this.passwordResetSnackbar.color = "error";
            this.resetLoader = false;
            this.resetSubmitted = false;
          });
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {}
};
</script>
