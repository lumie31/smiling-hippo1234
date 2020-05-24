<template>
  <div class="back-page legalboxes page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class>
        <div class="d-flex">
          <img src="@/assets/user-hero-box.png" />
          <h2 class="display-3 mt-4">Legalboxes</h2>
        </div>

        <div>
          <div class="vertical-legalbox-card shadow-me">
            <v-tabs vertical class="vertical-legalbox">
              <v-tab
                class="text-capitalize text-left justify-start legalbox-title darkgrey"
                v-for="legalbox in legalboxes"
                :key="legalbox"
              >
                <img :src="legalbox.icon" width="30" /> {{ legalbox.name }}
              </v-tab>
              <v-tab-item
                v-for="legalbox in legalboxes"
                :key="legalbox.info"
                class="transparent legalbox-body-text"
              >
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                      <span class="display-1">{{ legalbox.name }}</span> <br>
                    <p>{{ legalbox.info }}</p>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </div>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";

export default {
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
  },
  computed: {
    legalboxes() {
      return this.$store.state.legalboxes;
    }
  }
};
</script>
