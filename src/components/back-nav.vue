<template>
  <div>
    <div v-if="pageLoader" class="loader"></div>

    <v-dialog
      persistent
      v-model="fallbackError"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="fallbackError">
        <v-container></v-container>
      </v-card>
    </v-dialog>

    <!-- <div class="testFloat">{{ userDocuments }}</div> -->
    <!-- <pre class="testFloat">isActivated: {{ storedUserDetails }}</pre> -->
    <nav>
      <v-toolbar height="200" class="nav-tool back-nav" elevation="3 ">
        <router-link to="/dashboard">
          <img width="220" alt="Legalbox logo" src="@/assets/logo.svg" />
        </router-link>
        <v-spacer></v-spacer>
        <v-container
          id="searchWrapper"
          class="d-flex"
          style="width: 50%; position: relative;"
          flex-column
        >
          <!-- {{ searchDocument }} -->
          <v-text-field
            solo
            outlined
            class="backPageSearch"
            v-model="searchDocument"
            flat
            placeholder="Search By Document Title"
            append-icon="search"
          ></v-text-field>
          <div class="backPageSearchResult" v-if="typing">
            <ul class="backPageSearchResultPARENT">
              <li
                class="searchList"
                v-for="(doc, index) in filteredDocumentResult"
                :key="index"
              >
                {{ doc.title }}
                {{ doc.age }}
              </li>
              <!-- <li class="searchList">dsddsdsd</li> -->
              <div class="type-loader"></div>
            </ul>
          </div>
        </v-container>
        <v-spacer></v-spacer>
        <div class="user-glimpse d-flex justify-center align-center">
          <span>
            <img
              :src="[
                storedUserProfilePicture
                  ? storedUserProfilePicture
                  : '/img/user.0f16ef6a.png'
              ]"
            />
          </span>
          <p class="ml-4">Hi {{ storedUserDetails.firstName }}</p>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">keyboard_arrow_down</v-icon>
            </template>
            <v-list id="user-menu">
              <v-list-item>
                <v-list-item-content>
                  <router-link to="/inbox">
                    <v-list-item-title class="user-menu-item py-2 text-right"
                      >Inbox</v-list-item-title
                    >
                  </router-link>
                  <router-link to="/legalboxes">
                    <v-list-item-title class="user-menu-item py-2 text-right"
                      >Legalboxes</v-list-item-title
                    >
                  </router-link>
                  <router-link to="/settings">
                    <v-list-item-title class="user-menu-item py-2 text-right"
                      >Settings</v-list-item-title
                    >
                  </router-link>
                  <v-list-item-title
                    style="cursor: pointer;"
                    class="user-menu-item py-2 text-right"
                    @click="signOut"
                    >Logout</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-toolbar>
    </nav>
    <v-container
      class="EmailNotActivated .width80-center"
      v-if="!storedUserDetails.isActivated"
    >
      <v-alert prominent type="error">
        <v-row align="center">
          <v-col class="grow text-center">
            Your account has not been activated. Please verify your account to
            avoid stories that touch in future.
          </v-col>
          <v-col class="shrink">
            <v-btn @click="verifyEmail" :loading="resetLoader"
              >Verify Email</v-btn
            >
          </v-col>
        </v-row>
      </v-alert>

      <v-dialog
        persistent
        v-model="resetSuccessful"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-toolbar dark color="secondary text-right">
          <v-spacer></v-spacer>
          <v-btn icon dark @click="resetSuccessful = false">
            <v-icon x-large>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card class="d-flex flex-column align-center justify-center">
          <!-- <v-container class="l-hero d-flex align-center justify-center mb-10">
            <router-link to="/">
              <img width="420" alt="Legalbox logo" src="@/assets/logo.svg" />
            </router-link>
          </v-container>-->

          <v-container class="d-flex flex-column align center">
            <h2 class="py-7 text-center display-2 secondary--text">
              Check your Email
            </h2>
            <div class="width50-center text-center body-1 accent--text">
              <p>
                To get started with your account, please check your email for a
                validation request. Within the email you will find a link which
                you must click in order to activate your account.
              </p>
              <p>
                <b>
                  If the email doesn't appear shortly, please be sure to check
                  your spam / junk mail folder. Some anti-spam filters modify
                  the email, so first copy any spam message to your inbox before
                  clicking the link.
                </b>
              </p>
            </div>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>

    <v-container id="user-hero" class="secondary white--text py-5 px-12">
      <v-row>
        <v-col col="12" sm="4">
          <p class="display-1">
            <span v-if="!userDetailsReady"></span>
            {{ storedUserDetails.firstName }}
            <br />
            {{ storedUserDetails.lastName }}
          </p>
          <p class="grey--text subtitle1">
            {{ storedUserDetails.lastSubscription.name }}
          </p>
        </v-col>
        <v-col col="12" sm="6" class="d-flex user-hero-wrapper">
          <ul>
            <li
              v-for="legalbox in legalboxes.slice(0, 4)"
              :key="legalbox.index"
            >
              <router-link :to="legalbox.route">
                {{ legalbox.name }}
              </router-link>
            </li>
          </ul>
          <v-spacer></v-spacer>
          <ul>
            <li
              v-for="legalbox in legalboxes.slice(4, 8)"
              :key="legalbox.index"
            >
              <router-link :to="legalbox.route">
                {{ legalbox.name }}
              </router-link>
            </li>
          </ul>
        </v-col>
        <v-col col="2" class="d-flex justify-end align-start">
          <!-- <span>3</span> -->
          <!-- <v-icon dark small class="mt-1">star_border</v-icon> -->
          <v-menu offset-y>
            <template v-slot:activator="{ on: menu, attrs }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    id="addDoc"
                    color="accent"
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                  >
                    <img src="@/assets/quickMenu.png" width="40" />
                  </v-btn>
                </template>
                <span>Quick Menu</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item v-for="(menu, index) in quickMenu" :key="index">
                <router-link :to="menu.link">
                  <v-list-item-title>{{ menu.name }}</v-list-item-title>
                </router-link>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <div class="scrollUpDown">
      <v-icon class="scrollUpDownButton" id="scrollUp"
        >keyboard_arrow_up</v-icon
      >
      <v-icon class="scrollUpDownButton" id="scrollDown"
        >keyboard_arrow_down</v-icon
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import { documentCreation } from "../assets/js/script";

