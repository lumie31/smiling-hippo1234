<template>
  <div class="dashboard generalLegalboxParent page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class="legalbox-tabs-parent">
        <v-row>
          <v-col
            v-for="doc in generalLegalboxParent"
            :key="doc.childName"
            cols="12"
            sm="4"
            class="legalbox-wrapper"
          >
          <router-link :to="doc.route">
            <v-card class="legalbox-tabs d-flex flex-column justify-center">
              <v-card-title class="headline">{{ doc.childName }} </v-card-title>
  
              <v-menu offset-x :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <div class="trigger-legalbox-submenu" v-on="on"></div>
                </template>
                <v-list>
                  <v-menu
                      offset-x
                      v-for="(item, index) in doc.subMenu"
                      :key="index"
                      open-on-hover
                  >
                  
                    <template v-slot:activator="{ on }" internal-activator>
                      <div
                        class="d-flex subMenuChild"
                        color="primary"
                        dark
                        v-on="on"
                      >
                          {{ item.menu }}
                      </div>
                    </template>
                    <v-list>
                        <v-list
                          class="d-flex"
                          v-for="(item2, index) in item.subMenuChild"
                          :key="index"
                          @click.stop
                          internal-activator
                        >
                      <router-link :to="item2.route">
                        <v-list class="subMenuChildMenu">
                          {{ item2.subMenuChildMenu }}
                        </v-list>
                      </router-link>
                        
                      </v-list>
                    </v-list>
                  </v-menu>
                </v-list>
              </v-menu>
              <v-card-subtitle class="caption pl-5 grey--text">Last Opened:</v-card-subtitle>
            </v-card>
          </router-link>

            
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card class="legalbox-tabs d-flex flex-column justify-center">
              <v-card-title>
                <img src="@/assets/payment-history-icon.png" class="legalbox-icons" width="40" />
              </v-card-title>
              <v-card-text class="headline">Payment History</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="legalbox-tabs d-flex flex-column justify-center">
              <v-card-title>
                <img src="@/assets/my-doc-icon.png" class="legalbox-icons" width="40" />
              </v-card-title>
              <v-card-text class="headline">My Documents</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";

export default {
  data() {
    return {
      myObject: null
    };
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
  },
  computed: {
    generalLegalboxParent() {
      return this.$store.state.generalLegalboxParent;
    }
  }
};
</script>
