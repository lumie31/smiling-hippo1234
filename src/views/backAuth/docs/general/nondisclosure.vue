<template>
  <div
    class="dashboard createDocument createEditDocument nondisclosure page back-page"
  >
    <back-nav></back-nav>

    <!-- <pre class="testFloat">{{ signatories }}</pre> -->

    <v-form ref="documentPass" @submit.prevent>
      <div class="bodyWrapper">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              class="legalbox-wrapper d-flex align-center"
            >
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
                <div class="d-flex">
                  <v-select
                    label="Currency"
                    :disabled="formOutput.payment.due.length < 1"
                    class="createDocCurrency"
                    v-model="formOutput.payment.currency"
                    :rules="
                      formOutput.payment.due.length > 1
                        ? [rules.required]
                        : [rules.string]
                    "
                    :items="['₦', '$']"
                    autocomplete
                    offset-y
                  ></v-select>
                  <v-text-field
                    solo
                    flat
                    :rules="[rules.number]"
                    v-model="formOutput.payment.due"
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>

            <!-- DUPLICATABLE Dues Figures -->
            <!-- <pre class="testFloat">
            {{ formOutput.payment }}
            </pre>-->

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
                <span class="addRemoveButtons" @click="addDues" v-if="index < 1"
                  >+</span
                >
                <span class="mx-2"></span>
                <span class="addRemoveButtons" @click="removeDues(index)"
                  >-</span
                >
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
          <!-- <div v-for="(item, index) in allInfos" :key="index">
            <h2>Info:</h2>
            <pre class="testFloat">{{ item }}</pre>
          </div>-->
          <!-- <pre class="testFloat">{{ testData }}</pre> -->

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
                      <v-tooltip
                        max-width="30%"
                        left
                        class="tooler"
                        color="blue"
                      >
                        <!-- Paragraph -->
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              index < origParagraphLength
                                ? null
                                : activateInfoCommentDialog(index, 'info');
                              isParagraphInfo = true;
                            "
                          >
                            <v-icon size="30">info</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ item.info }}</span>
                      </v-tooltip>
                      <span class="mx-2"></span>
                      <v-tooltip
                        max-width="30%"
                        left
                        class="tooler"
                        color="blue"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              activateInfoCommentDialog(index, 'comment');
                              isParagraphComment = true;
                            "
                          >
                            <v-icon size="30">comment</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ item.comment }}</span>
                      </v-tooltip>
                      <!-- <v-icon
                      v-if="index > origParagraphLength - 1"
                      @click="removeParagraph(index)"
                      size="30"
                      color="red"
                    >
                      remove_circle
                      </v-icon>-->
                    </span>
                  </div>
                </div>
                <p class="text-center">
                  <span
                    class="addRemoveButtons"
                    @click="addOwnParagraphDialog = true"
                    >+</span
                  >
                </p>
              </v-col>

              <v-dialog persistent v-model="addCommentINIT" width="700">
                <v-card>
                  <v-card-title class="headline secondary white--text"
                    >Add/Change Comment</v-card-title
                  >

                  <v-card-text>
                    <v-textarea
                      v-model="addOwnClauseParagraphCommentInfo"
                      class="mt-8"
                      auto-grow
                      label="Comment"
                      min-height="110"
                      outlined
                      ref
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      text
                      class="accent"
                      @click="addClauseParagraphComment()"
                      >Add</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog persistent v-model="addInfoINIT" width="700">
                <v-card>
                  <v-card-title class="headline secondary white--text"
                    >Add/Change Information</v-card-title
                  >

                  <v-card-text>
                    <v-textarea
                      v-model="addOwnClauseParagraphCommentInfo"
                      class="mt-8"
                      auto-grow
                      label="Information"
                      min-height="110"
                      outlined
                      ref
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      text
                      class="accent"
                      @click="addClauseParagraphInfo()"
                      >Add</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>

            <!-- PARAPGRAPH DIALOG -->
            <template>
              <div class="text-center">
                <v-dialog
                  persistent
                  v-model="addOwnParagraphDialog"
                  width="700"
                >
                  <v-card>
                    <v-card-title class="headline secondary white--text"
                      >Add Paragraph</v-card-title
                    >

                    <v-card-text>
                      <v-textarea
                        v-model="ownParagraph"
                        class="mt-8"
                        auto-grow
                        label="Paragraph"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                      <v-textarea
                        v-model="ownParagraphInfo"
                        class="mt-8"
                        auto-grow
                        label="Information"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                      <v-textarea
                        v-model="ownParagraphComment"
                        class="mt-8"
                        auto-grow
                        label="Comment"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="white"
                        text
                        class="accent"
                        @click="addNewParagraph()"
                        >Add</v-btn
                      >
                      <v-btn
                        color="white"
                        text
                        class="accent"
                        @click="cancelDialog()"
                        >Cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-container>

          <!-- CLAUSES -->
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
                    <p>{{ clause.detail }}</p>

                    <span class="addCTA">
                      <v-tooltip
                        max-width="30%"
                        left
                        class="tooler"
                        color="blue"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              index < origClauseLength
                                ? null
                                : activateInfoCommentDialog(index, 'info');
                              isClauseInfo = true;
                            "
                          >
                            <v-icon size="30">info</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ clause.info }}</span>
                      </v-tooltip>
                      <span class="mx-2"></span>
                      <v-tooltip
                        max-width="30%"
                        left
                        class="tooler"
                        color="blue"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              activateInfoCommentDialog(index, 'comment');
                              isClauseComment = true;
                            "
                          >
                            <v-icon size="30">comment</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ clause.comment }}</span>
                      </v-tooltip>
                    </span>
                  </div>
                </div>
                <p class="text-center">
                  <span
                    class="addRemoveButtons"
                    @click="addOwnClauseDialog = true"
                    >+</span
                  >
                </p>
              </v-col>
            </v-row>
            <template>
              <div class="text-center">
                <v-dialog persistent v-model="addOwnClauseDialog" width="700">
                  <v-card>
                    <v-card-title class="headline secondary white--text"
                      >Add Clause</v-card-title
                    >

                    <v-card-text>
                      <v-text-field
                        v-model="ownClauseTitle"
                        class="mt-8"
                        auto-grow
                        label="Title"
                        outlined
                        ref
                      ></v-text-field>
                      <v-textarea
                        v-model="ownClauseDetail"
                        class="mt-8"
                        auto-grow
                        label="Detail"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                      <v-textarea
                        v-model="ownClauseInfo"
                        class="mt-8"
                        auto-grow
                        label="Information"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                      <v-textarea
                        v-model="ownClauseComment"
                        class="mt-8"
                        auto-grow
                        label="Comment"
                        min-height="110"
                        outlined
                        ref
                      ></v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="white"
                        text
                        class="accent"
                        @click="addNewClause()"
                        >Add</v-btn
                      >
                      <v-btn
                        color="white"
                        text
                        class="accent"
                        @click="cancelDialog()"
                        >Cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>
          </v-container>
          <v-snackbar
            class="snackbar"
            :color="docSavedSnackbar.color"
            top
            right
            v-model="docSavedSnackbar.active"
            :multi-line="docSavedSnackbar.multiLine"
            :timeout="docSavedSnackbar.timeout"
            >{{ docSavedSnackbar.text }}</v-snackbar
          >
          <v-container class="contractsignatory">
            <append-signature
              @signatoriesDATA="retrieveSignatoriesData"
            ></append-signature>
          </v-container>

          <v-row>
            <v-col cols="12" sm="12" class="mb-12 py-12 d-flex justify-center">
              <!-- <v-btn large class="accent submit-document" @click="processLoop">
                Process
              </v-btn>-->
              <v-btn
                large
                class="accent submit-document saveOnly"
                :loading="loadingContinue"
                @click="submitDocument('continueEdit')"
                :disabled="disableContinue"
              >
                <span class="d-flex flex-column align-center">
                  <img src="@/assets/save.png" width="20" />
                  Save
                </span>
              </v-btn>
              <v-btn
                x-large
                class="accent submit-document sendOnly"
                id="saveAndSend"
                style="top: 50%;"
                :loading="loadingSend"
                :disabled="disableSend"
                @click="submitDocument('redirectMe')"
                >Send Document</v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <!-- Dashboard footer -->
        <v-container>
          <products-footer></products-footer>
        </v-container>
      </div>
    </v-form>

    <!-- Throw error if form is not validated -->
    <v-snackbar
      class="snackbar"
      :color="invalidSubmission.color"
      top
      right
      v-model="invalidSubmission.active"
      :multi-line="invalidSubmission.multiLine"
      :timeout="invalidSubmission.timeout"
      >{{ invalidSubmission.text }}</v-snackbar
    >

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";
import Products_Footer from "@/components/products-general-footer";
import Append_Signature from "@/components/append-signature";
import $ from "jquery";

