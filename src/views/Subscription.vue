<template>
  <div class="subscription page" id>
    <nav-one></nav-one>

    <div class="hero d-flex justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Subscription</h2>
    </div>

    <div class="bodyWrapper">
      <v-container>
        <v-dialog
          persistent
          v-model="returnedPayment"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <!-- <v-toolbar dark flat solo color="white text-right">
            <v-spacer></v-spacer>
            <v-btn icon dark @click="resetSuccessful = false">
              <v-icon x-large>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>-->
          <v-card class="d-flex flex-column align-center justify-center">
            <!-- <v-container class="l-hero d-flex align-center justify-center mb-10">
            <router-link to="/">
              <img width="420" alt="Legalbox logo" src="@/assets/logo.svg" />
            </router-link>
            </v-container>-->

            <v-container
              class="d-flex flex-column align center"
              v-if="paymentLoading"
            >
              <v-text-field
                style="width: 40%; margin: 0 auto;"
                color="success"
                loading
                disabled
              ></v-text-field>
            </v-container>

            <v-container
              class="d-flex flex-column align center"
              v-if="!paymentLoading && paymentSuccessful"
            >
              <v-icon size="250" color="green">check_circle</v-icon>
              <h2 class="text-center display2 secondary--text">
                Payment Successful
              </h2>
              <div class="width50-center text-center body-1 accent--text">
                <p>Thank you for your payment. You are all set to go now</p>
                <!-- <v-btn class="accent">Goto Dashboard</v-btn> -->
              </div>
            </v-container>

            <v-container
              class="d-flex flex-column align center"
              v-if="!paymentLoading && paymentFailed"
            >
              <v-icon size="250" color="red">error</v-icon>
              <h2 class="text-center display2 red--text">
                Payment UnSuccessful
              </h2>
              <div class="width50-center text-center body-1 accent--text">
                <p>Sorry! We couldnt process your payment</p>
                <!-- <v-btn class="accent">Goto Dashboard</v-btn> -->
              </div>
            </v-container>
          </v-card>
        </v-dialog>
        <v-text-field
          v-if="returnedPayment"
          style="width: 40%; margin: 0 auto;"
          color="success"
          loading
          disabled
        ></v-text-field>
      </v-container>

      <v-container fluid id="section-8" v-if="!returnedPayment">
        <div id="plan-parent">
          <h2 class="display-2 text-center secondary--text">
            We have a plan that
            <br />works for you
          </h2>
          <div id="plan-holder">
            <div class="d-flex justify-center">
              <div
                class="plan-child"
                v-for="(plan, index) in plans"
                :key="index"
              >
                <p class="display-2 secondary--text">{{ plan.name }}</p>
                <p class="subtitle secondary--text">
                  {{ plan.LGAmount }}
                  <br />Unlimited Downloads
                </p>
                <p class="subtitle secondary--text pricing">
                  {{ plan.price }} NGN/month*
                </p>

                <div class="d-flex justify-center plan-btn"></div>
              </div>
            </div>
          </div>
        </div>
        <v-form ref="legalboxSelectionForm">
          <v-row
            class="justify-center mt-12 mb-10"
            style="width: 80%; margin: 0 auto;"
          >
            <v-col cols="12" sm="6">
              <p>{{ currentPlan }}</p>
              <v-select
                label="Select Plan"
                v-model="currentPlan"
                :rules="[rules.required]"
                @change="updateCurrentPlan"
                :items="plans"
                item-text="name"
                autocomplete
                offset-y
              ></v-select>
              <div class="d-flex justify-center text-center planDuration">
                <v-radio-group v-model="duration" :rules="[rules.required]" row>
                  <v-radio label="Monthly" value="Monthly"></v-radio>
                  <span class="mx-4"></span>
                  <v-radio label="Annual" value="Annual"></v-radio>
                </v-radio-group>
              </div>
            </v-col>
          </v-row>

          <div id="legalboxParent">
            <!-- <p v-if="selectedLegalbox.length">
            Your Selection:
            <br />
            <b>{{ selectedLegalbox.join(", ") }}</b>
          </p>-->
            <div class="text-center pt-8">
              <h2 class="display-2">Select Legalboxes</h2>
              <p class>
                Select any 4 for (Premium) or any 2 for (Basic)
                <br />
                <em>General is Compulsory</em>
              </p>
              <p
                class="resetSelection white--text"
                @click="resetSelection"
                v-if="currentLegalboxSelection.length > 1"
              >
                Reset Selection
              </p>
            </div>
            <v-row class="legalboxesWrapper">
              <v-col cols="6" sm="6" class="legalbox-subscription-halves">
                <div
                  v-for="(legalbox, index) in legalboxesFilteredGeneral"
                  :key="legalbox.name + index"
                  class="shadow-me-light pa-3 pl-6 subscribe-legalbox"
                >
                  <!-- <pre class="testFloat">{{ selectedLegalbox }}</pre> -->

                  <div class="d-flex align-center">
                    <!-- <p class="legalboxSubscribeCheckbox"></p> -->
                    <v-checkbox
                      class="legalboxSubscribeCheckbox"
                      v-model="selectedLegalbox"
                      @change="updateSelectedLegalbox"
                      :value="compulsoryLegalbox"
                      disabled
                    ></v-checkbox>
                    <p class="title mt-2">{{ legalbox.name }}</p>
                    <v-spacer></v-spacer>
                    <!-- <v-icon
                    v-if="selectedLegalbox.includes(legalbox.name) && index > 0"
                    @click="removeSelection(index)"
                    size="30"
                    color="red"
                  >
                    remove_circle
                  </v-icon>-->
                  </div>
                  <v-container>
                    <!-- {{ panel }} -->
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header
                          class="transparent"
                          id="header"
                          @click="hideEllipsis"
                        >
                          <span class="legalbox-info-ellipsis">
                            {{ legalbox.info }}
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="faq-answers">{{
                          legalbox.info
                        }}</v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-container>
                </div>

                <div
                  v-for="(legalbox, index) in legalboxes.slice(
                    0,
                    legalboxes.length / 2
                  )"
                  :key="index"
                  class="shadow-me-light pa-3 pl-6 subscribe-legalbox"
                >
                  <!-- <pre class="testFloat">{{ selectedLegalbox }}</pre> -->

                  <div class="d-flex align-center">
                    <!-- <p class="legalboxSubscribeCheckbox"></p> -->
                    <v-checkbox
                      class="legalboxSubscribeCheckbox"
                      v-model="selectedLegalbox"
                      @change="updateSelectedLegalbox"
                      :value="legalbox"
                      :disabled="disableCheckbox"
                    ></v-checkbox>
                    <p class="title mt-2">{{ legalbox.name }}</p>
                    <v-spacer></v-spacer>
                    <!-- <v-icon
                    v-if="selectedLegalbox.includes(legalbox.name) && index > 0"
                    @click="removeSelection(index)"
                    size="30"
                    color="red"
                  >
                    remove_circle
                  </v-icon>-->
                  </div>
                  <v-container>
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="transparent">
                          <span class="legalbox-info-ellipsis">
                            {{ legalbox.info }}
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="faq-answers">{{
                          legalbox.info
                        }}</v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-container>
                </div>
              </v-col>
              <v-col cols="6" sm="6" class="legalbox-subscription-halves">
                <div
                  v-for="(legalbox, index) in legalboxes.slice(
                    3,
                    legalboxes.length
                  )"
                  :key="index"
                  class="shadow-me-light pa-3 pl-6 subscribe-legalbox"
                >
                  <div class="d-flex align-center">
                    <!-- <p class="legalboxSubscribeCheckbox"></p> -->
                    <v-checkbox
                      class="legalboxSubscribeCheckbox"
                      v-model="selectedLegalbox"
                      @change="updateSelectedLegalbox"
                      :value="legalbox"
                      :disabled="disableCheckbox"
                    ></v-checkbox>
                    <p class="title mt-2">{{ legalbox.name }}</p>
                    <v-spacer></v-spacer>
                    <!-- <v-icon
                    v-if="selectedLegalbox.includes(legalbox.name) && index > 0"
                    @click="removeSelection(index)"
                    size="30"
                    color="red"
                  >
                    remove_circle
                  </v-icon>-->
                  </div>
                  <v-container>
                    <v-expansion-panels flat>
                      <v-expansion-panel>
                        <v-expansion-panel-header class="transparent">
                          <span class="legalbox-info-ellipsis">
                            {{ legalbox.info }}
                          </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="faq-answers">{{
                          legalbox.info
                        }}</v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-container>
                </div>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                x-large
                :disabled="disableSubscribeButton"
                color="accent"
                height="80"
                style="padding: 10px 100px; border-radius: 10px;"
                @click.prevent="callOnPaystack"
              >
                <!-- <span class="headline text-capitalize">Start 14 Days Trial</span> -->
                <span class="headline text-capitalize">subscribe & Pay</span>
                <!-- <span class="headline text-capitalize">Subscribe & Pay</span> -->
              </v-btn>
              <p class="mt-4 red--text" v-if="formErrorMessage">
                You have left out a required section
              </p>
              <p class="mt-4">
                By clicking on ‘Subscribe & Pay’, you have agreed to our
                <router-link to="/terms-of-service"
                  >terms of service</router-link
                >and
                <router-link to="/privacy-policy">privacy policy</router-link>
              </p>
            </div>
          </div>
        </v-form>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script src="topbar.js"></script>

