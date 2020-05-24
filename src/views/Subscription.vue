import Vue from "vue";

<template>
  <div class="subscription page" id="">
    <nav-one></nav-one>

    <div class="hero d-flex justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Subscription</h2>
    </div>

    <div class="bodyWrapper">
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
                <p class="subtitle secondary--text pricing">850 NGN/month*</p>

                <div class="d-flex justify-center plan-btn"></div>
              </div>

              <div class="plan-child">
                <p class="display-2 secondary--text">Premium</p>
                <p class="subtitle secondary--text">
                  Four legalboxes
                  <br />Unlimited Downloads
                </p>
                <p class="subtitle secondary--text pricing">850 NGN/month*</p>

                <div class="d-flex justify-center plan-btn"></div>
              </div>
            </div>
          </div>
        </div>

        <v-row class="justify-center">
          <v-col cols="12" sm="6">
            <v-select
              label="Select Plan"
              :items="plans"
              v-validate="'required'"
              item-text="name"
              autocomplete
              offset-y
            ></v-select>
            <div class="d-flex justify-space-around durationTypeHolder">
              <span v-for="duration in durationType" :key="duration">
                <input type="radio" name="duration-type" />
                {{ duration }}
              </span>
            </div>
          </v-col>
        </v-row>

        <div id="legalboxParent">
          <p v-if="selectedLegalbox.length">
            Your Selection:
            <br />
            <b>{{ selectedLegalbox.join(", ") }}</b>
          </p>
          <v-row class="legalboxesWrapper">
            <v-col cols="12" sm="6" id="legalbox-first-half">
              <div v-for="legalbox in legalboxes.slice(0, 4)" :key="legalbox">
                <v-checkbox
                  v-model="selectedLegalbox"
                  :label="legalbox.name"
                  :value="legalbox.name"
                >
                </v-checkbox>
              </div>
            </v-col>
            <v-col cols="12" sm="6" id="legalbox-second-half">
              <div
                v-for="legalbox in legalboxes.slice(4, 8)"
                :key="legalbox.name"
              >
                <v-checkbox
                  v-model="selectedLegalbox"
                  :label="legalbox.name"
                  :value="legalbox.name"
                ></v-checkbox>
              </div>
            </v-col>
          </v-row>
          <div class="d-flex justify-center">
            <v-btn
              x-large
              color="accent"
              height="80"
              style="padding: 10px 100px; border-radius: 10px;"
            >
              <span class="headline text-capitalize">Subscribe & Pay</span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Nav-Gen";
import General_Footer from "@/components/footer";

export default {
  data() {
    return {
      selectedLegalbox: []
    };
  },
  components: {
    "nav-one": Navbar,
    "general-footer": General_Footer
  },
  computed: {
    plans() {
      return this.$store.state.plans;
    },
    durationType() {
      return this.$store.state.durationType;
    },
    legalboxes() {
      return this.$store.state.legalboxes;
    }
  }
};
</script>
