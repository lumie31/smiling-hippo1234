<template>
  <div class="dashboard nondisclosure page back-page">
    <back-nav></back-nav>
    <v-form ref="documentPass" @submit.prevent="submitDocument">
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
                <v-text-field
                  solo
                  flat
                  v-model="formOutput.payment.due"
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- DUPLICATABLE Dues Figures -->
            <!-- <pre class="testFloat">
            {{ formOutput.payment }}
          </pre -->
            >
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
                <span
                  class="addRemoveButtons"
                  @click="addDues"
                  v-if="index < 1"
                >
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
          <!-- <div v-for="(item, index) in allInfos" :key="index">
            <h2>Info:</h2>
            <pre class="testFloat">{{ item }}</pre>
          </div> -->
          <pre class="testFloat">{{ testData }}</pre>

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
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            @click="
                              index < origParagraphLength
                                ? null
                                : activateInfoCommentDialog(index);
                              isParagraphInfo = true;
                            "
                          >
                            <v-icon size="30">info</v-icon>
                          </v-btn>
                        </template>
                        <span> {{ item.info }}</span>
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
                              activateInfoCommentDialog(index);
                              isParagraphComment = true;
                            "
                          >
                            <v-icon size="30">comment</v-icon>
                          </v-btn>
                        </template>
                        <span> {{ item.comment }}</span>
                      </v-tooltip>
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
                  <span
                    class="addRemoveButtons"
                    @click="addOwnParagraphDialog = true"
                  >
                    +
                  </span>
                </p>
              </v-col>

              <v-dialog v-model="addClauseParagraphINIT" width="700">
                <v-card>
                  <v-card-title class="headline secondary white--text">
                    Add Comment
                  </v-card-title>

                  <v-card-text>
                    <v-textarea
                      v-model="addOwnClauseParagraphComment"
                      class="mt-8"
                      auto-grow=""
                      label="Comment"
                      min-height="110"
                      outlined
                      ref=""
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      text
                      class="accent"
                      @click="addClauseParagraphComment()"
                    >
                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <v-dialog v-model="addClauseParagraphINIT" width="700">
                <v-card>
                  <v-card-title class="headline secondary white--text">
                    Add Comment
                  </v-card-title>

                  <v-card-text>
                    <v-textarea
                      v-model="addOwnClauseParagraphComment"
                      class="mt-8"
                      auto-grow=""
                      label="Comment"
                      min-height="110"
                      outlined
                      ref=""
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      text
                      class="accent"
                      @click="ee()"
                    >
                      Add
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
            </v-row>

            <!-- PARAPGRAPH DIALOG -->
            <template>
              <div class="text-center">
                <v-dialog v-model="addOwnParagraphDialog" width="700">
                  <v-card>
                    <v-card-title class="headline secondary white--text">
                      Add Paragraph
                    </v-card-title>

                    <v-card-text>
                      <v-textarea
                        v-model="ownParagraph"
                        class="mt-8"
                        auto-grow=""
                        label="Paragraph"
                        min-height="110"
                        outlined
                        ref=""
                      ></v-textarea>
                      <v-textarea
                        v-model="ownParagraphInfo"
                        class="mt-8"
                        auto-grow=""
                        label="Information"
                        min-height="110"
                        outlined
                        ref=""
                      ></v-textarea>
                      <v-textarea
                        v-model="ownParagraphComment"
                        class="mt-8"
                        auto-grow=""
                        label="Comment"
                        min-height="110"
                        outlined
                        ref=""
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
                      >
                        Add
                      </v-btn>
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
                                : activateInfoCommentDialog(index);
                              isParagraphInfo = true;
                            "
                          >
                            <v-icon size="30">info</v-icon>
                          </v-btn>
                        </template>
                        <span> {{ clause.info }}</span>
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
                              activateInfoCommentDialog(index);
                              isClauseComment = true;
                            "
                          >
                            <v-icon size="30">comment</v-icon>
                          </v-btn>
                        </template>
                        <span> {{ clause.comment }}</span>
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
                <v-dialog v-model="addOwnClauseDialog" width="700">
                  <v-card>
                    <v-card-title class="headline secondary white--text">
                      Add Clause
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        v-model="ownClauseTitle"
                        class="mt-8"
                        auto-grow=""
                        label="Title"
                        outlined
                        ref=""
                      ></v-text-field>
                      <v-textarea
                        v-model="ownClauseDetail"
                        class="mt-8"
                        auto-grow=""
                        label="Detail"
                        min-height="110"
                        outlined
                        ref=""
                      ></v-textarea>
                      <v-textarea
                        v-model="ownClauseInfo"
                        class="mt-8"
                        auto-grow=""
                        label="Information"
                        min-height="110"
                        outlined
                        ref=""
                      ></v-textarea>
                      <v-textarea
                        v-model="ownClauseComment"
                        class="mt-8"
                        auto-grow=""
                        label="Comment"
                        min-height="110"
                        outlined
                        ref=""
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
                      >
                        Add
                      </v-btn>
                      <v-btn
                        color="white"
                        text
                        class="accent"
                        @click="cancelDialog()"
                      >
                        Cancel
                      </v-btn>
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
          <v-container>
            <!-- <v-row>
              <div class="text-center my-12" style="width: 100%;">
                <b>SIGNATURE COMPONENT GOES HERE</b>
              </div>
              <v-col cols="6" class="">
                <div class="formSectionTitle">Signatures (First Party)</div>
                <div class="d-flex justify-center">
                  <div class="d-flex align-center mr-6">
                    <input
                      type="radio"
                      name="company"
                      value="Person"
                      id="company"
                    />
                    <label for="form.radioId1" class="ml-2">Company</label>
                  </div>
                  <div class="d-flex align-center">
                    <input
                      type="radio"
                      autofocus
                      name="company"
                      value="Person"
                      id="company"
                    />
                    <label for="form.radioId1" class="ml-2">Person</label>
                  </div>
                </div>
                <div> {{ previewSignature }} </div>
                <v-btn @click="submitIMG">Image</v-btn>
                <div
                  class="signatureWrapper mt-12"
                  :style="{
                    backgroundImage: 'url(' + previewSignature + ')'
                  }"
                >
                  <v-file-input
                    v-model="previewSignature"
                    class="signature"
                    accept="image/png, image/jpeg"
                    prepend-icon="none"
                    flat
                    solo
                  >
                  </v-file-input>
                </div>
              </v-col>
              <v-col cols="6" class="d-flex flex-column align-center">
                <div class="formSectionTitle">Signatures (Second Party)</div>
                <div class="d-flex justify-center">
                  <div class="d-flex align-center mr-6">
                    <input
                      type="radio"
                      name="company"
                      value="Person"
                      id="company"
                    />
                    <label for="form.radioId1" class="ml-2">Company</label>
                  </div>
                  <div class="d-flex align-center">
                    <input
                      type="radio"
                      name="company"
                      value="Person"
                      id="company"
                    />
                    <label for="form.radioId1" class="ml-2">Person</label>
                  </div>
                </div>
                <div class="appendSignature"></div>
                <div class="signatureWrapper mt-12"></div>
              </v-col>
            </v-row> -->
          </v-container>
          <div class="text-center">
            <p>below</p>
            <template>
              <v-file-input
                v-model="previewSignature2"
                multiple
                label="File input"
              ></v-file-input>
            </template>
            <v-btn @click="tryCLD">CLD</v-btn>
          </div>

          <append-signature></append-signature>
          <v-row>
            <v-col cols="12" sm="12" class="d-flex justify-center">
              <!-- <v-btn large class="accent submit-document" @click="processLoop">
                Process
              </v-btn> -->
              <v-btn
                large
                class="accent submit-document"
                @click="submitDocument('continueEdit')"
                :disabled="disableContinue"
              >
                Save and Continue
              </v-btn>
              <v-btn
                large
                class="accent submit-document"
                id="saveAndSend"
                style="top: 50%;"
                :loading="loadingSend"
                :disabled="disableSend"
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
    >
      {{ invalidSubmission.text }}
      <v-btn color="secondary" text @click="invalidSubmission.active = false">
        <b>x</b>
      </v-btn>
    </v-snackbar>

    <general-footer></general-footer>
  </div>