<script>
// import Paystack from "vue-paystack";
import { uuid } from "vue-uuid";
import Navbar from "@/components/Nav-Gen";
import General_Footer from "@/components/footer";
import { mapState } from "vuex";
// import { store } from "../store";
import $ from "jquery";
import axios from "axios";

export default {
  data() {
    return {
      panel: [],
      formErrorMessage: false,
      duration: "",
      paystackPlan: "",
      paymentInitiated: true,
      uuid: "LB_Paystack_" + uuid.v4(),
      currentPlan: "",
      compulsoryLegalbox: {
        name: "General",
        lbID: "LB001"
      },
      disableCheckbox: false,
      disableSubscribeButton: true,
      selectedLegalbox: [
        {
          name: "General",
          lbID: "LB001"
        }
      ],
      paymentRef: "",
      returnedPayment: false,
      paymentLoading: true,
      paymentSuccessful: false,
      paymentFailed: false,
      paymentInvalid: false,
      paystackSecretKey: process.env.VUE_APP_paystack_secretKey,
      paystackkey: process.env.VUE_APP_paystack_publicKey,
      reference: "LB_Paystack_" + uuid.v4(),
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    hideEllipsis() {
      if ($("buttton#header").hasClass(".v-expansion-panel-header--active")) {
        $("buttton#header")
          .children(".legalbox-info-ellipsis")
          .hide();
      }
    },
    callback: function(response) {
      console.log(response);
    },
    close: function() {
      console.log("Payment closed");
    },
    updateCurrentPlan() {
      // this.disableCheckbox = false;
      if (this.currentPlan == "Basic") {
        // alert(this.currentPlan);
        // this.updateSelectedLegalbox();
      } else if (this.currentPlan == "Premium") {
        if (this.currentLegalboxSelection < 3) {
          // alert(this.currentPlan);
          this.disableSubscribeButton = true;
          this.disableCheckbox = false;
        }
        // alert(this.currentPlan);
        // this.updateSelectedLegalbox();
      }
    },
    updateSelectedLegalbox() {
      if (this.selectedLegalbox.length == 2 && this.currentPlan == "Basic") {
        // alert("BASIC MODE");
        this.disableCheckbox = true;
        this.disableSubscribeButton = false;
        // this.disableCheckbox = true;
        // this.disableSubsribeButton = false;
      } else if (this.selectedLegalbox.length == 4) {
        // alert("PREMIUM MODE");
        this.disableSubscribeButton = false;
        this.disableCheckbox = true;
      } else if (this.selectedLegalbox > 4) {
        alert("Other");
        this.disableCheckbox = true;
      }
    },
    resetSelection() {
      this.selectedLegalbox = [this.compulsoryLegalbox];
      this.currentPlan = "";
      this.disableSubscribeButton = true;
    },
    // removeSelection(index) {
    //   this.selectedLegalbox.splice(index, 1);
    //   this.selectedLegalbox[0] = ["General"];
    //   console.log(this.selectedLegalbox);
    // }
    callOnPaystack() {
      if (this.$refs.legalboxSelectionForm.validate()) {
        if (this.currentPlan == "Basic") {
          this.paystackPlan = "PLN_37fzyfh8920h35f";
        } else if (this.currentPlan == "Premium") {
          this.paystackPlan = "PLN_mt4xxitf8tl8hb9";
        }

        this.formErrorMessage = false;
        let userSelection = this.selectedLegalbox;
        userSelection.slice().forEach(function(selectionObj) {
          delete selectionObj.icon;
          delete selectionObj.info;
          delete selectionObj.lastOpened;
          delete selectionObj.route;
        });

        this.disableSubscribeButton = true;

        axios
          .post(
            "https://api.paystack.co/transaction/initialize",
            {
              email: this.storedUserEmail,
              first_name: this.storedUserDetails.firstName,
              last_name: this.storedUserDetails.lastName,
              reference: this.reference,
              amount: this.amount,
              plan: this.paystackPlan,
              callback_url: "https://localhost:8080/subscription",
              metadata: {
                custom_fields: [
                  {
                    subscribedLegalboxes: userSelection,
                    duration: this.duration
                  }
                ]
              }
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.VUE_APP_paystack_secretKey}`,
                "Content-Type": "application/json"
              }
            }
          )
          .then(response => {
            const auth_URL = response.data.data.authorization_url;
            // console.log(auth_URL);
            // this.$router.push(auth_URL);
            window.open(auth_URL, "_blank");

            console.log(response);
            console.log(response.data);
            console.log(response.status);
          })
          .catch(error => {
            console.log(error);
            console.log(error.response);
            console.log(error.response.data);
            console.log(error.response.status);
          });
      } else {
        this.formErrorMessage = true;
        setTimeout(() => {
          this.formErrorMessage = false;
        }, 3000);
      }
    },
    callOnPaystack2() {
      // const route = "https://google.com";
      // window.open(route.href, "_blank");
    }
  },
  watch: {
    currentPlan(val) {
      if (val.length > 1) {
        this.disableCheckbox = false;

        if (val == "Premium") {
          // alert("Premium");
          if (this.selectedLegalbox.length < 4) {
            this.disableSubscribeButton = true;
            this.disableCheckbox = false;
          }
        } else if (val == "Basic") {
          // alert("basic 2");
          if (this.selectedLegalbox.length > 2) {
            this.selectedLegalbox.pop();
            console.log(this.disableCheckbox);
            this.disableCheckbox = true;
          }
        }
      }
    }
  },
  components: {
    // paystack: Paystack,
    "nav-one": Navbar,
    "general-footer": General_Footer
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {});

    this.paymentRef = this.$route.query.reference;
    if (this.paymentRef) {
      this.returnedPayment = true;
      this.paymentLoading = true;

      axios
        .get("https://api.paystack.co/transaction/verify/" + this.paymentRef, {
          headers: { Authorization: `Bearer ${this.paystackSecretKey}` }
        })
        .then(response => {
          if (response.data.status === true) {
            this.paymentLoading = false;

            console.log(response.data);
            if (response.data.data.status == "success") {
              this.paymentSuccessful = true;
              this.$store.dispatch("updateaUserProfile", {});

              setTimeout(() => {
                this.$router.push("/dashboard");
              }, 5000);
            }
          }

          console.log(response);
          console.log(response.data);
          console.log(response.data.status);
          console.log(response.status);
          console.log(response.headers);
        })
        .catch(error => {
          this.paymentLoading = false;

          if (error.response.status != 200) {
            this.paymentFailed = true;

            setTimeout(() => {
              this.$router.push("/subscription");
            }, 5000);
          }

          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.data.message);
          // console.log(error.response.data.data.message);
          console.log(error.response.status);
        });
    }
  },

  computed: {
    ...mapState(["storedUserDetails", "storedUserEmail"]),
    currentLegalboxSelection() {
      return this.selectedLegalbox;
    },
    plans() {
      return this.$store.state.plans;
    },
    durationType() {
      return this.$store.state.durationType;
    },
    legalboxes() {
      return this.$store.state.legalboxes.filter(i => i.name != "General");
    },
    legalboxesFilteredGeneral() {
      return this.$store.state.legalboxes.filter(i => i.name == "General");
    },
    hideEllipsis2() {
      let ellipsis = $(".legalbox-info-ellipsis");
      if ($("buttton#header").hasClass(".v-expansion-panel-header--active")) {
        ellipsis.hide();
      }
      return ellipsis;
    }
  },
  mounted() {
    this.hideEllipsis();
    // console.log(this.storedUserDetails)
    // let list = document.getElementsByClassName("legalboxSubscribeCheckbox");
    // console.log(list);

    // let list2 = list[0].getElementsByTagName("input");
    // list2.disabled = false;
    // console.log(list2);

    this.disableCheckbox = true;
  }
};
</script>

<style scoped>
>>> .planDuration .v-messages__wrapper {
  text-align: center;
  margin-top: 10px;
}
.resetSelection {
  cursor: pointer;
  padding: 4px;
  padding-bottom: 6px;
  margin: 0 auto;
  margin-top: 12px;
  width: 9%;
  border-radius: 50px;
  font-weight: 700;
  background: red;
}

.subscribe-legalbox {
  border-radius: 25px;
}

.subscribe-legalbox {
  margin-bottom: 40px;
}

.legalboxSubscribeCheckbox {
  transform: scale(1.5);
}

/* .legalbox-subscription-halves {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 100%;
} */

/* .subscribe-legalbox {
  width: 40%;
} */

.legalbox-info-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 1.625;
  -webkit-line-clamp: 2; /* after 3 line show ... */
  -webkit-box-orient: vertical;
}
</style>
