<template>
  <div>
    <div v-if="userDetailsReady" class="loader"></div>
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
          {{ searchDocument }}
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
              <!-- <li
                class="searchList"
                v-for="(doc, index) in sample"
                :key="index"
              >
                <b>{{ doc.title }}</b> : {{ doc.category }}
                <span class="searchStatus" style="float: right;">{{
                  doc.status
                }}</span>
              </li> -->
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
            <img src="../assets/user.png" />
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
                    <v-list-item-title class="user-menu-item py-2 text-right">
                      Inbox
                    </v-list-item-title>
                  </router-link>
                  <router-link to="/legalboxes">
                    <v-list-item-title class="user-menu-item py-2 text-right">
                      Legalboxes
                    </v-list-item-title>
                  </router-link>
                  <router-link to="/settings">
                    <v-list-item-title class="user-menu-item py-2 text-right">
                      Settings
                    </v-list-item-title>
                  </router-link>
                  <v-list-item-title
                    style="cursor: pointer;"
                    class="user-menu-item py-2 text-right"
                    @click="signOut"
                    >Logout
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-toolbar>
    </nav>

    <v-container id="user-hero" class="secondary white--text py-5 px-12">
      <v-row>
        <v-col col="12" sm="4">
          <p class="display-1">
            {{ storedUserDetails.firstName }}
            <br />{{ storedUserDetails.lastName }}
          </p>
          <p>User Subscription Status</p>
        </v-col>
        <v-col col="12" sm="6" class="d-flex user-hero-wrapper">
          <ul>
            <li
              v-for="legalbox in legalboxes.slice(0, 4)"
              :key="legalbox.index"
            >
              <router-link :to="legalbox.route">{{
                legalbox.name
              }}</router-link>
            </li>
          </ul>
          <v-spacer></v-spacer>
          <ul>
            <li
              v-for="legalbox in legalboxes.slice(4, 8)"
              :key="legalbox.index"
            >
              <router-link :to="legalbox.route">{{
                legalbox.name
              }}</router-link>
            </li>
          </ul>
        </v-col>
        <v-col col="2" class="d-flex justify-end align-start">
          <!-- <span>3</span> -->
          <!-- <v-icon dark small class="mt-1">star_border</v-icon> -->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn id="addDoc" color="accent" dark v-on="on">
                <v-icon dark x-large>post_add</v-icon>
              </v-btn>
            </template>
            <span>Add New Document</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      //data components below
      user: this.$store.state.storedUserDetails,
      userDetailsReady: true,
      searchDocument: "",
      typing: false,
      noResultFound: false,
      docss: [],
      sample2: [],
      sample: [
        { name: "John", age: 30, car: null },
        { name: "Kunle", age: 40, car: null },
        { name: "Busa", age: 70, car: null },
        { name: "Mary", age: 80, car: null },
        { name: "Wolapo", age: 10, car: null }
      ]
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("destroyToken").then(() => {
        console.log("code gets to this stage");
        this.$router.push("/login");
      });
    }
  },
  computed: {
    legalboxes() {
      return this.$store.state.legalboxes;
    },
    ...mapState(
      ["storedUserDetails", "getUserDetailsStatusCode", "userDocuments"],
    ),
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
    }
  },
  created() {
    this.$store.dispatch("getUserDetails").then(() => {
      setTimeout(() => {
        this.userDetailsReady = false;
      }, 0);
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
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
      });
  },
  watch: {
    // userDetailsReady(val) {
    //   if (val === true) {
    //     setTimeout(() => {
    //       this.userDetailsReady = false;
    //     }, 0);
    //   }
    // },
    userDetailsReady(val) {
      if (val === true) {
        this.userDetailsReady = false;
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
  mounted() {}
};
</script>

<style scoped>
#user-menu a {
  color: inherit;
}
.loader {
  content: "";
  z-index: 9999999999999;
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
</style>