</template>

<script>
import Back_Navbar from "@/components/back-nav";
import General_Footer from "@/components/footer";
import Products_Footer from "@/components/products-general-footer";
// import VRuntimeTemplate from "v-runtime-template";
import Append_Signature from "@/components/append-signature";
import axios from "axios";

import { mapState } from "vuex";

export default {
  data() {
    return {
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
      signature: {
        firstParty: {
          signer: "",
          signature: ""
        },
        secondParty: {
          signer: "",
          signature: ""
        }
      },
      status: null,
      andContinueValidator: null, // if andContinue is = to this
      addOwnParagraphDialog: false,
      isParagraphComment: false,
      addOwnClauseDialog: false,
      rules: {
        required: value => !!value || "Required."
      },
      tagName: "nondisclosure",
      ownParagraph: "",
      ownParagraphInfo: "",
      ownParagraphComment: "",
      allInfos: "",
      addClauseParagraphINIT: false,
      addClauseParagraphINDEX: "",
      selectedParagraphs: [],
      ownClauseTitle: "",
      ownClauseDetail: "",
      ownClauseInfo: "",
      ownClauseComment: "",
      addOwnClauseParagraphComment: "",
      isClauseComment: false,
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
        color: "red"
      }
    };
  },

  methods: {
    submitIMG() {
      let obj2 = JSON.stringify(this.previewSignature);
      console.log("IMG: " + obj2);
      console.log(this.previewSignature);
    },
    // SUBMIT DOCUMENT
    submitDocument(andContinue) {
      // Validate before processing submission
      if (this.$refs.documentPass.validate()) {
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
        docData.category = this.category;
        console.log(docData);
        // this.andContinueValidator = andContinue;

        // this.$store.dispatch("submitDocument", docData).then(() => {
        //   this.andContinueValidator = andContinue;
        //   console.log(this.$store.state.redirecttoEditID);
        //   console.log(andContinue);
        // });
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
    activateInfoCommentDialog(index) {
      this.addClauseParagraphINIT = true;
      this.addClauseParagraphINDEX = index;
    },
    addClauseParagraphComment() {
      let index = this.addClauseParagraphINDEX;
      if (this.isClauseComment === true) {
        // check if it was clause's comment button that was clicked
        console.log("Clause");

        this.clauseList[index].comment = this.addOwnClauseParagraphComment;
      } else if (this.isParagraphComment === true) {
        console.log("Paragraph");
        this.paragraphList[index].comment = this.addOwnClauseParagraphComment;
      }
      this.addClauseParagraphINIT = false;
      this.addOwnClauseParagraphComment = "";
      this.isClauseComment = false; // IMPORTANT
    },
    addParagraphInfoDialog(index) {
      this.addClauseParagraphINIT = true;
      this.addClauseParagraphINDEX = index;
    },
    addClauseParagraphInfo() {
      let index = this.addClauseParagraphINDEX;
      if (this.isClauseComment === true) {
        // check if it was clause's comment button that was clicked
        console.log("Clause");

        this.clauseList[index].comment = this.addOwnClauseParagraphComment;
      } else if (this.isParagraphComment === true) {
        console.log("Paragraph");
        this.paragraphList[index].comment = this.addOwnClauseParagraphComment;
      }
      this.addClauseParagraphINIT = false;
      this.addOwnClauseParagraphComment = "";
      this.isClauseComment = false; // IMPORTANT
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
      console.log(this.previewSignature2);

      axios
        .post("https://api.cloudinary.com/v1_1/" + this.cloudName + "/upload", {
          file: this.previewSignature2,
          upload_preset: this.cloudSigPath
        })
        .then(response => {
          console.log(response.data.docs);
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
          console.log(error.response.data);
        });
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
            // this.$router.push("/docs/more/" + val);
            // console.log("To MORE Page");
            this.loadingSend = false;
          }, this.$store.state.snackBarDuration);
        } else if (this.andContinueValidator === "continueEdit") {
          this.loadingContinue = true;

          setTimeout(() => {
            // this.$router.push("/docs/edit/" + val);
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
    // "v-runtime-template": VRuntimeTemplate
    "append-signature": Append_Signature
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
