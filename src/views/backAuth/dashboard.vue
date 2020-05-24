<template>
  <div class="dashboard page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class="legalbox-tabs-parent">
        <v-row>
          <v-col
            v-for="legalbox in legalboxes"
            :key="legalbox.name"
            cols="12"
            sm="6"
            class="legalbox-wrapper"
          >
          <router-link :to="legalbox.route">
            <v-card class="legalbox-tabs d-flex flex-column justify-center">
              <v-card-title>
                <img :src="legalbox.icon" class="legalbox-icons" width="40" />
              </v-card-title>
              <v-card-text class="headline">{{ legalbox.name }}</v-card-text>
              <v-card-subtitle class="caption pl-5 grey--text">Last Opened:</v-card-subtitle>
            </v-card>
          </router-link>
            
          </v-col>
        </v-row>
          <products-footer></products-footer>

      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";
import Products_Footer from "@/components/products-general-footer";

export default {
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer
  },
  computed: {
    legalboxes() {
      return this.$store.state.legalboxes;
    }
    // generalLegalboxParent() {
    //   return this.$store.state.generalLegalboxParent;
    // },
    // educationTrainingConsultingLegalboxParent() {
    //   return this.$store.state.educationTrainingConsultingLegalboxParent;
    // },
    // ecommerceRetailWholesaleLegalboxParent() {
    //   return this.$store.state.ecommerceRetailWholesaleLegalboxParent;
    // },
    // entertainmentAndMediaLegalboxParent() {
    //   return this.$store.state.entertainmentAndMediaLegalboxParent;
    // },
    // EventsLegalboxParent() {
    //   return this.$store.state.EventsLegalboxParent;
    // },
    // fashionAndBeautyLegalboxParent() {
    //   return this.$store.state.fashionAndBeautyLegalboxParent;
    // },
    // ITandDesignLegalboxParent() {
    //   return this.$store.state.ITandDesignLegalboxParent;
    // },
    // leisureFoodDrinksLegalboxParent() {
    //   return this.$store.state.leisureFoodDrinksLegalboxParent;
    // }
  }
};
</script>
