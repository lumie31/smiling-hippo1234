<template>
  <div class="home">
    <nav-one></nav-one>

    <div class="bodyWrapper">
      <!-- Section 1 -->
      <v-container id="section-1">
        <v-row class="pad-top">
          <v-col cols="12" sm="6">
            <v-card flat class="mt-12" color="transparent">
              <v-card-text>
                <div class="display-2 text--white">
                  Simple Solutions
                  <br />For Everyday <br />Transactions.
                </div>
                <p>
                  Connect with your customers, protect your businesses and
                  collect your payments with just the click of a button.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-btn x-large class="px-4" color="deep-purple accent">
                  <router-link to="/signup">
                    Try 7 Days Free
                  </router-link>
                </v-btn>
              </v-card-actions>
            </v-card>
            <p class="text-uppercase body-1 ml-6">*No card needed</p>
          </v-col>

          <v-col cols="12" sm="6">
            <img
              width="600"
              src="../assets/phone.png"
              alt="Legalbox Phone icon"
              class="mb-n9"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- Section 2 -->
      <v-container fluid class="l-linear-grad l-section2">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <h2
                class="to-top display-3 font-weight-normal text-center mt-12 white--text"
              >
                We are making business
                <br />simple and cool
              </h2>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4">
              <v-card class="pa-12 l-rounded-card">
                <v-card-text>
                  <img
                    alt="connect icon"
                    width="55"
                    src="../assets/connect-icon.png"
                  />
                  <p class="display-2 text--secondary">
                    <router-link to="/signup">Connect</router-link>
                  </p>
                  <p class="subtitle-1 text--secondary">
                    Documents are about connection. Whether it is a letter, a
                    contract, a policy, a receipt or an invoice, there is a
                    customer waiting for you to reach them with your offer,
                    price or business deal.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    x-large
                    color="deep-purple accent l-rounded-button px-12"
                  >
                    <router-link to="/signup"
                      ><router-link to="/signup"
                        >Start Today</router-link
                      ></router-link
                    >
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card class="pa-12 l-rounded-card">
                <v-card-text>
                  <img
                    alt="connect icon"
                    width="55"
                    src="../assets/connect-icon.png"
                  />
                  <p class="display-2 text--secondary">
                    <router-link to="/signup">Connect</router-link>
                  </p>
                  <p class="subtitle-1 text--secondary">
                    Documents are about connection. Whether it is a letter, a
                    contract, a policy, a receipt or an invoice, there is a
                    customer waiting for you to reach them with your offer,
                    price or business deal.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    x-large
                    color="deep-purple accent l-rounded-button px-12"
                    ><router-link to="/signup">Start Today</router-link></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card class="pa-12 l-rounded-card">
                <v-card-text>
                  <img
                    alt="connect icon"
                    width="55"
                    src="../assets/collect-icon.png"
                  />
                  <p class="display-2 text--secondary">
                    <router-link to="/signup">Collect</router-link>
                  </p>
                  <p class="subtitle-1 text--secondary">
                    Our digital payments feature allows your customers pay
                    directly to your account immediately they sign contracts
                    online. You can also set up payment plans with your contract
                    and receive automatic payments once each payment is due.
                    Cool right?
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    x-large
                    color="deep-purple accent l-rounded-button px-12"
                    ><router-link to="/signup">Click Here</router-link></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12">
              <h2
                class="display-3 font-weight-normal text-center mt-12 secondary--text"
              >
                Healthier Relationships
                <br />Wealthier Businesses
              </h2>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 3 -->
      <v-container fluid id="section-3">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card flat color="transparent">
                <v-card-text>
                  <h2 class="display-2 white--text">Worry Less</h2>
                  <p class="white--text">
                    You don’t have to worry about forgetting to pay your taxes.
                    Get automatic reminders when your taxes are due.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text dark large class="btn-bottom-border px-0"
                    ><router-link to="/signup"
                      >Subscribe Now</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" class="ml-12">
              <v-card flat color="transparent">
                <v-card-text>
                  <h2 class="display-2 white--text">Know What To Pay</h2>
                  <p class="white--text">
                    We have done the heavy-lifting of automating the formulas.
                    All you have to do is select the type of tax, input your
                    taxable income and you are good to go.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >CALCULATE YOUR TAX HERE</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 4 -->

      <v-container fluid id="section-4">
        <v-container>
          <v-row>
            <v-col cols="12" sm="7">
              <v-card flat color="transparent">
                <v-card-text>
                  <h2 class="display-2 secondary--text">Stay Informed</h2>
                  <p class="secondary--text">
                    We know. You want to be on the right side of the law but you
                    can’t seem to keep up with the new laws, procedures and
                    regulatory updates peculiar to your industry. We have
                    created a system that gives you these updates peculiar to
                    your industry for free.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text dark large class="btn-bottom-border px-0"
                    ><router-link to="/signup"
                      >Subscribe Now</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>

              <v-card flat color="transparent ml-12">
                <v-card-text>
                  <h2 class="display-2 secondary--text">
                    Make smart and confident business decisions
                  </h2>
                  <p class="white--text">
                    We have done the heavy-lifting of automating the formulas.
                    All you have to do is select the type of tax, input your
                    taxable income and you are good to go.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >CALCULATE YOUR TAX HERE</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5">
              <v-img src="../assets/idea_bulb.png"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 5 -->
      <v-container fluid id="section-5">
        <v-container>
          <v-row>
            <v-col cols="12" sm="7">
              <v-card flat color="transparent">
                <v-card-text>
                  <h2 class="display-2 secondary--text">
                    Take your deals with you wherever you go
                  </h2>
                  <p class="secondary--text">
                    Send, sign and collect payments on your contracts anywhere,
                    anytime.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >CALCULATE YOUR TAX HERE</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 6 -->
      <v-container fluid id="section-6" class="white">
        <v-container>
          <v-row>
            <v-col cols="12" sm="5">
              <v-img
                src="../assets/hand iphone.png"
                height="600"
                class="mb-n9"
              ></v-img>
            </v-col>

            <v-col cols="12" sm="7" class>
              <v-card flat color="transparent">
                <v-card-text>
                  <h2 class="display-2 secondary--text">Go Green</h2>
                  <p class="secondary--text">
                    Less paper means less dependence on trees. Less global
                    warming. We can help you build a more responsible business.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >CALCULATE YOUR TAX HERE</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>

              <v-card flat color="transparent ml-12">
                <v-card-text>
                  <h2 class="display-2 secondary--text">Know What To Pay</h2>
                  <p class="secondary--text">
                    We have done the heavy-lifting of automating the formulas.
                    All you have to do is select the type of tax, input your
                    taxable income and you are good to go.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >CALCULATE YOUR TAX HERE</router-link
                    ></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 7 -->
      <v-container fluid id="section-7" class="secondary pb-0">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" sm="7" class="d-flex">
              <v-card flat color="transparent" class="align-self-center">
                <v-card-text>
                  <h2 class="display-2 white--text">We speak you.</h2>
                  <p class="white--text">
                    Our solutions are simple and easy-to-use. No legal jargon or
                    complicated language. Say goodbye to words like ‘whereas’,
                    ‘hereinafter’ or ‘force majeure’. We have designed our
                    solutions for everyday use.
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn large color="accent"
                    ><router-link to="/signup">Click Here</router-link></v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" sm="5" class="pb-0">
              <v-img src="../assets/lady.png"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!-- Section 8 -->
      <v-container id="section-8">
        <div id="plan-parent">
          <h2 class="display-2 text-center secondary--text">
            We have a plan that
            <br />works for you
          </h2>
          <div id="plan-holder">
            <div class="d-flex justify-center">
              <div class="plan-child">
                <p class="display-2 secondary--text">Basic</p>
                <p class="subtitle secondary--text">
                  Two legalboxes
                  <br />Unlimited Downloads
                </p>
                <p class="subtitle secondary--text">850 NGN/month*</p>

                <div class="d-flex justify-center plan-btn">
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >Try For Free2</router-link
                    ></v-btn
                  >
                </div>
              </div>

              <div class="plan-child">
                <p class="display-2 secondary--text pricing">Premium</p>
                <p class="subtitle secondary--text">
                  Four legalboxes
                  <br />Unlimited Downloads
                </p>
                <p class="subtitle secondary--text pricing">850 NGN/month*</p>

                <div class="d-flex justify-center plan-btn">
                  <v-btn large color="accent"
                    ><router-link to="/signup"
                      >Try For Free1</router-link
                    ></v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>

    <!-- Footer -->

    <general-footer></general-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Nav-Gen";
import General_Footer from "@/components/footer";

export default {
  components: {
    "nav-one": Navbar,
    "general-footer": General_Footer
  }
};
</script>

<style scoped>
button a {
  color: #ffffff;
}
</style>
