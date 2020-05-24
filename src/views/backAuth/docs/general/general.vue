<template>
  <div class="dashboard generalLegalboxParent page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class="legalbox-tabs-parent">
        <v-row class="py-12">
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img
              src="@/assets/general-icon.png"
              class="legalbox-icons"
              width="40"
            />
            <h2 class="display-2 ml-4">General</h2>
          </v-col>
        </v-row>
      </v-container>
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
                <v-card-title class="headline">{{ doc.childName }}</v-card-title>

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
                        <div class="d-flex subMenuChild" color="primary" dark v-on="on">
                          <router-link :to="item.route">{{ item.menu }}</router-link>
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
                            <v-list class="subMenuChildMenu">{{ item2.subMenuChildMenu }}</v-list>
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
  data() {
    return {
      showUpload: false
    };
  },
  mounted: function() {
    var list = document.getElementsByClassName("subMenuChild");
    console.log(list);
    console.log("list.innerHTML");
    if (list.innerHTML == " Upload Document ") {
      alert("Got it");
    }
  },
  methods: {
    showUploader: function() {
      var list = document.getElementsByClassName("div");
      if (list.innerHTML == " Upload Document ") {
        alert("Got it");
      }
    }
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer
  },
  computed: {
    generalLegalboxParent() {
      return this.$store.state.generalLegalboxParent;
    }
  }
};
</script>
