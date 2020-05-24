<template>
  <div class="dashboard nondisclosure page back-page">
    <back-nav></back-nav>
    <div class="bodyWrapper">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" class="legalbox-wrapper d-flex align-center">
            <img
              src="@/assets/general-icon.png"
              class="legalbox-icons"
              width="40"
            />
            <h2>{{ parent }}</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            style="padding-left: 60px;"
            class="legalbox-wrapper"
          >
            <h2 class="headline">{{ category }}</h2>
            <v-text-field
              label="Document Title"
              :rules="[rules.required]"
              autofocus
              v-model="formOutput.title"
              class="mt-4"
              outlined
              hint="Add or Change the title of this document"
              prepend-icon="insert_drive_file"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container fluid class="docParent pb-12">
        <v-container>
          <v-row style="width: 50%; margin: 0 auto;">
            <v-col sm="12">
              <div class="formSectionTitle">EXECUTED</div>
              <div class="text-center">
                This contract was made and executed on
              </div>
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :label="formOutput.executedDate"
                    :value="formOutput.executedDate"
                    autocomplete="off"
                    hint="YYYY/MM/DD"
                    persistent-hint
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formOutput.executedDate"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
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
                >
                  {{ item.background }}
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row style="width: 80%; margin: 0 auto;">
            <v-col cols="12">
              <div class="formSectionTitle">PARTIES</div>
            </v-col>
            <v-col cols="6">
              <v-textarea
                min-height="110"
                outlined
                placeholder="First Party"
                background-color="white"
                v-model="formOutput.parties.firstParty"
              ></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-textarea
                min-height="110"
                outlined
                placeholder="Second Party"
                background-color="white"
                v-model="formOutput.parties.secondParty"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row style="width: 80%; margin: 0 auto;">
            <v-col cols="6">
              <div class="formSectionTitle">Duration</div>
              <div
                class="d-flex align-center justify-center"
                style="width: 50%; margin: 0 auto;"
              >
                <v-select
                  style="width: 5%; margin: 0 auto; border-radius: 10px"
                  class="white pt-2 pl-4 mr-4"
                  v-model="formOutput.duration.durationNumber"
                  :value="formOutput.duration.durationNumber"
                  :items="number"
                  item-text="name"
                  autocomplete
                  offset-y
                ></v-select>
                <v-select
                  style="width: 10%; margin: 0 auto; border-radius: 10px;"
                  class="white pl-2"
                  v-model="formOutput.duration.contractDuration"
                  :value="contractDuration[1]"
                  :items="contractDuration"
                  item-text="name"
                  autocomplete
                  offset-y
                ></v-select>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="formSectionTitle">Purpose</div>
              <v-textarea
                min-height="110"
                outlined
                background-color="white"
                v-model="formOutput.purpose"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row style="width: 40%; margin: 0 auto;">
            <v-col cols="12" sm="12">
              <div class="formSectionTitle">
                Payment Details
                <span class="text-capitalize">(Optional)</span>
              </div>
              <div class="formSectionSubtitle transparent">
                <p class="text-center">Payment Due</p>
              </div>
              <v-text-field
                solo
                flat
                v-model="formOutput.payment.due"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- DUPLICATABLE Dues Figures -->
          <pre class="testFloat">
            {{ formOutput.payment }}
          </pre>
          <v-row
            style="width: 80%; margin: 0 auto;"
            v-for="(due, index) in formOutput.payment.duplicatedDues"
            :key="index"
          >
            <v-col cols="12" sm="4">
              <div class="formSectionSubtitle transparent">
                <p class="text-left">Next Payment Due</p>
              </div>
              <div style="width: 80%;">
                <v-text-field
                  solo
                  flat
                  ref="nextDue"
                  v-model="due.nextDue"
                ></v-text-field>
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <div class="formSectionSubtitle transparent">
                <p class="text-left">Next Payment Due by:</p>
              </div>
              <v-menu
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :label="due.nextDueBy"
                    :value="due.nextDueBy"
                    autocomplete="off"
                    hint="YYYY/MM/DD"
                    persistent-hint
                    prepend-icon="event"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="nextDueBy"
                  v-model="due.nextDueBy"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="d-flex align-center justify-end">
              <span class="addRemoveButtons" @click="addDues" v-if="index < 1">
                +
              </span>
              <span class="mx-2"></span>
              <span class="addRemoveButtons" @click="removeDues(index)">
                -
              </span>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid paraClauseHolder>
          <v-row>
            <v-col cols="12">
              <div class="formSectionTitle">CONFIDENTIAL INFORMATION</div>
              <div class="docParagraph paragraphList">
                <p
                  v-for="(item, index) in fetchOwnBackgroundDetails"
                  :key="index"
                >
                  {{ item.headline }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid paraClauseHolder>
          <v-row>
            <v-col cols="12">
              <div class="formSectionTitle">Non-Disclosure</div>
              {{ selectedParagraphs }}
              <br />
              <br />
              {{ fetchOwnBackgroundDetails }}
              <div
                class="docParagraph d-flex align-center"
                v-for="(item, index) in paragraphList"
                :key="index"
              >
                <v-checkbox
                  class="text-center paraCheck"
                  color="accent"
                  :value="item"
                  v-model="selectedParagraphs"
                  hide-details
                ></v-checkbox>
                <div class="paragraphList">
                  <p>{{ item.paragraph }}</p>
                  <span class="addCTA">
                    <v-icon size="30">error_outline</v-icon>
                    <span class="mx-2"></span>
                    <v-icon size="30">comment</v-icon>
                    <span class="mx-2"></span>
                    <!-- <v-icon
                      v-if="index > origParagraphLength - 1"
                      @click="removeParagraph(index)"
                      size="30"
                      color="red"
                    >
                      remove_circle
                    </v-icon> -->
                  </span>
                </div>
              </div>
              <p class="text-center">
                <span class="addRemoveButtons" @click="addNewParagraph()">
                  +
                </span>
              </p>
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid paraClauseHolder>
          <v-row>
            <v-col cols="12" sm="12">
              <div class="formSectionTitle">CLAUSES</div>
              <div
                class="docParagraph d-flex align-center"
                v-for="(clause, index) in clauseList"
                :key="index"
              >
                <p>
                  <v-checkbox
                    class="clauseParagraphListing paraCheck"
                    color="accent"
                    v-model="selectedClauses"
                    :value="clause"
                    hide-details
                  ></v-checkbox>
                </p>
                <div class="paragraphList">
                  <p>{{ clause.title }}</p>
                  <p>{{ clause.details }}</p>
                  <span class="addCTA">
                    <v-icon size="30">error_outline</v-icon>
                    <span class="mx-2"></span>
                    <v-icon size="30">comment</v-icon>
                    <span class="mx-2"></span>
                    <!-- <v-icon
                      v-if="index > origClauseLength - 1"
                      @click="removeClause(index)"
                      size="30"
                      color="red"
                    >remove_circle</v-icon> -->
                  </span>
                </div>
              </div>
              <p class="text-center">
                <span class="addRemoveButtons" @click="addNewClause()">+</span>
              </p>
            </v-col>
          </v-row>
        </v-container>
        <v-snackbar
          :color="docSavedSnackbar.color"
          top
          right
          v-model="docSavedSnackbar.active"
          :multi-line="docSavedSnackbar.multiLine"
          :timeout="docSavedSnackbar.timeout"
        >
          {{ docSavedSnackbar.text }}
          <v-btn
            color="secondary"
            text
            @click="docSavedSnackbar.active = false"
          >
            <b>x</b>
          </v-btn>
        </v-snackbar>
        <append-signature></append-signature>
        <v-row>
          <v-col cols="12" sm="12" class="d-flex justify-center">
            <v-btn
              large
              class="accent submit-document"
              @click="submitDocument('continueEdit')"
            >
              Save and Continue
            </v-btn>
            <v-btn
              large
              class="accent submit-document"
              style="top: 50%;"
              @click="submitDocument('redirectMe')"
            >
              Save and Send
            </v-btn>
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

import { mapState } from "vuex";

export default {
  data() {
    return {
      category: "Non Disclosure Contract",
      parent: "General",
      status: null,
      andContinueValidator: null, // if andContinue is = to this
      rules: {
        required: value => !!value || "Required."
      },
      tagName: "nondisclosure",
      selectedParagraphs: [],
      selectedClauses: [],
      origParagraphLength: this.$store.state.general.nonDisclosureParagraphs
        .length,
      origClauseLength: this.$store.state.general.nonCompeteClauseList.length,
      paragraphList: [],
      clauseList: [],
      formOutput: {
        title: "",
        isSigned: false,
        executedDate: "",
        background: "",
        parties: {
          firstParty: "",
          secondParty: ""
        },
        duration: {
          durationNumber: "",
          contractDuration: ""
        },
        purpose: "",
        payment: {
          due: "",
          duplicatedDues: [
            {
              nextDue: "",
              nextDueBy: ""
            }
          ]
        },
        confidentialInformation: ""
      },
      contractDuration: ["day(s)", "week(s)", "year(s)"],
      number: this.defineNumber(),
      docSavedSnackbar: {
        active: false,
        text: "Something went wrong [-Last Fallback-]",
        multiLine: true,
        color: null,
        timeout: this.$store.state.snackBarDuration
      }
    };
  },

  methods: {
    submitDocument(andContinue) {
      if (this.formOutput.title.length < 1) {
        return alert("Title Can not be Empty");
      }
      // Define Form
      const docData = {};
      let newFormData = JSON.parse(JSON.stringify(this.formOutput));

      // Append compilation to form
      newFormData.background = this.fetchOwnBackgroundDetails[0].background;
      newFormData.confidentialInformation = this.fetchOwnBackgroundDetails[0].headline;
      newFormData.paragraph = this.selectedParagraphs;
      newFormData.clause = this.selectedClauses;

      console.log("Before Submission", newFormData);
      // Append Document Content
      docData.docContent = newFormData;

      // Append other document metadatas
      // docData.docSummary = this.formOutput.title + " : " + this.category;
      docData.status = "draft";
      docData.title = this.formOutput.title;
      docData.legalboxParent = this.parent;
      docData.category = this.category;
      console.log(docData);
      // this.andContinueValidator = andContinue;

      this.$store.dispatch("submitDocument", docData).then(() => {
        // this.andContinueValidator = andContinue;
        console.log(this.$store.state.redirecttoEditID);
        console.log(andContinue);
      });
      // End of logics, submission done
    },
    defineNumber: function() {
      var number = [...Array(31).keys()];
      number.shift();
      return number;
    },
    addDues() {
      this.formOutput.payment.duplicatedDues.push({
        nextDue: "",
        nextDueBy: ""
      });
      console.log("Dup Dues", this.formOutput.payment.duplicatedDues.length);
      console.log("Dup Dues", this.formOutput.payment.duplicatedDues);
    },
    removeDues(index) {
      this.formOutput.payment.duplicatedDues.splice(index, 1);

      console.log("Dup Dues", this.formOutput.payment.duplicatedDues.length);
      console.log("Dup Dues", this.formOutput.payment.duplicatedDues);
    },
    addNewParagraph() {
      let addOwnParagraph = prompt("Add your own paragraph");
      console.log(addOwnParagraph);
      if (addOwnParagraph.length > 0) {
        this.paragraphList.push({
          paragraph: addOwnParagraph,
          info: "",
          comment: ""
        });
        console.log(this.paragraphList);
      }
    },
    // removeParagraph(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.paragraphList.splice(index, 1);
    //   console.log(this.paragraphList);
    // },
    addNewClause() {
      let addOwnClauseTitle = prompt("Add your Clause Title");
      let addOwnClauseDetails = prompt("Add your Clause Details");
      if (addOwnClauseTitle) {
        this.clauseList.push({
          category: addOwnClauseTitle,
          details: addOwnClauseDetails
        });
        console.log(this.clauseList);
      }
    }
    // removeClause(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.clauseList.splice(index, 1);
    //   console.log("i am" + this.clauseList.index);
    // }
  },
  watch: {
    redirecttoEditID(val) {
      if (typeof val == "number") {
        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text = "Document Successfully Saved.";
        this.docSavedSnackbar.color = "success";

        console.log("Re-Route");
        if (this.andContinueValidator === "redirectMe") {
          setTimeout(() => {
            this.$router.push("/docs/more/" + val);
            // console.log("To MORE Page");
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          setTimeout(() => {
            this.$router.push("/docs/edit/" + val);
            // console.log("To EDIT Page");
          }, this.$store.state.snackBarDuration);
        }
        // this.andContinueValidator = val;

        // this.$router.push("/docs/edit/" + val);
      } else {
        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text =
          "Oops! Something went wrong. Document might not be saved";
        this.docSavedSnackbar.color = "error";
      }
    }
  },
  mounted() {
    this.paragraphList = this.$store.state.general.nonDisclosureParagraphs;
    this.clauseList = this.$store.state.general.nonDisclosureClauseList;
    console.log("current Paragraph List: " + this.paragraphList.length);
    console.log("LENGTH", this.formOutput.payment.duplicatedDues.length);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer,
    // "v-runtime-template": VRuntimeTemplate
    "append-signature": Append_Signature
  },
  computed: {
    ...mapState([
      "redirecttoEditID",
      "documentSavedMessage",
      "isDocumentSaved"
    ]),
    fetchOwnBackgroundDetails() {
      let eachDoc = this.$store.state.generalHeaders;
      let eachDocFiltered = eachDoc.filter(item => item.name == this.tagName);
      return eachDocFiltered;
    },
    paragraphList2() {
      let allParagraphs = this.$store.state.general.nonDisclosureParagraphs;
      return allParagraphs;
    },
    paragraphListcompiled() {
      return this.paragraphList;
    }
  }
};
</script>
