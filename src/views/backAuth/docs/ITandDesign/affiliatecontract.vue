<template>
  <div class="dashboard noncompete page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container class>
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img src="@/assets/it-and-design-icon.png" class="legalbox-icons" width="40" />
            <h2 class="display-1 ml-4">IT & Design</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper">
            <h2 class="headline" style="margin-left: 60px;">{{ category }}</h2>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="docParent pb-12">
        <v-container>
          <v-row style="width: 50%; margin: 0 auto;">
            <v-col sm="12">
              <div class="formSectionTitle">EXECUTED</div>
              <div class="text-center">This contract was made and executed on</div>
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :label="formOutput.date"
                    :value="formOutput.date"
                    hint="YYYY/MM/DD"
                    persistent-hint
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="formOutput.date" no-title @input="menu1 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <div class="formSectionTitle">BACKGROUND</div>
              <div class="formSectionSubtitle">
                <p
                  v-for="(item, index) in fetchOwnBackgroundDetails"
                  :key="index"
                >{{ item.background }}</p>
              </div>
            </v-col>
          </v-row>
          <v-row style="width: 80%; margin: 0 auto;">
            <v-col cols="12">
              <div class="formSectionTitle">PARTIES</div>
            </v-col>
            <v-col cols="6">
              <v-textarea min-height="110" outlined placeholder="Principal" background-color="white"></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-textarea min-height="110" outlined placeholder="Affiliate" background-color="white"></v-textarea>
            </v-col>
          </v-row>
          <v-row style="width: 80%; margin: 0 auto;">
            <v-col cols="6">
              <div class="formSectionTitle">Duration</div>
              <div class="d-flex align-center justify-center" style="width: 50%; margin: 0 auto;">
                <v-select
                  style="width: 5%; margin: 0 auto; border-radius: 10px"
                  class="white pt-2 pl-4 mr-4"
                  v-model="formOutput.durationNumber"
                  :value="formOutput.durationNumber"
                  :items="number"
                  item-text="name"
                  autocomplete
                  offset-y
                ></v-select>
                <v-select
                  style="width: 10%; margin: 0 auto; border-radius: 10px;"
                  class="white pl-2"
                  :value="contractDuration[1]"
                  :items="contractDuration"
                  item-text="name"
                  autocomplete
                  offset-y
                ></v-select>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="formSectionTitle">Profit Sharing</div>
              <v-textarea min-height="110" outlined background-color="white"></v-textarea>
            </v-col>
          </v-row>
          <v-row style="width: 80%; margin: 0 auto;">
            <v-col cols="12">
              <div class="formSectionTitle">Service</div>
              <v-textarea min-height="110" outlined background-color="white"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <!-- <v-container fluid paraClauseHolder>
          <v-row>
            <v-col cols="12">
              <div class="formSectionTitle">Skills</div>
              <div
                class="docParagraph d-flex align-center"
                v-for="(paragraph, index) in paragraphList"
                :key="index"
              >
                <v-checkbox class="text-center paraCheck" color="accent" :value="paragraph"></v-checkbox>
                <div class="paragraphList">
                  <p>{{ paragraph }}</p>
                  <span class="addCTA">
                    <v-icon size="30">info</v-icon>
                    <span class="mx-2"></span>
                    <v-icon size="30">comment</v-icon>
                    <span class="mx-2"></span>
                    <v-icon
                      v-if="index > origParagraphLength - 1"
                      @click="removeParagraph(index)"
                      size="30"
                      color="red"
                    >remove_circle</v-icon>
                  </span>
                </div>
              </div>
              <p class="addRemoveButtons">
                <span @click="addNewParagraph()">+</span>
              </p>
            </v-col>
          </v-row>
        </v-container> -->

        <append-signature></append-signature>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex justify-center">
            <v-btn large class="accent submit-document">Save Document</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- Dashboard footer -->
      <v-container>
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
// import VRuntimeTemplate from "v-runtime-template";
import Append_Signature from "@/components/append-signature";

export default {
  data() {
    return {
      category: "Affiliate Contract",
      tagName: "affiliatecontract",
      origParagraphLength: this.$store.state.ITandDesign
        .affiliateContractParagraphs.length,
      paragraphList: [],
      clauseList: [],
      formOutput: {
        date: "",
        durationNumber: 1
      },
      contractDuration: ["day(s)", "week(s)", "year(s)"],
      number: this.defineNumber()
    };
  },
  mounted() {
    this.paragraphList = this.$store.state.ITandDesign.affiliateContractParagraphs;
  },
  methods: {
    defineNumber: function() {
      var number = [...Array(31).keys()];
      number.shift();
      return number;
    },
    addNewParagraph() {
      let addOwnParagraph = prompt("Add your own paragraph");
      if (addOwnParagraph.length > 0) {
        this.paragraphList.push(addOwnParagraph);
        console.log(this.paragraphList);
      }
    },
    removeParagraph(index) {
      this.paragraphList.splice(index, 1);
      console.log(this.paragraphList.index);
    }
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer,
    // "v-runtime-template": VRuntimeTemplate
    "append-signature": Append_Signature
  },
  computed: {
    fetchOwnBackgroundDetails() {
      let eachDoc = this.$store.state.ITandDesignHeaders;
      let eachDocFiltered = eachDoc.filter(item => item.name == this.tagName);
      return eachDocFiltered;
    }
  }
};
</script>