export default {
  data() {
    return {
      resetLoader: false,
      resetSuccessful: false,
      //data components below
      user: this.$store.state.storedUserDetails,
      quickMenu: [
        { name: "Create Receipt", link: "/dashboard" },
        { name: "Create Invoice", link: "/dashboard" },
        { name: "Tax Calculator", link: "/dashboard" },
        { name: "Regulatory Updates", link: "/dashboard" }
      ],
      searchDocument: "",
      pageLoader: true,
      fallbackError: false,
      typing: false,
      noResultFound: false,
      docss: []
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("destroyToken").then(() => {
        console.log("code gets to this stage");
        this.$router.push("/login");
      });
    },
    verifyEmail() {
      this.resetLoader = true;

      axios
        .get("/api/v1/activate/user/" + this.userEmail)
        .then(response => {
          this.resetSuccessful = true;

          console.log(response);
          console.log(response.data);
          console.log(response.status);

          this.resetLoader = false;
        })
        .catch(error => {
          this.resetNotSuccesful = true;

          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.status);
          this.resetLoader = false;
        });
    }
  },
  computed: {
    legalboxes() {
      return this.$store.state.legalboxes;
    },
    ...mapState([
      "storedUserDetails",
      "userDetailsReady",
      "getUserDetailsStatusCode",
      "userDocuments",
      "storedUserProfilePicture"
    ]),
    // documents() {
    //   return this.$store.state.userDocuments;
    // },
    filteredDocumentResult() {
      return this.docss.filter(item => {
        // return item.title
        //   .toLowerCase()
        //   .match(this.searchDocument.toLowerCase());
        if (
          item.title
            .toLowerCase()
            .indexOf(this.searchDocument.toLowerCase()) !== -1
        ) {
          return item;
        }
      });
    },
    userEmail() {
      let email = this.storedUserDetails.email;
      return email;
    }
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {
      // setTimeout(() => {
      //   this.userDetailsReady = false;
      // }, 500);
    });
    axios
      .get("/api/v1/doc/userdocs", {
        headers: { Authorization: this.$store.state.token }
      })
      .then(response => {
        console.log(response.data);
        this.docss = response.data.documents;
        console.log(response.data.documents);
        console.log(response.status);
        console.log(response.headers);
      })
      .catch(error => {
        // console.log(error);
        // console.log(error.response);
        // console.log(error.response.data);
        // console.log(error.response.status);

        return error;
      });
  },
  watch: {
    // Check for Change state of USER DETAILS fetch
    userDetailsReady(val) {
      if (val === true) {
        // Close loader if user USER DETAILS has sucessfully fetched
        this.pageLoader = false;
      } else if (val === false) {
        console.log("Watch Fallback");

        // Activate fallback view if fetch states ever "CHANGES" USER DETAILS ever fails
        // If state was FALSE before (connection returns), code will not run
        this.fallbackError = true;
        // setTimeout(() => {
        //   this.fallbackError = true;
        // }, 500);
        console.log("SHOW LOADER");
        this.pageLoader = true;
      }
    },
    searchDocument(newVal) {
      if (newVal.length > 0) {
        this.typing = true;
        console.log(newVal);
        console.log(this.filteredDocumentResult);
      } else {
        this.typing = false;
      }
    },
    filteredDocumentResult(newVal) {
      if (newVal.length <= 0) {
        this.noResultFound = true;
        // console.log("EMPTY FILTER", this.filteredDocumentResult);
      }
    }
  },
  mounted() {
    documentCreation();
    this.pageLoader = this.userDetailsReady;
    if (this.userDetailsReady == "pending") {
      this.pageLoader = true;
    } else if (this.userDetailsReady == false) {
      console.log("Mounted Fallback");

      this.fallbackError = true;
    }
  }
};
</script>

