<template>
  <div class="gettingStarted page">
    <nav-one></nav-one>

    <div class="hero d-flex justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Getting Started</h2>
    </div>

    <div class="bodyWrapper">
      <!-- Section 1 -->

      <v-container id="section-1">
        <v-row>
          <v-col cols="12" sm="6">
            <div>
              <img height="900" src="../assets/phone-full.png" alt />
            </div>
          </v-col>

          <v-col cols="12" sm="6" class="tabs">
            <v-row>
              <v-col cols="12" sm="3">
                <img src="../assets/subscribe.png" alt class="tab-icon" />
              </v-col>
              <v-col cols="12" sm="9">
                <div>
                  <h2 class="display-1 secondary--text">Subscribe</h2>
                  <p
                    class="subtitle-1"
                  >You get to choose - Basic or Premium. Fashion & Beauty; Entertainment & Media; Events; E-commerce, Retail and Wholesale; Education & Consulting; or IT & Design. After that, it takes just 30 seconds. All we ask for is your name, email address and password. You can set the rest up when you sign in.</p>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="3">
                <img src="../assets/solution.png" alt class="tab-icon" />
              </v-col>
              <v-col cols="12" sm="9">
                <div>
                  <h2 class="display-1 secondary--text">Choose a Solution</h2>
                  <p
                    class="subtitle-1"
                  >You get to choose - Basic or Premium. Fashion & Beauty; Entertainment & Media; Events; E-commerce, Retail and Wholesale; Education & Consulting; or IT & Design. After that, it takes just 30 seconds. All we ask for is your name, email address and password. You can set the rest up when you sign in.</p>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="3">
                <img src="../assets/getday.png" alt class="tab-icon" />
              </v-col>
              <v-col cols="12" sm="9">
                <div>
                  <h2 class="display-1 secondary--text">Get on With Your Day</h2>
                  <p
                    class="subtitle-1"
                  >You get to choose - Basic or Premium. Fashion & Beauty; Entertainment & Media; Events; E-commerce, Retail and Wholesale; Education & Consulting; or IT & Design. After that, it takes just 30 seconds. All we ask for is your name, email address and password. You can set the rest up when you sign in.</p>
                </div>
                <v-btn class="mr-12" small large color="accent">
                  <router-link
                    v-if="!isSignedIn"
                    to="/login"
                    class="white--text"
                  >
                    <span class="title">Login/Sign Up</span>
                  </router-link>
                  <router-link
                    v-if="isSignedIn"
                    to="/dashboard"
                    class="white--text"
                  >
                    <span class="title">Access Dashboard</span>
                  </router-link>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Nav-Gen";
import General_Footer from "@/components/footer";

export default {
  components: {
    "nav-one": Navbar,
    "general-footer": General_Footer
  },
  computed: {
    isSignedIn() {
      return this.$store.getters.signedIn;
    }
  }
};
</script>
