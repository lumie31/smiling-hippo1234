<template>
  <div class="activate page" id>
    <v-container class="l-hero d-flex align-center justify-center">
      <router-link to="/">
        <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
      </router-link>
    </v-container>

    <v-container class="text-center" style="margin: 130px auto 200px auto;" v-if="responseNotReady">
      Veryifying.....
      <v-text-field style="width: 40%; margin: 0 auto;" color="success" loading disabled></v-text-field>
    </v-container>

    <div class="bodyWrapper" v-if="!responseNotReady">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" sm="12" class="text-center">
            <!-- SUCCESSFUL ACTIVATION -->
            <div v-if="activationSuccessful">
              <h1 class="display-3">Congratulations</h1>
              <h1 class="title py-5">Your Account has been verified</h1>

              <v-btn x-large class="accent mt-10">
                <router-link to="/subscription" class="white--text">
                  <span class="title">Get Started</span>
                </router-link>
              </v-btn>
            </div>

            <!-- FAILED ACTIVATION -->
            <div v-if="activationNotSuccessful == 'failed' && !resetSuccessful">
              <h1 class="display-3">Oops</h1>
              <h1 class="title py-5">
                <em>{{ responseText }}</em>
              </h1>

              <v-form
                action="#"
                ref="resetForm"
                @submit.prevent="resendActivationMail"
                class="width50-center"
              >
                <v-text-field
                  :rules="[rules.required, rules.email]"
                  v-model="email"
                  label="Email Address"
                  height="80"
                  outlined
                ></v-text-field>
                <v-btn
                  x-large
                  class="accent"
                  @click="resendActivationMail"
                  :loading="loading"
                >Resend Activation Mail</v-btn>
              </v-form>
            </div>
            <div v-if="resetSuccessful">
              <p>Activation email has been successfully sent to your mailbox</p>
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
      activateFromEmail: this.$route.params.activateFromEmail,
      //   responseReady: false,
      responseNotReady: true,
      activationSuccessful: false,
      activationNotSuccessful: false,
      responseText: "",
      email: "",
      resetSuccessful: false,
      resetNotSuccesful: false,
      loading: false,
      rules: {
        required: value => !!value || "Required.",
        email: value =>
          !value ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          "Invalid E-mail"
      }
    };
  },
  methods: {
    resendActivationMail() {
      if (this.$refs.resetForm.validate()) {
        this.loading = true;

        axios
          .post("/api/v1/activate/" + this.email)
          .then(response => {
            this.resetSuccessful = true;

            console.log(response);
            console.log(response.data);
            console.log(response.status);

            this.loading = false;
          })
          .catch(error => {
            this.resetNotSuccesful = true;

            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
            this.loading = false;
          });
      }
    }
  },
  created() {
    axios
      .get("/api/v1/activate/" + this.activateFromEmail)
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

        if (error.response.data.message === "Invalid token") {
          this.responseText = "Invalid Activation. Now redirecting you...";
          setTimeout(() => {
            this.$router.push("/signup");
          }, 3000);
        } else if (error.response.data.message !== "invalid token") {
          this.responseText = "Link has expired. Please re-verify your email.";
        }
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.data.message);
        // console.log(error.response.data.data.message);
        console.log(error.response.status);
      });
  },
  mounted() {},
  components: {
    "general-footer": General_Footer
  }
};
</script>
