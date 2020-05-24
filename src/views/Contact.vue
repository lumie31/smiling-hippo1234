<template>
  <div class="contact page">
    <nav-one></nav-one>

    <div class="hero d-flex justify-center align-center">
      <div id="decoy"></div>
      <h2 class="display-3 secondary--text">Contact Us</h2>
    </div>

    <div class="bodyWrapper">
      <v-container class="form-container">
        <div>
          <h3
            class="headline"
          >We are here for you and would love to hear from you. Tell us how we can help you. Share how your experience with Legalbox has been. We love feedback. It is how we both grow and better satisfy you.</h3>
        </div>

        <v-form id="contact-form">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field label="Your Name" height="80" outlined></v-text-field>
              <v-text-field label="Your Email" height="80" outlined></v-text-field>
              <v-textarea label="Your Details" height="300" outlined></v-textarea>
              <v-btn label="Submit" color="accent" height="100" width="100%">
                <span class="text-capitalize display-1">Submit</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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
  }
};
</script>