<style scoped>
#user-menu a {
  color: inherit;
}
.loader {
  content: "";
  z-index: 9;
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  background: url(../assets/loader.gif);
  background-position: center;
  background-size: 30%;
  background-repeat: no-repeat;
  background-color: #fff;
}
/* For when USER DETAILS load ever fails */
.fallbackError {
  content: "";
  z-index: 9999999999 !important;
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  background: url(../assets/fallbackError.png);
  background-position: center;
  background-size: 30%;
  background-repeat: no-repeat;
  background-color: #fff;
}

.backPageSearch::placeholder {
  color: yellow !important;
}
.backPageSearch::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: yellow !important;
}
.backPageSearch::-moz-placeholder {
  /* Firefox 19+ */
  color: yellow;
}
.backPageSearch:-ms-input-placeholder {
  /* IE 10+ */
  color: yellow;
}
.backPageSearch:-moz-placeholder {
  /* Firefox 18- */
  color: yellow;
}
.backPageSearchResult {
  position: absolute;
  top: 68px;
  max-width: 97%;
  width: 97%;
  background: #f2f2f2;
  /* padding: 9px; */
  padding-top: 30px;
  z-index: -2;
  border-radius: 0 0px 20px 20px;
}
.type-loader {
  background-size: 30%;
  background-image: url(../assets/type-loader.gif);
  height: 60px;
  width: 100%;
  background-position: center;
}
.backPageSearchResultPARENT {
  overflow: auto;
  height: 100px;
  padding-left: 0;
  padding-right: 9px;
  padding-bottom: 9px;
}
.searchList {
  padding: 7px 0;
  padding-left: 21px;
  list-style: none;
}
.searchList:hover {
  cursor: pointer;
  background-color: white;
}
.searchStatus {
  color: #19647e;
  padding: 4px;
  border-radius: 6px;
  float: right;
}

/* Grid style */
.display-posts-listing.grid {
  display: none;
  grid-gap: 16px;
}

.display-posts-listing.grid .title {
  display: block;
}

.display-posts-listing.grid img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 40px;
}

@media (min-width: 600px) {
  .display-posts-listing.grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .display-posts-listing.grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ===================== */

.rt-tpg-container .rt-equal-height:nth-of-type(2) {
  margin-top: 33px !important;
}

/* LEFT START*/
.blog-landing .rt-equal-height:nth-of-type(odd) h4.entry-title {
  text-align: right;
}

.blog-landing .read-more a:after {
  margin-left: 9px;
}

.rt-tpg-container .rt-equal-height:nth-of-type(3) {
  margin-top: -38px !important;
}

.blog-landing .rt-equal-height:nth-of-type(odd) .post-content {
  text-align: right !important;
}
/* LEFT END */

/* RIGHT START */
.rt-detail .read-more a {
  padding-left: 0;
}
/* RIGHT END */

.blog-landing h4.entry-title {
  font-size: 16px !important;
}

.blog-landing .read-more a {
  background: none !important;
}

.blog-landing .read-more a {
  text-transform: uppercase;
  font-weight: 600;
}

.blog-landing .read-more a:after {
  content: "";
  display: block;
  background: url(https://blog.legalbox.ng/wp-content/uploads/arrow_right.png);
  background-size: contain;
  background-repeat: no-repeat;
  width: 30px;
  bottom: -5px;
  height: 30px;
  float: right;
  margin-top: 5px;
}

.rt-tpg-container .rt-equal-height:nth-of-type(odd) .rt-col-sm-6.rt-col-xs-12 {
  float: right;
}

.rt-tpg-container .rt-equal-height:nth-of-type(even) .read-more a {
  float: left;
}

.rt-tpg-container .rt-equal-height .rt-img-holder {
  border-radius: 10px;
}

/* CHANGE ICON OF SEARCH BUTTON */
.ds-icon-search:before {
  content: "\24";
  color: #fff;
  border-radius: 10px;
  position: absolute;
  font-family: "ETModules";
  z-index: 1;
  right: 0;
  font-size: 40px;
  padding: 16px 20px;
  background-color: #1ca092;
}

#top-menu {
  padding-bottom: 33px !important;
}

.login-nav {
  line-height: 0em !important;
}
.login-nav a {
  color: #fff !important;
  background-color: #29c4a9;
  padding: 25px 20px !important;
  border-radius: 10px;
  box-shadow: 0px 3px 10px 0px rgba(28, 160, 146, 0.5);
}

/* CUSTOM NAVIGATION */
#post-nav {
  clear: both;
  height: 100px;
  margin: 0 0 70px;
}
#post-nav .nav-box {
  background: #e9e9e9;
  padding: 10px;
}
#post-nav img {
  float: left;
  margin: 0 10px 0 0;
}
#post-nav p {
  margin: 0 10px;
  font-size: 11px;
  vertical-align: middle;
}
#post-nav .previous {
  float: left;
  vertical-align: middle;
  width: 300px;
  height: 120px;
}
#post-nav .next {
  float: right;
  width: 300px;
  height: 120px;
}
</style>