// import VRuntimeTemplate from "v-runtime-template";
// import axios from "axios";

import { mapState } from "vuex";

export default {
  data() {
    return {
      signatories: "RR",
      holderTemp1:
        "https://res.cloudinary.com/djw3g8meb/image/upload/v1593167822/fga2wjubbghorprszstp.gif",
      cloudName: process.env.VUE_APP_cloudinary_cloudName,
      cloudSigPath: process.env.VUE_APP_cloudinary_sigPath,
      testData: "",
      previewSignature: null,
      previewSignature2: null,
      ab: [1, 2, 3],
      bc: [{ info: "aa" }, { info: "bb" }, { info: "cc" }],
      cd: ["rr", "dd", "ks"],
      loadingContinue: false,
      disableContinue: false,
      loadingSend: false,
      disableSend: false,
      origParagraphInfoLength: "",
      category: "Non Disclosure Contract",
      parent: "General",
      lbID: "LB001",
      status: null,
      andContinueValidator: null, // if andContinue is = to this
      addOwnParagraphDialog: false,
      isParagraphComment: false,
      isParagraphInfo: false,
      addOwnClauseDialog: false,
      rules: {
        required: value => !!value || "Required.",
        number: value => !value || /^[0-9]*$/.test(value) || "Invalid value",
        string: value => !value || /^[A-Za-z]+$/.test(value) || "Invalid value"
      },
      tagName: "nondisclosure",
      ownParagraph: "",
      ownParagraphInfo: "",
      ownParagraphComment: "",
      allInfos: "",
      addCommentINIT: false,
      addInfoINIT: false,
      addClauseParagraphINDEX: "",
      selectedParagraphs: [],
      ownClauseTitle: "",
      ownClauseDetail: "",
      ownClauseInfo: "",
      ownClauseComment: "",
      addOwnClauseParagraphCommentInfo: "",
      isClauseComment: false,
      isClauseInfo: false,
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
          currency: "",
          due: "",
          duplicatedDues: [
            {
              nextDue: "",
              nextDueBy: ""
            }
          ]
        },
        confidentialInformation: "",
        signatories: {}
      },
      contractDuration: ["day(s)", "week(s)", "year(s)"],
      number: this.defineNumber(),
      docSavedSnackbar: {
        active: false,
        text: "Something went wrong [-Last Fallback-]",
        multiLine: true,
        color: "red"
      }
    };
  },

  methods: {
    retrieveSignatoriesData(val) {
      this.signatories = val;
      this.formOutput.signatories = val;
    },
    submitIMG() {
      let obj2 = JSON.stringify(this.previewSignature);
      console.log("IMG: " + obj2);
      console.log(this.previewSignature);
    },
    // SUBMIT DOCUMENT
    submitDocument(andContinue) {
      // Validate before processing submission
      if (this.$refs.documentPass.validate()) {
        console.log(this.signatories);

        if (
          this.signatories.firstParty.mode == "company" &&
          this.signatories.firstParty.name.length <= 1
        ) {
          $(".firstPartySign .v-input__slot.white").css({
            cssText: "border:1px solid red !important; height: 155px;"
          });
          this.docSavedSnackbar.active = true;
          this.docSavedSnackbar.text = "Please enter your name";
          this.docSavedSnackbar.color = "error";
          this.docSavedSnackbar.timeout = this.$store.state.snackBarDuration;
          return;
        }

        if (this.signatories.firstParty.signature.length <= 1) {
          $(".firstPartySign .userSignatureHolder").css({
            cssText: "border:1px solid red !important;"
          });
          this.docSavedSnackbar.active = true;
          this.docSavedSnackbar.text =
            "Signature missing. Please append Signature";
          this.docSavedSnackbar.color = "error";
          this.docSavedSnackbar.timeout = this.$store.state.snackBarDuration;
          this.docSavedSnackbar.multiLine = true;
          return;
        }
        // Check What Button was clciked
        if (andContinue === "continueEdit") {
          this.loadingContinue = true;

          // disable other button
          this.disableSend = true;
        } else if (andContinue === "redirectMe") {
          this.loadingSend = true;

          // disable other button
          this.disableContinue = true;
        }
        // Define Form
        const docData = {};
        // newFormData holds all of Form(formOutput)
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
        docData.legalboxID = this.lbID;

        if (this.formOutput.signatories.firstParty.signature.length > 5) {
          this.formOutput.isSigned = true;
          console.log(this.formOutput.isSigned);
        }

        docData.category = this.category;
        console.log(docData);
        // this.andContinueValidator = andContinue;

        this.$store.dispatch("submitDocument", docData).then(() => {
          this.andContinueValidator = andContinue;
          console.log(this.$store.state.redirecttoEditID);
          console.log(andContinue);
        });
        // End of logics, submission done
      } else {
        this.invalidSubmission.active = true;
      }
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
      if (this.formOutput.payment.duplicatedDues.length > 1) {
        this.formOutput.payment.duplicatedDues.splice(index, 1);
      }

      console.log("Dup Dues", this.formOutput.payment.duplicatedDues.length);
      console.log("Dup Dues", this.formOutput.payment.duplicatedDues);
    },
    addNewParagraph() {
      let ownParagraph = this.ownParagraph;
      let ownParagraphInfo = this.ownParagraphInfo;
      let ownParagraphComment = this.ownParagraphComment;
      console.log(ownParagraph);

      if (this.ownParagraph.length > 0) {
        this.paragraphList.push({
          paragraph: ownParagraph,
          info: ownParagraphInfo,
          comment: ownParagraphComment
        });
        this.addOwnParagraphDialog = false;

        console.log(this.paragraphList);

        this.ownParagraph = "";
        this.ownParagraphInfo = "";
        this.ownParagraphComment = "";
      } else if (this.ownParagraph.length <= 0) {
        alert("Paragraph can not be empty");
      }
    },
    // removeParagraph(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.paragraphList.splice(index, 1);
    //   console.log(this.paragraphList);
    // },
    activateInfoCommentDialog(index, clickKind) {
      if (clickKind == "comment") {
        this.addCommentINIT = true;
      } else if (clickKind == "info") {
        this.addInfoINIT = true;
      }
      this.addClauseParagraphINDEX = index;
      console.log("index", index);
      console.log("proto", this.addClauseParagraphINDEX);
    },
    addClauseParagraphComment() {
      let index = this.addClauseParagraphINDEX;
      if (this.isClauseComment === true) {
        // check if it was clause's comment button that was clicked
        console.log("Clause");

        this.clauseList[index].comment = this.addOwnClauseParagraphCommentInfo;
      } else if (this.isParagraphComment === true) {
        console.log("Paragraph");
        this.paragraphList[
          index
        ].comment = this.addOwnClauseParagraphCommentInfo;
      }
      this.addCommentINIT = false;
      this.addOwnClauseParagraphCommentInfo = "";
      this.isClauseComment = false; // IMPORTANT
      this.isParagraphComment = false; // IMPORTANT
    },
    addParagraphInfoDialog(index) {
      this.addInfoINIT = true;
      this.addClauseParagraphINDEX = index;
      console.log(this.isClauseInfo);
    },
    addClauseParagraphInfo() {
      let index = this.addClauseParagraphINDEX;
      if (this.isClauseInfo === true) {
        // check if it was clause's info button that was clicked
        console.log("Clause");

        this.clauseList[index].info = this.addOwnClauseParagraphCommentInfo;
      } else if (this.isParagraphInfo === true) {
        // check if it was paragraph's info button that was clicked
        console.log("Paragraph");

        this.paragraphList[
          index
        ].comment = this.addOwnClauseParagraphCommentInfo;
      }
      this.addInfoINIT = false;
      this.addOwnClauseParagraphCommentInfo = "";
      this.isClauseInfo = false; // IMPORTANT
      this.isParagraphInfo = false; // IMPORTANT
    },
    addNewClause() {
      let ownClauseTitle = this.ownClauseTitle;
      let ownClauseDetail = this.ownClauseDetail;
      let ownClauseInfo = this.ownClauseInfo;
      let ownClauseComment = this.ownClauseComment;
      if (ownClauseTitle.length > 0 && ownClauseDetail.length > 0) {
        this.clauseList.push({
          title: ownClauseTitle,
          detail: ownClauseDetail,
          info: ownClauseInfo,
          comment: ownClauseComment
        });
        this.addOwnClauseDialog = false;

        console.log(this.clauseList);

        this.ownClauseTitle = "";
        this.ownClauseDetail = "";
        this.ownClauseInfo = "";
        this.ownClauseComment = "";
      } else if (ownClauseTitle.length <= 0 || ownClauseDetail.length <= 0) {
        alert("Title and Detail can not be empty");
      }
    },
    cancelDialog() {
      // Cancel Paragraph Dialog Popup
      this.ownParagraph = "";
      this.ownParagraphInfo = "";
      this.ownParagraphComment = "";

      // Cancel Clause Dialog Popup
      this.ownClauseTitle = "";
      this.ownClauseDetail = "";
      this.ownClauseInfo = "";
      this.ownClauseComment = "";

      this.addOwnParagraphDialog = false;
      this.addOwnClauseDialog = false;
    },
    // removeClause(index) {
    //   // if(this.paragraphList.length !=0)
    //   // this.$delete(this.paragraphList, index);
    //   this.clauseList.splice(index, 1);
    //   console.log("i am" + this.clauseList.index);
    // }

    processLoop() {
      let collection = [];
      // let collection2 = ["sds", "iibi", "pop2"];
      let collection3 = ["jan", "feb", "mar"];
      for (var paragraph in this.bc) {
        collection.push(this.bc[paragraph]);
      }

      console.log("1st Stage", collection);

      // collection.map(x => collection2.map(x2 => (x.para = x2)));

      console.log("Check", collection);
      // console.log("2nd Stage", map1);

      collection.forEach(function(item) {
        // console.log(item);
        for (let i; i <= collection3.length; i++) {
          item.keys2 = i + "Y";
        }
        // collection2.forEach(function(arr) {
        //   console.log(arr);
        //   console.log((item.keys = arr));
        //   console.log(item);
        // });

        // collection2.forEach(function(item2) {
        //   console.log(item2);
        //   item.para2 = item2;
        // });
      });

      console.log(collection);
      this.testData = collection;
    },
    tryCLD() {
      console.log(this.holderTemp1);
      // let uri =
      //   "data:image/gif;base64,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";

      // axios
      //   .post("https://api.cloudinary.com/v1_1/" + this.cloudName + "/upload", {
      //     file: uri,
      //     upload_preset: this.cloudSigPath
      //   })
      //   .then(response => {
      //     console.log(response.data.docs);
      //     console.log(response.data);
      //     console.log(response.data.secure_url);
      //     console.log(response.status);
      //     console.log(response.headers);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     console.log(error.response);
      //     console.log(error.response.data);
      //   });
    }
  },
  watch: {
    redirecttoEditID(val) {
      if (typeof val == "number") {
        this.docSavedSnackbar.active = this.docSubmittedSuccessfuly.active;
        this.docSavedSnackbar.text = this.docSubmittedSuccessfuly.text;
        this.docSavedSnackbar.color = this.docSubmittedSuccessfuly.color;
        this.docSavedSnackbar.timeout = this.docSubmittedSuccessfuly.timeout;
        this.docSavedSnackbar.multiLine = this.docSubmittedSuccessfuly.multiLine;

        console.log("Re-Route");
        if (this.andContinueValidator === "redirectMe") {
          this.loadingSend = true;

          setTimeout(() => {
            this.$router.push("/docs/more/" + val);
            // console.log("To MORE Page");
            this.loadingSend = false;
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          this.loadingContinue = true;

          setTimeout(() => {
            this.$router.push("/docs/edit/" + val);
            // console.log("To EDIT Page");
            this.loadingContinue = false;
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
    },
    isDocumentSaved(val) {
      if (val == true) {
        console.log("Here");

        this.docSavedSnackbar.active = true;
        this.docSavedSnackbar.text = this.documentSavedMessage;
        this.docSavedSnackbar.color = "success";

        console.log("Re-Route");
        if (this.andContinueValidator === "redirectMe") {
          setTimeout(() => {
            // this.$router.push("/docs/more/" + val);
            console.log("To MORE Page");
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          setTimeout(() => {
            // this.$router.push("/docs/edit/" + val);
            console.log("To EDIT Page");
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
    this.allInfos = this.eachParagraphInfo;
    console.log(this.eachParagraphInfo.length);
    this.origParagraphInfoLength = this.eachParagraphInfo.length;

    this.paragraphList = this.$store.state.general.nonDisclosureParagraphs;
    this.clauseList = this.$store.state.general.nonDisclosureClauseList;
    console.log(this.clauseList);
    // let obj2 = JSON.stringify(this.paragraphList);
    // console.log("Paragraph List: " + obj2);
    // console.log("LENGTH", this.formOutput.payment.duplicatedDues.length);
  },
  components: {
    "back-nav": Back_Navbar,
    "general-footer": General_Footer,
    "products-footer": Products_Footer,
    "append-signature": Append_Signature

    // "v-runtime-template": VRuntimeTemplate
  },
  computed: {
    ...mapState([
      "redirecttoEditID",
      "documentSavedMessage",
      "isDocumentSaved",
      "invalidSubmission",
      "docSubmittedSuccessfuly"
    ]),
    fetchOwnBackgroundDetails() {
      let eachDoc = this.$store.state.generalHeaders;
      let eachDocFiltered = eachDoc.filter(item => item.name == this.tagName);
      return eachDocFiltered;
    },
    eachParagraphInfo() {
      const infos = [];
      let allParagraphs = this.$store.state.general.nonDisclosureParagraphs;
      allParagraphs.filter(item => infos.push({ info: item.info }));
      return infos;
    }
  }
};
</script>
