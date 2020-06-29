<template>
  <div class="about page">
    <nav-one></nav-one>

    <div class="hero d-flex justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">About Us</h2>
    </div>

    <div class="bodyWrapper">
      <!-- Section 1 -->
      <v-container>
        <v-row>
          <v-col cols="12" sm="5" class="about-lady d-flex justify-center pb-0">
            <div id="lady-decoy"></div>
            <img
              src="../assets/about.gif"
              alt="smiling lady with tape rule"
              width="370"
            />
          </v-col>

          <v-col cols="12" sm="7">
            <v-card flat color="transparent">
              <v-card-text>
                <h2 class="display-1">
                  We are providing simple legal solutions and collections for
                  everyday transactions and business.
                </h2>
                <p class="body-1">
                  We see small businesses grow, scale and become all they dream
                  about. We see them using our solutions on their journey to
                  greatness. We see them build strong and healthy business
                  relationships. We see them confident, protected and
                  productive. And even if we are just a footnote, we see
                  ourselves as a part of their stories.ˀ
                  <br />
                  <br />Are you on such a journey? Mind if we join you?
                </p>
              </v-card-text>
              <v-card-actions>
                <p>
                  Let’s get started
                  <router-link to="/signup">here</router-link>
                </p>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Section 2 -->

      <div id="section-2">
        <v-container>
          <div class="legend">
            <h2 class="text-center">
              <span class="px-2">Our Core Values</span>
            </h2>
          </div>

          <v-row class="core-values d-flex justify-space-between">
            <v-col cols="12" sm="2" class="d-flex flex-column align-center">
              <img src="../assets/simplicity.png" alt />
              <p class="display-1">Simplicity.</p>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex flex-column align-center">
              <img src="../assets/efficiency.png" alt />
              <p class="display-1">Efficiency.</p>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex flex-column align-center">
              <img src="../assets/innovation.png" alt />
              <p class="display-1">Innovation.</p>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex flex-column align-center">
              <img src="../assets/sustainability.png" alt />
              <p class="display-1">Sustainability.</p>
            </v-col>
            <v-col cols="12" sm="2" class="d-flex flex-column align-center">
              <img src="../assets/integrity.png" alt />
              <p class="display-1">Integrity.</p>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
  }
};
</script>
