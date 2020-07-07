<template>
  <div class="back-page legalboxes page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class>
        <div class="d-flex">
          <img src="../../assets/my-doc-icon.png" width="70" />
          <h2 class="display-3 mt-4">Document History</h2>
        </div>

        <div>
          <div class="settings-tab-parent">
            <v-tabs fixed-tabs class="settings-tab py-5" height="90">
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start first-title settings-tab-title"
                >Draft</v-tab
              >
              <v-tab
                class="display-1 white--text text-capitalize text-center justify-start settings-tab-title"
                >Signed</v-tab
              >
              <v-tab
                class="display-1 white--text text-capitalize text-left justify-start last-title settings-tab-title"
                >Sent</v-tab
              >
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <div>
                      <table class="tableUI shadow-me documentsTable">
                        <thead>
                          <tr>
                            <th>Document Summary</th>
                            <th>Last Opened</th>
                          </tr>
                        </thead>
                        <tbody v-if="documents.length > 1">
                          <tr
                            v-for="(details, index) in documents"
                            :key="index"
                          >
                            <td>
                              <span></span>
                              <router-link :to="'docs/more/' + details._id">
                                <b>{{ details.title }}</b> :
                                {{ details.category }}
                                {{ details._id }}
                              </router-link>
                            </td>
                            <td>
                              {{ details.date }}
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-if="documents.length < 1">
                          <tr class="py-8">
                            <td>You have no document yet</td>
                            <td>--</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Signed Tab -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <div>
                      <table class="tableUI shadow-me documentsTable">
                        <thead>
                          <tr>
                            <th>Document Summary</th>
                            <th>Last Opened</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(details, index) in documents"
                            :key="index"
                          >
                            <td>
                              <span></span>
                              <router-link :to="'docs/more/' + details._id">
                                <b>{{ details.title }}</b> :
                                {{ details.category }}
                                {{ details._id }}
                              </router-link>
                            </td>
                            <td>
                              {{ details.date }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Sent Tab -->
              <v-tab-item class="transparent legalbox-body-text">
                <v-card flat class="transparent">
                  <v-card-text class="transparent px-12 py-8">
                    <div>
                      <table class="tableUI shadow-me documentsTable">
                        <thead>
                          <tr>
                            <th>Document Summary</th>
                            <th>Last Opened</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(details, index) in documents"
                            :key="index"
                          >
                            <td>
                              <span></span>
                              <router-link :to="'docs/more/' + details._id">
                                <b>{{ details.title }}</b> :
                                {{ details.category }}
                                {{ details._id }}
                              </router-link>
                            </td>
                            <td>
                              {{ details.date }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
// import format from "date-fns/format";
// import parseISO from "date-fns/parseISO";
// import VImageInput from "vuetify-image-input";
// import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$store.dispatch("getAlluserDocuments");
  },
  computed: {
    documents() {
      return this.$store.state.userDocuments;
    }
  },
  mounted() {
    console.log(this.documents);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer
    // VImageInput
  }
};
</script>

<style scoped>
.documentsTable tbody td:first-child {
  text-decoration: underline;
}
</style>
